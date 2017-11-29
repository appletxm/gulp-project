'use strict';

var orderDetailBasicInfo = {
    //承载对象缓存
    pageObj: null,
    //页面渲染数据缓存
    renderData: null,

    //初始化
    init: function (opts) {
        var _this = this;
        _this.pageObj = opts.pageObj;
    },

    //渲染基础信息
    renderBaseMsg: function (data) {
        var _this = this;
        if (typeof data != 'undefined') {
            _this.renderData = data;
        }

        if (_this.renderData) {
            var html = H.template($('#J-base-msg-tpl').html(), _this.renderData);
            $('#J-base-msg-wrap').html(html);
        }
    },

    //设置模块为编辑状态
    setEditStatus: function () {
        $('#J-base-msg-wrap').find('table').addClass('cm-table-edit');
    },

    //设置模块为普通状态
    setSimpleStatus: function () {
        $('#J-base-msg-wrap').find('table').removeClass('cm-table-edit');
        this.renderBaseMsg();
    },

    //获取模块修改参数
    getSubmitParams: function () {
        var params = {};

        $('#J-base-msg-wrap').find('input').each(function (i, item) {
            var $this = $(this);
            params[$this.attr('name')] = $this.val();
        });

        return params;
    }
};

module.exports = orderDetailBasicInfo;
