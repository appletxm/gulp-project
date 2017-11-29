'use strict';

var orderSearch = function(){

	this.searchParams = {
		tab_id : 1,                     // 1: 所有订单 2: 取消单待审批 3: 退换货待审批 6: 未发货 7: 待客审 9: 待锁定
		order_ids: '',                   //订单编号数组，可以单个，也可以多个
		source_orders : '',             //销售平台订单号数组，可以单个，也可以多个
		shop_id: -1,                    //店铺ID（页面显示为店铺名称，但传给后台需要获取对应的ID）
		use_place_date: -1,             //是否启用订单生成时间或下单时间（需要与时间范围结合一起使用）查询,可用的值
										//order_time: 下单时间 payment_time: 支付时间  cs_audit_at: 客服审核时间  delivery_limit_time: 发货时限
										//created_at: 创建时间 modified_at: 修改时间

		order_date_start: '',           //开始时间
		order_date_end: '',             //结束时间
		waybill_num: '',                //物流单号
		order_status: -1,               //订单状态
		oper_id: -1,                    //操作ID
		cs_id: -1,                      //客服锁定人ID
		user_phone: '',                 //会员手机
		sku_or_goods_name: '',          //商品SKU(七乐康)OR商品名称
		payment_type: -1,               //支付方式
		consignee_name: '',             //收货人
		consignee_mobile: '',           //收货人手机

		data_format: 'jqgrid'
	};

	this.pageObj, this.callback;

	var buildSelectListHtml = function(list, bindObj){
		var options = [];

		list.forEach(function(option){
			options.push('<option value="' +  option.value + '">' + option.label + '</option>');
		});

		bindObj.html(options.join(''));
	};

	var checkListItem = function(list){
		var newList = [];
		var compareObj = {};
		var realString;

		list.forEach(function(item){
			if(compareObj[item] !== true){
				compareObj[item] = true;

				if((/^[\d|\w]+$/).test(item)){
					newList.push(item.replace(/\s/g, ''));
				}else{
					realString = item.match(/\d|\w/g);
					if(realString && realString.length > 1){
						newList.push(realString.join(''));
					}
				}
			}
		});

		return newList;
	};

	var getRecordsFromText = function(value){
		var records;

		records = value && value !== '' ? value.split('\n') : [];

		if(records && records.length >= 0){
			records = checkListItem(records);
		}

		return records.join(',');
	};

	var doValidateDate = function(startDate, endDate){
		var check = {
			res: false
		};
		//var reg = /^\d{4}-\d{2}-\d{2}\s\d{2}\:\d{2}\:\d{2}$/;

		if(endDate && endDate !== ''){
			if(startDate && startDate !== ''){
				if(startDate > endDate){
					check.msg = '开始时间不能大于结束时间';
				}else{
					check.res = true;
				}
			}else{
				check.msg = '请输入开始时间进行查询';
			}
		}else{
			if(startDate && startDate !== ''){
				check.msg = '请输入结束时间进行查询';
			}else{
				check.res = true;
			}
		}

		return check;
	};

	this.init = function(params){
		this.pageObj = params.pageObj;
		this.initCallback = params.callback;

		this.initDatePicker();
		this.getCustomLocker();
		this.getShops();
		this.buildAllSelectList();
		this.addEvent();
	};

	this.buildAllSelectList = function(){
		//buildSelectListHtml(this.pageObj.orderFilters.STORE_NAME, $('#salePlatform'));
		buildSelectListHtml(this.pageObj.orderFilters.ORDER_STATUS, $('#OrderStatus'));
		buildSelectListHtml(this.pageObj.orderFilters.OPERATION_ITEMS, $('#Operation'));
	};

	this.getCustomLocker = function(){
		var self = this;
		var url, mockUrl;

		mockUrl = '../src/data/get-serivers.json';
		url = SYS_VARS.INTERFACE_URL_NODE + 'user/listByIdentity';
		url = this.pageObj.needMockData ? mockUrl: url;

		$.ajax({
			url: url,
			method: 'GET',
			dataType: 'jsonp',
			timeout: 10000,
			data: {
				token: self.pageObj.orderCurrentUser.getCurrentToken(),
				identityId: parseInt(self.pageObj.orderCurrentUser.info.userIdentity, 10)
			},
			success: function (data) {
				self.fillLockersList(data);
			},
			error: function () {
				self.handleGetCSFailed();
			}
		});
	};

	this.fillLockersList = function(res){
		var html = [];
		var select = $('#searchInputPanel #Locker');
		var self = this;
		var data;

		html.push('<option value="-1">选择锁定人</option>');

		if(res.code === 1 || res.code === '1'){
			data = res.data.list;

			if(data && data.length > 0){
				data.forEach(function(item){
					var selected = '';
					/*if(self.pageObj.orderCurrentUser.info.userId === item['id']){
					 selected = ' selected="selected"';
					 }*/
					html.push('<option value="' + item['id'] + '" ' + selected + '>' + (item['user_real_name']||item['user_nick_name']) + '</option>');
				});

				select.html(html.join(''));
			}
		}else{
			H.alert('获取所有用户失败，请刷新页面重试');
		}
	};

	this.getShops = function(){
		var self = this;
		var url, mockUrl;

		mockUrl = '../src/data/get-shops-result.json';
		url = SYS_VARS.INTERFACE_URL + 'order_apiv1/order/platform_shops';
		url = this.pageObj.needMockData ? mockUrl: url;

		$.ajax({
			url: url,
			type: 'GET',
			dataType: 'json',
			success: function (data) {
				self.fillShopsList(data);
			},
			error: function () {
				H.alert('获取销售平台列表失败，请刷新页面重试');
			}
		});
	};

	this.fillShopsList = function(res){
		var html = [];
		var select = $('#searchInputPanel #salePlatform');
		var data;

		html.push('<option value="-1">选择销售店铺</option>');

		if(res.code === 200 || res.code === '200'){
			data = res.data;

			if(data && data.length > 0){
				data.forEach(function(item){
					var selected = '';
					html.push('<option value="' + (item['shop_id'] || -1) + '" ' + selected + '>' + (item['shop_name']||'') + '</option>');
				});

				select.html(html.join(''));
			}
		}else{
			H.alert((res.msg && res.msg !== '' ? (res.msg + '<br/>') : '') + '获取销售平台列表失败，请刷新页面重试');
		}
	};

	this.handleGetCSFailed = function(){

	};

	this.doSearch = function(){
		var panel = $('#searchInputPanel');
		var startDate, endDate, validateDate;

		startDate = panel.find('#StartDate').val();
		endDate = panel.find('#EndDate').val();
		validateDate = doValidateDate(startDate, endDate);

		if(validateDate.res !== true){
			H.alert(validateDate.msg);
			return false;
		}

		this.searchParams.order_ids = getRecordsFromText(panel.find('#orderNo').val());
		this.searchParams.source_orders = getRecordsFromText(panel.find('#salesNo').val());
		this.searchParams.shop_id = panel.find('#salePlatform').val();
		this.searchParams.use_place_date = panel.find('#orderTime').val();
		this.searchParams.order_date_start = startDate;
		this.searchParams.order_date_end = endDate;
		this.searchParams.waybill_num = panel.find('#ShippingNo').val();
		this.searchParams.order_status = panel.find('#OrderStatus').val();
		this.searchParams.oper_id = panel.find('#Operation').val();
		this.searchParams.cs_id = panel.find('#Locker').val();
		this.searchParams.user_phone = panel.find('#MemPhone').val();
		this.searchParams.sku_or_goods_name = panel.find('#GoodsSku').val();
		this.searchParams.payment_type = panel.find('#payment').val();
		this.searchParams.consignee_name = panel.find('#Receiver').val();
		this.searchParams.consignee_mobile = panel.find('#ReceiverPhone').val();

		this.pageObj.orderDataGrid.refreshDataGrid(this.searchParams);
	};

	this.doReset = function(){
		var selects, inputs;

		this.searchParams = {};

		inputs = $('#searchInputPanel input[type="text"]');
		inputs.val('');

		selects = $('#searchInputPanel  select');
		selects.each(function(){
			var options = $(this).find('option');
			options.removeAttr('selected');
			options.eq(0).attr('selected', 'selected');
		});
	};

	this.doOutput = function(){};

	this.handleClick = function(event){
		var target = event.target;
		var label = target.tagName.toLowerCase();
		var eventType = target.getAttribute('data-event');

		if(label === 'input' &&  eventType === 'do-search'){
			this.doSearch();
		}else if(label === 'input' &&  eventType === 'do-reset'){
			this.doReset();
		}else if(label === 'input' &&  eventType === 'do-output'){
			this.doOutput();
		}
	};

	this.initDatePicker = function(){
		var startDateDom = $('#StartDate');
		var endDateDom = $('#EndDate');
		var config = {
			format: 'yyyy-mm-dd hh:ii',
			autoclose: true,
			todayBtn: true,
			startDate: "2016-01-01 00:00",
			minuteStep: 5
		};

		startDateDom.datetimepicker(config);
		endDateDom.datetimepicker(config);

		startDateDom.datetimepicker('setStartDate', '2009-01-01');
		endDateDom.datetimepicker('setStartDate', '2009-01-01');

		setTimeout(function(){
			this.dateTimePickerResetPosition();
		}.bind(this), 50);
	};

	this.dateTimePickerResetPosition = function(){
		var inputs = $('#searchInputPanel input[data-type="datetime"]');
		var pickers = $('.datetimepicker');

		inputs.each(function(index, input){
			var top, left;

			input = $(input);
			top = input.offset().top + input.outerHeight();
			left = input.offset().left;

			pickers.eq(index).css({'top': top+'px', 'left': left + 'px'});
		});
	};

	this.addEvent = function(){
		var panel = $('#searchInputPanel');

		panel.bind('click', function(event){
			this.handleClick(event);
		}.bind(this));

		$(window).bind('resize', function(){
			this.dateTimePickerResetPosition();
		}.bind(this));
	};
};

module.exports = new orderSearch();
