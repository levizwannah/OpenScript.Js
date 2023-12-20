/*----------------------------------
 | Do OpenScript Configurations Here
 |----------------------------------
*/

/*-----------------------------------
 | Set the global runtime prefix.
 | This prefix will be appended
 | to every path before resolution.
 | So ensure when defining routes,
 | you have it as the main prefix.
 |------------------------------------
*/
route.runtimePrefix('');

/**----------------------------------
 * 
 * Set the default route path here
 * ----------------------------------
 */
route.basePath('');

/*-----------------------------------
 | set the directories in which we
 | can find the context files
 |-----------------------------------
*/
ContextProvider.directory = route.baseUrl('example/contexts');

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
MediatorManager.directory = route.baseUrl('example/mediators');

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
loader.dir = route.baseUrl('example/components');

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

autoload.dir = route.baseUrl('/');

/*-----------------------------------
 | set the version number of the
 | JS files so that we load
 | a fresh file when they change
 |-----------------------------------
*/
autoload.version = '1.0.0';

/*---------------------------------
 | Get the initial body style so
 | so that when routes change
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

/*------------------------------------------
 | Should the broker display events
 | in the console as they are fired
 |------------------------------------------
*/
if(/^(127\.0\.0\.1|localhost)$/.test(route.url().hostname)) {
    broker.withLogs(true);
}
 

/**
 * ---------------------------------------------
 * Should the broker require events registration.
 * This ensures that only registered events
 * can be listened to and fire by the broker.
 * ---------------------------------------------
 */
broker.requireEventsRegistration(true);