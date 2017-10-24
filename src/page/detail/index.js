require('page/common/header/index.js');
require('page/common/nav/index.js');
require('./index.css');

var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var _cart = require('service/cart-service.js');
var Pagination      = require('util/pagination/index.js');
var templateIndex  = require('./index.string');
var page={
  data :{
    productId : _mm.getUrlParam('productId') || ''
  },
  init:function(){
    this.loadDetail();
    this.bindEvent()
  },
  onLoad:function(){
    //如果没有传id自动回首页
    if(!this.data.productId){
      _mm.goHome();
    }
  },
  bindEvent:function(){
    var _this = this;
    $(document).on('mouseenter','.p-img-item',function(){
      var imgUrl = $(this).find('.p-img').attr('src');
      $('.main-img').attr('src',imgUrl)
    });
    //count的操作
    $(document).on('click','.p-count-btn',function(){
      var type = $(this).hasClass('plus')?'plus':'minus',
          $pCount = $('.p-count'),
          currCount = parseInt($pCount.val()),
          minCount = 1,
          maxCount = _this.data.detailInfo.stock || 1;
      if(type === 'plus'){
        $pCount.val(currCount<maxCount?currCount+1:maxCount);
      }else if(type === 'minus'){
        $pCount.val(currCount>minCount?currCount-1:minCount);

      }
    });
    $(document).on('click','.cart-add',function(){
      _cart.addToCart({
        productId:_this.data.productId,
        count:$('.p-count').val()
      },function(res){
        window.location.href = './result.html?type=cart-add'
      },function(errMsg){
        _mm.errorTips(errMsg);
      })
    });
  },
  // 加载商品详情的数据
  loadDetail : function(){
    var _this       = this,
        html        = '',
        $pageWrap   = $('.page-wrap');
    // loading
    $pageWrap.html('<div class="loading"></div>');
    // 请求detail信息
    _product.getProductDetail(this.data.productId, function(res){
        // console.log(res,_this.data);
        _this.filter(res);
        // 缓存住detail的数据
        _this.data.detailInfo = res;
        // render
        html = _mm.renderHtml(templateIndex, res);
        $pageWrap.html(html);
    }, function(errMsg){
        $pageWrap.html('<p class="err-tip">此商品太淘气，找不到了</p>');
    });
    },
    // 数据匹配
    filter : function(data){
        data.subImages = data.subImages.split(',');
    }

}
$(function(){
  page.init();
})
