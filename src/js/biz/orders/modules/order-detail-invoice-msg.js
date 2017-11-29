'use strict';

var orderDetailInvoiceMsg = {
    //承载对象缓存
    pageObj: null,
    //页面渲染数据缓存
    renderData: null,

    //初始化
    init: function (opts) {
        var _this = this;
        _this.pageObj = opts.pageObj;

        _this.bindEvents()
    },

    //渲染发票信息
    renderInvoiceMsg: function (data) {
        var _this = this;
        if (typeof data != 'undefined') {
            _this.renderData = data;
        }

        if (_this.renderData) {
            var html = H.template($('#J-invoice-list-tpl').html(), {
                list: _this.renderData
            });
            $('#J-invoice-list-wrap').html(html);
        }
    },

    insertInvoice: function (index) {
        var html = H.template($('#J-invoice-list-opt-tpl').html(), {
            index: index
        });

        $('#J-invoice-list-body').append(html);
    },

    //设置模块为编辑状态
    setEditStatus: function () {
        $('#J-invoice-list-wrap').find('table').addClass('cm-table-edit');
        $('#J-invoice-btn-wrap').show();
        this.setClickPop(1);
    },

    //设置模块为普通状态
    setSimpleStatus: function () {
        $('#J-invoice-list-wrap').find('table').removeClass('cm-table-edit');
        $('#J-invoice-btn-wrap').hide();
        this.renderInvoiceMsg();
        this.setClickPop(0);
    },

    setClickPop: function(ctrl){
        var _this = this;
        var data = _this.renderData;

        var $dom = $('tbody#J-invoice-list-body > tr');
        for(var i=0;i<$dom.length;i++){
            var $sub = $dom.eq(i).find('td:eq(4)');
            if(ctrl === 0){
                $sub.find('p').removeAttr('style');
            }else{
                $sub.find('p').css({color:'#4591cf', cursor:'pointer'});
                if($.trim($sub.text()) !== '') disguise($sub);
            }
        }

        function disguise($sub){
            $sub.click(function(){
                if(ctrl === 0) return false;

                var $this = $(this);
                var $index = $this.parent().index();

                var $data = data[$index].invoice_content;
                if($data.length > 0){
                    var $html = '<table class="cm-table">';
                    $html += '<tr><th>商品</th><th>单位</th><th>商品数量</th><th>商品单价</th></tr>';
                    for(var i in $data){
                        $html += '<tr>';
                            $html += '<td>'+ $data[i].content + '</td>';
                            $html += '<td>'+ $data[i].unit + '</td>';
                            $html += '<td>'+ $data[i].quantity + '</td>';
                            $html += '<td>'+ $data[i].price + '</td>';
                        $html += '</tr>';
                    }
                    $html += '</table>';

                    //定义一个弹窗
                    var d = H.dialog({
                        title: '发票内容',
                        content: $html,//弹窗内容
                        quickClose: true,//点击空白处快速关闭
                        padding: 5,//弹窗内边距
                        width: 400,//弹窗宽度(缺省时为自适应，但默认最大宽度为1000)
                        backdropOpacity: 0.7,//遮罩层透明度(默认0.7)
                        onshow: function(){
                            //alert('弹窗弹出后执行的回调');
                        },
                        onclose: function(){
                            //alert('弹窗关闭后执行的回调');
                        }
                    });
                    //显示弹窗
                    d.show();
                }
            });
        }
    },

    //获取模块修改参数
    getSubmitParams: function () {
        var params = [];

        $('#J-invoice-list-body').find('tr').each(function (i, item) {
            var $this = $(this);
            params.push({
                being_deleted_invoice: $this.find('input[name=being_deleted_invoice]').val(),
                invoice_id: $this.find('input[name=invoice_id]').val(),
                invoice_type: $this.find('select[name=invoice_type]').val(),
                invoice_title: $this.find('input[name=invoice_title]').val(),
                //invoice_content: $this.find('input[name=invoice_content]').val(),
                invoice_money: $this.find('input[name=invoice_money]').val(),
                actual_invoice_content: $this.find('input[name=actual_invoice_content]').val(),
                actual_invoice_money: $this.find('input[name=actual_invoice_money]').val()
            });
        });

        return params;
    },

    bindEvents: function () {
        var _this = this;
        $('#J-invoice-list-add').on('click', function () {
            _this.insertInvoice($('#J-invoice-list-body').find('tr').length);
        });

        $('#J-invoice-list-del').on('click', function () {
            $('#J-invoice-list-body').find('input[type=checkbox]:checked').each(function () {
                var $tr = $(this).closest('tr');

                if ($tr.find('input[name=invoice_id]').val() == '') {
                    $tr.remove();
                } else {
                    $tr.hide().find('input[name=being_deleted_invoice]').val(1);
                }
            });
        });
    }
};

module.exports = orderDetailInvoiceMsg;
