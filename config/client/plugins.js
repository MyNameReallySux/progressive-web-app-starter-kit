// External Modules
import webpack from 'webpack'

import CleanWebpackPlugin from 'clean-webpack-plugin'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import GenerateJsonPlugin from 'generate-json-webpack-plugin'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import ServiceWorkerWebpackPlugin from 'serviceworker-webpack-plugin'
import WebpackPwaManifest from 'webpack-pwa-manifest'
import WorkboxPlugin from 'workbox-webpack-plugin'

const { CommonChunksPlugin } = webpack.optimize

// Local Modules
import CleanAfterWatchPlugin from '../../libs/CleanAfterWatchPlugin'
import DebugCompilerPlugin from '../../libs/DebugCompilerPlugin'
import { clientPaths as paths } from '../paths'
import { client as site } from '../site'

// Variables
const { LoaderOptionsPlugin } = webpack

// Plugins
export default [
    new CleanWebpackPlugin([paths.resolvePublic()], {
        root: paths.resolve(),
        exclude: ['admin']
    }),
    new CleanAfterWatchPlugin(['**/*precache-manifest*.js', '/assets/js/**/*app*.js'], {
        root: paths.resolvePublic()
    }),
    // new DebugCompilerPlugin(),
    new FaviconsWebpackPlugin({
        logo: paths.resolveAssets('icon.png'),
        prefix: '/assets/images/icons-[hash]/',
        emitStats: true,
        statsFilename: 'meta/iconstats-[hash].json',
        persistentCache: true,
        inject: true,
        background: '#000',
        title: site.name,

        icons: {
            android: true,
            appleIcon: true,
            appleStartup: true,
            coast: false,
            favicons: true,
            firefox: true,
            opengraph: false,
            twitter: false,
            yandex: false,
            windows: false
          }
    }),
    new GenerateJsonPlugin('meta/site.json', site),
    new HTMLWebpackPlugin({
        filename: 'index.html',
        template: 'src/client/index.hbs',
        templateParameters: { ...site },
        hash: true

    }),
    // new LoaderOptionsPlugin({
    //     debug: true
    // }),
    new WorkboxPlugin.GenerateSW({
        swDest: paths.resolvePublic('workbox.sw.js'),
        cacheId: site.packageName,
        importWorkboxFrom: 'cdn',
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [{
            urlPattern: /^https:\/\/images.pexels.com\/.*/,
            handler: 'cacheFirst',
            options: {
                cacheName: `${site.packageName}-images-cache`,
                expiration: {
                    maxEntries: 25,
                    maxAgeSeconds: 60 * 60 * 24 * 90
                },
                cacheableResponse: {
                    statuses: [0, 200]
                }
            }
        }]
    }),
    new WebpackPwaManifest({
        name: site.name,
        description: `This is a progressive web app starter kit.`,
        background_color: site.data.colors.primary['base'],
        theme_color: site.data.colors.primary[900],
        orientation: 'portrait',
        display: 'standalone',
        start_url: '.',
    
        icons: {
            src: paths.resolveImages('icons/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: 'assets/images/icons'
        },
    
        filename: "meta/manifest.json",
        fingerprints: false
    })
]