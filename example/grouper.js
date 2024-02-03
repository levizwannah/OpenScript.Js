const fs = require('fs');
const path = require('path')

const config = require('./ojs-config.json')

var OpenScript = {
    AutoLoader: class ClassLoader {
        /**
         * Keeps track of the files that have been loaded
         */
        static history = new Map();

        /**
         * The Directory or URL in which all JS files are located
         */
        dir = ".";

        /**
         * The extension of the files
         */
        extension = ".js";

        /**
         * The version of the files. It will be appended as ?v=1.0 for example
         * This enable fresh reloading if necessary
         */
        version = "1.0.0";

        /**
         *
         * @param {string} dir Directory from which the file should be loaded
         * @param {string} extension the extension of the file .js by default
         */
        constructor(dir = ".", version = "1.0.0") {
            this.dir = dir;
        }

        /**
         * Changes . to forward slashes
         * @param {string|Array} text
         * @returns
         */
        normalize(text) {
            if (text instanceof Array) {
                return text.join("/");
            }
            return text.replace(/\./g, "/");
        }

        /**
         * Changes / to .
         * @param {string|Array} text
         * @returns
         */
        dot(text) {
            if (text instanceof Array) {
                return text.join(".");
            }
            return text.replace(/\//g, ".");
        }

        /**
         * Splits a file into smaller strings
         * based on the class in that file
         */
        Splitter = class Splitter {
            /**
             * Gets the class Signature
             * @param {string} content
             * @param {int} start
             * @param {object<>} signature {name: string, signature: string, start: number, end: number}
             */
            classSignature(content, start) {
                const signature = {
                    name: "",
                    definition: "",
                    start: -1,
                    end: -1,
                    parent: null,
                };

                let startAt = start;

                let output = [];
                let tmp = "";

                let pushTmp = (index) => {
                    if (tmp.length === 0) return;

                    if (output.length === 0) startAt = index;

                    output.push(tmp);
                    tmp = "";
                };

                for (let i = start; i < content.length; i++) {
                    let ch = content[i];

                    if (/[\s\r\t\n]/.test(ch)) {
                        pushTmp(i);

                        continue;
                    }

                    if (/\{/.test(ch)) {
                        pushTmp(i);
                        signature.end = i;

                        break;
                    }

                    tmp += ch;
                }

                signature.start = startAt;

                if (output.length % 2 !== 0)
                    throw Error(
                        `Invalid Class File. Could not parse \`${content}\` from index ${start} because it doesn't have the proper syntax. ${content.substring(
                            start
                        )}`
                    );

                if (output.length > 2) {
                    signature.parent = output[3];
                }

                signature.name = output[1];
                signature.definition = output.join(" ");

                return signature;
            }

            /**
             * Splits the content of the file by
             * class
             * @param {string} content file content
             * @return {Map<string,string>} class map
             */
            classes(content) {
                content = content.trim();

                const stack = [];
                const map = new Map();
                const qMap = new Map([
                    [`'`, true],
                    [`"`, true],
                    ["`", true],
                ]);

                let index = 0;
                let code = "";

                while (index < content.length) {
                    let signature = this.classSignature(content, index);
                    index = signature.end;

                    let ch = content[index];
                    stack.push(ch);

                    code += signature.definition + " ";
                    code += ch;

                    let text = [];

                    index++;

                    while (stack.length && index < content.length) {
                        ch = content[index];
                        code += ch;

                        if (qMap.has(ch)) {
                            text.push(ch);
                            index++;

                            while (text.length && index < content.length) {
                                ch = content[index];
                                code += ch;

                                let last = text.length - 1;

                                if (qMap.has(ch) && ch === text[last]) {
                                    text.pop();
                                } else if (
                                    ch === "\n" &&
                                    (text[last] === '"' || text[last] === "'")
                                ) {
                                    text.pop();
                                }

                                index++;
                            }
                            continue;
                        }
                        if (/\{/.test(ch)) stack.push(ch);
                        if (/\}/.test(ch)) stack.pop();

                        index++;
                    }

                    map.set(signature.name, {
                        extends: signature.parent,
                        code,
                        name: signature.name,
                        signature: signature.definition,
                    });
                    code = "";
                }

                return map;
            }
        };

        /**
 * @param {string} fileName script name without the .js.
 */
        async req(fileName) {
            let names = fileName.split(/\./);

            if (OpenScript.AutoLoader.history.has(`${this.dir}.${fileName}`))
                return OpenScript.AutoLoader.history.get(`${this.dir}.${fileName}`);

            let filePath = path.join(this.dir, this.normalize(fileName) + this.extension);
            let classes = fs.readFileSync(filePath, 'utf-8');
            let content = classes;

            let classMap = new Map();
            let codeMap = new Map();
            let basePrefix = "";

            try {
                basePrefix = this.dot(path.dirname(filePath));
            } catch (e) {
                basePrefix = this.dot(this.dir);
            }

            let prefixArray = [
                ...basePrefix.split(/\./g).filter((v) => v.length),
                ...names,
            ];

            let prefix = prefixArray.join(".");
            if (prefix.length > 0 && !/^\s+$/.test(prefix)) prefix += ".";

            let splitter = new this.Splitter();

            classes = splitter.classes(content);

            for (let [k, v] of classes) {
                let key = prefix + k;
                classMap.set(key, [k, v.code]);
            }

            for (let [k, arr] of classMap) {
                let parent = classes.get(arr[0]).extends;

                if (parent) {
                    let original = parent;

                    if (!/\./g.test(parent)) parent = prefix + parent;

                    if (!this.exists(parent)) {
                        if (!classMap.has(parent)) {
                            await this.req(parent);
                        } else {
                            let pCode = classMap.get(parent);

                            prefixArray.push(pCode[0]);

                            let code = await this.setFile(
                                prefixArray,
                                Function(`return (${pCode[1]})`)()
                            );

                            prefixArray.pop();

                            codeMap.set(parent, [pCode[0], code]);
                        }
                    } else {
                        let signature = classes.get(arr[0]).signature;

                        let replacement = signature.replace(original, parent);

                        let c = arr[1].replace(signature, replacement);
                        arr[1] = c;
                    }
                }

                if (!this.exists(k)) {
                    prefixArray.push(arr[0]);

                    let code = await this.setFile(
                        prefixArray,
                        Function(`return (${arr[1]})`)()
                    );

                    prefixArray.pop();

                    codeMap.set(k, [arr[0], code]);
                }
            }

            OpenScript.AutoLoader.history.set(`${this.dir}.${fileName}`, codeMap);

            return codeMap;
        }

        async include(fileName) {
            try {
                return await this.req(fileName);
            } catch (e) { }

            return null;
        }

        /**
         * Adds a class file to the window
         * @param {Array<string>} names
         */
        async setFile(names, content) {
            OpenScript.namespace(names[0]);

            let obj = window;
            let final = names.slice(0, names.length - 1);

            for (const n of final) {
                if (!obj[n]) obj[n] = {};
                obj = obj[n];
            }

            obj[names[names.length - 1]] = content;

            // Init the component if it is a
            // component

            if (content.prototype instanceof OpenScript.Component) {
                let c = new content();

                if (h.has(c.name)) return;

                await c.mount();
            }

            return content;
        }

        /**
         * Checks if an object exists in the window
         * @param {string} qualifiedName
         */
        exists = (qualifiedName) => {
            let names = qualifiedName.split(/\./);
            let obj = window[names[0]];

            for (let i = 1; i < names.length; i++) {
                if (!obj) return false;
                obj = obj[names[i]];
            }

            if (!obj) return false;

            return true;
        };
    },
}

class Grouper extends OpenScript.AutoLoader {
    /**
     * 
     * @param {array}  filePaths   
     * @returns all the classes from all the files with the filePaths array
     */ 

    async classesFromFilePath(filePaths){
        let classCode = '';
        for (let filePath of filePaths) {
                
                
            const classesContent = fs.readFileSync(filePath, 'utf-8');
            const classMap = new this.Splitter().classes(classesContent);
            for (const [, { code }] of classMap) {
                classCode += code + ',';
            }
        }
        return classCode; 
    }

  /**
   * 
   * @param {*} filePaths wraps all the code from a specified file path in the ojs function
   */


    async wrapClassesFromFilePath (filePaths) {
        try {
            let classes = await this.classesFromFilePath(filePaths);
            let finalCode = 'ojs('; 
            
            finalCode += classes + ')'; 

            const writeToFile = this.consolidateToFile(finalCode)
           
        } catch (error) {
            console.error('Error printing class names:', error);
        }
    }
    /**
     * 
     * @param {string} consolidatedCode takes in the consolidated code and then creates a
     * dotOjs file with that has all the code from all the classes wrapped in the ojs function
     */

    async consolidateToFile( consolidatedCode ){
        const consolidatedFile = path.join(this.dir, 'dotOjs.js');
        fs.writeFileSync(consolidatedFile, consolidatedCode, 'utf-8');
        console.log(`Wrapped code has been written to ${consolidatedFile}`);


    }
    
   /**
    * 
    * @param {string} dir 
    * @param {string} files 
    * @returns an array of all the paths in the given directory
    */
    async getFilePaths(dir, files = []) {
        const fileList = fs.readdirSync(dir)
        for (const file of fileList) {
            const name = `${dir}/${file}`
            if (fs.statSync(name).isDirectory()) {

                this.getFilePaths(name, files)
            } else {
                files.push(name)
            }
        }
        return files
    }
 /**
  * 
  * @returns all the grouped code by making use of the getFilePaths method and 
  * wrapClassesFromFilePath
  */

    async grouper() {
        try {
             let AllPaths = []
            for (let configDirectory in config.dir) {
                let directories = await grouper.getFilePaths(configDirectory);
                 AllPaths.push(directories)
            }
            let paths = AllPaths; 
            
            let configPaths = []; 
            for (let path of paths) {
                for (let directory of path) {
                    configPaths.push(directory); 
                }
            }
            console.log(configPaths); 
            let code = await grouper.wrapClassesFromFilePath(configPaths); 
            return code; 
        } catch (error) {
            console.error('Error getting all classes:', error);
        }
    }
    

    
}

const grouper = new Grouper();




let com = grouper.grouper()




















