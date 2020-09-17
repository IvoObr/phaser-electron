const path = require('path');

module.exports = {
    entry: { phaser: './src/Game.ts' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name]-bundle.js"
    },
    devtool: 'inline-source-map',
    devServer: { contentBase: './dist' },
    module: {
        rules: [
            {
                loader: 'ts-loader',
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                options: { transpileOnly: true }
            }, 
            { use: 'cache-loader' }
        ]
    },
    resolve: { extensions: ['.ts'] },
    externals: { fs: 'require("fs")' }
};
