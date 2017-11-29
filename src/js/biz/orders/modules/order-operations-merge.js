'use strict';

var orderOperationsMerge = function(){
	this.pageObj;
	this.confirmPop = null;
	this.goods = null;

	this.init = function(params){
		this.pageObj = params.pageObj;
	};

	this.doMergeConfirm = function(){
		var list = this.pageObj.orderDataGrid.selectedOrderList;
		var html, popHtml;

		list = JSON.parse(JSON.stringify(list));
		//list.quantity = list.total;

		html = H.template($('#J-cut-order-pop-order-list-tpl').html(), {list: list});
		popHtml = H.template($('#J-merge-order-pop-tpl').html(), {cutContent: html});

		this.confirmPop = H.dialog({
			title: '合并订单确认',
			content: popHtml,//弹窗内容
			width: 400,
			quickClose: true,//点击空白处快速关闭
			padding: 10,//弹窗内边距
			backdropOpacity: 0.3
		}).show();
	};

	this.doMerge = function(){
		var list = this.pageObj.orderDataGrid.selectedOrderList;
		var self = this;
		var url, mockUrl, order_ids = [];

		mockUrl = '../src/data/do-merge-result.json';
		url = SYS_VARS.INTERFACE_OFC_URL + this.pageObj.orderOperationsConfig['do-merge']['url'];
		url = this.pageObj.needMockData ? mockUrl : url;
		//console.info('url:' + url);

		list.forEach(function(item){
			order_ids.push(item['order_id']);
		});

		self.pageObj.loadingBox.show();

		$.ajax({
			url: url,
			method: 'POST',
			type: 'json',
			timeout: 10000,
			data: JSON.stringify({
				order_ids: order_ids
			}),
			headers: {
				'userToken': self.pageObj.orderCurrentUser.getCurrentToken()
			},
			success: function (data) {
				self.pageObj.loadingBox.hide();
				self.handleSuccess(data, order_ids);
			},
			error: function () {
				self.pageObj.loadingBox.hide();
				self.handleError('订单：<br/>' + order_ids.join('<br/>')  + '<br/>合并失败，请稍后重试', 4000);
			}
		});
	};

	this.doCancel = function(){
		this.confirmPop.remove();
	};

	this.handleSuccess = function(res, order_ids){
		this.confirmPop.remove();

		if(res.code === 200 || res.code === '200'){
			this.showNewOrders(res.data);
			this.changeTabToAll();
		}else{
			this.handleError('订单：<br/>' + order_ids.join('<br/>')  + '<br/>合并失败，请稍后重试', 4000);
		}
	};

	this.showNewOrders = function(data){
		var html;

		data[0].order_quantity = data[0].quantity;

		html = H.template($('#J-cut-order-pop-order-list-tpl').html(), {list: data});

		H.dialog({
			title: '合并成功',
			content: html,//弹窗内容
			width: 400,
			quickClose: true,//点击空白处快速关闭
			padding: 10,//弹窗内边距
			backdropOpacity: 0.3
		}).show();
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

module.exports = new orderOperationsMerge();