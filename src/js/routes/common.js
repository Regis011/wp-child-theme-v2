//import dependecies
import $ from 'jquery';

// function
let someCustomFunction = () => {
  $('.custom').click(function(){
    alert('Test');
  })
};

export default {
  init() {
    // JavaScript to be fired on all pages
    someCustomFunction();
  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
  },
};
