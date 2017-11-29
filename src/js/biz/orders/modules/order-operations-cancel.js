'use strict';

var orderOperationsCancel = function(){
	this.pageObj;
	this.confirmPop = null;
	this.goods = null;

	this.init = function(params){
		this.pageObj = params.pageObj;
	};

	this.doConfirm = function(){
		var list = this.pageObj.orderDataGrid.selectedOrderList;
		var order_ids = [], html = [], eventPrefix;

		list.forEach(function(item){
			order_ids.push(item['order_id']);
		});

		if(abNormalOrders){
			eventPrefix = 'abNormalOrders';
		}else{
			eventPrefix = 'orders';
		}

		html.push('<div class="button-row">');
		html.push('请确认你要取消的订单：<br/>' + order_ids.join('，<br/>') + '<br/><br/>');
		html.push('</div>');

		html.push('<div class="button-row">');
		html.push('<input type="button" class="btn btn-sm btn-gray" value="取消" onclick="' + eventPrefix + '.orderOperationsCancel.doCancel(\'' + eventPrefix + '\');"> ');
		html.push('<input type="button" class="btn btn-sm btn-primary" value="确认" onclick="' + eventPrefix + '.orderOperationsCancel.doCancelOrder(\'' + eventPrefix + '\');">');
		html.push('</div>');

		this.confirmPop = H.dialog({
			title: '取消订单确认',
			content: html.join(''),//弹窗内容
			width: 400,
			quickClose: true,//点击空白处快速关闭
			padding: 10,//弹窗内边距
			backdropOpacity: 0.3
		}).show();
	};

	this.doCancelOrder = function(pagePrefix){
		var list = this.pageObj.orderDataGrid.selectedOrderList;
		var orderIds = [];
		var self = this;
		var url, mockUrl, isAbnormalOrder;

		this.confirmPop.remove();

		list.forEach(function(item){
			orderIds.push(item['order_id']);
		});

		if(pagePrefix === 'abNormalOrders'){
			isAbnormalOrder = 1;
		}

		mockUrl = '../src/data/do-check-result.json';
		url = SYS_VARS.INTERFACE_OFC_URL + this.pageObj.orderOperationsConfig['do-cancel']['url'];
		url = this.pageObj.needMockData ? mockUrl: url;

		this.pageObj.loadingBox.show();

		$.ajax({
			url: url,
			method: 'POST',
			type: 'json',
			timeout: 10000,
			headers: {
				'userToken': self.pageObj.orderCurrentUser.getCurrentToken()
			},
			data: JSON.stringify({
				order_ids: orderIds,
				isAbnormalOrder: isAbnormalOrder
			}),
			success: function (data) {
				self.pageObj.loadingBox.hide();
				self.handleSuccess(data, orderIds);
			},
			error: function () {
				self.pageObj.loadingBox.hide();
				H.alert('订单取消失败，请稍后重试');
			}
		});
	};

	this.doCancel = function(){
		this.confirmPop.remove();
	};

	this.handleSuccess = function(res, order_ids){
		this.confirmPop.remove();

		if(res.code === 200 || res.code === '200'){
			H.alert('订单：<br/>' + order_ids.join('<br/>') + '<br/>取消成功');
		}else{
			this.handleError((res.msg || '') + '订单：<br/>' + res.data.join('<br/>') + '<br/>取消失败，请稍后重试', 4000);
		}
	};

	this.changeTabToAll = function(){
		//var tab = $('#tabStatusFilter li:eq(0)');
		this.pageObj.orderDataGrid.refreshDataGrid();
	};

	this.handleError = function(msg, time){
		H.alert(msg, time || 2000);
		//this.pageObj.orderDataGrid.refreshDataGrid();
	};

};

module.exports = new orderOperationsCancel();