'use strict';

var orderDetailPurchaseLog = {
    //承载对象缓存
    pageObj: null,
    dataHasLoaded: false,
    pagination: null,
    pageInfo:{
        pageNo: 1,
        pageSize: 20, //每页数据条数
        tabId: 4 //4: 用户购买记录
    },

    //初始化
    init: function (opts) {
        var _this = this;

        _this.pageObj = opts.pageObj;
        _this.pagination = new H.Pager({
            tplB : $('#J-pager-tpl').html(),//模版
            wrapB : $('#J-pager-wrap-purchase'),//分页插入目标
            goToPageFunc : function (pageNo) {
                _this.pageInfo.pageNo = pageNo;
                _this.doAjaxToLoadData(pageNo);
            }//点击分页按钮后触发的回调函数
        });
    },

    //渲染基础信息
    renderLogMsg: function () {
        if(this.dataHasLoaded !== true){
            this.doAjaxToLoadData();
        }
    },

    doAjaxToLoadData :function(pageNo){
        var url, orderCode, page, pageSize, tabId;

        orderCode = this.pageObj.orderDataGrid.selectedOrderCode || '';

        page = pageNo || this.pageInfo.pageNo;
        pageSize = this.pageInfo.pageSize;
        tabId = this.pageInfo.tabId;

        if(orderCode === ''){
            alert('无订单编号，请重试');
            return false;
        }

        if(this.pageObj.orderDataGrid.param['needMockData'] === true){
            url = '../src/data/purchase-log.json?order_code='+orderCode+'&page='+page+'&page_size='+pageSize+'&tab_id='+tabId;
        }else{
            url = SYS_VARS.INTERFACE_URL+'order_apiv1/order/logs/'+orderCode+'.json?page='+page+'&page_size='+pageSize+'&tab_id='+tabId;
        }

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: this.getOrderPurchaseSuccess.bind(this),
            error: this.getOrderPurchaseFailed.bind(this)
        });
    },

    getOrderPurchaseSuccess: function(res){
        if(res.code === 200 || res.code === '200'){
            this.dataHasLoaded = true;
            this.buildHTML(res.rows); //res.data
            this.setPage(res);
        }else{
           this.getOrderPurchaseFailed(res);
        }
    },

    buildHTML: function(data){
        var html = H.template($('#J-purchase-log-tpl').html(), {list: data});
        $('#J-purchase-log-wrap').html(html);
    },

    setPage: function(data){
        this.pagination.render({
            pg: data.page,//this.pageInfo.pageNo
            total: data.records, //totalCount
            ps: this.pageInfo.pageSize
        });
    },

    getOrderPurchaseFailed: function(res){
        var msg = (res && res.msg) ? res.msg : '获取操作日志失败';
        alert(msg);
    }

};

module.exports = orderDetailPurchaseLog;
