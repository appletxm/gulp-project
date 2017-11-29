'use strict';

var orderDetailOperationLog = {
    //承载对象缓存
    pageObj: null,
    dataHasLoaded: false,
    pagination: null,
    pageInfo:{
        pageNo: 1,
        pageSize: 20, //每页数据条数
        tabId: 1 //1: 操作日志
    },

    //初始化
    init: function (opts) {
        var _this = this;
        _this.pageObj = opts.pageObj;

        _this.pagination = new H.Pager({
            tplB : $('#J-pager-tpl').html(),//模版
            wrapB : $('#J-pager-wrap-operation'),//分页插入目标
            goToPageFunc : function (pageNo) {
                _this.pageInfo.pageNo = pageNo;
                _this.renderLogMsg(pageNo);
            }//点击分页按钮后触发的回调函数
        });
    },

    //渲染基础信息
    renderLogMsg: function (pageNo) {
        var url, orderCode, page, pageSize, tabId;

        if(this.dataHasLoaded !== true){

            orderCode = this.pageObj.orderDataGrid.selectedOrderCode || '';

            page = pageNo || this.pageInfo.pageNo;
            pageSize = this.pageInfo.pageSize;
            tabId = this.pageInfo.tabId;

            if(orderCode === ''){
                alert('无订单编号，请重试');
                return false;
            }

            if(this.pageObj.orderDataGrid.param['needMockData'] === true){
                url = '../src/data/operation-info.json?order_code='+orderCode+'&page='+page+'&page_size='+pageSize+'&tab_id='+tabId;
            }else{
                url = SYS_VARS.INTERFACE_URL+'order_apiv1/order/logs/'+orderCode+'.json?page='+page+'&page_size='+pageSize+'&tab_id='+tabId;
            }

            $.ajax({
                 url: url,
                 type: 'GET',
                 dataType: 'json',
                 success: this.getOrderOperationSuccess.bind(this),
                 error: this.getOrderOperationFailed.bind(this)
             });
        }
    },

    getOrderOperationSuccess: function(res){
        if(res.code === 200 || res.code === '200'){
            this.dataHasLoaded = true;
            this.buildHTML(res.rows); //res.data
            this.setPage(res);
        }else{
           this.getOrderOperationFailed(res);
        }
    },

    buildHTML: function(data){
        var html = H.template($('#J-operation-log-tpl').html(), {list: data});
        $('#J-operation-log-wrap').html(html);
    },

    setPage: function(data){
        this.pagination.render({
            pg: data.page,//this.pageInfo.pageNo
            total: data.records, //totalCount
            ps: this.pageInfo.pageSize
        });
    },

    getOrderOperationFailed: function(res){
        var msg = (res && res.msg) ? res.msg : '获取操作日志失败';
        alert(msg);
    }

};

module.exports = orderDetailOperationLog;
