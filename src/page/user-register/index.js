/*
* @Author: Administrator
* @Date:   2020-07-30 19:11:08
* @Last Modified by:   zuoyou
* @Last Modified time: 2020-08-04 21:51:55
*/
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm     = require('util/mm.js');
var _user   = require('service/user-service.js');

// 表单里的错误提示
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};

var page = {
    init : function(){
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        // 验证username
        $('#username').blur(function(){
            var username = $.trim($(this).val());
            
            // 如果用户名为空，不做验证
            if(!username){
                return;
            }

            // 异步验证用户名是否存在
            _user.checkUsername(username, function(res){
                formError.hide();
            }, function(errMsg){
                formError.show(errMsg);
            });
        });

        $('#submit').click(function(){
            _this.submit();
        });

        // 如果按下回车，也进行提交
        $('.user-content').keyup(function(e){
            if(e.keyCode === 13){
                _this.submit();
            }
        });

    },
    // 提交表单
    submit : function(){
        var formData = {
            username        : $.trim($('#username').val()),
            password        : $.trim($('#password').val()),
            passwordConfirm : $.trim($('#password-confirm').val()),
            phone           : $.trim($('#phone').val()),
            email           : $.trim($('#email').val()),
            question        : $.trim($('#question').val()),
            answer          : $.trim($('#answer').val())
            },
            // 表单验证结果
            validateResult = this.formValidate(formData);
        
        // 验证成功
        if(validateResult.status){
            _user.register(formData, function(res){
                window.location.href = './result.html?type=register';
            }, function(errMsg){
                formError.show(errMsg);
            });
        }
        // 验证失败
        else{
            // 错误提示
            formError.show(validateResult.msg);
        }
    },

    // 表单字段验证
    formValidate : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        if(!_mm.validate(formData.username, 'require')){
            result.msg = 'username should not be empty';
            return result;
        }
        if(!_mm.validate(formData.password, 'require')){
            result.msg = 'password should not be empty';
            return result;
        }
        // 验证密码长度
        if(formData.password.length < 6){
            result.msg = 'password should not be less than 6 digits';
            return result;
        }
        // 两次密码长度是否一致
        if(formData.password !== formData.passwordConfirm){
            result.msg = 'password not match';
            return result;
        }
        if(!_mm.validate(formData.phone, 'phone')){
            result.msg = 'phone number format not right';
            return result;
        }
        if(!_mm.validate(formData.email, 'email')){
            result.msg = 'email format not right';
            return result;
        }
        if(!_mm.validate(formData.question, 'require')){
            result.msg = 'question should not be empty';
            return result;
        }
        if(!_mm.validate(formData.answer, 'require')){
            result.msg = 'answer should not be empty';
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