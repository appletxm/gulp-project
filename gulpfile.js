var gulp = require('gulp'),
    connect = require('gulp-connect'),

    copy = require('gulp-copy'),
    browserify = require('gulp-browserify'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    util = require('gulp-util'),
    notify = require('gulp-notify'),

    argv = require('minimist')(process.argv.slice(2)),
    path = require('path'),
    fs = require('fs');

//【内部调用函数】控制台错误处理
function handleErrors () {
    var args = Array.prototype.slice.call(arguments);

    notify.onError({
        title : 'compile error',
        message : '<%=error.message %>'
    }).apply(this, args);//替换为当前对象

    this.emit();//提交
}

/*
 * 任务：将 less 编译成 css
 * */
gulp.task('less', function () {
    var stream = gulp.src('src/less/*.less')
        .pipe(less())
        .on("error", handleErrors)
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .on('error', handleErrors)
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'));

    return stream;
});

/*
 * 任务：concat 连接modules 下js文件
 * */
gulp.task('browserify', function () {
    var stream = gulp.src('src/js/biz/**/main.js')
        .pipe(browserify({
            insertGlobals : false,
            debug : false,
            baseUrl: 'src/js/biz/'
        }))
        .on('error', handleErrors)
        .pipe(rename(function (path) {
            path.basename = path.dirname;
            path.dirname = 'biz';
            path.extname = ".js";
        }))
        .on('error', handleErrors)
        .pipe(gulp.dest('dev/js/'));

    return stream;
});

/*
 * 任务：uglify 压缩 js
 * */
gulp.task('uglify', function () {
    var stream = gulp.src('dev/js/biz/*.js')
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .on("error", handleErrors)
        .pipe(gulp.dest('dist/js/biz/'));

    return stream;
});

/*
* 项目自有的一些合并及压缩操作
* */
gulp.task('uglifyTimepicker', function () {
    var stream = gulp.src('src/lib/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js')
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .on("error", handleErrors)
        .pipe(gulp.dest('src/lib/bootstrap-datetimepicker/js/'));

    return stream;
});
gulp.task('jqGrid', function () {
    var stream = gulp.src('src/lib/jqGrid/src/jquery.jqGrid.js')
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .on("error", handleErrors)
        .pipe(gulp.dest('src/lib/jqGrid/src/'));

    return stream;
});
gulp.task('concatACEcss', function () {
    var stream = gulp.src([
            'src/lib/ace/css/ace.min.css',
            'src/lib/ace/css/ace-skins.min.css',
            'src/lib/ace/css/ace-rtl.min.css',
            'src/lib/ace/css/ace-fonts.css',
            'src/lib/ace/css/ace-part2.min.css',
            'src/lib/ace/css/ace/css/ace-ie.min.css'
        ])
        .pipe(concat('ace.mixing.min.css'))
        .on("error", handleErrors)
        .pipe(gulp.dest('src/lib/ace/css/'));
    return stream;
});

/*
 * 任务：dist 任务的子任务，用来复制必要文件到 dist 目录
 * */
gulp.task('copy', function () {
    var stream = gulp.src(['src/img/**/*', 'src/lib/**/*', 'src/font/**/*', 'src/data/**/*'])
        .pipe(copy('dist', {
            prefix : 1
        }));

    return stream;
});

/*
 * 任务：clean 清除生存的文件
 * */
gulp.task('clean', function(){
    var stream = gulp.src(['dev/**/*', 'dist/**/*'])
        .pipe(clean())
        .on("error", handleErrors);

    return stream;
});

/*
 * 任务：dist 构建
 * */
gulp.task('dist', function () {
    gulp.start('browserify', 'uglify', 'less', 'copy');
});

//使用connect启动一个Web服务器
gulp.task('connect', function () {
    connect.server({
        root: './',
        host: 'localhost',
        port: 9000,
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('src/**/*.html').pipe(connect.reload());
});

gulp.task('watch:js', function () {
    gulp.watch(['src/js/**/*.js'], function(event){
        console.log('File ' + event.path + ' was ' + event.type + ', running uglify tasks...');
        gulp.start('browserify', 'uglify');
    });
});

gulp.task('watch:less', function () {
    gulp.watch('src/less/**/*.less', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running less tasks...');
        gulp.start('less');
    });
});

//创建watch任务去检测html文件,其定义了当html改动之后，去调用一个Gulp的Task
gulp.task('watch:html', function () {
    gulp.watch(['src/**/*.html'], function(event){
        console.log('File '+event.path+' was '+event.type+', running html tasks...');
        gulp.start('html');
    });
});

gulp.task('watch', function () {
    gulp.start('watch:js', 'watch:less', 'watch:html');
});

/*
 * 任务：自定义任务
 * 描述：可根据自己需要自定义常用任务
 * */
gulp.task('default', function () {
    gulp.start('dist', ['connect', 'watch']);
});


