/*----------------------------------
 | Do OpenScript Configurations Here
 |----------------------------------
*/

/**----------------------------------
 * 
 * Set the default route path here
 * ----------------------------------
 */
route.basePath(ojsConf.path.assets);

/*-----------------------------------
 | set the directories in which we
 | can find the context files
 |-----------------------------------
*/
ContextProvider.directory = route.baseUrl(ojsConf.path.contexts);

/*-----------------------------------
 | set the version number of the
 | context files so that we can
 | always load the new files incase
 | files change
 |-----------------------------------
*/
ContextProvider.version = ojsConf.versions.cxt;

/*-----------------------------------
 | Set the Mediators directory
 | so that we an load the mediators
 | from that directory
 |-----------------------------------
*/
MediatorManager.directory = route.baseUrl(ojsConf.path.mediators);

/*-----------------------------------
 | Set the version number of the 
 | mediator files so that we can
 | always load a fresh copy of the
 | mediators files upon changes.
 |----------------------------------
*/
MediatorManager.version = ojsConf.versions.mtr;

/*-----------------------------------
 | Set the default component
 | directory for the loader
 |-----------------------------------
*/
loader.dir = route.baseUrl(ojsConf.path.components);

/*-----------------------------------
 | set the version number of the
 | component files so that we load
 | a fresh file when they change
 |-----------------------------------
*/
loader.version = ojsConf.versions.cmp;

/*-----------------------------------
 | Set the default directory of the
 | autoload object for loading
 | files.
 |-----------------------------------
*/

autoload.dir = route.baseUrl(ojsConf.path.files);

/*-----------------------------------
 | set the version number of the
 | JS files so that we load
 | a fresh file when they change
 |-----------------------------------
*/
autoload.version = ojsConf.versions.file;

/*--------------------------------
 | Set the logs clearing interval
 | for the broker to remove stale
 | events. (milliseconds)
 |--------------------------------
*/
broker.CLEAR_LOGS_AFTER = 30000;

/*--------------------------------
 | Set how old an event must be
 | to be deleted from the broker's
 | event log during logs clearing
 |--------------------------------
*/
broker.TIME_TO_GC = 10000;


/*-------------------------------------------
 | Start the garbage 
 | collector for the broker
 |-------------------------------------------
*/
broker.removeStaleEvents();