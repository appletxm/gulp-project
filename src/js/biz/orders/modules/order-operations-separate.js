'use strict';

var orderOperationsSeparate = function(){
	this.pageObj;
	this.confirmPop = null;
	this.goods = null;

	this.init = function(params){
		this.pageObj = params.pageObj;
	};

	this.doConfirm = function(){
		var list = this.pageObj.orderDataGrid.selectedOrderList;
		var self = this;
		var url, mockUrl;

		mockUrl = '../src/data/get-separate-order-list.json';
		url = SYS_VARS.INTERFACE_OFC_URL + 'ofc/api/order/split_info/';
		url = this.pageObj.needMockData ? mockUrl : url;
		//console.info('url:' + url);

		$.ajax({
			url: url,
			method: 'GET',
			type: 'json',
			timeout: 10000,
			headers: {
				'userToken': self.pageObj.orderCurrentUser.getCurrentToken()
			},
			data: {
				order_id: list[0]['order_id']
			},
			success: function (res) {
				if(res.code === 200 || res.code === '200'){
					self.showConfirmBox(res.data);
				}else{
					self.handleError('获取订单：' + list[0]['order_id'] + '的子订单失败，请稍后重试', 4000);
				}
			},
			error: function () {
				self.handleError('获取订单：' + list[0]['order_id'] + '的子订单失败，请稍后重试', 4000);
			}
		});
	};

	this.showConfirmBox = function(data){
		var list = this.pageObj.orderDataGrid.selectedOrderList;
		 var html, popHtml;

		 list = JSON.parse(JSON.stringify(list));
		 //list.quantity = list.total;

		 html = H.template($('#J-cut-order-pop-order-list-tpl').html(), {list: data});
		 popHtml = H.template($('#J-separate-order-pop-tpl').html(), {cutContent: html, order_id: list[0]['order_id']});

		 this.confirmPop = H.dialog({
		 title: '拆分订单确认',
		 content: popHtml,//弹窗内容
		 width: 400,
		 quickClose: true,//点击空白处快速关闭
		 padding: 10,//弹窗内边距
		 backdropOpacity: 0.3
		 }).show();
	};

	this.doSeparate = function(){
		var list = this.pageObj.orderDataGrid.selectedOrderList;
		var self = this;
		var url, mockUrl;

		mockUrl = '../src/data/do-check-result.json';
		url = SYS_VARS.INTERFACE_OFC_URL + this.pageObj.orderOperationsConfig['do-separate']['url'];
		url = this.pageObj.needMockData ? mockUrl : url;
		//console.info('url:' + url);

		self.pageObj.loadingBox.show();

		$.ajax({
			url: url,
			method: 'POST',
			type: 'json',
			timeout: 10000,
			data: JSON.stringify({
				order_id: list[0]['order_id']
			}),
			headers: {
				'userToken': self.pageObj.orderCurrentUser.getCurrentToken()
			},
			success: function (data) {
				self.pageObj.loadingBox.hide();
				self.handleSuccess(data);
			},
			error: function () {
				self.pageObj.loadingBox.hide();
				self.handleError('订单：' + list[0]['order_id'] + '拆分失败，请稍后重试', 4000);
			}
		});
	};

	this.doCancel = function(){
		this.confirmPop.remove();
	};

	this.handleSuccess = function(res){
		var list = this.pageObj.orderDataGrid.selectedOrderList;

		this.confirmPop.remove();

		if(res.code === 200 || res.code === '200'){
			H.alert('订单：' + list[0]['order_id'] + '拆分成功');
		}else{
			this.handleError('订单：' + list[0]['order_id'] + '拆分失败，请稍后重试', 4000);
		}
	};

	this.changeTabToAll = function(){
		var tab = $('#tabStatusFilter li:eq(0)');

		this.pageObj.orderTabFilter.toggleTab(tab);
	};

	this.handleError = function(msg, time){
		H.alert(msg, time || 2000);
		//this.pageObj.orderDataGrid.refreshDataGrid();
	};

};

module.exports = new orderOperationsSeparate();