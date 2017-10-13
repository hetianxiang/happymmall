require('page/common/header/index.js');
require('page/common/nav/index.js');
require('./index.css');
var _mm = require('util/mm.js');
var navSide  = require('page/common/nav-side/index.js');
var _user = require('service/user-service.js');
// var templateIndex  = require('./index.string');

var page = {
  init:function(){
    this.onLoad();
    this.bindEvent();
  },
  onLoad:function(){
    navSide.init({
      name:'user-pass-update'
    });
  },
  bindEvent:function(){
    console.log(1);
    var _this = this;
    $(document).on('click','.btn-submit',function(){
      var userInfo = {
        password:$.trim($('#password').val()),
        passwordNew:$.trim($('#password-new').val()),
        passwordConfirm:$.trim($('#password-confirm').val()),

      };
      console.log(userInfo);

      var validateResult = _this.validateForm(userInfo);
      console.log(validateResult);

      if(validateResult.status){
        _user.updatePassword({
            passwordOld:userInfo.password,
            passwordNew:userInfo.passwordNew
        },function(res,msg){
          _mm.successTips(msg);
        },function(errMsg){
          _mm.errorTips(errMsg);
        })
      }else{
        _mm.errorTips(validateResult.msg);
      }
    })
  },
  validateForm:function(formData){
    var result = {
      status:false,
      msg:''
    }

        if(!_mm.validate(formData.password,'require')){
          result.msg = '原密码不为空';
          return result;
        }
        if(!formData.passwordNew || formData.passwordNew.length<6){
          result.msg = '密码长度需要大于六位';
          return result;
        }
        if(formData.passwordNew != formData.passwordConfirm){
          result.msg = '两次输入密码不同';
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
