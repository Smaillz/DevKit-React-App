const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');

// настройки для HtmlWebpackPlugin
const htmlConfig = {
    title: 'Devkit App',
    favicon: './public/favicon.ico',
    template: './public/index.html',
};

// базовые настройки конфига webpack
const webpackConfig = {
    // тип окружения
    mode: 'development',
    // точка входа приложения
    entry: {
        app: path.resolve(__dirname, 'index.tsx')
    },
    // настройки для результирующего js бандла и все что к нему прилагается(css,image,...)
    output: {
        filename: 'static/js/[hash]-[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    resolve: {
        // позволяет при импортах опускать расширения файлов, указанные в массиве
        extensions: [".ts", ".tsx", ".js", ".jsx", ".scss"],
        // позволяет создавать псевдонимы для нужных библиотек и модулей
        // а так же настраиваются сокращения при импортах к указанным директориям
        alias: {
            react: path.resolve(path.join(__dirname, './node_modules/react')),
            'babel-core': path.resolve(
                path.join(__dirname, './node_modules/@babel/core')
            ),
            // объявление ресурсных модулей(так же надо объявить его в tsconfig)
            // первые 2 можно использовать в путях к ресурсам добавляя ~ (напр: ~@resources)
            "@resources": path.join(__dirname, './resources/'),
            "@resources": path.join(__dirname, './resources'),
            "@models": path.join(__dirname, './src/Models'),
            "@consts": path.join(__dirname, './src/Constants'),
            "@actions": path.join(__dirname, './src/Actions/'),
            "@thunk": path.join(__dirname, './src/Thunk/'),
            "@containers": path.join(__dirname, './src/Containers/'),
            "@components": path.join(__dirname, './src/Components/'),
            "@utils": path.join(__dirname, './src/Utils')
        }
    },
    // вкл source-map-ы для отображение исходников в браузере
    devtool: "source-map",
    // загрузчики для различных типов файлов
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: [
                'awesome-typescript-loader',
                // необходимо для react-hot-loader и сборки финально бандла в es5 
                // включен в dev mode, не должен попадать в продакшн сборку
                {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            '@babel/plugin-syntax-typescript',
                            '@babel/plugin-syntax-decorators',
                            '@babel/plugin-syntax-jsx',
                            'react-hot-loader/babel',
                        ]
                    }
                }
            ]
        }, {
            test: /\.s(a|c)ss$/,
            use: [
                'style-loader',
                'css-loader',
                'stylus-loader'
            ]
        }, {
            test: /\.(svg|png|jpg|gif|jpeg)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    outputPath: 'static/images'
                }
            }]
        }, {
            test: /\.(eot|ttf|woff|woff2)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    outputPath: 'static/fonts'
                }
            }]
        }, {
            // генерирует source-map-ы для результирующих js/css файлов
            test: /\.js$/,
            use: ["source-map-loader"],
            enforce: "pre"
        }]
    },
    // настройки dev сервера для dev режима
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        index: 'index.html',
        compress: true,
        // флаг для hot-loading (необходимо добавить плагин webpack.HotModuleReplacementPlugin)
        // для того чтобы не прописывать флаг в скрипте "--hot"
        hot: true,
        // host на котором запущен dev-сервер
        host: "localhost",
        // порт на котором запущен dev-сервер
        port: 3000,
        // TODO для роутинга (надо почитать)
        historyApiFallback: true,
        // publicPath: '/'
    },
    plugins: [
        // плагин для hot-loading
        new webpack.HotModuleReplacementPlugin(),
        // отвечает за генерацию результирующего index.html в /dist
        new HtmlWebpackPlugin(htmlConfig),
        // добавляет манифет о всех ресурсах, используемых в сборке
        new ManifestPlugin(),
        // нужен для react-hot-loader 
        new webpack.NamedModulesPlugin(),
        // добаляет глобальные переменные, необходим для определения типа окружения(production|development)
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        // плагин позволяющий в виде lodash templates встраивать переменные в результирующий index.html
        new InterpolateHtmlPlugin({
            'ENV_MODE': '(DEV)',
            'PUBLIC_URL': '/'
        })
    ]
};

module.exports = (env) => {
    console.log(`Application run in ${env.NODE_ENV.toUpperCase()} mode`);

    return webpackConfig;
}