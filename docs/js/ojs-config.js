/*----------------------------------
 | Do OpenScript Configurations Here
 |----------------------------------
*/

/**----------------------------------
 * 
 * Set the default route path here
 * ----------------------------------
 */
if((new URL(window.location.href).hostname !== '127.0.0.1')){
    route.basePath('OpenScript.Js');
} 

/*-----------------------------------
 | set the directories in which we
 | can find the context files
 |-----------------------------------
*/
ContextProvider.directory = route.baseUrl('/docs/js/contexts');

/*-----------------------------------
 | set the version number of the
 | context files so that we can
 | always load the new files incase
 | files change
 |-----------------------------------
*/
ContextProvider.version = '1.0.0';

/*-----------------------------------
 | Set the default component
 | directory for the loader
 |-----------------------------------
*/
loader.dir = route.baseUrl('/docs/js/components');

/*-----------------------------------
 | set the version number of the
 | component files so that we load
 | a fresh file when they change
 |-----------------------------------
*/
loader.version = "1.0.0";