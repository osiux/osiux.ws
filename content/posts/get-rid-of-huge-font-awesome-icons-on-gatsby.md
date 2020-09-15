---
title: 'Get rid of huge Font Awesome icons on Gatsby'
date: 2020-01-09
tags: 
    - development
    - gatsbyjs
    - fontawesome
draft: false
---

When building this site I noticed that on the first load before anything is cached on the browser, the Font Awesome icons used in the footer and contact section were huge for a second or two, it looks ugly so it needed to be fixed.

## Why it happens?

The usage of a Font Awesome icon on React/Gatsby/etc is like this:

```javascript
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const MyComponent = () => <FontAwesomeIcon icon={faGithub} />;
```

On a normal app, it works fine because the CSS is loaded right before the icon is rendered, so there is no visible change of the size, but on an <abbr title="Server Side Rendering">SSR</abbr> app (like with Gatsby), the code for the icon already exists before the CSS is loaded, so it gets the needed style after a few milliseconds, resulting in the flickering of the icon size.

## Solution

We need to disable the auto-loading of CSS by FontAwesome and add the styles ourselves, this way they are already embedded when Gatsby builds the site.

in my case it was accomplished by modifying the `gatsby-browser.js` file and adding:

```javascript
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;
```

And that's it!
