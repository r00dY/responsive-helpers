const path = require("path");
const jsonImporter = require("node-sass-json-importer");

module.exports = {
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            importer: jsonImporter()
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                loader: "svg-inline-loader",
                options: {
                    removeSVGTagAttrs: false
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            },
            // crc library is not well-transpiled and uses default parameters (which don't work on IE), it's loaded by imgix-core
            {
                test: /\.js$/,
                include: /node_modules\/crc/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"]
                }
            }
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loader: "eslint-loader",
            //     options: {
            //         // eslint options (if necessary)
            //     }
            // }
        ]
    }
};
