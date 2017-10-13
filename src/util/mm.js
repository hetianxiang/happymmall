'use strict';
var Hogan = require('hogan.js');
var conf  = {
    //此时接口地址与静态文件地址相同，可以直接设置为空
    serverHost : ''
};
//定义一个工具类mm为一个对象
var _mm   = {
    //请求后端数据
    request : function(param){
        var _this=this;//在request中无法获取_mm对象，增加this
        $.ajax({
            type        : param.method  || 'get' ,
            url         : param.url     || '',
            dataType    : param.type    || 'json',
            data        : param.data    || '',
            success     : function(res){
                //请求成功
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data,res.msg);
                }
                //没有登录状态，需要强制登录
                else if(10 === res.status){
                    _this.doLogin();
                }
                //请求数据错误
                else if(1 === res.status){
                   typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error       : function(err){
                typeof param.error === 'function' && param.error(err.statusText);
            }
        })
    },
    //获取服务器地址
    getServerUrl : function(path){
        return conf.serverHost + path;
    },
    //获取url参数
    getUrlParam : function(name){
        //happymmall.com/product/list?keyword=xxx&page=1
        //设置正则表达式规则，提取keyword部分
        var reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        //？之后的参数匹配reg，匹配成功为数组，否则为none
        var result  = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //渲染html模板
    renderHtml : function(htmlTemplate, data){
        var template = Hogan.compile(htmlTemplate),// 编译
            result   = template.render(data);//渲染
        return result;
    },
    //成功提示
    successTips : function(msg){
        alert(msg || '操作成功！')
    },
    //错误提示
    errorTips : function(msg){
        alert(msg || '哪里不对了~')
    },
    //字段的验证，支持非空、手机、邮箱的判断
    validate : function(value,type){
        var value = $.trim(value);//去掉空格，也可将value的值变成字符串
        //非空验证
        if('require' === type){
            return !!value;
        }
        //手机号验证
        if('phone' ===  type){
            return /^1\d{10}$/.test(value);
        }
        //邮箱验证
        if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    //统一登录处理
    doLogin : function(){
        //登录跳转回原来的页面，页面url可能包含特殊字符，导致url截断，因此需要encodeURIComponent转码
        // window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.locaton.href);
        window.location.href = './user-login.html?redirect='+encodeURIComponent(window.location.href);
    },
    goHome : function(){
        window.location.href = './index.html';
    }
};

module.exports= _mm;//模块化输出
