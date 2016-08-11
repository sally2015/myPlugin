var gulp        = require('gulp');
var fs          = require('fs');
var rollup      = require('rollup').rollup;
var commonjs    = require('rollup-plugin-commonjs');
var nodeResolve = require('rollup-plugin-node-resolve');

gulp.task('script', function () {
    return rollup({
        entry: 'src/JQ.js',
        plugins: [
            nodeResolve({ jsnext: true }),
            commonjs()
        ]
    }).then(function (bundle) {
        // 输出 bundle + sourcemap
        var result = bundle.generate({
            // output format - 'amd', 'cjs', 'es6', 'iife', 'umd'
            // amd – 使用像requirejs一样的银木块定义
            // cjs – CommonJS，适用于node和browserify / Webpack
            // es6 (default) – 保持ES6的格式
            // iife – 使用于<script> 标签引用的方式
            // umd – 适用于CommonJs和AMD风格通用模式
            format: 'cjs'
        });

        fs.writeFileSync( 'bundle.js', result.code );

        bundle.write({
            format: 'cjs',
            dest: 'rel/JQ.js'
        });
    });
});