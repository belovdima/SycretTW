const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, "../src/index.js"),
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "bundle.js",
        clean: true,
    },
    mode: "development",
    devServer: {
        static: {
            directory: path.resolve(__dirname, "../public"), // Доступ к файлам из public/
        },
        hot: true,
        port: 8080,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../src/index.html"),
        }),
    ],
    resolve: {
        extensions: [".js", ".jsx"],
    },
};
