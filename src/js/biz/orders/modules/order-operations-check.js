'use strict';

var orderOperationsCheck = function(){
	this.pageObj;

	this.init = function(params){
		this.pageObj = params.pageObj;
		this.confirmPop;
		/*this.selectedRecords = [];*/
		this.manualList = null;
		this.oldManualList = null;
		this.count = 0;
	};

	this.doCheckConfirm = function(){
		var list = this.pageObj.orderDataGrid.selectedOrderList;
		var orderIds = [];
		var self = this;
		var url, mockUrl;

		list.forEach(function(item){
			orderIds.push(item['order_id']);
		});

		mockUrl = '../src/data/do-check-result.json';
		url = SYS_VARS.INTERFACE_OFC_URL + this.pageObj.orderOperationsConfig['do-check']['url'];
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
				order_ids: orderIds
			}),
			success: function (data) {
				self.pageObj.loadingBox.hide();
				self.handleCheckSuccess(data);
			},
			error: function () {
				self.pageObj.loadingBox.hide();
				H.alert('客审订单失败，请稍后重试');
			}
		});
	};

	this.handleCheckSuccess = function(res){
		if(res.code === 200 || res.code === '200'){
			H.alert('客审订单成功');
			this.changeTabToWaitForDelivery();
		}else{
			this.handleCheckFailed(res);
		}
	};

	this.changeTabToWaitForDelivery = function(){
		var tab = $('#tabStatusFilter li:eq(3)');

		this.pageObj.orderTabFilter.toggleTab(tab);
	};

	this.handleCheckFailed = function(res){
		var checkFailedIds;
		var checkData;

		if(res.data){
			checkFailedIds = res.data['check_failed_orders'] || [];

			checkData = res.data['manual_check_data'];

			if(checkData && checkData.length > 0){
				this.manualList = checkData;
				this.oldManualList = JSON.stringify(this.manualList);
				this.oldManualList = JSON.parse(this.oldManualList);
				this.showManuallyCheckConfirm(checkData, checkFailedIds);
			}else{
				H.alert('订单：<br/>' +checkFailedIds.join(',</br>') + '</br>审核失败，请重试', 4000);
			}
		}else{
			H.alert(res.msg + '<br/>' + '订单审核失败，请重试', 4000);
		}


	};

	this.showManuallyCheckConfirm = function(data, checkFailedIds){
		var totalList = this.pageObj.orderDataGrid.selectedOrderList;
		var self = this;
		var html, confirmInfo, listHtml;

		data.forEach(function(itme, index){
			itme['vender_coupon_html'] = self.getInputListHtml('vender_coupon', itme['vender_coupon'], index);
			itme['cash_coupon_html'] = self.getInputListHtml('cash_coupon', itme['cash_coupon'], index);
			itme['gift_coupon_html'] = self.getInputListHtml('gift_coupon', itme['gift_coupon'], index);
			itme['points_html'] = self.getPointsHtml('points', itme['points']);
		});

		listHtml = H.template($('#J-check-order-pop-list-tpl').html(), {list: data});

		confirmInfo = {
			totalCount: totalList.length,
			manualCount: data.length,
			failedCount: checkFailedIds.length,
			failedIds: checkFailedIds.join(','),
			checkContent: listHtml
		};

		html = H.template($('#J-check-order-pop-tpl').html(), confirmInfo);

		this.confirmPop = H.dialog({
			title: '人工审核确认',
			content: html,//弹窗内容
			quickClose: true,//点击空白处快速关闭
			padding: 10,//弹窗内边距
			backdropOpacity: 0.3,//遮罩层透明度(默认0.7)
			onremove: function () {
				//关闭弹窗后将pager对象缓存清空
			}
		}).show();
	};

	this.getInputListHtml = function(field, data, index){
		var html = [];

		if(data && data.length > 0){
			data.forEach(function(item, i){
				html.push('<em>');
				html.push('<input type="text" oninput="orders.orderOperationsCheck.changeTotalPay(this, ' + i + ');" data-field="' + field + '" data-sub-index="' + i + '" data-index="' + index + '" value="' + (item.value || 0) + '">');
				html.push('￥</em>');
			});
		}

		return html.join('');
	};

	this.getPointsHtml = function(field, data){
		var html = [];

		if(data && data.length > 0){
			data.forEach(function(item){
				html.push('<span style="display:block" data-field="' + field + '">' + (item.value || 0)  + '</span>');
			});
		}

		return html.join('');
	};

	this.doManualCheck = function(orderIndex, action){
		var listPanel = $('#J-check-order-pop .check-order-pop-content');
		var validate;

		if(action === true){
			validate = this.doValidateFields(listPanel.eq(orderIndex));

			if(validate.res !== true){
				H.alert(validate.msg, 4000);
				return false;
			}
		}

		if(orderIndex < this.manualList.length){
			if(action === true){
				this.count ++;
			}

			listPanel.eq(orderIndex).hide();

			if(orderIndex + 1 < this.manualList.length){
				listPanel.eq(orderIndex + 1).show();
			}
		}

		if(orderIndex === this.manualList.length - 1){
			this.sendManualRequest();
		}
	};

	this.doValidateFields = function(panel){
		var delivery_amount = panel.find('input[data-field="delivery_amount"]').val();
		var gift_coupon = panel.find('input[data-field="gift_coupon"]');
		var cash_coupon = panel.find('input[data-field="cash_coupon"]');
		var order_point = panel.find('input[data-field="use_points"]').val();
		var validate = {
			res: true,
			msg: ''
		};

		delivery_amount = delivery_amount === '' || !delivery_amount ? 0: parseInt(delivery_amount, 10);
		//gift_coupon = gift_coupon === '' || !gift_coupon ? 0: parseInt(gift_coupon, 10);
		//cash_coupon = cash_coupon === '' || !cash_coupon ? 0: parseInt(cash_coupon, 10);
		order_point = order_point === '' || !order_point ? 0: parseInt(order_point, 10);

		if(delivery_amount <= 0){
			validate.res = false;
			validate.msg = '物流费用不能小于0';
			return validate;
		}

		if(gift_coupon.length > 0){
			validate = this.checkMoneyList(gift_coupon, '+', '礼品券换购金额不能小于0');
			if(validate.res === false){
				return validate;
			}
		}

		if(cash_coupon.length > 0){
			validate = this.checkMoneyList(cash_coupon, '-', '现金券抵扣金额不能大于0');
			if(validate.res === false){
				return validate;
			}
		}

		if(order_point > 0){
			validate.res = false;
			validate.msg = '本单使用积分数额不能大于0';
			return validate;
		}

		return validate;
	};

	this.checkMoneyList = function(list, flag, msg){
		var validate = {
			res: true,
			msg: ''
		};;

		list.each(function(){
			var value = $(this).val();

			value = (value && value!=='') ? value : 0;
			value = parseInt(value, 10);

			if(flag === '+'){
				if(value < 0){
					validate.res = false;
					validate.msg = msg;
					return false;
				}
			}else{
				if(value > 0){
					validate.res = false;
					validate.msg = msg;
					return false;
				}
			}


		});

		return validate;
	};

	this.sendManualRequest = function(){
		var mockUrl, url, self = this;

		this.confirmPop.remove();

		if(this.count > 0){
			mockUrl = '../src/data/do-check-manual-result.json';
			url = SYS_VARS.INTERFACE_OFC_URL + this.pageObj.orderOperationsConfig['do-check-manual']['url'];
			url = this.pageObj.needMockData ? mockUrl: url;

			self.pageObj.loadingBox.show();

			$.ajax({
				url: url,
				method: 'POST',
				type: 'json',
				timeout: 10000,
				data: JSON.stringify({
					data: self.manualList
				}),
				headers: {
					'userToken': self.pageObj.orderCurrentUser.getCurrentToken()
				},
				success: function (data) {
					self.pageObj.loadingBox.hide();
					self.handleCheckAgainSuccess(data);
				},
				error: function () {
					self.pageObj.loadingBox.hide();
					H.alert('客审订单失败，请稍后重试');
				}
			});
		}
	};

	this.changeTotalPay = function(input, index){
		var panel, val;


		input = $(input);
		val = input.val();

		if(val === '+' || val === '-' || !val || val === ''){
			return false;
		}

		panel = $('#J-check-order-list-content-' + index);

		this.changeTheTotalValue(input, index, panel);
		this.updateSubmitList(index, panel);
	};

	this.changeTheTotalValue = function(input, index, panel){
		var order_total, unpaid_amount, paid_amount, goods_amount, newRemain, newTotal, calculateInputs, changeVal;

		order_total = panel.find($('span[data-field="total"]').eq('0'));
		unpaid_amount = panel.find($('span[data-field="unpaid_amount"]').eq('0'));
		goods_amount = panel.find($('span[data-field="goods_amount"]').eq('0'));
		paid_amount = panel.find($('span[data-field="paid_amount"]').eq('0'));

		if(input.attr('data-field') !== 'use_points'){
			changeVal = 0;
			calculateInputs = panel.find('input[type="text"]').filter(function(){return $(this).attr('data-field') !== 'use_points'; });

			calculateInputs.each(function(){
				changeVal = changeVal + parseInt($(this).val() || 0, 10);
			});

			newTotal = parseInt(goods_amount.text(), 10) + changeVal;
			newRemain = newTotal - parseInt(paid_amount.text(), 10);

			order_total.text(newTotal);
			unpaid_amount.text(newRemain);

			if(newRemain < 0){
				//TODO need to return the money to use
			}
		}
	};

	this.updateSubmitList = function(index, panel){
		var list = this.manualList[index];

		for(var key in list){
			var inputField = panel.find('input[data-field="' + key+ '"]');
			var spanField = panel.find('span[data-field="' + key+ '"]');

			if(inputField.length > 1){
				inputField.each(function(){
					var subIndex = $(this).attr('data-sub-index');

					if(subIndex && subIndex !== ''){
						list[key][subIndex]['value'] = parseInt(($(this).val() || 0));
					}else{
						list[key] = parseInt(($(this).val() || 0));
					}
				});
			}

			if(spanField.length > 1){
				list[key] = parseInt((spanField.eq(0).val() || 0));
			}
		}

		//console.info(JSON.stringify(this.manualList, '\n', '    '));
	};

	this.handleCheckAgainSuccess = function(data){
		if(data.code === 200 || data.code === '200'){
			H.alert('客审订单成功');
			this.changeTabToWaitForDelivery();
		}else{
			H.alert('订单：<br/>' + data.data.join(',</br>') + '</br>' + '审核失败，请稍后重试', 4000);
			this.manualList = null;
			this.count = 0;
		}
	};

};

module.exports = new orderOperationsCheck();