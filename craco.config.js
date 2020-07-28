craco.config.js

const path = require('path');

const iconset = {
    bimi: 'IMIIcons',
    bimi_dev_user: 'IMIIcons',
    bimi_agile: 'IMIIcons',
    bimi_agile_dev_user: 'IMIIcons',
    newb2b: 'MWDefaultIcons',
    marketwall: 'MWDefaultIcons',
    marketwall_dev_user: 'MWDefaultIcons',
    tv: 'MWDefaultIcons',
};

const routingTypes = {
    bimi: 'hashAPI',
    bimi_dev_user: 'hashAPI',
    bimi_agile: 'hashAPI',
    bimi_agile_dev_user: 'hashAPI',
    newb2b: 'html5API',
    marketwall: 'html5API',
    marketwall_dev_user: 'html5API',
    tv: 'html5API',
};

const storeTypes = {
    bimi: 'emptyStore',
    bimi_dev_user: 'emptyStore',
    bimi_agile: 'emptyStore',
    bimi_agile_dev_user: 'emptyStore',
    newb2b: 'b2b',
    marketwall: 'emptyStore',
    marketwall_dev_user: 'emptyStore',
    tv: 'emptyStore',
};

const menuLocationTypes = {
    bimi: 'MenuToLocationConnector',
    bimi_dev_user: 'MenuToLocationConnector',
    bimi_agile: 'MenuToLocationConnector',
    bimi_agile_dev_user: 'MenuToLocationConnector',
    newb2b: 'MenuToLocationConnectorNewRouting',
    marketwall: 'MenuToLocationConnectorNewRouting',
    marketwall_dev_user: 'MenuToLocationConnectorNewRouting',
    tv: 'MenuToLocationConnectorNewRouting',
};

module.exports = function () {
    return {
        webpack: {
            alias: {
                // store: path.join(__dirname, 'src', 'redux', storeTypes[process.env.APPLICATION_TYPE], 'store'),
                // configurations: path.join(__dirname, 'src', 'globalConfig', 'applicationTypes', process.env.APPLICATION_TYPE, 'index'),
                // routing: path.join(__dirname, 'src', 'providers', 'routingProvider', routingTypes[process.env.APPLICATION_TYPE]),
                // 'menu-to-location-connector': path.join(__dirname, 'src', 'components', 'organisms', 'Menu', 'dojo', menuLocationTypes[process.env.APPLICATION_TYPE]),
                // icons: path.join(__dirname, 'src', 'components', 'organisms', 'MWIcon', 'iconset', iconset[process.env.APPLICATION_TYPE])
            },
            configure: (webpackConfig) => {
                // !!! DANGER !!!
                // If webpack config of create-react-app will change - this config may fail!
                // it assumes that in webpackConfig.module.rules[3].oneOf are listed
                // all the rules, and it adds specific procession for svg files, similar
                // to the one in webpack.config.js
                const rulesArray = webpackConfig.module.rules[3].oneOf;
                rulesArray.unshift({
                    test: /\.react\.svg$/,
                    use: [
                        {
                            loader: '@svgr/webpack',
                            options: {
                                svgoConfig: {
                                    plugins: {
                                        prefixIds: false,
                                    },
                                },
                            },
                        },
                    ],
                });
                rulesArray.unshift({
                    test: /\.svg$/,
                    exclude: /\.react\.svg$/,
                    use: [
                        {
                            loader: 'svg-url-loader',
                            options: {
                                limit: 10000,
                                name: 'static/media/[name].[hash:8].[ext]',
                            },
                        },
                    ],
                });
                rulesArray[rulesArray.length - 1].exclude.push(/\.svg$/);
                // END OF RULES MODIFICATION

                return webpackConfig;
            }
        },
    };
};
