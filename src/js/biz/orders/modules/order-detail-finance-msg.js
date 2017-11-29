'use strict';

var orderDetailFinanceMsg = {
    //承载对象缓存
    pageObj: null,
    //页面渲染数据缓存
    renderData: null,

    //初始化
    init: function (opts) {
        var _this = this;
        _this.pageObj = opts.pageObj;
        _this.addEvent();
    },

    //渲染财务信息
    renderFinanceMsg: function (data) {
        var _this = this;
        if (typeof data != 'undefined') {
            _this.renderData = data;
        }

        if (_this.renderData) {
            var html = H.template($('#J-finance-msg-tpl').html(), _this.renderData);
            $('#J-finance-msg-wrap').html(html);
        };
    },

    //设置模块为编辑状态
    setEditStatus: function () {
        $('#J-finance-msg-wrap').find('table').addClass('cm-table-edit');
    },

    //设置模块为普通状态
    setSimpleStatus: function () {
        $('#J-finance-msg-wrap').find('table').removeClass('cm-table-edit');
        this.renderFinanceMsg();
    },

    //获取模块修改参数
    getSubmitParams: function () {
        var params = {};

        $('#J-finance-msg-wrap').find('input').each(function (i, item) {
            var $this = $(this);
            params[$this.attr('name')] = $this.val();
        });

        return params;
    },

    addEvent: function(){

        //financial information about statistic  order paid total amount
        var $dom = '[name=cs_coupon], [name=cash_coupon], [name=gift_coupon], [name=delivery_amount]';
        $(document).on('keyup', $dom, function(){
            var $this = $(this);
            $this.parent().siblings('.status-simple').text( $this.val() );

            var $total_amount = $('#goods_amount'),
                $payment = $('#order_total'),
                $paidAmount = $('#paid_amount'),
                $unpaidAmount = $('#unpaid_amount'),
                $favourable = $('#cs_coupon'),
                $cash_coupon = $('#cash_coupon'),
                $gift_coupon = $('#gift_coupon'),
                $actualShipment = $('#delivery_amount');

            var $figure = parseFloat($total_amount.text())
                + parseFloat($favourable.find('input').val())
                + parseFloat($cash_coupon.find('input').val())
                + parseFloat($gift_coupon.find('input').val())
                + parseFloat($actualShipment.find('input').val());
            $payment.text( isNaN($figure)?0:$figure );

            var $margin = $figure - parseFloat($paidAmount.text());
            $unpaidAmount.find('input').val( isNaN($margin)?0:$margin );
        });
    }
};

module.exports = orderDetailFinanceMsg;
