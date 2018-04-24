// External Modules
import webpack from 'webpack'

// Local Modules
import plugins from './plugins'
import { client as site } from '../site'
import { clientPaths as paths, clientAliases as aliases } from '../paths'

// Variables
export default {
    entry: {
        app: paths.resolveClient('index.js')
    },
    output: {
        filename: 'assets/js/[name].[chunkhash].js',
        chunkFilename: 'assets/js/chunks/[name].js',
        path: paths.resolvePublic()
    },
    module: {
        rules: [
            {
                test: /\.sw\.js$/,
                use: [
                    { loader: 'babel-loader' },
                    { loader: 'file-loader', options: {
                        name: 'assets/sw/[name].[ext]'
                    }}
                ]
            }, {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            }, {
                test: /\.(ico)$/,
                use: {
                    loader: 'file-loader?name=assets/images/icons/[name].[ext]'
                }
            }, {
                test: /\.(jpe?g|png|gif|svg|webp)$/,
                use: {
                    loader: 'file-loader?name=assets/images/[name].[ext]'
                }

            }, {
                test: /\.(hbs|handlebars)$/,
                use: 'handlebars-loader'
            }
        ]
    },
    plugins: [...plugins],
    resolve: {
        alias: { ...aliases }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
    devtool: 'cheap-eval-source-map',
    watchOptions: {
        aggregateTimeout: 1000,
        poll: 500
    }
}