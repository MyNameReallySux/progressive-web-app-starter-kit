/**
 * A Workbox strategy.
 * 
 * @typedef {(function|object)} Strategy
 * @see https://developers.google.com/web/tools/workbox/reference-docs/prerelease/workbox.strategies
 */

/**
 * A regular expression or 'RegExp' object.
 * 
 * @typedef {Object} RegExp
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
 */

importScripts('/modules/workbox-sw/build/workbox-sw.js')

/* ###########################
    Initialize
########################### */

const __DEBUG__ = true

/**
 * Structure containing aliases for caching strategies. Initialized in {@link setWorkboxData}, 
 * meaning this object is undefined until the '{@link setWorkboxData}' runs.
 * 
 * @type {Object}
 * @property {Strategy} networkFirst - Alias for 'workbox.strategies.networkFirst'
 * @property {Strategy} staleWhileRevalidate - Alias for 'workbox.strategies.staleWhileRevalidate'
 */
let Strategies

/**
 * Structure containing pre-configured Workbox plugins. Initialized in {@link setWorkboxData}, 
 * meaning this object is undefined until the '{@link setWorkboxData}' runs.
 * 
 * @type {Object}
 */
let Plugins

//workboxSW.precache([])

/* ###########################
    Functions
########################### */

/**
 * Initializes the Workbox caching environment. Additional settings are set if in debug mode, like 
 * log level. Specifically uses Workbox version 3.0.
 */
function initializeWorkbox(){
    initializeConfig()
    setCacheDetails()

    if(__DEBUG__){
        workbox.skipWaiting()
        workbox.clientsClaim()
        workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug)
    } else {
        workbox.core.setLogLevel(workbox.core.LOG_LEVELS.silent)
    }

    setWorkboxData()
    initializeRoutes()
}

/**
 * Sets Workbox configuration, must be first function run before any other Workbox modules are used. 
 * Alias for {@link https://developers.google.com/web/tools/workbox/reference-docs/prerelease/workbox#.setConfig | workbox.setConfig}.
 * 
 * @param {Object} config - Workbox configuration object.
 * @param {String} config.debug - Set workbox to 'dev' mode.
 */
function initializeConfig(config){
    let Config = {
        modulePathPrefix: '/modules/workbox-sw/',
        debug: __DEBUG__
    }

    workbox.setConfig(Config)
}

/**
 * Initializes workbox routes. Depends on the global variable {@link Strategies}.
 */
function initializeRoutes(){
    workbox.routing.registerRoute(
        /\.(?:js|css)$/,
        workbox.strategies.staleWhileRevalidate(),
      ); 
    
    // registerStrategy(/.*\.js/, Strategies.networkFirst())
    // registerStrategy(/.*\.css/, Strategies.staleWhileRevalidate({ cacheName: 'css-cache' }))
    // registerStrategy(/.*\.(?:png|jpg|jpeg|svg|gif)/, Strategies.staleWhileRevalidate({ 
    //     cacheName: 'image-cache' ,
    //     plugins: [
    //         new Plugins.Expiration({
    //             maxEntries: 20,
    //             maxAgeSeconds: 7 * 24 * 60 * 60
    //         })
    //     ]
    // }))
}

/**
 * Registers an individual workbox caching strategy. 
 * Alias for {@link https://developers.google.com/web/tools/workbox/reference-docs/prerelease/workbox.routing#.registerRoute | workbox.routing.registerRoute}.
 * 
 * @param {RegExp} pattern - A regular expression matching affected routes.
 * @param {Strategy} strategy  - Workbox caching strategy. 
 */
function registerStrategy(pattern, strategy){
    workbox.routing.registerRoute(pattern, strategy)
}

/**
 * Initializes the global {@link Strategies} and {@link Plugins} objects. Must be fun after {@link initializeConfig}.
 * 
 */
function setWorkboxData(){
    Strategies = {
        networkFirst: workbox.strategies.networkFirst,
        staleWhileRevalidate: workbox.strategies.staleWhileRevalidate
    }
    
    Plugins = {
        Expiration: workbox.expiration.Plugin
    }
}


function setCacheDetails(){
    workbox.core.setCacheNameDetails({
        prefix: 'website',
        suffix: 'v1',
        precache: 'install-time',
        runtime: 'run-time',
        googleAnalytics: 'ga',
    });
}

/* ###########################
    Procedure
########################### */

initializeWorkbox()
