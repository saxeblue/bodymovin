
var path = require('path');
var fs = require('fs');

var appDirectory = fs.realpathSync(process.cwd());

function resolveApp(relativePath){
    return path.resolve(appDirectory, relativePath);
}


var nodemodules = resolveApp(`node_modules`);


// DIRECTORY PATHS
module.exports.APP_PATHS = {
    
    src: {
        root: resolveApp(`src`),
        ts: resolveApp(`src/ts`),
        sass: resolveApp(`src/sass`),
        img: resolveApp(`src/img`),
        audio: resolveApp(`src/audio`),
    },
    dest: {
        root: resolveApp(`htdocs`),
        js: resolveApp(`htdocs/assets/js`),
        css: resolveApp(`htdocs/assets/css`),
        img: resolveApp(`htdocs/assets/img`),
        audio: resolveApp(`htdocs/assets/audio`),
        movie: resolveApp(`htdocs/assets/movie`),
    }
};


// Gulpの設定情報
// [svg設定]　http://megalodon.jp/2014-1209-1136-52/2ndidea.com/svg/optimize-svg-with-svgo/
module.exports.GULP_CONFIG = {

    // アセットの圧縮設定
    asset: {
        jpg: 80,
        png: [0.7, 0.85],
        png_compress_speed: 1,
        svg: {
            cleanupIDs: false,
            mergePath: false
        },
        audio: {
            bitrate: 64,
            channel: 2,    // 1: mono, 2: stereo
            format: 'howler',   // 'jukebox' or 'howler' or 'createjs'
        },
    }
};


// Webpackの設定情報
module.exports.WEBPACK_CONFIG = {

    // compressの際のライセンス
    license: /^\**!|@preserve|@license|@cc_on/,

    // ライブラリJSの外部ファイル化
    // trueにすると、importしているライブラリが外部Jsとして出力されます
    // (その他の共通モジュールも外部化する場合は、optimization.splitChunksに追記する)
    is_vendor_chunks: true,

    // AutoPrefixer
    // http://browserl.ist/?q=%3E+1%25%2C+last+3+versions%2C+ie+9%2C+ios+9%2C+android+4.4
    css_target: ['> 1%', 'last 3 versions', 'ie 9', 'ios 9', 'android 4.4'],

    // CSSのurl()メソッドの取り込みの有無
    css_url_method: false,

    // --mode development
    development: {
        is_sourcemap: true,
        is_minimize: false,
    },

    // --mode production
    production: {
        is_sourcemap: false,
        is_minimize: true,
    },
};

