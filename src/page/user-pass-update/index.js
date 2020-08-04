/*
* @Author: zuoyou
* @Date:   2020-08-05 00:23:35
* @Last Modified by:   zuoyou
* @Last Modified time: 2020-08-05 00:51:20
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/nav-side/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm.js');
var _user           = require('service/user-service.js');

var page = {
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name : 'user-pass-update'
        });

    },
    bindEvent : function(){
        var _this = this;
        $(document).on('click', '.btn-submit', function(){
            var userInfo = {
                password            : $.trim($('#password').val()),
                passwordNew         : $.trim($('#password-new').val()),
                passwordConfirm     : $.trim($('#password-confirm').val())
            },

            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                //  更改用户信息
                _user.updatePassword({
                    passwordOld : userInfo.password,
                    passwordNew : userInfo.passwordNew
                }, function(res, msg){
                    _mm.successTips(msg);
                
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            else{
                _mm.errorTips(validateResult.msg);
            }
        });
    },

    //  验证字段信息
    validateForm : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        
        if(!_mm.validate(formData.password, 'require')){
            result.msg = 'Old password can not be empty';
            return result;
        }

        if(!formData.passwordNew || formData.passwordNew.length < 6){
            result.msg = 'Password can not be less than 6 digits';
            return result;
        }

        if(formData.passwordNew !== formData.passwordConfirm){
            result.msg = 'Two passwords not match';
            return result;
        }

        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = 'validation pass';
        return result;
    }
};
$(function(){
    page.init();
});