var gulp = require('gulp');
var minimist = require('minimist');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var chached = require('gulp-cached');

var imagemin = require('gulp-imagemin');
var gifsicle = require('imagemin-gifsicle');
var mozjpeg = require('imagemin-mozjpeg');
var pngquant = require('imagemin-pngquant');
var svgo = require('imagemin-svgo');

var audiosprite = require('gulp-audiosprite');

var appConfig = require('./config/app_config');
var APP_PATHS = appConfig.APP_PATHS;
var GULP_CONFIG = appConfig.GULP_CONFIG;




/**
 * [ minimistでコマンドライン引数をパース ]
 * gulp 任意のタスク --変数名 値
 * (argv[変数名]!=undefined) ? argv[変数名] : デフォルト値;
 */
var argv = minimist(process.argv.slice(2));


/* 
 * [ エラー通知 ] 
 */
function plumberWithNotify(){
    return plumber({errorHandler: notify.onError("<%= error.message %>")});
};



/** 
 * [ IMAGE 圧縮 ]
 * mozjpegのインストールが必須となります。
 * (nodebrewを使用したインストール例)
 * brew install automake autoconf libtool dpkg pkgconfig nasm libpng
 */
gulp.task('mskImagemin-gif', function(){
    const glob = APP_PATHS.src.img + '/**/*.gif';
    const destDir = APP_PATHS.dest.img;
    
    return gulp.src(glob)
        .pipe(chached(glob))
        .pipe(plumberWithNotify())
        .pipe(imagemin([
            gifsicle({interlaced:true})
        ]))
        .pipe(gulp.dest(destDir));
});
gulp.task('mskImagemin-jpg', function(){
    const glob = APP_PATHS.src.img + '/**/*.{jpg,jpeg}';
    const destDir = APP_PATHS.dest.img;
    
    return gulp.src(glob)
        .pipe(chached(glob))
        .pipe(plumberWithNotify())
        .pipe(imagemin([
            mozjpeg({quality:GULP_CONFIG.asset.jpg, progressive: true})
        ]))
        .pipe(gulp.dest(destDir));
});
gulp.task('mskImagemin-png', function(){
    const glob = APP_PATHS.src.img + '/**/*.png';
    const destDir = APP_PATHS.dest.img;
    
    return gulp.src(glob)
        .pipe(chached(glob))
        .pipe(plumberWithNotify())
        .pipe(imagemin([
            pngquant({quality: GULP_CONFIG.asset.png, speed: GULP_CONFIG.asset.png_compress_speed})
        ]))
        .pipe(imagemin())   // ガンマ情報を除去
        .pipe(gulp.dest(destDir));
});
gulp.task('mskImagemin-svgo', function(){
    const glob = APP_PATHS.src.img + '/**/*.svg';
    const destDir = APP_PATHS.dest.img;
    
    return gulp.src(glob)
        .pipe(chached(glob))
        .pipe(plumberWithNotify())
        .pipe(imagemin([
            svgo({
                plugins: [
                    GULP_CONFIG.asset.svg
                ]
            })
        ]))
        .pipe(gulp.dest(destDir));
});
gulp.task('mskImagemin', gulp.parallel('mskImagemin-gif', 'mskImagemin-jpg', 'mskImagemin-png', 'mskImagemin-svgo'));



/**
 * [ オーディオスプライトの結合 ]
 * ffmpegが必要となります。
 * (nodebrewを使用したインストール例)
 * brew install ffmpeg
 * 
 * @example howler.js
 * const HOWL_DATA = {
 *    src: ['audio.ogg', 'audio.m4a', 'audio.mp3', 'audio.ac3'],
 *    sprite: {'lightsaber': [0, 1071], 'theme': [5000, 94302, true]}
 * };
 * const howl = new Howl(HOWL_DATA);
 * 
 * HOWL_DATAの内容は書き出されるJSONのものです
 * ループする際にはspriteの該当データの第3引数をtrueにする
 */
gulp.task('mskAudioSprite', function(){
    const glob = APP_PATHS.src.audio + '/*.mp3';
    const destDir = APP_PATHS.dest.audio;
    const config = GULP_CONFIG.asset.audio;

    return gulp.src(glob)
        .pipe(plumberWithNotify())
        .pipe(audiosprite({

            // 出力ファイル名
            output: 'audio',

            // ビットレート
            bitrate: config.bitrate,

            // JSONの出力タイプ(対応形式： jukebox、howler、createjs)
            // howlerの場合、'urls'という記述を'src'に変更する必要あり。
            format: config.format,

            // 1: mono, 2: stereo
            channels: config.channel,

            // JSONに書かれるパス
            path: './audio'
        }))
        .pipe(gulp.dest(destDir));
});
