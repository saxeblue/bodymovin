
var webpack = require('webpack');
var TerserPlugin = require('terser-webpack-plugin');
var autoprefixer = require('autoprefixer');

var config = require('./app_config');



// env: webpack --env.hoge=hogehoge => env.hogeで取得
// argv: webpack --mode production => argv.modeで取得
module.exports = function(env, argv){

    var APP_PATHS = config.APP_PATHS;
    var WEBPACK_CONFIG = config.WEBPACK_CONFIG;

    // soucemap (development:true, production:false)
    var is_sourcemap = WEBPACK_CONFIG[argv.mode].is_sourcemap;

    // css minimize, js minimize (development: false, production: true)
    var is_minimize = WEBPACK_CONFIG[argv.mode].is_minimize;

    // CSS内のurl()メソッドの取り込みの有無
    var is_css_url = WEBPACK_CONFIG.css_url_method;


    return {

        entry: {
            app: `${APP_PATHS.src.ts}/app.ts`,
        },

        output: {
            path: `${APP_PATHS.dest.js}`,
            filename: '[name].js'
        },

        module: {

            rules: [
            
                // js
                {
                    test: /\.js$/,
                    use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    '@babel/preset-env'
                                ]
                            }
                        }
                },

                // typescript
                {
                    test: /\.ts/,
                    exclude: /node_modules/,
                    use: 'ts-loader'
                },

                // CSS
                {
                    test: /\.css/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                url: is_css_url,
                                minimize: is_minimize,
                                sourceMap: is_sourcemap
                            }
                        }
                    ]
                },

                // Sass
                {
                    test: /\.scss/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                url: is_css_url,
                                importLoaders: 2,   // 0 => no loaders, 1 => postcss-loader, 2 => postcss-loader, sass-loader
                                minimize: is_minimize,
                                sourceMap: is_sourcemap
                            }                            
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: is_sourcemap
                            }
                        }
                    ]
                },

                // Image
                {
                    test: /\.(gif|png|jpg|eot|wof|woff|ttf|svg)$/,
                    loader: 'file-loader',
                    options: {
                        name: `${APP_PATHS.dest.img}/[name].[ext]`
                    }
                },

                // GLSL
                {
                    test: /\.(glsl|frag|vert)$/, 
                    loader: 'raw-loader', 
                    exclude: /node_modules/
                },
                {
                    test: /\.(glsl|frag|vert)$/,
                    loader: 'glslify-loader',
                    exclude: /node_modules/
                },
            ]
        },

        resolve: {
            extensions: ['.ts', '.js', '.json']
        },

        externals: {
        },

        optimization: {
            splitChunks: 
                WEBPACK_CONFIG.is_vendor_chunks
                    ? {
                        chunks: 'all',
                        cacheGroups: {
                            vendor: {
                                test: /node_modules/,
                                name: 'vendor',
                                chunks: 'initial',
                                enforce: true
                            }
                        }
                    }
                    : {},
            minimizer:
                is_minimize 
                    ? [
                        new TerserPlugin({
                            terserOptions: {
                                compress: {
                                    drop_console: true
                                },
                                output: {
                                    comments: WEBPACK_CONFIG.license
                                }
                            }
                        })
                    ]
                    : []
        },

        plugins: [
            new webpack.EnvironmentPlugin({
                NODE_ENV: argv.mode
            }),
            new webpack.LoaderOptionsPlugin({
                options: {
                    postcss: [
                        autoprefixer({browsers: WEBPACK_CONFIG.css_target})
                    ]
                }
            })
        ],

        performance: {
            hints: false
        }
    }
};

