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
			'下单时间',
			'支付方式',
			'销售店铺',
			'买家留言',
			'卖家备注',
			'物流公司',
			'订单标签',
			'订单状态码',
			'订单状态',
			'是否锁定判断',
			'是否锁定',
			'锁定人id',
			'是否有处方药',
			'应付金额',
			'实付金额',
			'用户名',
			'用户电话',
			'收货人',
			'收货人电话',
			'商品数量',
			'收货地址'
		],
		colModel:[
			// {name:'edit',index:'edit',sortable: false,align:'center'},
			{name:'order_id',index:'order_id', sortable: true, sortorder: 'desc', width: 200}, //订单编号
			{name:'order_time',index:'order_time', sortable: true}, //下单时间
			{name:'payment_type_tag',index:'payment_type_tag', sortable: true}, //支付方式
			{name:'shop_name',index:'shop_name', sortable: true}, //销售店铺
			{name:'user_remark',index:'user_remark', sortable: false}, //买家留言
			{name:'vender_remark',index:'vender_remark', sortable: false}, //卖家备注
			{name:'company_name',index:'company_name', sortable: false}, //物流公司
			{name:'order_tags', align:'center', sortable: false}, //订单标签
			{name:'order_status', index:'order_status', sortable: false/*, hidden: true*/}, //订单状码
			{name:'order_status_name',index:'order_status_name', sortable: true}, //订单状态
			{name:'is_lock', index:'is_lock', sortable: false/*, hidden: true*/}, //是否锁定
			{name:'lock_tag',index:'lock_tag', sortable: true}, //是否锁定
			{name:'locker_cs_id',index:'locker_cs_id', sortable: true/*, hidden: true*/}, //锁定人id
			{name:'rx_tag',index:'rx_tag',align:'center', sortable: true}, //是否有处方药
			{name:'total',index:'total',align:'right', sortable: true}, //应付金额
			{name:'paid_amount',index:'paid_amount',align:'right', sortable: true}, //实付金额
			{name:'user_name',index:'user_name', sortable: true}, //用户名
			{name:'CustomerPhone',index:'CustomerPhone', sortable: true}, //用户电话?
			{name:'consignee_name',index:'consignee_name', sortable: false}, //收货人
			{name:'consignee_phone',index:'consignee_phone', sortable: true}, //收货人电话
			{name:'order_quantity',index:'order_quantity',align:'center', sortable: true}, //商品数量?
			{name:'address',index:'address', sortable: false} //收货地址
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
		config.formatData = this.formatDateTime.bind(this);
		config.loadComplete = this.loadCompleteForGrid.bind(this);
		config.gridComplete = this.setNewCssForGrid.bind(this);
		config.onCellSelect = this.handleCellClick.bind(this);
		config.onSelectRow = this.handleSelectRow.bind(this);
		config.onSelectAll = this.handleSelectAll.bind(this);
	};

	this.initDataGrid = function(needMockData){
		var mock_url, interface_url;
		var config = this.defaultConfig;

		mock_url = 'http://' + window.location.host + '/ofc_admin_order_front_end/' + 'src/data/jqgrid.json?q=2';
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
		var postData;

		postData = params || self.pageObj.orderSearch.searchParams;

		$('#jqgrid').jqGrid('setGridParam',{
			postData: postData, //发送数据
			page: 1
		}).trigger('reloadGrid'); //重新载入

		self.selectedOrderCode = '';
		self.selectedOrder = {};
		self.selectedOrderList = [];

		self.pageObj.orderDetail.clearDetailInfoPanel();
		self.pageObj.orderOperations.clearOperationButtonStatus();

		self.pageObj.loadingBox.show();
	};

	this.loadCompleteForGrid = function(httpRequest){
		//console.info('-------loadCompleteForGrid--------', httpRequest);
		this.pageObj.loadingBox.hide();
	};

	this.formatDateTime = function(data){
		var list = data ? data.rows : [];
		var self = this;

		list.map(function(item){
			item['order_time'] = self.pageObj.formatDateTime.doFormat(item['order_time']);
		});

		return data;
	};

	this.setNewCssForGrid = function(){
		/*// remove classes
		$('.ui-jqgrid').removeClass('ui-widget ui-widget-content');
		$('.ui-jqgrid-view').children().removeClass('ui-widget-header ui-state-default');
		$('.ui-jqgrid-labels, .ui-search-toolbar').children().removeClass('ui-state-default ui-th-column ui-th-ltr');
		$('.ui-jqgrid-pager').removeClass('ui-state-default');
		$('.ui-jqgrid').removeClass('ui-widget-content');

		// add classes
		$('.ui-jqgrid-htable').addClass('table table-bordered table-hover');
		$('.ui-jqgrid-btable').addClass('table table-bordered table-striped');


		$('.ui-pg-div').removeClass().addClass('btn btn-sm btn-primary');
		$('.ui-icon.ui-icon-plus').removeClass().addClass('fa fa-plus');
		$('.ui-icon.ui-icon-pencil').removeClass().addClass('fa fa-pencil');
		$('.ui-icon.ui-icon-trash').removeClass().addClass('fa fa-trash-o');
		$('.ui-icon.ui-icon-search').removeClass().addClass('fa fa-search');
		$('.ui-icon.ui-icon-refresh').removeClass().addClass('fa fa-refresh');
		$('.ui-icon.ui-icon-disk').removeClass().addClass('fa fa-save').parent('.btn-primary').removeClass('btn-primary').addClass('btn-success');
		$('.ui-icon.ui-icon-cancel').removeClass().addClass('fa fa-times').parent('.btn-primary').removeClass('btn-primary').addClass('btn-danger');*/

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

				$('#jqgrid>tbody>tr').removeClass('highlight');
				$('#jqgrid #'+rowid).addClass('highlight');
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
};

module.exports = new orderDataGrid();
