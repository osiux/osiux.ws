---
title: 'gulp.js y sus tareas'
date: 2014-03-04T20:58:15-0600
tags:
    - development
    - grunt
    - gulpjs
    - javascript
---

Hace poco les hable de como integrar [Grunt con Font Awesome](/2013-12-28--usar-font-awesome-con-grunt/), y desde entonces me tope con [gulp.js](http://gulpjs.com/), que hace lo mismo que [Grunt](http://gruntjs.com/) pero mas rápido y sencillo :D Integrándolo en un proyecto para probarlo me tope con un dilema. Hay ciertas tareas que solamente quiero correr cuando estoy desarrollando y otras cuando estoy preparando para subir a producción. En grunt lo hacia usando distintas tareas con diferentes opciones cada una:

```javascript
grunt.initConfig({
    sass: {
        dev: {
            options: {
                style: 'expanded',
                banner: '<%= tag.banner %>',
            },
            files: {
                '<%= project.publicPath %>/app.css': '<%= project.css %>',
            },
        },
        dist: {
            options: {
                style: 'compressed',
            },
            files: {
                '<%= project.publicPath %>/app.css': '<%= project.css %>',
            },
        },
    },

    watch: {
        /* */
    },
});

grunt.registerTask('default', ['sass:dev', 'watch']);

grunt.registerTask('build', ['sass:dist']);
```

De este modo tenemos un CSS comprimido (`grunt build`) listo para subir al servidor, y cuando estas desarrollando (`grunt`), el CSS sin comprimir y ademas se queda vigilando por cualquier cambio que se haga para volver a compilarlo. Con gulp podemos conseguir algo similar usando [gulp-if](https://github.com/robrich/gulp-if):

```javascript
var isProduction = gutil.env.type === 'production';

gulp.task('css', function() {
    gulp.src(paths.css.src)
        .pipe(sass({ style: 'expanded' }))
        .pipe(gulpif(isProduction, csso()))
        .pipe(gulp.dest(paths.css.dist))
        .on('error', gutil.log);
});

gulp.task('watch', function() {
    /* */
});

gulp.task('build', ['css']);

gulp.task('default', ['build', 'watch']);
```

Es bastante sencillo. Toma de parámetro una condición y una tarea a correr y solamente hay que pasarle un parámetro a la hora de llamarlo: `gulp build --type production`. No está mal, pero si la tarea **build** es la única que corro cuando quiero preparar el código para producción, encontre un modo mas sencillo:

`var isProduction = gutil.env._[0] === 'build';`

¡Y listo! Con solo eso, me basta correr `gulp` o `gulp build` para diferenciar cuando es desarrollo y producción, sin parámetros extra. Al final queda algo similar a esto:

```javascript
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    gulpif = require('gulp-if'),
    csso = require('gulp-csso'),
    gutil = require('gulp-util');

var isProduction = gutil.env._[0] === 'build';

gulp.task('css', function() {
    gulp.src(paths.css.src)
        .pipe(sass({ style: 'expanded' }))
        .pipe(gulpif(isProduction, csso()))
        .pipe(gulp.dest(paths.css.dist))
        .on('error', gutil.log);
});

gulp.task('watch', function() {
    gulp.watch(paths.css.src, ['css']);
});

gulp.task('build', ['css']);

gulp.task('default', ['build', 'watch']);
```

Espero les sirva :)
