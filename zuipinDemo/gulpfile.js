//1.引入gulp对象
const gulp = require("gulp");
//2.用gulp发布任务
/* 
    第一个参数：是任务的名字
    第二个参数：是回调函数

    执行任务：需要在控制台  gulp加任务名执行
*/
//拷贝html
gulp.task("copy-html",function(){
    return gulp.src("index.html")
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload());
})
gulp.task("copy-htmlall",function(){
    return gulp.src("htmlsheet/*.html")
    .pipe(gulp.dest("dist/html"))
    .pipe(connect.reload());
})



//拷贝图片
gulp.task("images",function(){
    // return gulp.src("img/*.{jpg,png}").pipe(gulp.dest('dist/images'));
    return gulp.src(["*.{jpg,png,gif}","images/*.{jpg,png,gif}"])
    .pipe(gulp.dest('dist/images'))
    .pipe(connect.reload());
})
//拷贝。js文件  用了jquery禁止压缩
gulp.task("scripts",function(){
    return gulp.src(["*.js","!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
})
//拷贝数据
gulp.task("data",function(){
    return gulp.src(["*.json","!package.json"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload());
})
//以上diamante都是用来处理静态资源的
gulp.task("build",["copy-htmlall","copy-html","images","scripts","data","sass","sass1","denglu","zhuce","liebiao","xiangqing","shopping"],function(){
    console.log("项目建立成功");
})

//编译scss文件  gulp-sass 用来编译的  gulp-minify-css 用来压缩的   gulp-rename重命名的
const sass = require("gulp-sass");
const minifyCSS = require("gulp-minify-css");
const rename = require("gulp-rename");
gulp.task("sass",function(){
    return gulp.src("stylesheet/index.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());

})
gulp.task("sass1",function(){
    return gulp.src("stylesheet/reset.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("reset.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("denglu",function(){
    return gulp.src("stylesheet/denglu.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("denglu.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("zhuce",function(){
    return gulp.src("stylesheet/zhuce.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("zhuce.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("liebiao",function(){
    return gulp.src("stylesheet/liebiao.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("liebiao.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("xiangqing",function(){
    return gulp.src("stylesheet/xiangqing.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("xiangqing.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("shopping",function(){
    return gulp.src("stylesheet/shopping.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("shopping.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})

//监听
gulp.task("watch",function(){
    gulp.watch("index.html",["copy-html"]);
    gulp.watch("htmlsheet/*.html",["copy-htmlall"]);

    gulp.watch(["*.{jpg,png,gif}","images/*.{jpg,png,gif}"],['images']);
    gulp.watch(["*.js","!gulpfile.js"],['scripts']);
    gulp.watch(["*.json","!package.json"],['data']);
    gulp.watch("stylesheet/index.scss",["sass"]);
    gulp.watch("stylesheet/reset.scss",["sass1"]);
    gulp.watch("stylesheet/denglu.scss",["denglu"]);
    gulp.watch("stylesheet/zhuce.scss",["zhuce"]);
    gulp.watch("stylesheet/zhuce.scss",["liebiao"]);
    gulp.watch("stylesheet/liebiao.scss",["liebiao"]);
    gulp.watch("stylesheet/xiangqing.scss",["xiangqing"]);
    gulp.watch("stylesheet/shopping.scss",["shopping"]);
})

//服务器
const connect = require("gulp-connect");
gulp.task("server",function(){
    connect.server({
        root:"dist",//根目录
        port:9595,
        livereload:true
    })
})

//同时启动watch和server
gulp.task("default",["watch","server"]);
