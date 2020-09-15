---
title: 'Usar Font Awesome con Grunt'
date: 2013-12-28T00:34:58-0600
tags:
    - development
    - bower
    - grunt
    - javascript
    - laravel
    - php
---

Parte de lo que ando haciendo últimamente con [Laravel](http://laravel.com/) incluye el manejo de assets, y aunque hay algunos paquetes para el manejo de estos dentro de Laravel, la mejor opción parece ser usar [Bower](http://bower.io/) y [Grunt](http://gruntjs.com/), y la verdad es una maravilla.

En el proyecto con el que ando trabajando quiero usar [Font Awesome](http://fontawesome.io/) para aprovechar la variedad de iconos que trae, y para eso necesitamos tanto el CSS (o SCSS en mi caso) como las fuentes que trae.

Primero que nada es instalar los assets con Bower, nuestro `.bowerrc` es:

```json
{
    "directory": "./app/assets/bower"
}
```

Y el `bower.json`:

```json
{
    "name": "App Name",
    "version": "0.0.1",
    "dependencies": {
        "foundation": "~5.0.2",
        "Font-Awesome": "~4.0.3"
    }
}
```

Con esto corremos un `bower install` y esperamos que descargue los componentes. Para compilar el SCSS usamos el modulo [grub-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass) con la siguiente configuración:

```javascript
sass: {
    dev: {
        options: {
            style: 'expanded',
            compass: true
        },
        files: {
            'public/css/app.css': 'app/assets/scss/app.scss'
        }
    },
    dist: {
        options: {
            style: 'compressed',
            compass: true
        },
        files: {
            'public/css/app.css': 'app/assets/scss/app.scss'
        }
    }
},
```

En la pagina del plugin de grunt explica la configuración, pero básicamente le decimos que nos compile el archivo app.scss en app.css, y dependiendo del ambiente en que queramos, si lo compila expandido (para desarrollo) o minificado (para producción). La opcion de `compass: true` es debido a que estoy usando [Foundation](http://foundation.zurb.com/) y con esto nos lee el archivo config.rb de [Compass](http://compass-style.org/).

Dentro de mi app.scss solamente importo el SCSS de Font Awesome y listo, tenemos el CSS. ¿Y que pasa con las fuentes? Para esto uso el plugin [grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy), el cual como su nombre lo dice nos sirve para solamente copiar archivos. La configuración vendría siendo algo como esto:

```javascript
copy: {
    main: {
        cwd: 'app/assets/bower/Font-Awesome/fonts',
        src: '**',
        dest: 'public/fonts',
        expand: true,
        flatten: true,
        filter: 'isFile'
    }
},
```

¡Y listo! Con esto nos copia todos los archivos de la carpeta `Font-Awesome/fonts` a `public/fonts` que es la ruta por default que usa el CSS de Font Awesome (considerando que nuestro css default esta en `public/css/app.css`).

Espero les ayude :)
