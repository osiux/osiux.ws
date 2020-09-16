---
title: 'Filtro de palabras en PHP'
date: 2008-04-29T06:29:24-0500
tags:
    - regular-expressions
    - php
    - development
---

A raíz de un tema que vi en un foro, se me ocurrió hacer una pequeña función en PHP para censurar ciertas palabras en un texto. En realidad es bastante simple lo que hace, y gracias al poder de las [expresiones regulares](http://es.wikipedia.org/wiki/Expresi%C3%B3n_regular) tiene muchas posibilidades. Aqui dejo la función y después paso a comentarla.

```php
<?php
function filtrado($texto, $reemplazo = false) {
    $filtradas = 'p?uta, mierda, pendej[ao]s?';

    $f = explode(',', $filtradas);
    $f = array_map('trim', $f);
    $filtro = implode('|', $f);

    return ($reemplazo) ? preg_replace("#$filtro#i", $reemplazo, $texto) : preg_match("#$filtro#i", $texto) ;
}
```

Ahora la explicación:

-   **Línea 3:** Aquí se definen las palabras a buscar separadas por coma. Se puede hacer uso de comodines. Por ejemplo, &#34;\_p?uta\_&#34; censura &#34;\_puta\_&#34; y &#34;\_uta\_&#34;; &#34;\_pendej\[ao\]s?\_&#34; censura &#34;\_pendeja\_&#34;, &#34;\_pendejo\_&#34;, &#34;\_pendejos\_&#34;, &#34;\_pendejas\_&#34;.
-   **Línea 5:** Dividimos las palabras en un arreglo.
-   **Línea 6:** Limpiamos los posibles espacios en blanco alrededor de la palabra.
-   **Línea 7:** Las unimos con el [caracter |](http://es.wikipedia.org/wiki/Expresi%C3%B3n_regular#La_barra_.22.7C.22).
-   **Línea 9:** El segundo parámetro es opcional. Si se pone, se retorna la cadena del primer parámetro con las palabras prohibidas reemplazadas por el texto que se haya pasado como segundo parámetro. Si no se especifica el segundo parámetro, entonces la función retorna verdadero en caso de que se haya encontrado alguna palabra en el texto o falso en caso de que la cadena este limpia.
