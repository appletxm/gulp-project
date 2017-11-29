'use strict';

var orderOperationsPauseRestart = function(){
	this.pageObj;
	this.confirmPop = null;
	this.type = null;

	this.init = function(params){
		this.pageObj = params.pageObj;
	};

	this.doConfirm = function(type){
		var list = this.pageObj.orderDataGrid.selectedOrderList;
		var order_ids = [], html = [], typeStr;

		this.type = type;
		typeStr = this.type === 1 ? '暂停' : '取消暂停';

		list.forEach(function(item){
			order_ids.push(item['order_id']);
		});

		html.push('<div class="button-row">');
		html.push('请确认你要' + typeStr + '的订单：<br/>' + order_ids.join('，<br/>') + '<br/><br/>');
		html.push('</div>');

		html.push('<div class="button-row">');
		html.push('<input type="button" class="btn btn-sm btn-gray" value="取消" onclick="orders.orderOperationsPauseRestart.doCancel();"> ');
		html.push('<input type="button" class="btn btn-sm btn-primary" value="确认" onclick="orders.orderOperationsPauseRestart.doPauseOrRestart();">');
		html.push('</div>');

		this.confirmPop = H.dialog({
			title: typeStr + '订单确认',
			content: html.join(''),//弹窗内容
			width: 400,
			quickClose: true,//点击空白处快速关闭
			padding: 10,//弹窗内边距
			backdropOpacity: 0.3
		}).show();
	};

	this.doPauseOrRestart = function(){
		var button;

		button = this.type === 1 ? $('#optionPanel input[data-event="do-pause"]') : $('#optionPanel input[data-event="do-cancel"]');

		this.confirmPop.remove();

		this.pageObj.orderOperationsMark.tag_ids = [];
		this.pageObj.orderOperationsMark.tag_ids.push(button.attr('data-tag-code'));
		this.pageObj.orderOperationsMark.doMark();
	};

	this.doCancel = function(){
		this.confirmPop.remove();
	};

	this.handleSuccess = function(res, order_ids){
		this.confirmPop.remove();

		if(res.code === 200 || res.code === '200'){
			H.alert('订单：<br/>' + order_ids.join('<br/>') + '<br/>' + (this.type === 1 ? '暂停' : '取消暂停') + '成功');
		}else{
			this.handleError('订单：<br/>' + res.data.join('<br/>') + '<br/>' + (this.type === 1 ? '暂停' : '取消暂停') + '失败，请稍后重试', 4000);
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

module.exports = new orderOperationsPauseRestart();