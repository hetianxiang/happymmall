require('page/common/header/index.js');
require('page/common/nav/index.js');
var navS = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
console.log(_mm.getUrlParam('test'));
navS.init({
  name:'pass-update'
})
