/*
* @Author: Administrator
* @Date:   2020-07-30 19:11:08
* @Last Modified by:   zuoyou
* @Last Modified time: 2020-08-04 22:41:26
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
    data : {
        username    : '',
        question    : '',
        answer      : '',
        token       : '',
    },

    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadStepUsername();
    },

    bindEvent : function(){
        var _this = this;
        $('#submit-username').click(function(){
            var username = $.trim($('#username').val());
            if(username){
                _user.getQuestion(username, function(res){
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }
            else{
                formError.show('Please enter username');
            }
        });

        $('#submit-question').click(function(){
            var answer = $.trim($('#answer').val());
            if(answer){
                _user.checkAnswer({
                    username    : _this.data.username,
                    question    : _this.data.question,
                    answer      : answer
                }, function(res){
                    _this.data.answer   = answer;
                    _this.data.token    = res;
                    _this.loadStepPassword();
                }, function(errMsg){
                    formError.show(errMsg);    
                });
            }
            else{
                formError.show('Please enter answer');
            }
        });

        $('#submit-password').click(function(){
            var password = $.trim($('#password').val());
            if(password && password.length >= 6){
                _user.resetPassword({
                    username    : _this.data.username,
                    passwordNew : password,
                    forgetToken : _this.data.token
                }, function(res){
                    window.location.href = './result.html?type=pass-reset';
                }, function(errMsg){
                    formError.show(errMsg);    
                });
            }
            else{
                formError.show('Please enter new password(more than 6 digits)');
            }
        });

        // 如果按下回车，也进行提交
        $('.user-content').keyup(function(e){
            if(e.keyCode === 13){
                _this.submit();
            }
        });

    },

    // 家在输入用户名的一步
    loadStepUsername : function(){
        $('.step-username').show();
    },
    // 家在输入密码提示问题答案的一步
    loadStepQuestion : function(){
        formError.hide();
        $('.step-username').hide()
        .siblings('.step-question').show()
        .find('.question').text(this.data.question);
    },
    // 家在输入password的一步
    loadStepPassword : function(){
        formError.hide();
        $('.step-question').hide()
        .siblings('.step-password').show();
        
    },
};
$(function(){
    page.init();
});