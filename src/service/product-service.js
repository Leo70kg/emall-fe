/*
* @Author: zuoyou
* @Date:   2020-08-05 23:39:25
* @Last Modified by:   zuoyou
* @Last Modified time: 2020-08-06 18:00:39
*/
'use strict';

var _mm = require('util/mm.js');

var _product = {
    // 获取商品列表
    getProductList : function(listParam, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },

    getProductDetail : function(productId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/detail.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    }, 
    
};

module.exports = _product;