/*----------------------------------
 | Do OpenScript Configurations Here
 |----------------------------------
*/

/*----------------------------------
 * 
 * Set the default route path here
 * ----------------------------------
 */
route.basePath(''); // === '/'

/*-----------------------------------
 | Set the global runtime prefix.
 | This prefix will be appended
 | to every path before resolution.
 | So ensure when defining routes,
 | you have it as the main prefix.
 |------------------------------------
*/
route.runtimePrefix(''); // === ''

/*-----------------------------------
 | set the directories in which we
 | can find the context files
 |-----------------------------------
*/
ContextProvider.directory = route.baseUrl('js/contexts');

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
MediatorManager.directory = route.baseUrl('js/mediators');

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
loader.dir = route.baseUrl('js/components');

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

autoload.dir = route.baseUrl('js/classes');

/*-----------------------------------
 | set the version number of the
 | JS files so that we load
 | a fresh file when they change
 |-----------------------------------
*/
autoload.version = '1.0.0';


/*---------------------------------
 | Get the initial body style so
 | so that when routes change,
 | we can reset the body style.
 | Sometimes, the body element's
 | style is affected by elements
 | That are no longer on the DOM.
 | example, bootstrap offcanvas.
 | In these cases, you need to
 | reset the body style when
 | the routeChanged event is fired
 | by the router. So you can listen
 | to it and use this to reset
 | the style.
 |----------------------------------
*/
var __bodyStyle = document.body.getAttribute("style");

/*--------------------------------
 | Set the logs clearing interval
 | for the broker to remove stale
 | events. (milliseconds)
 |--------------------------------
*/
broker.CLEAR_LOGS_AFTER = 30000; // 30 secs

/*--------------------------------
 | Set how old an event must be
 | to be deleted from the broker's
 | event log during logs clearing
 |--------------------------------
*/
broker.TIME_TO_GC = 10000; // 10 secs


/*-------------------------------------------
 | Start the garbage 
 | collector for the broker
 |-------------------------------------------
*/
broker.removeStaleEvents(); // broker garbage collection started

/*------------------------------------------
 | When this is set to true, the broker
 | will display events and their payloads
 | in the console when they are fired
 |------------------------------------------
*/
broker.withLogs(true); 

/*-----------------------------------------
 | For SPAs, you have to initialize the
 | Router using `router.init()`
 |-----------------------------------------
*/
// router.init();