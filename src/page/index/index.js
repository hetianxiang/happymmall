require('./index.css')
require('page/common/header/index.js');
require('util/slider/index.js');
require('page/common/nav/index.js');
var navS = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var templateBanner = require('./banner.string');
// console.log(_mm.getUrlParam('test'));
// navS.init({
//   name:'pass-update'
// })
$(function(){
  //渲染banner
  var bannerHtml = _mm.renderHtml(templateBanner);
  $('.banner-con').html(bannerHtml);
  var $slider = $('.banner').unslider({
    dots:true
  });
  //前一张和后一张的事件绑定
  $('.banner-con .banner-arrow').click(function(){
    var forward = $(this).hasClass('prev') ? 'prev' : 'next';
    $slider.data('unslider')[forward]();
  });
})
