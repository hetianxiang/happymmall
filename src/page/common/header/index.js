require('./index.css')
var _mm = require('util/mm.js');

//通用页面头部
var header = {
  init:function(){
    this.bindEvent();
  },
  onload:function(){
    //获取url地址中的keyword值
    var keyword = _mm.getUrlParam('keyword');
    //判断keyword是否存在,存在回填输入框
    if(keyword){
      $('#search-input').val(keyword);
    };
  },
  bindEvent:function(){

    var _this= this;
    $('#search-btn').click(function(){

      _this.searchSubmit()
    });
    //输入回车后，做搜索提交
    $('#search-input').keyup(function(e){
           //13是回车键的keyCode
           if(e.keyCode === 13){
               _this.searchSubmit();
           }
       })
  },
  //搜索的提交
  searchSubmit:function(){

    var keyword = $.trim($('#search-input').val());

    if(keyword){
      window.location.href = './list.html?keyword=' +keyword;
    }
  }
}
header.init()
