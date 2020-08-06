/*
* @Author: Administrator
* @Date:   2020-08-01 14:48:07
* @Last Modified by:   zuoyou
* @Last Modified time: 2020-08-06 18:16:08
*/
'use strict';

var _mm = require('util/mm.js');

var _cart = {

    // 获取购物车数量
    getCartCount : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/get_cart_product_count.do'),
            success : resolve,
            error   : reject
        });
    },
    // 添加购物车
    addToCart : function(productInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/add.do'),
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    },
};

module.exports = _cart;