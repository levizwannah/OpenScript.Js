/*----------------------------------
 | Do OpenScript Configurations Here
 |----------------------------------
*/

/**----------------------------------
 * 
 * Set the default route path here
 * ----------------------------------
 */
route.basePath('');
if(route.url().hostname !== '127.0.0.1') route.basePath('OpenScript.Js');

/*-----------------------------------
 | set the directories in which we
 | can find the context files
 |-----------------------------------
*/
ContextProvider.directory = route.baseUrl('docs/js/contexts');

/*-----------------------------------
 | set the version number of the
 | context files so that we can
 | always load the new files incase
 | files change
 |-----------------------------------
*/
ContextProvider.version = '1.0.0';

/*-----------------------------------
 | Set the Mediators directory
 | so that we an load the mediators
 | from that directory
 |-----------------------------------
*/
MediatorManager.directory = route.baseUrl('docs/js/mediators');

/*-----------------------------------
 | Set the version number of the 
 | mediator files so that we can
 | always load a fresh copy of the
 | mediators files upon changes.
 |----------------------------------
*/
MediatorManager.version = '1.0.0';

/*-----------------------------------
 | Set the default component
 | directory for the loader
 |-----------------------------------
*/
loader.dir = route.baseUrl('docs/js/components');

/*-----------------------------------
 | set the version number of the
 | component files so that we load
 | a fresh file when they change
 |-----------------------------------
*/
loader.version = '1.0.0';

/*-----------------------------------
 | Set the default directory of the
 | autoload object for loading
 | files.
 |-----------------------------------
*/

autoload.dir = route.baseUrl('docs/js');

/*-----------------------------------
 | set the version number of the
 | JS files so that we load
 | a fresh file when they change
 |-----------------------------------
*/
autoload.version = '1.0.0';

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