---
title: 'Útiles plugins para gulp'
date: 2014-12-12T00:30:42-0600
tags:
    - development
    - gulpjs
---

Cada día amo un poco más usar [gulp](http://gulpjs.com/). Poder automatizar un gran rango de tareas a un solo comando en la consola simplifica mucho el desarrollo. Aquí dejo una lista de plugins que estoy usando en casi todo proyecto:

[gulp-load-plugins](https://www.npmjs.com/package/gulp-load-plugins)

En lugar de tener que estar cargando cada plugin a mano, este se encarga de hacerlo automáticamente.

```javascript
var plugins = require('gulp-load-plugins')();

gulp.task('js', function() {
    gulp.src('file.js')
        .pipe(plugins.uglify())
        .pipe(gulp.dest('file.min.js'));
});
```

[gulp-uglify](https://www.npmjs.com/package/gulp-uglify)

Minifica javascript para tener un código más ligero para ponerlo en producción.

[gulp-sass](https://www.npmjs.com/package/gulp-sass) / [gulp-less](https://www.npmjs.com/package/gulp-less)

Los nombres lo dicen, ¿no? Compila [Less](http://lesscss.org/) o [Sass](http://sass-lang.com/) al CSS de todos los días.

[gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)

Deja de escribir a mano los prefijos para estilos en distintos navegadores, tampoco uses mixins de sass o less. ¡Mejor aplica [Autoprefixer](https://github.com/postcss/autoprefixer-core) a tu CSS y olvídate de problemas!

```javascript
gulp.task('css', function() {
    gulp.src('file.css')
        .pipe(
            plugins.autoprefixer({
                browsers: ['last 3 versions', '> 1%', 'ie >= 8'],
                cascade: false,
            }),
        )
        .pipe(gulp.dest('file.build.css'));
});
```

[gulp-combine-media-queries](https://www.npmjs.com/package/gulp-combine-media-queries)

No me gusta tener muchos @media en mi archivo CSS final, una manía. El otro día encontré este plugin que nos junta los media queries que tengamos y que se repitan. Pase de 81 @media a solamente 11. Un poco menos de peso :D

[gulp-csso](https://www.npmjs.com/package/gulp-csso)

Minifica CSS de una forma un poco diferente a otros plugins. Ver [CSSO](http://bem.info/tools/optimizers/csso/description/) para mas información.

[gulp-if](https://www.npmjs.com/package/gulp-if)

Simple condiciones para decidir que tareas realizar en base a variables.

```javascript
.pipe( plugins.if(production, plugins.csso()) )
```

[gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)

Nos permite generar [sourcemaps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/) en base a los archivos fuente, sin importar el procesado (compilar, autoprefixer, minificar, etc) que hagamos. Útil para debug.

[gulp-concat](https://www.npmjs.com/package/gulp-concat)

Para juntar varios archivos en uno mismo. ¡Menos peticiones al servidor!

[gulp-watch](https://www.npmjs.com/package/gulp-watch)

Se queda observando cambios a nuestros archivos para compilarlos de nuevo de forma automática.

Al final, un ejemplo de mi gulpfile.js podría ser algo así:

```javascript
var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    production = plugins.util.env._[0] === 'build';

var paths = {
    css: {
        src: ['./src/less/**.*'],
        dist: './assets/css/',
    },
    js: {
        src: ['./src/js/**.*'],
        dist: './assets/js/',
    },
};

gulp.task('css', function() {
    gulp.src(paths.css.src)
        .pipe(plugins.if(!production, plugins.sourcemaps.init()))
        .pipe(plugins.less())
        .pipe(
            plugins.autoprefixer({
                browsers: ['last 3 versions', '> 1%', 'ie >= 8'],
                cascade: false,
            }),
        )
        .pipe(plugins.combineMediaQueries({ log: false }))
        .pipe(plugins.concat('style.css'))
        .pipe(plugins.if(production, plugins.csso()))
        .pipe(plugins.if(!production, plugins.sourcemaps.write()))
        .pipe(gulp.dest(paths.css.dist))
        .on('error', plugins.util.log);
});

gulp.task('js', function() {
    gulp.src(paths.js.src)
        .pipe(plugins.if(!production, plugins.sourcemaps.init()))
        .pipe(plugins.concat('app.js'))
        .pipe(plugins.if(production, plugins.uglify()))
        .pipe(plugins.if(!production, plugins.sourcemaps.write()))
        .pipe(gulp.dest(paths.js.dist))
        .on('error', plugins.util.log);
});

gulp.task('watch', function() {
    gulp.watch(paths.css.src, ['css']);
    gulp.watch(paths.js.src, ['js']);
});

gulp.task('build', ['css', 'js']);

gulp.task('default', ['build', 'watch']);
```
