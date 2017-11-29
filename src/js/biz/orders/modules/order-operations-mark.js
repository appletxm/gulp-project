'use strict';

var orderOperationsMark = function(){
	this.pageObj;
	this.confirmPop = null;
	this.tag_ids = [];

	this.init = function(params){
		this.pageObj = params.pageObj;
	};

	this.getMarkList = function(){
		var self = this;
		var url, mockUrl;

		mockUrl = '../src/data/get-mark-lsit-result.json';
		url = SYS_VARS.INTERFACE_OFC_URL + 'ofc/api/order/stick_tags/';
		url = this.pageObj.needMockData ? mockUrl : url;
		//console.info('url:' + url);

		self.pageObj.loadingBox.show();

		$.ajax({
			url: url,
			method: 'GET',
			type: 'json',
			timeout: 10000,
			data: {
				cs_id: this.pageObj.orderCurrentUser.info.userId
			},
			headers: {
				'userToken': self.pageObj.orderCurrentUser.getCurrentToken()
			},
			success: function (data) {
				self.pageObj.loadingBox.hide();
				self.showMarkList(data);
			},
			error: function () {
				self.pageObj.loadingBox.hide();
				self.handleError('获取标签列表失败，请稍后重试');
			}
		});
	};

	this.showMarkList = function(res){
		var html, removeTagNames = ['暂停', '取消暂停', '取消订单'];

		if(res.code === '200' || res.code === 200){
			if(res.data && res.data.length > 0){

				res.data.map(function(item){
					/*if(item['tag_name'].indexOf('取消暂停') >= 0){
						item['event'] = 'do-restart';
					}else if(item['tag_name'].indexOf('暂停') >= 0){
						item['event'] = 'do-pause';
					}*/

					for(var i = 0; i<removeTagNames.length; i++){
						if(item['tag_name'] === removeTagNames[i]){
							item['needHide'] = true;
						}
					}
				});

				html = H.template($('#J-mark-order-pop-tpl').html(), {list: res.data});

				this.confirmPop = H.dialog({
					title: '选择标签',
					content: html,//弹窗内容
					width: 400,
					quickClose: true,//点击空白处快速关闭
					padding: 10,//弹窗内边距
					backdropOpacity: 0.3
				}).show();
			}else{
				H.alert('获取标签列表失败，请稍后重试');
			}
		}else{
			H.alert('获取标签列表失败，请稍后重试');
		}


	};

	this.markToggle = function(dom){
		var id, index;

		dom = $(dom);
		id = dom.attr('data-tag-code');

		if(dom.hasClass('active')){
			dom.removeClass('active');

			for(var i = 0; i < this.tag_ids.length; i++){
				if(this.tag_ids[i] === id){
					console.info('i:' + i);
					index = i;
					break;
				}
			}

			if(index !== null){
				this.tag_ids.splice(index, 1);
				index = null;
			}
		}else{
			dom.addClass('active');
			this.tag_ids.push(id)
		}
	};

	this.doMark = function(){
		var list = this.pageObj.orderDataGrid.selectedOrderList;
		var self = this;
		var url, mockUrl, order_ids = [];

		if(this.tag_ids.length <= 0){
			return false;
		}

		mockUrl = '../src/data/do-lock-result.json';
		url = SYS_VARS.INTERFACE_OFC_URL + this.pageObj.orderOperationsConfig['do-mark']['url'];
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
				order_ids: order_ids,
				tag_ids: this.tag_ids,
				cs_id: this.pageObj.orderCurrentUser.info.userId
			}),
			success: function (data) {
				self.pageObj.loadingBox.hide();
				self.handleSuccess(data);
			},
			error: function () {
				self.pageObj.loadingBox.hide();
				self.handleError('订单添加标签失败，请稍后重试');
			}
		});
	};

	this.doCancel = function(){
		this.clearMakeTagPanel();
	};

	this.handleSuccess = function(res){
		this.clearMakeTagPanel();

		if(res.code === 200 || res.code === '200'){
			H.alert('订单操作成功');
			this.pageObj.orderDataGrid.refreshDataGrid();
		}else{
			this.handleError('订单：<br/>' + res.data.join('<br/>')  + '<br/>添加标签失败，请稍后重试', 4000);
		}
	};

	this.handleError = function(msg, time){
		H.alert(msg, time || 2000);
		//this.pageObj.orderDataGrid.refreshDataGrid();
	};

	this.clearMakeTagPanel = function(){
		if(this.confirmPop){
			this.confirmPop.remove();
		}
		this.tag_ids = [];
	};
};

module.exports = new orderOperationsMark();