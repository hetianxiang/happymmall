require('page/common/header/index.js');
require('page/common/nav/index.js');
require('./index.css');
var _mm = require('util/mm.js');
var navSide  = require('page/common/nav-side/index.js');
var _user = require('service/user-service.js');
var templateIndex  = require('./index.string');

var page = {
  init:function(){
    this.onLoad();
    this.bindEvent();
  },
  onLoad:function(){
    navSide.init({
      name:'user-center'
    });
    this.loadUserInfo();
  },
  bindEvent:function(){
    console.log(1);
    var _this = this;
    $(document).on('click','.btn-submit',function(){
      var userInfo = {
        phone:$.trim($('#phone').val()),
        email:$.trim($('#email').val()),
        question:$.trim($('#question').val()),
        answer:$.trim($('#answer').val()),

      };
      console.log(userInfo);

      var validateResult = _this.validateForm(userInfo);
      console.log(validateResult);

      if(validateResult.status){
        _user.updateUserInfo(userInfo,function(res,msg){
          _mm.successTips(msg);
          window.location.href = './user-center.html';
        },function(errMsg){
          _mm.errorTips(errMsg);
        })
      }
    })
  },
  loadUserInfo:function(){
    var userHtml = '';
    _user.getUserInfo(function(res){
      userHtml = _mm.renderHtml(templateIndex,res);
      $('.panel-body').html(userHtml);
    },function(errMsg){
      _mm.errorTips(errMsg);
    })
  },
  validateForm:function(formData){
    var result = {
      status:false,
      msg:''
    }

        if(!_mm.validate(formData.email,'email')){
          result.msg = '邮箱格式不对';
          return result;
        }
        if(!_mm.validate(formData.phone,'phone')){
          result.msg = '请输入正确的手机号';
          return result;
        }
        if(!_mm.validate(formData.question,'require')){
          result.msg = '问题不能为空';
          return result;
        }
        if(!_mm.validate(formData.answer,'require')){
          result.msg = '答案不能为空';
          return result;
        }
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
}
$(function(){
  page.init();
})
