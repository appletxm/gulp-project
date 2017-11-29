'use strict';

var orderDetailDepotMsg = {
    //承载对象缓存
    pageObj: null,
    //页面渲染数据缓存
    renderData: null,

    //初始化
    init: function (opts) {
        var _this = this;
        _this.pageObj = opts.pageObj;
    },

    //渲染出库信息
    renderDepotMsg: function (data) {
        var _this = this;
        if (typeof data != 'undefined') {
            _this.renderData = data; 
        }

        if (_this.renderData) {
            var html = H.template($('#J-depot-msg-tpl').html(), _this.renderData);
            $('#J-depot-msg-wrap').html(html);
        }
    },

    //设置模块为编辑状态
    setEditStatus: function () {
        $('#J-depot-msg-wrap').find('table').addClass('cm-table-edit');
    },

    //设置模块为普通状态
    setSimpleStatus: function () {
        $('#J-depot-msg-wrap').find('table').removeClass('cm-table-edit');
        this.renderDepotMsg();
    },

    //获取模块修改参数
    getSubmitParams: function () {
        var params = {};

        $('#J-depot-msg-wrap').find('input').each(function (i, item) {
            var $this = $(this);
            params[$this.attr('name')] = $this.val();
        });

        return params;
    }
};

module.exports = orderDetailDepotMsg;
