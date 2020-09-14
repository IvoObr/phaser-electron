const path = require('path');

module.exports = {
    entry: {
        phaser: './src/Game.ts',
        // electron: './src/Electron.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name]-bundle.js"
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    // target: 'electron-renderer',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    externals: {
        fs: 'require("fs")'
    }
};
