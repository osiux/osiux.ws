---
title: 'Wordpress, Bootstrap 3 e IE8'
date: 2014-12-11T01:54:00-0600
tags:
    - development
    - bootstrap
    - ie8
    - respondjs
    - wordpress
---

Que horrible es desarrollar para Internet Explorer, sobretodo si es una versión tan vieja como la 8. Pero según los estudios de algunos clientes se sigue usando, así que por el mínimo porcentaje (que odio con toda mi alma) de gente que lo usa, hay que tenerlo en cuenta.

Resulta que hicimos un sitio de [WordPress](https://wordpress.org/) usando [Bootstrap](http://getbootstrap.com/), lo cual facilita muchísimo el desarrollo de sitios responsivos. Como se acerca la entrega, tocó el turno de revisar como se ve en IE8, y... ¡casi muero de un infarto! Todo se veía fuera de lugar, las columnas no las respetaba, elementos por todos lados.. en fin, un caos. Buscando, vi que Bootstrap por default [si soporta IE8](http://getbootstrap.com/getting-started/#support-ie8-ie9) usando ciertos scripts:

```html
<head>
    ... snippet ...
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    ... snippet ...
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    ... snippet ...
</head>
```

Esto lo podía ver en el código fuente, por lo que no entendía porque nada funcionaba. Pero entonces llegó la iluminación:

Resulta que usando WordPress, tenemos la función [wp_head](http://codex.wordpress.org/Function_Reference/wp_head) que suele usarse en la etiqueta &lt;head&gt; para agregar estilos (entre ellos style.css, el estilo principal del theme), scripts, etc. El problema era que el &#34;genio&#34; de yo tenía puesto el código anterior de soporte para IE8 **ANTES** del wp_head(), por lo que el estilo se cargaba después y los scripts no hacían nada. Fue cuestión de cambiarlos de orden y ¡magia!, prácticamente todo se veía bien :D

Lo escribo para que no se me olvide en el futuro, aunque sinceramente espero no tener que hacer mas cosas para IE8.
