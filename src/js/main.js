//js/app.js

//Require SASS
require('../style.scss');

//Require CSS
require('../../style.css');

//Require Slick
//require('script-loader!../../node_modules/slick-carousel/slick/slick');

console.log('main.js!');

// import external dependencies
import 'jquery';

// Import everything from autoload - Removing since 2.0.1
//import './autoload/**/*'

// import local dependencies
import Router from './util/Router';
import common from './routes/common';
import home from './routes/home';
import about from './routes/about';
import blog from './routes/blog';
import pageTemplate from './routes/pageTemplate';

/** Populate Router instance with DOM routes */
const routes = new Router({
  // All pages
  common,
  // Home page
  home,
  // About Us page, note the change from about-us to aboutUs.
  about,
  blog,
  // You can add template name
  pageTemplate
});

// Load Events
jQuery(document).ready(() => routes.loadEvents());
