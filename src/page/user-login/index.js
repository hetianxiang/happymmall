require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

//表单里的错误提示
var formError = {
  show:function(errMsg){
    $('.error-item').show().find('.err-msg').text(errMsg);
  },
  hide:function(){
    $('.error-item').hide().find('.err-msg').text('');
  }
}
//page逻辑部分
var page = {
  init:function(){
    this.bindEvent();
  },
  bindEvent:function(){
    var _this = this;
    $('#submit').click(function(){
      _this.submit();
    });
    $('.user-content').keyup(function(e){
      if(e.keyCode === 13){
        _this.submit();
      }
    })
  },
//   //提交表单
  submit:function(){
    var formData = {
      username:$.trim($('#username').val()),
      password:$.trim($('#password').val()),
    }
    //表单验证结果
    validateResult = this.formValidate(formData);
    //验证成功
    if(validateResult.status){
      //提交
      console.log(_user.register);
      _user.login(formData,function(res){
        window.location.href = _mm.getUrlParam('redirect')||'./index.html';

      },function(errMsg){
        formError.show(errMsg);
      });
    }
    //验证失败
    else{
      formError.show(validateResult.msg);
    }
  },
  formValidate:function(formData){
      var result = {
        status:false,
        msg:''
      };
      if(!_mm.validate(formData.username,'require')){
        result.msg = '用户名不能为空';
        return result;
      }
      if(!_mm.validate(formData.password,'require')){
        result.msg = '密码不能为空';
        return result;
      }
      result.status = true;
      result.msg = '验证通过';
      return result;
  }

};
$(function(){
  page.init();
})
