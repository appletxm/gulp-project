'use strict';

var orderOperationsLockUnLock = function(){
	this.pageObj;

	this.init = function(params){
		this.pageObj = params.pageObj;
		/*this.selectedRecords = [];*/
		this.currentEventType = 1;
		this.typeStr = '锁定';
	};

	this.doLockUnlock = function(type){
		var list = this.pageObj.orderDataGrid.selectedOrderList;
		var orderIds = [];
		var self = this;
		var url, mockUrl;

		this.currentEventType = type;

		list.forEach(function(item){
			orderIds.push(item['order_id']);
		});

		mockUrl = '../src/data/do-lock-result.json';

		if(type === 1){
			url = SYS_VARS.INTERFACE_OFC_URL + this.pageObj.orderOperationsConfig['do-lock']['url'];
			this.typeStr = '锁定';
		}else{
			url = SYS_VARS.INTERFACE_OFC_URL + this.pageObj.orderOperationsConfig['do-unlock']['url'];
			this.typeStr = '解锁';
		}

		url = this.pageObj.needMockData ? mockUrl: url;

		self.pageObj.loadingBox.show();

		$.ajax({
			url: url,
			method: 'POST',
			type: 'json',
			timeout: 10000,
			data: JSON.stringify({
				order_ids: orderIds,
				is_lock: type === 1 ? 1:0,
				locker: self.pageObj.orderCurrentUser.info.userId
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
				H.alert(this.typeStr + '订单失败，请稍后重试');
			}
		});
	};

	this.handleSuccess = function(res){
		if(res.code === 200 || res.code === '200'){
			H.alert(this.typeStr + '订单成功');
			this.changeTabToWaitForCheck();
		}else{
			this.handleError(res);
		}
	};

	this.changeTabToWaitForCheck = function(){
		var tab = this.currentEventType === 1 ? $('#tabStatusFilter li:eq(2)') : $('#tabStatusFilter li:eq(1)');

		this.pageObj.orderTabFilter.toggleTab(tab);
	};

	this.handleError = function(res, time){
		time = time || 3000;

		if(res.data && res.data.length > 0){
			H.alert('订单：<br/>' + res.data.join(',</br>') + '</br>' + this.typeStr + '失败，请重试', time);
		}else{
			H.alert(res.msg + '<br/>' + this.typeStr + '失败，请重试', time);
		}

		if(res.data && res.data.length < this.pageObj.orderDataGrid.selectedOrderList.length){
			this.changeTabToAll();
		}

	};

	this.changeTabToAll = function(){
		var tab;

		/*if(this.currentEventType === 1){
			tab = $('#tabStatusFilter li:eq(2)');
		}else{
			tab = $('#tabStatusFilter li:eq(1)');
		}*/
		tab = $('#tabStatusFilter li:eq(0)');

		this.pageObj.orderTabFilter.toggleTab(tab);
	};

};

module.exports = new orderOperationsLockUnLock();