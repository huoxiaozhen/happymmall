/*
 * @Author: markHuo 
 * @Date: 2020-05-04 09:21:50 
 * @Last Modified by: markHuo
 * @Last Modified time: 2020-05-10 13:09:24
 */
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
let _mm = require('util/mm.js');
let _user = require('service/user-service.js');

// 表单里的错误提示
let formError = {
  show: function(errMsg){
    $('.error-item').show().find('.err-msg').text(errMsg);
  },
  hide: function(){
    $('.error-item').hide().find('.err-msg').text('');
  }
}
let page = {
  init: function(){
    this.bindEvent();
  },
  bindEvent: function(){
    let _this = this;
    // 登录按钮的点击
    $('#submit').click(function(){
      _this.submit();
    });
    // 如果按下回车，也提交
    $('.user-content').keyup(function(e){
      // ketCode == 13 表示回车
      if(e.keyCode === 13){
        _this.submit();
      }
    });
  },
  // 提交表单
  submit: function(){
    let formData = {
      username: $.trim($('#username').val()),
      password: $.trim($('#password').val())
    };
    // 表单验证结果
    let validateResult = this.formValidate(formData);
    // 验证成功
    if(validateResult.status){
      // 提交
      _user.login(formData, function(res){
        window.location.href = _mm.getUrlParam('redirect') || './index.html';
      }, function(errMsg){
        formError.show(errMsg);
      });
    }else{
      // 验证失败 错误提示
      formError.show(validateResult.msg);
    }
  },
  // 表单字段的验证
  formValidate: function(formData){
    let result = {
      status: false,
      msg: ''
    };
    if(!_mm.validate(formData.username, 'require')){
      result.msg = '用户名不能为空';
      return result
    }
    if(!_mm.validate(formData.password, 'require')){
      result.msg = '密码不能为空';
      return result
    }
    // 通过验证，返回正确提示
    result.status = true;
    result.msg = '验证通过';
    return result;
  }
};
$(function(){
  page.init();
})