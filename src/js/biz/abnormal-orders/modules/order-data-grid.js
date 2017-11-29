'use strict';

var orderDataGrid = function(){
	this.pageObj;
	this.selectedOrderCode = '';
	this.selectedOrder = {};
	this.selectedOrderList = [];
	//this.currentGrid = null;
	this.param = {};

	this.defaultConfig = {
		url: '',
		datatype: 'json',
		mtype: 'POST',
		contentType: 'application/json',
		colNames:[
			'订单编号',
			'销售平台单号',
			'销售店铺',
			'下单时间',
			'异常类型',
			'挂起原因',
			'触发系统的ID',
			'触发系统',
			'挂起时间',
			'当前处理人',
			'处理时间',
			'相关操作',
			'订单当前状态',
			'订单状态码',
			'客服备注',
			'是否锁定判断',
			'是否锁定',
			'锁定人id'
		],
		colModel:[
			{name:'order_id',index:'order_id', sortable: true, sortorder: 'desc'}, //订单编号
			{name:'shop_name_order',index:'shop_name_order', sortable: true}, //销售店铺平台单号
			{name:'shop_name',index:'shop_name', sortable: true}, //销售店铺
			{name:'order_time',index:'order_time', sortable: true}, //下单时间
			{name:'msg_type',index:'msg_type', sortable: true}, //异常类型
			{name:'msg',index:'msg', sortable: true}, //挂起原因
			{name:'sys_level',index:'sys_level', sortable: false/*, hidden: true*/}, //触发系统的ID
			{name:'sys_level_label',index:'sys_level_label', sortable: false}, //触发系统
			{name:'problem_create_at',index:'problem_create_at ', sortable: false}, //挂起时间
			{name:'problem_cs_id',index:'problem_cs_id', sortable: false/*, hidden: true*/}, //当前处理人
			{name:'problem_process_at', index:'problem_process_at', align:'center', sortable: false}, //处理时间
			{name:'operation', index:'operation', sortable: false}, //相关操作
			{name:'order_status_name',index:'order_status_name', sortable: true}, //订单状态
			{name:'order_status',index:'order_status', sortable: true}, //订单状态码
			{name:'cs_mark',index:'cs_mark', sortable: false}, //客服备注
			{name:'is_lock', index:'is_lock', sortable: false/*, hidden: true*/}, //是否锁定
			{name:'lock_tag',index:'lock_tag', sortable: true}, //是否锁定
			{name:'locker_cs_id',index:'locker_cs_id', sortable: true/*, hidden: true*/} //锁定人id
		],
		rowNum: 10,
		rowList: [10,20,30],
		pager: '#grid-pager',

		//sortable: true,
		//sortname: 'order_id',
		//sortorder: 'desc',

		viewrecords: true,
		multiselect: true,
		width:$('.page-content').innerWidth() - 32,
		height:'auto',

		responsive: true
	};

	this.init = function(params){
		this.pageObj = params.pageObj;
		this.param['needMockData'] = params.needMockData;

		this.setGridConfig(params.needMockData);
		this.initDataGrid(params.needMockData);
		this.addEvent();
	};

	this.setGridConfig = function(needMockData){
		var config = this.defaultConfig;

		if(needMockData !== true){
			config.jsonReader = {
				root: "rows",
				page: "page",
				total: "total",
				records: "records",
				repeatitems: false
			};
		}

		config.loadError = this.setNewCssForGrid.bind(this);
		config.loadComplete = this.loadCompleteForGrid.bind(this);
		config.formatData = this.formatDateTime.bind(this);
		config.gridComplete = this.setNewCssForGrid.bind(this);
		config.onCellSelect = this.handleCellClick.bind(this);
		config.onSelectRow = this.handleSelectRow.bind(this);
		config.onSelectAll = this.handleSelectAll.bind(this);
	};

	this.initDataGrid = function(needMockData){
		var mock_url, interface_url;
		var config = this.defaultConfig;

		mock_url = '../src/data/jqgrid-abnormal-orders.json';
		interface_url = SYS_VARS.INTERFACE_URL + 'order_apiv1/orders/list.json';

		if(needMockData === true){
			config.url = mock_url;
		}else{
			config.url = interface_url;
			config.postData = this.pageObj.orderSearch.searchParams;
		}

		this.pageObj.loadingBox.show();

		jQuery('#jqgrid').jqGrid(config);
	};

	this.refreshDataGrid = function(params){
		var self = this;

		$('#jqgrid').jqGrid('setGridParam',{
			postData: params || self.pageObj.orderSearch.searchParams, //发送数据
			page: 1
		}).trigger('reloadGrid'); //重新载入

		self.selectedOrderCode = '';
		self.selectedOrder = {};
		self.selectedOrderList = [];

		self.pageObj.orderDetail.clearDetailInfoPanel();
		self.pageObj.orderOperations.clearOperationButtonStatus();

		self.pageObj.loadingBox.show();
	};

	this.loadCompleteForGrid = function(data){
		//console.info('-------loadCompleteForGrid--------', data);
		this.pageObj.loadingBox.hide();
	};

	this.formatDateTime = function(data){
		var list = data ? data.rows : [];
		var self = this;

		list.map(function(item){
			item['order_time'] = self.pageObj.formatDateTime.doFormat(item['order_time']);
			item['problem_create_at'] = self.pageObj.formatDateTime.doFormat(item['problem_create_at']);
			item['problem_process_at'] = self.pageObj.formatDateTime.doFormat(item['problem_process_at']);
		});

		return data;
	};

	this.setNewCssForGrid = function(){
		$( '.ui-icon.ui-icon-seek-prev').wrap( '<div class="btn btn-sm btn-default"></div>' );
		$('.ui-icon.ui-icon-seek-prev').removeClass().addClass('fa fa-backward');
		$('.ui-icon.ui-icon-seek-first' ).wrap( '<div class="btn btn-sm btn-default"></div>' );
		$('.ui-icon.ui-icon-seek-first').removeClass().addClass('fa fa-fast-backward');
		$('.ui-icon.ui-icon-seek-next' ).wrap( '<div class="btn btn-sm btn-default"></div>' );
		$('.ui-icon.ui-icon-seek-next').removeClass().addClass('fa fa-forward');
		$('.ui-icon.ui-icon-seek-end').wrap( '<div class="btn btn-sm btn-default"></div>' );
		$('.ui-icon.ui-icon-seek-end').removeClass().addClass('fa fa-fast-forward');
	};

	this.handleCellClick = function(rowid, iCol, cellcontent, e){
		if(iCol === 1){
			if(this.selectedOrderCode !== cellcontent){
				this.selectedOrderCode = cellcontent;
				this.selectedOrder = jQuery('#jqgrid').jqGrid('getRowData', rowid);
				//console.info(jQuery('#jqgrid').jqGrid('getRowData', rowid));

				this.pageObj.orderDetail.showOrHideEditButton();
				this.pageObj.orderDetail.getOrderDetail();
			}
		}/*else if(iCol === 0){
			this.getAllSelectedRows();
		}*/
	};

	this.handleSelectRow = function(rowid, status){
		this.getAllSelectedRows(rowid, status);
	};

	this.handleSelectAll = function(){
		this.getAllSelectedRows();
	};

	this.getAllSelectedRows = function(){
		var inputs = $('#jqgrid tbody').find('input[type="checkbox"]:checked');
		var id;
		var self = this;

		self.selectedOrderList = [];

		inputs.each(function(){
			id = $(this).attr('name').replace('jqg_jqgrid_', '');
			self.selectedOrderList.push(jQuery('#jqgrid').jqGrid('getRowData', id));
		});

		/*if(this.selectedOrderList.length <= 0){
			$('#J-detail-cont-wrap').hide();
		}*/

		this.pageObj.orderOperations.resetOptionsStatus(this.selectedOrderList);
	};

	this.addEvent = function(){
		$(document).on('click', '#jqgrid tbody tr', function(){
			$('#jqgrid tbody tr').removeClass('highlight');
			$(this).addClass('highlight');
		});
	};
};

module.exports = new orderDataGrid();
