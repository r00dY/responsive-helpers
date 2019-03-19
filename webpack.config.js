const path = require("path");

module.exports = {
    entry: {
        bundle: "./index.js"
    },
    output: {
        libraryTarget: "umd",
        library: "responsive-helpers",
        filename: "[name].js",
        path: path.resolve(__dirname, "./dist/"),
        globalObject: `typeof self !== 'undefined' ? self : this`
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/react", "@babel/env"]
                }
            }
        ]
    }
};
