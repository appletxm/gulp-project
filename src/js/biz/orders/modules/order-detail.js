'use strict';

var orderDetail = {
    //承载对象缓存
    pageObj: null,
    //当前选择的 tab 的 index
    currentTabIndex: 0,

    //初始化
	init: function (opts) {
        var _this = this;
        _this.pageObj = opts.pageObj;

        _this.setTab(_this.pageObj);
        _this.bindEvents(_this.pageObj);
	},

    //给tab添加交互
    setTab: function (pageObj) {
        $('#J-detail-tab').find('li').on('click', function () {
            var $this = $(this);

            pageObj.orderDetail.currentTabIndex = $this.index();
            pageObj.orderDetail.loadDetailLogInfo(pageObj.orderDetail.currentTabIndex);
            pageObj.orderDetail.showOrHideEditButton();

            $this.addClass('active').siblings().removeClass('active');
            $('#J-detail-cont > div.J-detail-cont-inner').eq($this.index()).show().siblings().hide();
        });
    },

    renderDetail: function (data) {
        var _this = this;

        //self.pageObj.formatDateTime(item['order_time']

        _this.resetAllTabLoadedFlag();

        if(_this.currentTabIndex >= 6){
            _this.loadDetailLogInfo(_this.currentTabIndex);
        }else{
            _this.pageObj.orderDetailBasicInfo.renderBaseMsg(data.order_info);
            _this.pageObj.orderDetailProductMsg.renderProductList(data.order_goods);
            _this.pageObj.orderDetailReceiverMsg.renderReceiverMsg(data.order_consignee);
            _this.pageObj.orderDetailFinanceMsg.renderFinanceMsg(data.order_finance);
            _this.pageObj.orderDetailInvoiceMsg.renderInvoiceMsg(data.order_invoice);
            _this.pageObj.orderDetailDepotMsg.renderDepotMsg(data.order_stock);
        }

        $('#J-detail-cont-wrap').show();
    },

    getOrderDetail: function(){
        var url, orderCode, userToken;

        orderCode = this.pageObj.orderDataGrid.selectedOrderCode;
        userToken = this.pageObj.orderCurrentUser.getCurrentToken();

        if(!userToken || userToken === ''){
            H.alert('获取用户令牌失败，请退出登录后重新登录。');
            return false;
        }

        if(this.pageObj.needMockData === true){
            url = '../src/data/order-detail.json?order_id=' + orderCode;
        }else{
            url = SYS_VARS.INTERFACE_URL + 'order_apiv1/orders/list.json?order_id=' + orderCode;
        }

        this.pageObj.loadingBox.show();

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            //timeout: 20000,
            success: this.getOrderDetailSuccess.bind(this),
            /*complete : function(XMLHttpRequest,status){
                console.info(XMLHttpRequest, status);

                if(status=='timeout'){
                    alert("超时");
                }
            },*/
            error: this.getOrderDetailFailed.bind(this)
        });
    },

    getOrderDetailSuccess: function(res){
        if(res.code === 200 || res.code === '200'){

            this.pageObj.loadingBox.hide();

            if(res.data){
                this.formatData(res.data);
                this.renderDetail(res.data);
            }else{
                this.getOrderDetailFailed();
            }
        }else{
            this.getOrderDetailFailed();
        }
    },

    formatData: function(data){
        if(this.pageObj.formatDateTime){
            data['order_info']['order_time'] = this.pageObj.formatDateTime.doFormat(data['order_info']['order_time']);
            data['order_info']['order_finish_time'] = this.pageObj.formatDateTime.doFormat(data['order_info']['order_finish_time']);
        }

        return data;
    },

    getOrderDetailFailed: function(){
        this.pageObj.loadingBox.hide();
        H.alert('获取订单详情失败');
        this.clearDetailInfoPanel();
    },

    clearDetailInfoPanel: function(){
        $('#J-detail-cont-wrap').hide();
    },

    showOrHideEditButton: function(){
        var userInfo = this.pageObj.orderCurrentUser.info;
        var lockerIsMe;
        var canBeEdited;

        lockerIsMe = userInfo.userId === parseInt(this.pageObj.orderDataGrid.selectedOrder['locker_cs_id'] || 0, 10);
        canBeEdited = parseInt(this.pageObj.orderDataGrid.selectedOrder['order_status'], 10) < 500;

        /*if(this.currentTabIndex === 0){
         $('#J-detail-control-but').show();
         }else{*/
        if(lockerIsMe === true && canBeEdited === true){
            $('#J-detail-control-but').show();
        }else{
            $('#J-detail-control-but').hide();
        }
        //}
    },

    loadDetailLogInfo: function(currentTabIndex){
        switch (currentTabIndex)
        {
            case 6:
                if(!this.pageObj.orderDetailOperationLog.dataHasLoaded)
                    this.pageObj.orderDetailOperationLog.renderLogMsg();
                break;
            case 7:
                if(!this.pageObj.orderDetailReturnInfo.dataHasLoaded)
                    this.pageObj.orderDetailReturnInfo.renderLogMsg();
                break;
            case 8:
                if(!this.pageObj.orderDetailReturnLog.dataHasLoaded)
                    this.pageObj.orderDetailReturnLog.renderLogMsg();
                break;
            case 9:
                if(!this.pageObj.orderDetailPurchaseLog.dataHasLoaded)
                    this.pageObj.orderDetailPurchaseLog.renderLogMsg();
                break;
            default:
                break;
        }
    },

    resetAllTabLoadedFlag: function(){
        this.pageObj.orderDetailBasicInfo.dataHasLoaded = false;
        this.pageObj.orderDetailProductMsg.dataHasLoaded = false;
        this.pageObj.orderDetailReceiverMsg.dataHasLoaded = false;
        this.pageObj.orderDetailFinanceMsg.dataHasLoaded = false;
        this.pageObj.orderDetailInvoiceMsg.dataHasLoaded = false;
        this.pageObj.orderDetailDepotMsg.dataHasLoaded = false;

        this.pageObj.orderDetailOperationLog.dataHasLoaded = false;
        this.pageObj.orderDetailReturnInfo.dataHasLoaded = false;
        this.pageObj.orderDetailReturnLog.dataHasLoaded = false;
        this.pageObj.orderDetailPurchaseLog.dataHasLoaded = false;
    },

    //保存产品详情信息
    saveDetailMsg: function () {
        var _this = this,
            userToken,
            subParamsOne,
            subParamsTwo,
            subParamsThree,
            subParamsFour,
            subParamsFive,
            subParamsSix;

        userToken = _this.pageObj.orderCurrentUser.getCurrentToken();

        if(!userToken || userToken === ''){
            H.alert('获取用户令牌失败，请退出登录后重新登录。');
            return false;
        }

        // if(!this.valid()) return false;

        subParamsOne = _this.pageObj.orderDetailBasicInfo.getSubmitParams(),
        subParamsTwo = _this.pageObj.orderDetailProductMsg.getSubmitParams(),
        subParamsThree = _this.pageObj.orderDetailReceiverMsg.getSubmitParams(),
        subParamsFour = _this.pageObj.orderDetailFinanceMsg.getSubmitParams(),
        subParamsFive = _this.pageObj.orderDetailInvoiceMsg.getSubmitParams(),
        subParamsSix = _this.pageObj.orderDetailDepotMsg.getSubmitParams();

        $.ajax({
            url: SYS_VARS.INTERFACE_URL + 'order_apiv1/order/edit.json',
            method: 'post',
            type: 'json',
            timeout: 10000,
            data: JSON.stringify({
                order_id: _this.pageObj.orderDetailBasicInfo.renderData.order_id, //find target order id
                order_info: subParamsOne,
                order_goods: subParamsTwo,
                order_consignee: subParamsThree,
                order_finance: subParamsFour,
                order_invoice: subParamsFive,
                order_stock: subParamsSix
            }),
            success: function (data) {
                var $html = '';
                if(data.code==='-1' || data.code===-1){
                    $html += data.msg;    
                }else{
                    var $arr = ['info', 'goods', 'consignee', 'finance', 'invoice'];
                    for(var i in $arr)
                    {
                        if(data['order_'+$arr[i]+'_msg'] !== undefined){
                            if(data['order_'+$arr[i]+'_code'] == 0){
                                $html += "<p>" + data['order_'+$arr[i]+'_msg'] + "</p>";
                            }else{
                                $html += '<p class="red">order_'+$arr[i]+'_msg保存出错!</p>';
                            }
                        }
                    }
                }
                H.alert($html);
                
                _this.pageObj.orderDataGrid.getOrderDetail();
                _this.setBtnFolkStatus();
                _this.setStatusAddToModify(_this.pageObj.orderDetailInvoiceMsg.renderData);
            },
            error: function () {
                H.alert('保存产品详情信息接口调用失败');
            }
        });
    },

    //当保存数据时，将所有添加的状态修改为修改状态
    setStatusAddToModify: function(data){
        //for(var i in data){
        //    if(data[i].being_deleted_goods == '1'){
        //        data[i].being_deleted_goods = 0;
        //    }
        //}
        console.log(data);
    },

    //设置保存编辑按钮状态
    setBtnFolkStatus: function(){
        $('#J-pro-detail-edit').show();
        $('#J-pro-detail-cancel').hide();
        $('#J-pro-detail-save').removeClass('cm-btn-blue').addClass('cm-btn-gray');

        $('#J-pro-btn-wrap, #J-invoice-btn-wrap').hide(); //product information & invoice information will be hide
    },

    //将子模块的状态设置为编辑状态
    setModulesToEditStatus: function () {
        var _this = this;
        _this.pageObj.orderDetailBasicInfo.setEditStatus();
        _this.pageObj.orderDetailProductMsg.setEditStatus();
        _this.pageObj.orderDetailReceiverMsg.setEditStatus();
        _this.pageObj.orderDetailFinanceMsg.setEditStatus();
        _this.pageObj.orderDetailInvoiceMsg.setEditStatus();
        _this.pageObj.orderDetailDepotMsg.setEditStatus();

        $('#J-pro-detail-edit').hide();
        $('#J-pro-detail-cancel').show();
        $('#J-pro-detail-save').removeClass('cm-btn-gray').addClass('cm-btn-blue').show();
    },

    //将子模块的状态设置为普通状态
    setModulesToSimpleStatus: function () {
        var _this = this;
        _this.pageObj.orderDetailBasicInfo.setSimpleStatus();
        _this.pageObj.orderDetailProductMsg.setSimpleStatus();
        _this.pageObj.orderDetailReceiverMsg.setSimpleStatus();
        _this.pageObj.orderDetailFinanceMsg.setSimpleStatus();
        _this.pageObj.orderDetailInvoiceMsg.setSimpleStatus();
        _this.pageObj.orderDetailDepotMsg.setSimpleStatus();

        $('#J-pro-detail-edit').show();
        $('#J-pro-detail-cancel').hide();
        $('#J-pro-detail-save').removeClass('cm-btn-blue').addClass('cm-btn-gray').hide();
    },

    //绑定事件
    bindEvents: function (pageObj) {
        $('#J-pro-detail-edit').on('click', function () {
            pageObj.orderDetail.setModulesToEditStatus();
        });

        $('#J-pro-detail-cancel').on('click', function () {
            pageObj.orderDetail.setModulesToSimpleStatus();
        });

        $('#J-pro-detail-save').on('click', function () {
            if($('#J-pro-detail-edit').is(':visible')){
                H.alert('请进入编辑状态后再保存！');
                return false;
            }
            pageObj.orderDetail.saveDetailMsg();
        });

        $(document).on('click', '#J-detail-cont-wrap th input:checkbox', function(){
            if( $(this).prop('checked') )
            {
                $(this).parents('table').find('tbody input:checkbox').prop('checked', true);
            }else{
                $(this).parents('table').find('tbody input:checkbox').prop('checked', false);
            }
        });
    }
};

module.exports = orderDetail;
