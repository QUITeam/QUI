
module.exports = function(grunt) {
    // 自动加载 grunt 任务
    require('load-grunt-tasks')(grunt);

    // 统计 grunt 任务耗时
    require('time-grunt')(grunt);

    // 配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        autoprefixer: {
            options: {
                diff: false,
                browsers: ['last 2 versions','ios 5','android 2.3']
            },

            // prefix all files
            multiple_files: {
                expand: true,
                cwd: '<%=pkg.version%>',
                src: ['css/*.css', 'css/**/*.css'],
                dest: '<%=pkg.version%>'
            }
        },
        sass: {
            main: {
                expand: true,
                flatten: true,
                cwd: '<%=pkg.version%>/sass',
                src: ['*.scss'],
                dest: '<%=pkg.version%>/css/',
                ext: '.css',
                "sourcemap=true": ''
            }
            
        },
        cssmin: {
            main: {
                expand: true,
                cwd: '<%=pkg.version%>/css/',
                src: ['*.css'],
                dest: '<%=pkg.version%>/css/'
            }
        },
        includereplace: {
            html: {
                expand: true,
                cwd: '<%=pkg.version%>/demo/src',
                src: ['*.html'],
                dest: '<%=pkg.version%>/demo/'

            }
        },
        watch: {
            demo: {
                files: [
                    '<%=pkg.version%>/demo/**/*.html'
                ],
                tasks: ['includereplace']
            },
            css: {
                files: [
                    '<%=pkg.version%>/sass/**/*.scss'
                ],
                tasks: ['sass', 'cssmin']
            }
        },
        // 开启服务器
        connect: {
            options: {
                port: 9000,
                hostname: '127.0.0.1',  //默认就是这个值，可配置为本机某个 IP，localhost 或域名
                //hostname: '10.70.89.87',  //默认就是这个值，可配置为本机某个 IP，localhost 或域名
                livereload: 35729       //声明给 watch 监听的端口
            },
            server: {
                options: {
                    open: true, //自动打开网页 http://
                    base: [
                        '<%=pkg.version%>/' //主目录
                    ]
                }
            }
        }
    });
    grunt.registerTask('server', [
        'connect:server',
        'watch'
    ]);
    // 默认任务
    grunt.registerTask('default', [
        'sass',
        'autoprefixer',
        'cssmin',
        'includereplace',
        'server'
    ]);
    // 根据 docs 的代码片段生成 demo 到 demo/*.html
    grunt.registerTask('demo', ['includereplace']);
};
