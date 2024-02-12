const fs = require('fs');
const path = require('path')

const config = require('./ojs-config.json')



/**
 * Splits a file into smaller strings
 * based on the class in that file
 */
class Splitter {
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




class Grouper extends Splitter {

    /**
     * 
     * @param {array}  filePaths   
     * @returns all the classes from all the files with the filePaths array
     */


    async classesFromFilePath(filePaths) {
        let cls = "";
        const params = {};
        const names = {};
        let i = 1;

        for (let filePath of filePaths) {
            const classesContent = fs.readFileSync(filePath, "utf-8");
            const map = this.classes(classesContent);

            for (let [key, { code, name, extends: parent, signature }] of map) {

                if (name in names) {
                    let newName = `${name}${i++}`;
                    let newSig = signature.replace(`${name} `, `${newName} `);
                    let newCode = code.replace(signature, newSig);

                    code = newCode;
                    name = newName;
                    signature = newSig;
                }

                names[name] = true;

                if (/OpenScript\.Mediator/.test(parent)) {
                    let newName = `${name}Mediator`;
                    let newSig = signature.replace(`${name} `, `${newName} `);
                    let newCode = code.replace(signature, newSig);

                    code = newCode;
                    name = newName;
                }

                cls += code + "\n";
                params[name] = true;
            }
        }
        return { code: cls, params: Object.keys(params) };
    }

    /**
     * 
     * @param {*} filePaths wraps all the code from a specified file path in the ojs function
     */


    async wrapClassesFromFilePath(filePaths) {
		try {
			let {code, params} = await this.classesFromFilePath(filePaths);

			let finalCode = `${code}\nojs(${params.join(',')});`

			this.consolidateToFile(finalCode);
		} catch (error) {
			console.error("Error printing class names:", error);
		}
	}
    /**
     * 
     * @param {string} consolidatedCode takes in the consolidated code and then creates a
     * dotOjs file with that has all the code from all the classes wrapped in the ojs function
     */

    async consolidateToFile(consolidatedCode) {
		const consolidatedFile = "dotOjs.js";
		fs.writeFileSync(consolidatedFile, consolidatedCode, "utf-8");
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

    async group() {
		try {
			let AllPaths = [];
			for (let key in config.dir) {
                let dir = config.dir[key];
				let directories = await grouper.getFilePaths(dir);
				AllPaths.push(directories);
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
			console.error("Error getting all classes:", error);
		}
	}



}

const grouper = new Grouper();




let com = grouper.grouper()




















