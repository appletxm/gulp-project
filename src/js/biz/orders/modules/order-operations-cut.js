'use strict';

var orderOperationsCut = function(){
	this.pageObj;
	this.confirmPop = null;
	this.goods = null;

	this.init = function(params){
		this.pageObj = params.pageObj;
	};

	this.doCutConfirm = function(){
		var list = this.pageObj.orderDataGrid.selectedOrderList;
		var self = this;
		var url, mockUrl;

		mockUrl = '../src/data/order-detail.json';
		url = SYS_VARS.INTERFACE_URL + 'order_apiv1/orders/list.json';
		url = this.pageObj.needMockData ? mockUrl : url;

		$.ajax({
			url: url,
			method: 'GET',
			type: 'json',
			timeout: 10000,
			data: {
				order_id: list[0]['order_id']
			},
			success: function (data) {
				self.handleGetDetailSuccess(data);
			},
			error: function () {
				self.handleError('获取订单商品列表失败，请稍后重试');
			}
		});
	};

	this.handleGetDetailSuccess = function(res){
		var goods;

		if(res.code === 200 || res.code === '200'){
			if(res.data){
				goods = res['data']['order_goods'];
				if(goods && goods.length > 0){
					this.goods = this.separateGoods(goods);
					this.showGoodsList(this.goods);
				}
			}else{
				this.handleError('获取子订单失败，请稍后重试');
			}
		}else{
			this.handleError('获取子订单失败，请稍后重试');
		}
	};

	this.separateGoods = function(goods){
		var newGoodsList = [];

		goods.forEach(function(good){
			var no = parseInt(good['order_quantity'] || 0, 10);

			if(no && no > 1){
				for(var i = 0; i < no; i++){
					var newGoodObj = JSON.parse(JSON.stringify(good));
					var total_money = (parseFloat(good['total_money'] || 0)/no).toFixed(2);

					newGoodObj['quantity'] = 1;
					newGoodObj['price'] = total_money;
					newGoodObj['total_money'] = total_money;
					newGoodsList.push(newGoodObj);
				}
			}else{
				good['quantity'] = 1;
				good['price'] = good['total_money'].toFixed(2);
				newGoodsList.push(good);
			}
		});

		return newGoodsList;
	};

	this.showGoodsList = function(goods){
		var trs = H.template($('#J-cut-order-pop-list-tpl').html(), {list: goods});
		var popParam, html;

		popParam = {
			orderId: this.pageObj.orderDataGrid.selectedOrderList[0]['order_id'],
			cutContent: trs
		};

		html = H.template($('#J-cut-order-pop-tpl').html(), popParam);

		this.confirmPop = H.dialog({
			title: '剪切订单确认',
			content: html,//弹窗内容
			quickClose: true,//点击空白处快速关闭
			padding: 10,//弹窗内边距
			backdropOpacity: 0.3,//遮罩层透明度(默认0.7)
			onremove: function () {},
			onshow: function () {}
		}).show();
	}

	this.doCut = function(){
		var goods = this.goods;
		var select = $('#J-cut-order-pop select');
		var combineList = {};
		var count = 0;

		select.each(function(index){
			var combineNo = $(this).val() + '';
			if(!combineList[combineNo]){
				combineList[combineNo] = [];
				count++;
			}
			combineList[combineNo].push(goods[index]);
		});

		if(count <= 1){
			H.alert('将药品分配在不同的选项内，否则订单将不作剪切', 4000);
		}else{
			this.confirmPop.remove();
			this.sendCutRequestToServer(combineList);
		}
	};

	this.sendCutRequestToServer = function(combineList){
		var list = this.pageObj.orderDataGrid.selectedOrderList;
		var self = this;
		var url, mockUrl;

		mockUrl = '../src/data/do-cut-result.json';
		url = SYS_VARS.INTERFACE_OFC_URL + this.pageObj.orderOperationsConfig['do-cut']['url'];
		url = this.pageObj.needMockData ? mockUrl : url;
		//console.info('url:' + url);

		self.pageObj.loadingBox.show();

		$.ajax({
			url: url,
			method: 'POST',
			type: 'json',
			timeout: 10000,
			data: JSON.stringify({
				order_id: list[0]['order_id'],
				order_list: combineList
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
				self.handleError('订单' + list[0]['order_id'] + '剪切失败，请稍后重试', 4000);
			}
		});
	};

	this.doCancel = function(){
		this.confirmPop.remove();
	};

	this.handleSuccess = function(res){
		var list = this.pageObj.orderDataGrid.selectedOrderList;
		var self = this;
		var msg;

		if(res.code === 200 || res.code === '200' || res.code === 0 || res.code === '0'){
			this.handleError('订单' + list[0]['order_id'] + '剪切成功');
			this.showNewOrders(res.data);
			this.changeTabToAll();
		}else{
			msg = (res.msg && res.msg !== '') ? (res.msg + '<br/>'):'';
			self.handleError(msg + '订单' + list[0]['order_id'] + '剪切失败，请稍后重试', 4000);
		}
	};

	this.showNewOrders = function(data){
		var html;
		var list = this.pageObj.orderDataGrid.selectedOrderList;

		data.map(function(item){
			item['order_quantity'] = item['quantity'];
			item['total'] = parseFloat(item['total'] || 0.00).toFixed(2);
		});

		html = H.template($('#J-cut-order-pop-order-list-tpl').html(), {list: data});

		html = '<p>订单成功剪切成以下几个订单：</p>' + html;

		H.dialog({
			title: list[0]['order_id'] + '剪切成功',
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

module.exports = new orderOperationsCut();