/*
* @Author: Administrator
* @Date:   2020-08-03 21:39:55
* @Last Modified by:   Administrator
* @Last Modified time: 2020-08-03 21:59:25
*/
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
    // 显示对应的提示元素
    $element.show();
})