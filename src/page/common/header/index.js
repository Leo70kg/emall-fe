/*
* @Author: Administrator
* @Date:   2020-08-03 19:31:47
* @Last Modified by:   zuoyou
* @Last Modified time: 2020-08-05 23:44:27
*/
'use strict';
require('./index.css');

var _mm = require('util/mm.js');

// 通用页面头部
var header = {
    init : function(){
        this.onLoad();
        this.bindEvent();
        
    },
    onLoad : function(){
        var keyword = _mm.getUrlParam('keyword');
        if(keyword){
            $('#search-input').val(keyword);
        };
    },

    bindEvent : function(){
        var _this = this;
        // 点击search按钮后，做搜索提交
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        // 输入回车后，做搜索提交
        $('#search-input').keyup(function(e){
            // 13是回车键的keyCode
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
            
        });
    },

    // 搜索的提交
    searchSubmit : function(){
        var keyword = $.trim($('#search-input').val());
        if(keyword){
            window.location.href = './list.html?keyword=' + keyword;
        }
        else{
            _mm.goHome();
        }
    }


};

module.exports = header.init();