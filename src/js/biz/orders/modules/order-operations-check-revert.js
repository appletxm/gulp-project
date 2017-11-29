'use strict';

var orderOperationsCheckRevert = function(){
	this.pageObj;
	this.confirmPop = null;
	this.goods = null;

	this.init = function(params){
		this.pageObj = params.pageObj;
	};

	this.doConfirm = function(){
		var list = this.pageObj.orderDataGrid.selectedOrderList;
		var order_ids = [], html = [];

		list.forEach(function(item){
			order_ids.push(item['order_id']);
		});

		html.push('<div class="button-row">');
		html.push('请确认你要反审核的订单：' + order_ids.join('，') + '<br/><br/>');
		html.push('</div>');

		html.push('<div class="button-row">');
		html.push('<input type="button" class="btn btn-sm btn-gray" value="取消" onclick="orders.orderOperationsCheckRevert.doCancel();"> ');
		html.push('<input type="button" class="btn btn-sm btn-primary" value="确认" onclick="orders.orderOperationsCheckRevert.doCheckRevert();">');
		html.push('</div>');

		this.confirmPop = H.dialog({
			title: '反审核订单确认',
			content: html.join(''),//弹窗内容
			width: 400,
			quickClose: true,//点击空白处快速关闭
			padding: 10,//弹窗内边距
			backdropOpacity: 0.3
		}).show();
	};

	this.doCheckRevert = function(){
		var list = this.pageObj.orderDataGrid.selectedOrderList;
		var self = this;
		var url, mockUrl;
		var order_ids = [];

		list.forEach(function(item){
			order_ids.push(item['order_id']);
		});

		mockUrl = '../src/data/do-lock-result.json';
		url = SYS_VARS.INTERFACE_OFC_URL + this.pageObj.orderOperationsConfig['do-check-revert']['url'];
		url = this.pageObj.needMockData ? mockUrl : url;
		//console.info('url:' + url);

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
				self.handleError('订单反审核失败，请稍后重试', 4000);
			}
		});
	};

	this.doCancel = function(){
		this.confirmPop.remove();
	};

	this.handleSuccess = function(res, order_ids){
		this.confirmPop.remove();

		if(res.code === 200 || res.code === '200'){
			H.alert('订单：<br/>' + order_ids.join('<br/>') + '<br/>反审核成功');
		}else{
			this.handleError('订单：<br/>' + res.data.join('<br/>') + '<br/>反审核失败，请稍后重试', 4000);
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

module.exports = new orderOperationsCheckRevert();