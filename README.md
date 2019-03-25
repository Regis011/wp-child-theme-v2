# WP Child Theme V2

Wordpress child theme with webpack. Themes also use DOM-based Routing for JavaScript. Based on [Markup-based Unobtrusive Comprehensive DOM-ready Execution](http://goo.gl/EUTi53) by Paul Irish and inspirtion by [sage starter theme](https://github.com/roots/sage)
> The routing fires all common scripts, followed by the page specific scripts.

### Installation

Theme requires [Node.js](https://nodejs.org/) v4+ to run.
Run on terminal
```sh
$ git clone git@github.com:Regis011/wp-child-theme-v2.git [your-name]
$ cd your-name
$ npm install
$ npm run dev
```

Go to style.css file and change on line 7 - Template: to_your_parent_theme_name.

For production environments...

```sh
$ npm run build
```
