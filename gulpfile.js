var gulp      = require("gulp");
var uglify    = require("gulp-uglify");
var minifyCSS = require("gulp-minify-css");
var rename    = require("gulp-rename");
var pump      = require("pump");

var package = require("./package");

var version = package.version;
var paths = {
   js: ["src/js/*"],
   css: ["src/css/*"]
};

//js代码混淆压缩
gulp.task("js", function (cb) {
    var option = {
        mangle: true,
        compress: true
    };

    pump([
            gulp.src(paths.js),
            uglify(option),
            rename({
                suffix: "-" + version,
                extname: ".min.js"
            }),
            gulp.dest("bin")
        ],
        cb
    );
});

//css代码压缩
gulp.task("css", function (cb) {
    var option = {
        mangle: true,
        compress: true
    };

    pump([
            gulp.src(paths.css),
            minifyCSS(),
            rename({
                suffix: "-" + version,
                extname: ".min.css"
            }),
            gulp.dest("bin")
        ],
        cb
    );
});

gulp.task("publish", ["js", "css"], function () {});

