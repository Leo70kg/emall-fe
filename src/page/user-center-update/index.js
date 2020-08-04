/*
* @Author: zuoyou
* @Date:   2020-08-04 22:52:38
* @Last Modified by:   zuoyou
* @Last Modified time: 2020-08-05 00:00:53
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/nav-side/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm.js');
var _user           = require('service/user-service.js');
var templateIndex   = require('./index.string');

var page = {
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name : 'user-center'
        });
        this.loadUserInfo();
    },
    bindEvent : function(){
        var _this = this;
        $(document).on('click', '.btn-submit', function(){
            var userInfo = {
                phone       : $.trim($('#phone').val()),
                email       : $.trim($('#email').val()),
                question    : $.trim($('#question').val()),
                answer      : $.trim($('#answer').val())
            },

            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                //  更改用户信息
                _user.updateUserInfo(userInfo, function(res, msg){
                    _mm.successTips(msg);
                    window.location.href = './user-center.html';
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            else{
                _mm.errorTips(validateResult.msg);
            }
        });
    },
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg){
            _mm.errorTips(errMsg);
        });
    },
    //  验证字段信息
    validateForm : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        
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