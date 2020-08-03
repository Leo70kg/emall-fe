/*
* @Author: Administrator
* @Date:   2020-08-01 14:38:15
* @Last Modified by:   Administrator
* @Last Modified time: 2020-08-01 14:45:45
*/
'use strict';

var _mm = require('util/mm.js');

var _user = {
    // 检查登录状态
    checkLogin : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/get_user_info.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },

    // logout
    logout : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/logout.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
};

module.exports = _user;