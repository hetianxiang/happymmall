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

    $('#username').blur(function(){
      var username = $.trim($(this).val());
      if(username===''){
        return;
      }
      _user.checkUsername(username,function(res){
        formError.hide();
      },function(errMsg){
        formError.show(errMsg);
      })
    })
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
      passwordConfirm:$.trim($('#password-confirm').val()),
      email:$.trim($('#email').val()),
      phone:$.trim($('#phone').val()),
      question:$.trim($('#question').val()),
      answer:$.trim($('#answer').val())
    }
    //表单验证结果
    validateResult = this.formValidate(formData);
    //验证成功
    if(validateResult.status){
      //提交
      _user.register(formData,function(res){
        window.location.href = './result.html?type=register';

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
      if(formData.password.length<6){
        result.msg = '密码不能少于6位';
        return result;
      }
      if(formData.password !== formData.passwordConfirm){
        result.msg = '密码不deng';
        return result;
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
      if(!_mm.validate(formData.password,'require')){
        result.msg = '答案不能为空';
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
