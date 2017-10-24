require('page/common/header/index.js');
require('page/common/nav/index.js');
require('./index.css');

var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var Pagination      = require('util/pagination/index.js');
var templateIndex  = require('./index.string');
var page={
  data:{
    listParam:{
      keyword:_mm.getUrlParam('keyword')||'',
      categoryId:_mm.getUrlParam('categoryId')||'',
      orderBy:_mm.getUrlParam('orderBy')||'default',
      pageNum:_mm.getUrlParam('pageNum')||1,
      pageSize:_mm.getUrlParam('pageSize')||20
    }
  },
  init:function(){
    this.onLoad();
    this.bindEvent();
  },
  onLoad:function(){
    this.loadList();
  },
  bindEvent:function(){
    var _this = this;
      $('.sort-item').click(function(){

        var $this = $(this);
        // console.log($this.data('type'));
        //重置页码为第一页
        _this.data.listParam.pageNum = 1;
        if($this.data('type')=== 'default'){
          //是否存在active
          if($this.hasClass('active')){
            return;
          }
          else{
            $this.addClass('active').siblings('.sort-item')
                          .removeClass('active asc desc');
            _this.data.listParam.orderBy = 'default'
          }
        }
        //点击价格排序
        else if($this.data('type') === 'price'){
          $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
          if(!$this.hasClass('asc')){
            $this.addClass('asc').removeClass('desc');
            _this.data.listParam.orderBy = 'price_asc';
          }else{
            $this.addClass('desc').removeClass('asc');
            _this.data.listParam.orderBy = 'price_desc';
          }
        }
        _this.loadList();
      })
  },
  loadList:function(){
    var _this = this;
      listHtml = '',
      listParam = this.data.listParam,
      $pListCon   = $('.p-list-con');
    $pListCon.html('<div class="loading"></div>');
    listParam.categoryId
    ?(delete listParam.keyword) : (delete listParam.categoryId)
    _product.getProductList(listParam,function(res){
      listHtml = _mm.renderHtml(templateIndex,{
        list : res.list
      })
      $pListCon.html(listHtml);
      _this.loadPagination({
               hasPreviousPage : res.hasPreviousPage,
               prePage         : res.prePage,
               hasNextPage     : res.hasNextPage,
               nextPage        : res.nextPage,
               pageNum         : res.pageNum,
               pages           : res.pages
      });
    },function(errMsg){
      _mm.errorTips(errMsg);
    })
  },
  //加载分页信息
  loadPagination:function(pageInfo){
    var _this = this;
    this.pagination?'':(this.pagination = new Pagination());
    console.log(pageInfo)

    this.pagination.render($.extend({},pageInfo,{
      container : $('.pagination'),
      onSelectPage :function(pageNum){
        _this.data.listParam.pageNum = pageNum;
        _this.loadList();
      }
    }))
  }
}
$(function(){
  page.init();
})
