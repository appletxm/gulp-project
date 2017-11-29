(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var loadingBox = require('../utils/loading.js');
var formatDateTime = require('../utils/format-date-time.js');

var currentUserInfo = require('../common/current-user-info.js');
var orderFilters = require('../common/order-filters-config.js');

var orderSearch = require('../orders/modules/order-search.js');
var orderTabFilter = require('../orders/modules/order-tab-filter.js');
var orderDataGrid = require('../orders/modules/order-data-grid.js');

var orderDetail = require('../orders/modules/order-detail.js');
var orderDetailBasicInfo = require('../orders/modules/order-detail-basic-info.js');
var orderDetailProductMsg = require('../orders/modules/order-detail-product-msg.js');
var orderDetailReceiverMsg = require('../orders/modules/order-detail-receiver-msg.js');
var orderDetailFinanceMsg = require('../orders/modules/order-detail-finance-msg.js');
var orderDetailInvoiceMsg = require('../orders/modules/order-detail-invoice-msg.js');
var orderDetailDepotMsg = require('../orders/modules/order-detail-depot-msg.js');
var orderDetailOperationLog = require('../orders/modules/order-detail-operation-log.js');
var orderDetailReturnInfo = require('../orders/modules/order-detail-return-info.js');
var orderDetailReturnLog = require('../orders/modules/order-detail-return-log.js');
var orderDetailPurchaseLog = require('../orders/modules/order-detail-purchase-log.js');

var orderOperations = require('../orders/modules/order-operations.js');
var orderOperationsConfig = require('../orders/modules/order-operations-config.js');
var orderOperationsLockUnLock = require('../orders/modules/order-operations-lock-unlock.js');
var orderOperationsCheck = require('../orders/modules/order-operations-check.js');
var orderOperationsCut = require('../orders/modules/order-operations-cut.js');
var orderOperationsMerge = require('../orders/modules/order-operations-merge.js');
var orderOperationsSeparate = require('../orders/modules/order-operations-separate.js');
var orderOperationsCheckRevert = require('../orders/modules/order-operations-check-revert.js');
var orderOperationsMark= require('../orders/modules/order-operations-mark.js');
var orderOperationsCancel= require('../orders/modules/order-operations-cancel.js');
var orderOperationsPauseRestart = require('../orders/modules/order-operations-pause-restart.js');

window.orders = {
	loadingBox: loadingBox,
	formatDateTime: formatDateTime,

	orderCurrentUser: currentUserInfo,
	orderFilters: orderFilters,

	orderSearch: orderSearch,
	orderTabFilter: orderTabFilter,

	orderDataGrid: orderDataGrid,

    orderDetail: orderDetail,
    orderDetailBasicInfo: orderDetailBasicInfo,
	orderDetailProductMsg: orderDetailProductMsg,
    orderDetailReceiverMsg: orderDetailReceiverMsg,
    orderDetailFinanceMsg: orderDetailFinanceMsg,
	orderDetailOperationLog: orderDetailOperationLog,
	orderDetailReturnInfo: orderDetailReturnInfo,
	orderDetailReturnLog: orderDetailReturnLog,
	orderDetailPurchaseLog: orderDetailPurchaseLog,
    orderDetailDepotMsg: orderDetailDepotMsg,
    orderDetailInvoiceMsg: orderDetailInvoiceMsg,

	orderOperations: orderOperations,
	orderOperationsConfig: orderOperationsConfig,
	orderOperationsLockUnLock: orderOperationsLockUnLock,
	orderOperationsCheck: orderOperationsCheck,
	orderOperationsCut: orderOperationsCut,
	orderOperationsMerge: orderOperationsMerge,
	orderOperationsSeparate: orderOperationsSeparate,
	orderOperationsCheckRevert: orderOperationsCheckRevert,
	orderOperationsMark: orderOperationsMark,
	orderOperationsCancel: orderOperationsCancel,
	orderOperationsPauseRestart: orderOperationsPauseRestart,

	init: function(){
		$.jgrid.no_legacy_api = true;
		$.jgrid.useJSON = true;

		this.needMockData = SYS_VARS.NEED_MOCK_DATA || false;

		this.orderCurrentUser.init({
			pageObj: this,
			callBack: this.loadPageData.bind(this)
		});
		// this.loadPageData();
	},

	loadPageData: function(){
		this.orderSearch.init({
			pageObj: this/*,
			callback: function(){
				this.orderDataGrid.initDataGrid(this.needMockData);
			}.bind(this)*/
		});
		this.orderTabFilter.init({
			pageObj: this
		});
		this.orderDataGrid.init({
			pageObj: this,
			needMockData: SYS_VARS.NEED_MOCK_DATA || false
		});

		this.orderOperations.init({
			pageObj: this
		});
		this.orderOperationsLockUnLock.init({
			pageObj: this
		});
		this.orderOperationsCheck.init({
			pageObj: this
		});
		this.orderOperationsCut.init({
			pageObj: this
		});
		this.orderOperationsMerge.init({
			pageObj: this
		});
		this.orderOperationsSeparate.init({
			pageObj: this
		});
		this.orderOperationsCheckRevert.init({
			pageObj: this
		});
		this.orderOperationsMark.init({
			pageObj: this
		});
		this.orderOperationsCancel.init({
			pageObj: this
		});
		this.orderOperationsPauseRestart.init({
			pageObj: this
		});

		this.orderDetail.init({
			pageObj: this
		});
		this.orderDetailProductMsg.init({
			pageObj: this
		});
		this.orderDetailBasicInfo.init({
			pageObj: this
		});
		this.orderDetailReceiverMsg.init({
			pageObj: this
		});
		this.orderDetailFinanceMsg.init({
			pageObj: this
		});
		this.orderDetailOperationLog.init({
			pageObj: this
		});
		this.orderDetailReturnInfo.init({
			pageObj: this
		});
		this.orderDetailReturnLog.init({
			pageObj: this
		});
		this.orderDetailPurchaseLog.init({
			pageObj: this
		});
		this.orderDetailDepotMsg.init({
			pageObj: this
		});
		this.orderDetailInvoiceMsg.init({
			pageObj: this
		});
	}
}
;

orders.init();

},{"../common/current-user-info.js":2,"../common/order-filters-config.js":3,"../orders/modules/order-data-grid.js":4,"../orders/modules/order-detail-basic-info.js":5,"../orders/modules/order-detail-depot-msg.js":6,"../orders/modules/order-detail-finance-msg.js":7,"../orders/modules/order-detail-invoice-msg.js":8,"../orders/modules/order-detail-operation-log.js":9,"../orders/modules/order-detail-product-msg.js":10,"../orders/modules/order-detail-purchase-log.js":11,"../orders/modules/order-detail-receiver-msg.js":12,"../orders/modules/order-detail-return-info.js":13,"../orders/modules/order-detail-return-log.js":14,"../orders/modules/order-detail.js":15,"../orders/modules/order-operations-cancel.js":16,"../orders/modules/order-operations-check-revert.js":17,"../orders/modules/order-operations-check.js":18,"../orders/modules/order-operations-config.js":19,"../orders/modules/order-operations-cut.js":20,"../orders/modules/order-operations-lock-unlock.js":21,"../orders/modules/order-operations-mark.js":22,"../orders/modules/order-operations-merge.js":23,"../orders/modules/order-operations-pause-restart.js":24,"../orders/modules/order-operations-separate.js":25,"../orders/modules/order-operations.js":26,"../orders/modules/order-search.js":27,"../orders/modules/order-tab-filter.js":28,"../utils/format-date-time.js":29,"../utils/loading.js":30}],2:[function(require,module,exports){
'use strict';

var currentUserInfo = function(){
	this.pageObj = null;
	this.callBack = null;
	this.info = {};
	//this.currentToken = null;

	this.init = function(params){
		this.pageObj = params.pageObj;
		this.callBack = params.callBack;

		//this.getCurrentToken();
		this.getCurrentUserInfo();
	};

	this.getCurrentToken = function(){
		var userToken;

		if(SYS_VARS.CURRENT_MODE === 'dev' || SYS_VARS.CURRENT_MODE === 'debug'){
			var matched = window.location.search.match(/token=(.[^&]+)/g);

			if(matched && matched.length > 0){
				userToken = matched[0].replace('token=', '');
			}else{
				userToken = '';
			}
		}else{
			userToken = H.Cookie.get('userToken');
		}

		if(!userToken || userToken === '' || userToken === 'null' || userToken === 'undefined'){
			H.alert('获取用户令牌失败，请退出登录后重新登录。');
			return '';
		}else{
			return userToken;
		}
	};

	this.getCurrentUserInfo = function(){
		var self = this;
		var url, mockUrl;

		mockUrl = '../src/data/current-user-info.json';
		url = SYS_VARS.INTERFACE_OFC_URL + 'ofc/api/login_info.json/';

		//TODO need to use the live env
		url = this.pageObj.needMockData ? mockUrl: url;

		$.ajax({
			url: url,
			method: 'GET',
			type: 'json',
			timeout: 10000,
			data: {
				token: this.getCurrentToken()
			},
			success: function (data) {
				//self.info = data;
				self.handleGetCurrentUserInfoSuccess(data);
				//self.callBack();
			},
			error: function () {}
		});
	};

	this.handleGetCurrentUserInfoSuccess = function(res){
		if(res.code === 0 || res.code === '0'){
			if(res.data && res.data !== ''){
				if((typeof res.data).toLowerCase() === 'string'){
					this.info = JSON.parse(res.data);
				}else{
					this.info = res.data;
				}

				if(this.callBack){
					this.callBack();
				}
			}else{
				this.handleError('获取用户信息失败，请退出登录后重新登录。', 4000);
			}
		}else{
			this.handleError('获取用户信息失败，请退出登录后重新登录。', 4000);
		}
	};

	this.handleError = function(msg, time){
		H.alert(msg, time || 2000);
		//this.pageObj.orderDataGrid.refreshDataGrid();
	};

};

module.exports = new currentUserInfo();
},{}],3:[function(require,module,exports){
var ORDER_FILTERS = {
	STORE_NAME: [
		{
			key: '-1',
			value: '-1',
			label: '选择销售店铺'
		},
		{
			key: '1',
			value: '1',
			label: '天猫'
		},
		{
			key: '2',
			value: '2',
			label: '京东'
		},
		{
			key:3,
			value: 3,
			label: '亚马逊'
		}
	],

	ORDER_STATUS: [
		{
			key: '-1',
			value: '-1',
			label: '选择订单状态'
		},
		{
			key: '1',
			value: '1',
			label: '新订单'
		},
		{
			key: '11',
			value: '11',
			label: '15min暂停中'
		},
		{
			key: '2',
			value: '2',
			label: '客审完成'
		},
		{
			key: '3',
			value: '3',
			label: '已下发WMS'
		},
		{
			key: '4',
			value: '4',
			label: '等待打包'
		},
		{
			key: '5',
			value: '5',
			label: '已发货'
		},
		{
			key: '6',
			value: '6',
			label: '已签收'
		},
		{
			key: '7',
			value: '7',
			label: '订单完成'
		},
		{
			key: '8',
			value: '8',
			label: '已取消'
		},
		{
			key: '9',
			value: '9',
			label: '已转病单'
		},
		{
			key: '10',
			value: '10',
			label: '已作废'
		}
	],

	OPERATION_ITEMS: [
		{
			key: '-1',
			value: '-1',
			label: '选择操作项'
		},
		{
			key: '1',
			value: '1',
			label: '待锁定'
		},
		{
			key: '2',
			value: '2',
			label: '待客审'
		},
		{
			key: '3',
			value: '3',
			label: '反客审'
		},
		{
			key: '4',
			value: '4',
			label: '已取消'
		},
		{
			key: '5',
			value: '5',
			label: '已暂停'
		},
		{
			key: '6',
			value: '6',
			label: '已加急'
		}
	]
};

module.exports = ORDER_FILTERS;

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
'use strict';

var orderDetailBasicInfo = {
    //承载对象缓存
    pageObj: null,
    //页面渲染数据缓存
    renderData: null,

    //初始化
    init: function (opts) {
        var _this = this;
        _this.pageObj = opts.pageObj;
    },

    //渲染基础信息
    renderBaseMsg: function (data) {
        var _this = this;
        if (typeof data != 'undefined') {
            _this.renderData = data;
        }

        if (_this.renderData) {
            var html = H.template($('#J-base-msg-tpl').html(), _this.renderData);
            $('#J-base-msg-wrap').html(html);
        }
    },

    //设置模块为编辑状态
    setEditStatus: function () {
        $('#J-base-msg-wrap').find('table').addClass('cm-table-edit');
    },

    //设置模块为普通状态
    setSimpleStatus: function () {
        $('#J-base-msg-wrap').find('table').removeClass('cm-table-edit');
        this.renderBaseMsg();
    },

    //获取模块修改参数
    getSubmitParams: function () {
        var params = {};

        $('#J-base-msg-wrap').find('input').each(function (i, item) {
            var $this = $(this);
            params[$this.attr('name')] = $this.val();
        });

        return params;
    }
};

module.exports = orderDetailBasicInfo;

},{}],6:[function(require,module,exports){
'use strict';

var orderDetailDepotMsg = {
    //承载对象缓存
    pageObj: null,
    //页面渲染数据缓存
    renderData: null,

    //初始化
    init: function (opts) {
        var _this = this;
        _this.pageObj = opts.pageObj;
    },

    //渲染出库信息
    renderDepotMsg: function (data) {
        var _this = this;
        if (typeof data != 'undefined') {
            _this.renderData = data; 
        }

        if (_this.renderData) {
            var html = H.template($('#J-depot-msg-tpl').html(), _this.renderData);
            $('#J-depot-msg-wrap').html(html);
        }
    },

    //设置模块为编辑状态
    setEditStatus: function () {
        $('#J-depot-msg-wrap').find('table').addClass('cm-table-edit');
    },

    //设置模块为普通状态
    setSimpleStatus: function () {
        $('#J-depot-msg-wrap').find('table').removeClass('cm-table-edit');
        this.renderDepotMsg();
    },

    //获取模块修改参数
    getSubmitParams: function () {
        var params = {};

        $('#J-depot-msg-wrap').find('input').each(function (i, item) {
            var $this = $(this);
            params[$this.attr('name')] = $this.val();
        });

        return params;
    }
};

module.exports = orderDetailDepotMsg;

},{}],7:[function(require,module,exports){
'use strict';

var orderDetailFinanceMsg = {
    //承载对象缓存
    pageObj: null,
    //页面渲染数据缓存
    renderData: null,

    //初始化
    init: function (opts) {
        var _this = this;
        _this.pageObj = opts.pageObj;
        _this.addEvent();
    },

    //渲染财务信息
    renderFinanceMsg: function (data) {
        var _this = this;
        if (typeof data != 'undefined') {
            _this.renderData = data;
        }

        if (_this.renderData) {
            var html = H.template($('#J-finance-msg-tpl').html(), _this.renderData);
            $('#J-finance-msg-wrap').html(html);
        };
    },

    //设置模块为编辑状态
    setEditStatus: function () {
        $('#J-finance-msg-wrap').find('table').addClass('cm-table-edit');
    },

    //设置模块为普通状态
    setSimpleStatus: function () {
        $('#J-finance-msg-wrap').find('table').removeClass('cm-table-edit');
        this.renderFinanceMsg();
    },

    //获取模块修改参数
    getSubmitParams: function () {
        var params = {};

        $('#J-finance-msg-wrap').find('input').each(function (i, item) {
            var $this = $(this);
            params[$this.attr('name')] = $this.val();
        });

        return params;
    },

    addEvent: function(){

        //financial information about statistic  order paid total amount
        var $dom = '[name=cs_coupon], [name=cash_coupon], [name=gift_coupon], [name=delivery_amount]';
        $(document).on('keyup', $dom, function(){
            var $this = $(this);
            $this.parent().siblings('.status-simple').text( $this.val() );

            var $total_amount = $('#goods_amount'),
                $payment = $('#order_total'),
                $paidAmount = $('#paid_amount'),
                $unpaidAmount = $('#unpaid_amount'),
                $favourable = $('#cs_coupon'),
                $cash_coupon = $('#cash_coupon'),
                $gift_coupon = $('#gift_coupon'),
                $actualShipment = $('#delivery_amount');

            var $figure = parseFloat($total_amount.text())
                + parseFloat($favourable.find('input').val())
                + parseFloat($cash_coupon.find('input').val())
                + parseFloat($gift_coupon.find('input').val())
                + parseFloat($actualShipment.find('input').val());
            $payment.text( isNaN($figure)?0:$figure );

            var $margin = $figure - parseFloat($paidAmount.text());
            $unpaidAmount.find('input').val( isNaN($margin)?0:$margin );
        });
    }
};

module.exports = orderDetailFinanceMsg;

},{}],8:[function(require,module,exports){
'use strict';

var orderDetailInvoiceMsg = {
    //承载对象缓存
    pageObj: null,
    //页面渲染数据缓存
    renderData: null,

    //初始化
    init: function (opts) {
        var _this = this;
        _this.pageObj = opts.pageObj;

        _this.bindEvents()
    },

    //渲染发票信息
    renderInvoiceMsg: function (data) {
        var _this = this;
        if (typeof data != 'undefined') {
            _this.renderData = data;
        }

        if (_this.renderData) {
            var html = H.template($('#J-invoice-list-tpl').html(), {
                list: _this.renderData
            });
            $('#J-invoice-list-wrap').html(html);
        }
    },

    insertInvoice: function (index) {
        var html = H.template($('#J-invoice-list-opt-tpl').html(), {
            index: index
        });

        $('#J-invoice-list-body').append(html);
    },

    //设置模块为编辑状态
    setEditStatus: function () {
        $('#J-invoice-list-wrap').find('table').addClass('cm-table-edit');
        $('#J-invoice-btn-wrap').show();
        this.setClickPop(1);
    },

    //设置模块为普通状态
    setSimpleStatus: function () {
        $('#J-invoice-list-wrap').find('table').removeClass('cm-table-edit');
        $('#J-invoice-btn-wrap').hide();
        this.renderInvoiceMsg();
        this.setClickPop(0);
    },

    setClickPop: function(ctrl){
        var _this = this;
        var data = _this.renderData;

        var $dom = $('tbody#J-invoice-list-body > tr');
        for(var i=0;i<$dom.length;i++){
            var $sub = $dom.eq(i).find('td:eq(4)');
            if(ctrl === 0){
                $sub.find('p').removeAttr('style');
            }else{
                $sub.find('p').css({color:'#4591cf', cursor:'pointer'});
                if($.trim($sub.text()) !== '') disguise($sub);
            }
        }

        function disguise($sub){
            $sub.click(function(){
                if(ctrl === 0) return false;

                var $this = $(this);
                var $index = $this.parent().index();

                var $data = data[$index].invoice_content;
                if($data.length > 0){
                    var $html = '<table class="cm-table">';
                    $html += '<tr><th>商品</th><th>单位</th><th>商品数量</th><th>商品单价</th></tr>';
                    for(var i in $data){
                        $html += '<tr>';
                            $html += '<td>'+ $data[i].content + '</td>';
                            $html += '<td>'+ $data[i].unit + '</td>';
                            $html += '<td>'+ $data[i].quantity + '</td>';
                            $html += '<td>'+ $data[i].price + '</td>';
                        $html += '</tr>';
                    }
                    $html += '</table>';

                    //定义一个弹窗
                    var d = H.dialog({
                        title: '发票内容',
                        content: $html,//弹窗内容
                        quickClose: true,//点击空白处快速关闭
                        padding: 5,//弹窗内边距
                        width: 400,//弹窗宽度(缺省时为自适应，但默认最大宽度为1000)
                        backdropOpacity: 0.7,//遮罩层透明度(默认0.7)
                        onshow: function(){
                            //alert('弹窗弹出后执行的回调');
                        },
                        onclose: function(){
                            //alert('弹窗关闭后执行的回调');
                        }
                    });
                    //显示弹窗
                    d.show();
                }
            });
        }
    },

    //获取模块修改参数
    getSubmitParams: function () {
        var params = [];

        $('#J-invoice-list-body').find('tr').each(function (i, item) {
            var $this = $(this);
            params.push({
                being_deleted_invoice: $this.find('input[name=being_deleted_invoice]').val(),
                invoice_id: $this.find('input[name=invoice_id]').val(),
                invoice_type: $this.find('select[name=invoice_type]').val(),
                invoice_title: $this.find('input[name=invoice_title]').val(),
                //invoice_content: $this.find('input[name=invoice_content]').val(),
                invoice_money: $this.find('input[name=invoice_money]').val(),
                actual_invoice_content: $this.find('input[name=actual_invoice_content]').val(),
                actual_invoice_money: $this.find('input[name=actual_invoice_money]').val()
            });
        });

        return params;
    },

    bindEvents: function () {
        var _this = this;
        $('#J-invoice-list-add').on('click', function () {
            _this.insertInvoice($('#J-invoice-list-body').find('tr').length);
        });

        $('#J-invoice-list-del').on('click', function () {
            $('#J-invoice-list-body').find('input[type=checkbox]:checked').each(function () {
                var $tr = $(this).closest('tr');

                if ($tr.find('input[name=invoice_id]').val() == '') {
                    $tr.remove();
                } else {
                    $tr.hide().find('input[name=being_deleted_invoice]').val(1);
                }
            });
        });
    }
};

module.exports = orderDetailInvoiceMsg;

},{}],9:[function(require,module,exports){
'use strict';

var orderDetailOperationLog = {
    //承载对象缓存
    pageObj: null,
    dataHasLoaded: false,
    pagination: null,
    pageInfo:{
        pageNo: 1,
        pageSize: 20, //每页数据条数
        tabId: 1 //1: 操作日志
    },

    //初始化
    init: function (opts) {
        var _this = this;
        _this.pageObj = opts.pageObj;

        _this.pagination = new H.Pager({
            tplB : $('#J-pager-tpl').html(),//模版
            wrapB : $('#J-pager-wrap-operation'),//分页插入目标
            goToPageFunc : function (pageNo) {
                _this.pageInfo.pageNo = pageNo;
                _this.renderLogMsg(pageNo);
            }//点击分页按钮后触发的回调函数
        });
    },

    //渲染基础信息
    renderLogMsg: function (pageNo) {
        var url, orderCode, page, pageSize, tabId;

        if(this.dataHasLoaded !== true){

            orderCode = this.pageObj.orderDataGrid.selectedOrderCode || '';

            page = pageNo || this.pageInfo.pageNo;
            pageSize = this.pageInfo.pageSize;
            tabId = this.pageInfo.tabId;

            if(orderCode === ''){
                alert('无订单编号，请重试');
                return false;
            }

            if(this.pageObj.orderDataGrid.param['needMockData'] === true){
                url = '../src/data/operation-info.json?order_code='+orderCode+'&page='+page+'&page_size='+pageSize+'&tab_id='+tabId;
            }else{
                url = SYS_VARS.INTERFACE_URL+'order_apiv1/order/logs/'+orderCode+'.json?page='+page+'&page_size='+pageSize+'&tab_id='+tabId;
            }

            $.ajax({
                 url: url,
                 type: 'GET',
                 dataType: 'json',
                 success: this.getOrderOperationSuccess.bind(this),
                 error: this.getOrderOperationFailed.bind(this)
             });
        }
    },

    getOrderOperationSuccess: function(res){
        if(res.code === 200 || res.code === '200'){
            this.dataHasLoaded = true;
            this.buildHTML(res.rows); //res.data
            this.setPage(res);
        }else{
           this.getOrderOperationFailed(res);
        }
    },

    buildHTML: function(data){
        var html = H.template($('#J-operation-log-tpl').html(), {list: data});
        $('#J-operation-log-wrap').html(html);
    },

    setPage: function(data){
        this.pagination.render({
            pg: data.page,//this.pageInfo.pageNo
            total: data.records, //totalCount
            ps: this.pageInfo.pageSize
        });
    },

    getOrderOperationFailed: function(res){
        var msg = (res && res.msg) ? res.msg : '获取操作日志失败';
        alert(msg);
    }

};

module.exports = orderDetailOperationLog;

},{}],10:[function(require,module,exports){
'use strict';

var orderDetailProductMsg = {
    //承载对象缓存
    pageObj: null,
    //弹窗对象缓存
    popObj: null,
    //分页对象缓存
    pagerObj: null,
    //页面渲染数据缓存
    renderData: null,

    //初始化
    init: function (opts) {
        var _this = this;
        _this.pageObj = opts.pageObj;

        _this.bindEvents();
    },

    //设置模块为编辑状态
    setEditStatus: function () {
        $('#J-pro-list-wrap').find('table').addClass('cm-table-edit');
        $('#J-pro-btn-wrap').show();
    },

    //设置模块为普通状态
    setSimpleStatus: function () {
        $('#J-pro-list-wrap').find('table').removeClass('cm-table-edit');
        $('#J-pro-btn-wrap').hide();
        this.renderProductList();
    },

    //渲染产品列表
    renderProductList: function (data) {
        var _this = this;
        if (typeof data != 'undefined') {
            _this.renderData = data;
        }

        if (_this.renderData) {
            var listHtml = H.template($('#J-pro-list-tpl').html(), {
                list: _this.renderData
            });
            $('#J-pro-list-wrap').html(listHtml);
        }
    },

    //调用查询产品信息接口
    searchProduct: function (params) {
        var _this = this;

        params.goods_name_or_sku = $('#J-pro-add-pop-btn-key-word').val();

        if(SYS_VARS.NEED_MOCK_DATA){
            var $url = '../src/data/goods-search.json';
        }else{
            var $url = SYS_VARS.INTERFACE_URL + 'order_apiv1/order/goods_search.json';    
        }
        
        $.ajax({
            url: $url,
            method: 'post',
            type: 'json',
            timeout: 10000,
            data: JSON.stringify(params),
            success: function (res) {
                _this.renderDataCache = res.data;
                var listHtml = H.template($('#J-pro-search-list-tpl').html(), res);
                $('#J-pro-add-pop-search-list-wrap').html(listHtml);

                if (res.records > 0) {
                    if (_this.pagerObj == null) {
                        _this.pagerObj = new H.Pager({
                            tplB : $('#J-pager-tpl').html(),//模版
                            wrapB : $('#J-pro-add-pop-pager-wrap'),//分页插入目标
                            goToPageFunc : function (pageNum) {
                                _this.searchProduct({
                                    currentPage: pageNum,
                                    pageSize: 5
                                });
                            }//点击分页按钮后触发的回调函数
                        });
                    }

                    //分页渲染
                    _this.pagerObj.render({
                        pg: res.page,
                        total: res.records,
                        ps: 5
                    });
                } else {
                    $('#J-pro-add-pop-pager-wrap').html('');
                }
            },
            error: function () {
                H.alert('商品搜索失败，请稍后重试。');
            }
        });
    },

    //添加产品
    addProduct: function () {
        var $goodsInfoData = this.renderData;
        var $searchGoodsData = this.renderDataCache;

        var $checked = $('#J-pro-search-list').find('input[type=checkbox]:checked').parent().parent();
        if ($checked.length > 0) {
            for(var i=0;i<$checked.length;i++){
                var $checkedSku = $checked.eq(i).find('td').eq(1).text();
                for(var k in $searchGoodsData){
                    var $dom = $searchGoodsData[k];
                    var $sku = $dom.goods_sku_id;
                    if( $checkedSku==$sku ){
                        $dom.quantity = $checked.eq(i).find('input[name=quantity]').val();
                        this.injectData( $dom, this.checkSku($checkedSku, $goodsInfoData), $goodsInfoData );
                    }
                }
            }

            var listHtml = H.template($('#J-pro-list-tpl').html(), {
                list: this.renderData
            });
            $('#J-pro-list-wrap').html(listHtml).find('table.cm-table').addClass('cm-table-edit').find('input[name=being_deleted_goods][value=1]').parents('tr').hide(); //隐藏已删除的选项
            $('#J-pro-add-pop-btn-cancel').trigger('click');
        } else {
            H.alert('没有选中任何商品');
        }
    },

    injectData: function($dom, k, $goodsInfoData){
        var $data = {};
        var $modify = false;
        if(k){
            $data = $goodsInfoData[k];
            $modify = true;
        }

        var $json = {
            being_deleted_goods : $data.being_deleted_goods===2?2:$modify?0:2, //0:modify, 1:delete, 2:add,
            sku_id : $dom.goods_sku_id,
            goods_name : $dom.goods_name,
            goods_spec : $data.goods_spec||'',
            goods_remark : $data.goods_remark||'',
            warehouse_status : $dom.goods_number,
            is_rx : $dom.is_rx,
            total_money : parseFloat($dom.goods_price) + parseFloat($data.goods_price||0),
            order_quantity : parseFloat($dom.quantity) + parseFloat($data.order_quantity||0),
            discount : $data.discount||10,
            shipment_batch_num : $data.shipment_batch_num||'',
            production_date : $data.production_date||'',
            expiry_date : $data.expiry_date||'',
            send_num : $data.send_num||''
        };
        if($modify){
            $goodsInfoData[k] = $json;
        }else{
            $goodsInfoData.push($json);
        }
    },

    //检测是否存在同一sku
    checkSku: function($sku, $goodsInfoData){
        for(var k in $goodsInfoData){
            if($sku == $goodsInfoData[k].sku_id){
                return k;
            }
        }
        return false;
    },

    //获取模块修改参数
    getSubmitParams: function () {
        var params = [];

        $('#J-pro-list-body').find('tr').each(function (i, item) {
            var $this = $(this);
            params.push({
                being_deleted_goods: $this.find('input[name=being_deleted_goods]').val(),
                sku_id: $this.find('input[name=sku_id]').val(),
                good_remark: $this.find('input[name=good_remark]').val(),
                quantity: $this.find('input[name=quantity]').val()
            });
        });

        return params;
    },

    //绑定事件
    bindEvents: function () {
        var _this = this;

        $(document)
            .on('change', '#J-pro-list-wrap .J-check-all', function () {
                var checked = this.checked;
                $('#J-pro-list-body').find('input[type=checkbox]').each(function () {
                    $(this).prop('checked', checked);
                })
            })
            .on('change', '#J-pro-list-body input[type=checkbox]', function () {
                if ($('#J-pro-list-body').find('input[type=checkbox]').length == $('#J-pro-list-body').find('input[type=checkbox]:checked').length) {
                    $('#J-pro-list-wrap').find('.J-check-all').prop('checked', true);
                } else {
                    $('#J-pro-list-wrap').find('.J-check-all').prop('checked', false);
                }
            })
            .on('click', '#J-pro-add-pop-btn-cancel', function () {
                _this.popObj.remove();
            })
            .on('click', '#J-pro-add-pop-btn-add', function () {
                _this.addProduct();
            })
            .on('click', '#J-pro-add-pop-btn-search', function () {
                _this.searchProduct({
                    currentPage: 1,
                    pageSize: 5
                });
            });

        $('#J-pro-list-add').on('click', function () {
            var $this = $(this);
            //定义一个弹窗
            _this.popObj = H.dialog({
                title: '新增商品',
                content: $('#J-pro-add-pop-tpl').html(),//弹窗内容
                quickClose: true,//点击空白处快速关闭
                padding: 10,//弹窗内边距
                backdropOpacity: 0.3,//遮罩层透明度(默认0.7)
                width: 880,
                //height: 600,
                onshow: function () {
                    if ($this.data('type') == 'edit') {
                        var $form = $('#J-pop-form'),
                            $menuItem = $this.closest('p.J-menu-item');
                        $form.find('input[name=id]').val($this.data('id'));
                        $form.find('input[name=name]').val($menuItem.find('.J-menu-name').text());
                        $form.find('input[name=href]').val($menuItem.find('.J-menu-href').text());
                    } else {
                        $('#J-pop-form').find('input[name=pid]').val($this.data('pid') || 0);
                    }
                },
                onremove: function () {
                    //关闭弹窗后将pager对象缓存清空
                    _this.pagerObj = null;
                }
            }).show();
        });

        $('#J-pro-list-del').on('click', function () {
            $('#J-pro-list-body').find('input[type=checkbox]:checked').each(function () {
                var $tr = $(this).closest('tr');

                if ($tr.hasClass('J-default')) {
                    $tr.hide().find('input[name=being_deleted_goods]').val(1);
                    var $sku = $tr.find('td').eq(2).text();
                    var renderData = _this.renderData;
                    for(var k in renderData){
                        if($sku == renderData[k].sku_id){
                            renderData[k].being_deleted_goods = 1;
                        }
                    }
                } else {
                    $tr.remove();
                }
            });
        });

        $(document).on('keyup', 'input[name="order_quantity"]', function(){
            var $this = $(this);
            var $parent, $goodsPrice, $totalPrice;
            $parent = $this.parents('tr');
            $goodsPrice = $parent.find('td:eq(8)');
            $totalPrice = $parent.find('td:eq(10)');

            var $count = parseFloat($goodsPrice.text()) * parseFloat($this.val());
            $totalPrice.text( $count.toFixed(2) );

            _this.syncFinance();
        });
    },

    syncFinance: function(){
        var $pro = $('#J-pro-list-body').find('tr');
        var $fin = $('#J-finance-msg');

        var $total_amount = 0;
        for(var i=0; i<$pro.length; i++){
            $total_amount += parseFloat($pro.eq(i).find('td:eq(10)').text());
        }
        $fin.find('#goods_amount').text( $total_amount );

        $('[name=delivery_amount]').trigger('keyup');
    }
};

module.exports = orderDetailProductMsg;

},{}],11:[function(require,module,exports){
'use strict';

var orderDetailPurchaseLog = {
    //承载对象缓存
    pageObj: null,
    dataHasLoaded: false,
    pagination: null,
    pageInfo:{
        pageNo: 1,
        pageSize: 20, //每页数据条数
        tabId: 4 //4: 用户购买记录
    },

    //初始化
    init: function (opts) {
        var _this = this;

        _this.pageObj = opts.pageObj;
        _this.pagination = new H.Pager({
            tplB : $('#J-pager-tpl').html(),//模版
            wrapB : $('#J-pager-wrap-purchase'),//分页插入目标
            goToPageFunc : function (pageNo) {
                _this.pageInfo.pageNo = pageNo;
                _this.doAjaxToLoadData(pageNo);
            }//点击分页按钮后触发的回调函数
        });
    },

    //渲染基础信息
    renderLogMsg: function () {
        if(this.dataHasLoaded !== true){
            this.doAjaxToLoadData();
        }
    },

    doAjaxToLoadData :function(pageNo){
        var url, orderCode, page, pageSize, tabId;

        orderCode = this.pageObj.orderDataGrid.selectedOrderCode || '';

        page = pageNo || this.pageInfo.pageNo;
        pageSize = this.pageInfo.pageSize;
        tabId = this.pageInfo.tabId;

        if(orderCode === ''){
            alert('无订单编号，请重试');
            return false;
        }

        if(this.pageObj.orderDataGrid.param['needMockData'] === true){
            url = '../src/data/purchase-log.json?order_code='+orderCode+'&page='+page+'&page_size='+pageSize+'&tab_id='+tabId;
        }else{
            url = SYS_VARS.INTERFACE_URL+'order_apiv1/order/logs/'+orderCode+'.json?page='+page+'&page_size='+pageSize+'&tab_id='+tabId;
        }

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: this.getOrderPurchaseSuccess.bind(this),
            error: this.getOrderPurchaseFailed.bind(this)
        });
    },

    getOrderPurchaseSuccess: function(res){
        if(res.code === 200 || res.code === '200'){
            this.dataHasLoaded = true;
            this.buildHTML(res.rows); //res.data
            this.setPage(res);
        }else{
           this.getOrderPurchaseFailed(res);
        }
    },

    buildHTML: function(data){
        var html = H.template($('#J-purchase-log-tpl').html(), {list: data});
        $('#J-purchase-log-wrap').html(html);
    },

    setPage: function(data){
        this.pagination.render({
            pg: data.page,//this.pageInfo.pageNo
            total: data.records, //totalCount
            ps: this.pageInfo.pageSize
        });
    },

    getOrderPurchaseFailed: function(res){
        var msg = (res && res.msg) ? res.msg : '获取操作日志失败';
        alert(msg);
    }

};

module.exports = orderDetailPurchaseLog;

},{}],12:[function(require,module,exports){
'use strict';

var orderDetailReceiverMsg = {
    //承载对象缓存
    pageObj: null,
    //页面渲染数据缓存
    renderData: null,

    //初始化
    init: function (opts) {
        var _this = this;
        _this.pageObj = opts.pageObj;
    },

    //渲染收货信息
    renderReceiverMsg: function (data) {
        var _this = this;
        if (typeof data != 'undefined') {
            _this.renderData = data;
        }

        if (_this.renderData) {
            _this.renderData.province_name = _this.renderData.region_name||''; //todo remark:需后端程序提供接口
            _this.renderData.city_name = _this.renderData.region_name||''; //todo remark:接口开放后此处代码可删除
            _this.renderData.district_name = _this.renderData.region_name||'';  //todo remark:同上

            var html = H.template($('#J-receiver-msg-tpl').html(), _this.renderData);
            $('#J-receiver-msg-wrap').html(html);
        }
    },

    //设置模块为编辑状态
    setEditStatus: function () {
        $('#J-receiver-msg-wrap').find('table').addClass('cm-table-edit');
        this.getAreaData();
    },

    //设置模块为普通状态
    setSimpleStatus: function () {
        $('#J-receiver-msg-wrap').find('table').removeClass('cm-table-edit');
        this.renderReceiverMsg();
    },

    //获取模块修改参数
    getSubmitParams: function () {
        var params = {};
        var inputs = $('#J-receiver-msg-wrap').find('input');
        var selects = $('#J-receiver-msg-wrap').find('select');

        inputs.find('input').each(function () {
            var $this = $(this);
            params[$this.attr('name')] = $this.val();
        });
        selects.find('select').each(function () {
            var $this = $(this);
            params[$this.attr('name')] = $this.val();
        });

        return params;
    },

    //获取三级联动数据
    getAreaData: function(){
        if(SYS_VARS.NEED_MOCK_DATA){
            var $url = '../src/data/address.json';
        }else{
            var $url = SYS_VARS.INTERFACE_URL + 'order_apiv1/order/address.json';
        }

        var $province =  $('#J-receiver-msg-province'), $city = $('#J-receiver-msg-city'), $district = $('#J-receiver-msg-district');
        var $temp_html;

        //初始化省
        var province = function($areaJson){
            //$temp_html="<option>请选择省份</option>";

            $temp_html = [];

            $.each($areaJson,function(i, item){
                if(item.id && item.region_name){
                    $temp_html.push('<option value="' + item.id + '">' + item.region_name+ '</option>');
                }
            });
            $province.append($temp_html.join(''));
        };

        //赋值市
        var city = function($areaJson){
            $temp_html = ['<option>请选择城市</option>'];

            if($areaJson &&  $areaJson.length > 0){
                $.each($areaJson,function(i, item){
                    if(item.id && item.region_name){
                        $temp_html.push('<option value="' + item.id + '">' + item.region_name + '</option>');
                    }
                });
            }

            $city.html($temp_html);
        };

        //赋值县
        var district = function($districtJson){
            $temp_html = '<option>请选择区县</option>';

            if(typeof($districtJson) === 'undefined' || $districtJson === ''){
                $district.css('display', 'none');
            }else{
                $district.css('display', 'inline');
                $.each($districtJson,function(i,item){
                    if(item.id && item.region_name){
                        $temp_html += '<option value="' + item.id + '">' + item.region_name + '</option>';
                    }
                });
                $district.html($temp_html);
            }
        };

        //选择省改变市
        $province.change(function(){
            var $provinceId = parseInt($province.val() || 0, 10);
            var $json = {province: $provinceId};
            var $data = JSON.stringify($json); //contentType: application/json

            $.ajax({
                type: 'post',
                dataType: 'json',
                url: $url,
                data: $data,
                success: function(data){
                    city(data);
                    $district.html('<option>请选择区县</option>');
                },
                error: function(){
                    console.log('Bad Lucky! Something went wrong.');
                }
            });
        });

        //选择市改变县
        $city.change(function(){
            var $provinceId = parseInt($province.val() || 0, 10);
            var $cityId = parseInt($city.val() || 0, 10);

            var $json = {province: $provinceId, city: $cityId};
            var $data = JSON.stringify($json); //contentType: application/json
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: $url,
                data: $data,
                success: function(data){
                    district(data);
                },
                error: function(){
                    console.log('Bad Lucky! Something went wrong.');
                }
            });
        });

        //默认加载省份
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: $url,
            success: function(data){
                province(data);
            },
            error: function(){
                console.log('Bad Lucky! Something went wrong.');
            }
        });
    }
};

module.exports = orderDetailReceiverMsg;

},{}],13:[function(require,module,exports){
'use strict';

var orderDetailReturnInfo = {
    //承载对象缓存
    pageObj: null,
    dataHasLoaded: false,
    pagination: null,
    pageInfo:{
        pageNo: 1,
        pageSize: 20, //每页数据条数
        tabId: 3 //3: 退换货信息
    },

    //初始化
    init: function (opts) {
        var _this = this;
        _this.pageObj = opts.pageObj;
        _this.pagination = new H.Pager({
            tplB : $('#J-pager-tpl').html(),//模版
            wrapB : $('#J-pager-wrap-return-info'),//分页插入目标
            goToPageFunc : function (pageNo) {
                _this.pageInfo.pageNo = pageNo;
                _this.renderLogMsg(pageNo);
            }//点击分页按钮后触发的回调函数
        });
    },

    //渲染基础信息
    renderLogMsg: function (pageNo) {
        var url, orderCode, page, pageSize, tabId;

        if(this.dataHasLoaded !== true){

            orderCode = this.pageObj.orderDataGrid.selectedOrderCode || '';

            page = pageNo || this.pageInfo.pageNo;
            pageSize = this.pageInfo.pageSize;
            tabId = this.pageInfo.tabId;

            if(orderCode === ''){
                alert('无订单编号，请重试');
                return false;
            }

            if(this.pageObj.orderDataGrid.param['needMockData'] === true){
                url = '../src/data/return-info.json?order_code='+orderCode+'&page='+page+'&page_size='+pageSize+'&tab_id='+tabId;
            }else{
                url = SYS_VARS.INTERFACE_URL+'order_apiv1/order/logs/'+orderCode+'.json?page='+page+'&page_size='+pageSize+'&tab_id='+tabId;
            }

            $.ajax({
                 url: url,
                 type: 'GET',
                 dataType: 'json',
                 success: this.getOrderReturnSuccess.bind(this),
                 error: this.getOrderReturnFailed.bind(this)
             });
        }
    },

    getOrderReturnSuccess: function(res){
        if(res.code === 200 || res.code === '200'){
            this.dataHasLoaded = true;
            this.buildHTML(res.rows); //res.data
            this.setPage(res);
        }else{
           this.getOrderReturnFailed(res);
        }
    },

    buildHTML: function(data){
        var html = H.template($('#J-return-info-tpl').html(), {list: data[0]});
        $('#J-return-info-wrap').html(html);
    },

    setPage: function(data){
        this.pagination.render({
            pg: data.page,//this.pageInfo.pageNo
            total: data.records, //totalCount
            ps: this.pageInfo.pageSize
        });
    },

    getOrderReturnFailed: function(res){
        var msg = (res && res.msg) ? res.msg : '获取操作日志失败';
        alert(msg);
    }

};

module.exports = orderDetailReturnInfo;

},{}],14:[function(require,module,exports){
'use strict';

var orderDetailReturnLog = {
    //承载对象缓存
    pageObj: null,
    dataHasLoaded: false,
    pagination: null,
    pageInfo:{
        pageNo: 1,
        pageSize: 20, //每页数据条数
        tabId: 2 //2: 退换货日志
    },

    //初始化
    init: function (opts) {
        var _this = this;
        _this.pageObj = opts.pageObj;
        _this.pagination = new H.Pager({
            tplB : $('#J-pager-tpl').html(),//模版
            wrapB : $('#J-pager-wrap-return'),//分页插入目标
            goToPageFunc : function (pageNo) {
                _this.pageInfo.pageNo = pageNo;
                _this.renderLogMsg(pageNo);
            }//点击分页按钮后触发的回调函数
        });
    },

    //渲染基础信息
    renderLogMsg: function (pageNo) {
        var url, orderCode, page, pageSize, tabId;

        if(this.dataHasLoaded !== true){

            orderCode = this.pageObj.orderDataGrid.selectedOrderCode || '';

            page = pageNo || this.pageInfo.pageNo;
            pageSize = this.pageInfo.pageSize;
            tabId = this.pageInfo.tabId;

            if(orderCode === ''){
                alert('无订单编号，请重试');
                return false;
            }

            if(this.pageObj.orderDataGrid.param['needMockData'] === true){
                url = '../src/data/return-log.json?order_code='+orderCode+'&page='+page+'&page_size='+pageSize+'&tab_id='+tabId;
            }else{
                url = SYS_VARS.INTERFACE_URL+'order_apiv1/order/logs/'+orderCode+'.json?page='+page+'&page_size='+pageSize+'&tab_id='+tabId;
            }

            $.ajax({
                 url: url,
                 type: 'GET',
                 dataType: 'json',
                 success: this.getOrderReturnSuccess.bind(this),
                 error: this.getOrderReturnFailed.bind(this)
             });
        }
    },

    getOrderReturnSuccess: function(res){
        if(res.code === 200 || res.code === '200'){
            this.dataHasLoaded = true;
            this.buildHTML(res.rows); //res.data
            this.setPage(res);
        }else{
           this.getOrderReturnFailed(res);
        }
    },

    buildHTML: function(data){
        var html = H.template($('#J-return-log-tpl').html(), {list: data});
        $('#J-return-log-wrap').html(html);
    },

    setPage: function(data){
        this.pagination.render({
            pg: data.page,//this.pageInfo.pageNo
            total: data.records, //totalCount
            ps: this.pageInfo.pageSize
        });
    },

    getOrderReturnFailed: function(res){
        var msg = (res && res.msg) ? res.msg : '获取操作日志失败';
        alert(msg);
    }

};

module.exports = orderDetailReturnLog;

},{}],15:[function(require,module,exports){
'use strict';

var orderDetail = {
    //承载对象缓存
    pageObj: null,
    //当前选择的 tab 的 index
    currentTabIndex: 0,

    //初始化
	init: function (opts) {
        var _this = this;
        _this.pageObj = opts.pageObj;

        _this.setTab(_this.pageObj);
        _this.bindEvents(_this.pageObj);
	},

    //给tab添加交互
    setTab: function (pageObj) {
        $('#J-detail-tab').find('li').on('click', function () {
            var $this = $(this);

            pageObj.orderDetail.currentTabIndex = $this.index();
            pageObj.orderDetail.loadDetailLogInfo(pageObj.orderDetail.currentTabIndex);
            pageObj.orderDetail.showOrHideEditButton();

            $this.addClass('active').siblings().removeClass('active');
            $('#J-detail-cont > div.J-detail-cont-inner').eq($this.index()).show().siblings().hide();
        });
    },

    renderDetail: function (data) {
        var _this = this;

        //self.pageObj.formatDateTime(item['order_time']

        _this.resetAllTabLoadedFlag();

        if(_this.currentTabIndex >= 6){
            _this.loadDetailLogInfo(_this.currentTabIndex);
        }else{
            _this.pageObj.orderDetailBasicInfo.renderBaseMsg(data.order_info);
            _this.pageObj.orderDetailProductMsg.renderProductList(data.order_goods);
            _this.pageObj.orderDetailReceiverMsg.renderReceiverMsg(data.order_consignee);
            _this.pageObj.orderDetailFinanceMsg.renderFinanceMsg(data.order_finance);
            _this.pageObj.orderDetailInvoiceMsg.renderInvoiceMsg(data.order_invoice);
            _this.pageObj.orderDetailDepotMsg.renderDepotMsg(data.order_stock);
        }

        $('#J-detail-cont-wrap').show();
    },

    getOrderDetail: function(){
        var url, orderCode, userToken;

        orderCode = this.pageObj.orderDataGrid.selectedOrderCode;
        userToken = this.pageObj.orderCurrentUser.getCurrentToken();

        if(!userToken || userToken === ''){
            H.alert('获取用户令牌失败，请退出登录后重新登录。');
            return false;
        }

        if(this.pageObj.needMockData === true){
            url = '../src/data/order-detail.json?order_id=' + orderCode;
        }else{
            url = SYS_VARS.INTERFACE_URL + 'order_apiv1/orders/list.json?order_id=' + orderCode;
        }

        this.pageObj.loadingBox.show();

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            //timeout: 20000,
            success: this.getOrderDetailSuccess.bind(this),
            /*complete : function(XMLHttpRequest,status){
                console.info(XMLHttpRequest, status);

                if(status=='timeout'){
                    alert("超时");
                }
            },*/
            error: this.getOrderDetailFailed.bind(this)
        });
    },

    getOrderDetailSuccess: function(res){
        if(res.code === 200 || res.code === '200'){

            this.pageObj.loadingBox.hide();

            if(res.data){
                this.formatData(res.data);
                this.renderDetail(res.data);
            }else{
                this.getOrderDetailFailed();
            }
        }else{
            this.getOrderDetailFailed();
        }
    },

    formatData: function(data){
        if(this.pageObj.formatDateTime){
            data['order_info']['order_time'] = this.pageObj.formatDateTime.doFormat(data['order_info']['order_time']);
            data['order_info']['order_finish_time'] = this.pageObj.formatDateTime.doFormat(data['order_info']['order_finish_time']);
        }

        return data;
    },

    getOrderDetailFailed: function(){
        this.pageObj.loadingBox.hide();
        H.alert('获取订单详情失败');
        this.clearDetailInfoPanel();
    },

    clearDetailInfoPanel: function(){
        $('#J-detail-cont-wrap').hide();
    },

    showOrHideEditButton: function(){
        var userInfo = this.pageObj.orderCurrentUser.info;
        var lockerIsMe;
        var canBeEdited;

        lockerIsMe = userInfo.userId === parseInt(this.pageObj.orderDataGrid.selectedOrder['locker_cs_id'] || 0, 10);
        canBeEdited = parseInt(this.pageObj.orderDataGrid.selectedOrder['order_status'], 10) < 500;

        /*if(this.currentTabIndex === 0){
         $('#J-detail-control-but').show();
         }else{*/
        if(lockerIsMe === true && canBeEdited === true){
            $('#J-detail-control-but').show();
        }else{
            $('#J-detail-control-but').hide();
        }
        //}
    },

    loadDetailLogInfo: function(currentTabIndex){
        switch (currentTabIndex)
        {
            case 6:
                if(!this.pageObj.orderDetailOperationLog.dataHasLoaded)
                    this.pageObj.orderDetailOperationLog.renderLogMsg();
                break;
            case 7:
                if(!this.pageObj.orderDetailReturnInfo.dataHasLoaded)
                    this.pageObj.orderDetailReturnInfo.renderLogMsg();
                break;
            case 8:
                if(!this.pageObj.orderDetailReturnLog.dataHasLoaded)
                    this.pageObj.orderDetailReturnLog.renderLogMsg();
                break;
            case 9:
                if(!this.pageObj.orderDetailPurchaseLog.dataHasLoaded)
                    this.pageObj.orderDetailPurchaseLog.renderLogMsg();
                break;
            default:
                break;
        }
    },

    resetAllTabLoadedFlag: function(){
        this.pageObj.orderDetailBasicInfo.dataHasLoaded = false;
        this.pageObj.orderDetailProductMsg.dataHasLoaded = false;
        this.pageObj.orderDetailReceiverMsg.dataHasLoaded = false;
        this.pageObj.orderDetailFinanceMsg.dataHasLoaded = false;
        this.pageObj.orderDetailInvoiceMsg.dataHasLoaded = false;
        this.pageObj.orderDetailDepotMsg.dataHasLoaded = false;

        this.pageObj.orderDetailOperationLog.dataHasLoaded = false;
        this.pageObj.orderDetailReturnInfo.dataHasLoaded = false;
        this.pageObj.orderDetailReturnLog.dataHasLoaded = false;
        this.pageObj.orderDetailPurchaseLog.dataHasLoaded = false;
    },

    //保存产品详情信息
    saveDetailMsg: function () {
        var _this = this,
            userToken,
            subParamsOne,
            subParamsTwo,
            subParamsThree,
            subParamsFour,
            subParamsFive,
            subParamsSix;

        userToken = _this.pageObj.orderCurrentUser.getCurrentToken();

        if(!userToken || userToken === ''){
            H.alert('获取用户令牌失败，请退出登录后重新登录。');
            return false;
        }

        // if(!this.valid()) return false;

        subParamsOne = _this.pageObj.orderDetailBasicInfo.getSubmitParams(),
        subParamsTwo = _this.pageObj.orderDetailProductMsg.getSubmitParams(),
        subParamsThree = _this.pageObj.orderDetailReceiverMsg.getSubmitParams(),
        subParamsFour = _this.pageObj.orderDetailFinanceMsg.getSubmitParams(),
        subParamsFive = _this.pageObj.orderDetailInvoiceMsg.getSubmitParams(),
        subParamsSix = _this.pageObj.orderDetailDepotMsg.getSubmitParams();

        $.ajax({
            url: SYS_VARS.INTERFACE_URL + 'order_apiv1/order/edit.json',
            method: 'post',
            type: 'json',
            timeout: 10000,
            data: JSON.stringify({
                order_id: _this.pageObj.orderDetailBasicInfo.renderData.order_id, //find target order id
                order_info: subParamsOne,
                order_goods: subParamsTwo,
                order_consignee: subParamsThree,
                order_finance: subParamsFour,
                order_invoice: subParamsFive,
                order_stock: subParamsSix
            }),
            success: function (data) {
                var $html = '';
                if(data.code==='-1' || data.code===-1){
                    $html += data.msg;    
                }else{
                    var $arr = ['info', 'goods', 'consignee', 'finance', 'invoice'];
                    for(var i in $arr)
                    {
                        if(data['order_'+$arr[i]+'_msg'] !== undefined){
                            if(data['order_'+$arr[i]+'_code'] == 0){
                                $html += "<p>" + data['order_'+$arr[i]+'_msg'] + "</p>";
                            }else{
                                $html += '<p class="red">order_'+$arr[i]+'_msg保存出错!</p>';
                            }
                        }
                    }
                }
                H.alert($html);
                
                _this.pageObj.orderDataGrid.getOrderDetail();
                _this.setBtnFolkStatus();
                _this.setStatusAddToModify(_this.pageObj.orderDetailInvoiceMsg.renderData);
            },
            error: function () {
                H.alert('保存产品详情信息接口调用失败');
            }
        });
    },

    //当保存数据时，将所有添加的状态修改为修改状态
    setStatusAddToModify: function(data){
        //for(var i in data){
        //    if(data[i].being_deleted_goods == '1'){
        //        data[i].being_deleted_goods = 0;
        //    }
        //}
        console.log(data);
    },

    //设置保存编辑按钮状态
    setBtnFolkStatus: function(){
        $('#J-pro-detail-edit').show();
        $('#J-pro-detail-cancel').hide();
        $('#J-pro-detail-save').removeClass('cm-btn-blue').addClass('cm-btn-gray');

        $('#J-pro-btn-wrap, #J-invoice-btn-wrap').hide(); //product information & invoice information will be hide
    },

    //将子模块的状态设置为编辑状态
    setModulesToEditStatus: function () {
        var _this = this;
        _this.pageObj.orderDetailBasicInfo.setEditStatus();
        _this.pageObj.orderDetailProductMsg.setEditStatus();
        _this.pageObj.orderDetailReceiverMsg.setEditStatus();
        _this.pageObj.orderDetailFinanceMsg.setEditStatus();
        _this.pageObj.orderDetailInvoiceMsg.setEditStatus();
        _this.pageObj.orderDetailDepotMsg.setEditStatus();

        $('#J-pro-detail-edit').hide();
        $('#J-pro-detail-cancel').show();
        $('#J-pro-detail-save').removeClass('cm-btn-gray').addClass('cm-btn-blue').show();
    },

    //将子模块的状态设置为普通状态
    setModulesToSimpleStatus: function () {
        var _this = this;
        _this.pageObj.orderDetailBasicInfo.setSimpleStatus();
        _this.pageObj.orderDetailProductMsg.setSimpleStatus();
        _this.pageObj.orderDetailReceiverMsg.setSimpleStatus();
        _this.pageObj.orderDetailFinanceMsg.setSimpleStatus();
        _this.pageObj.orderDetailInvoiceMsg.setSimpleStatus();
        _this.pageObj.orderDetailDepotMsg.setSimpleStatus();

        $('#J-pro-detail-edit').show();
        $('#J-pro-detail-cancel').hide();
        $('#J-pro-detail-save').removeClass('cm-btn-blue').addClass('cm-btn-gray').hide();
    },

    //绑定事件
    bindEvents: function (pageObj) {
        $('#J-pro-detail-edit').on('click', function () {
            pageObj.orderDetail.setModulesToEditStatus();
        });

        $('#J-pro-detail-cancel').on('click', function () {
            pageObj.orderDetail.setModulesToSimpleStatus();
        });

        $('#J-pro-detail-save').on('click', function () {
            if($('#J-pro-detail-edit').is(':visible')){
                H.alert('请进入编辑状态后再保存！');
                return false;
            }
            pageObj.orderDetail.saveDetailMsg();
        });

        $(document).on('click', '#J-detail-cont-wrap th input:checkbox', function(){
            if( $(this).prop('checked') )
            {
                $(this).parents('table').find('tbody input:checkbox').prop('checked', true);
            }else{
                $(this).parents('table').find('tbody input:checkbox').prop('checked', false);
            }
        });
    }
};

module.exports = orderDetail;

},{}],16:[function(require,module,exports){
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
},{}],17:[function(require,module,exports){
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
},{}],18:[function(require,module,exports){
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
},{}],19:[function(require,module,exports){
'use strict';

var orderOperationsConfig = {
	'do-lock': {
		id: 'do-lock',
		label: '锁定',
		event: 'do-lock',
		canDo: function(no, isLocked, isMeLocked){
			var canDo = false;

			no = parseInt(no, 10);

			/*if(no < 500 && isLocked !== 'true'){
				canDo = true;
			}*/
			if(isLocked !== 'true'){
				canDo = true;
			}

			return canDo;
		},
		url: 'ofc/api/order/lock/'
	},

	'do-unlock':{
		id: 'do-unlock',
		label: '解锁',
		event: 'do-unlock',
		canDo: function(no, isLocked, isMeLocked){
			var canDo = false;
			no = parseInt(no, 10);

			/*if(no < 500 && isMeLocked === true){
				canDo = true;
			}*/
			if(isMeLocked === true){
				canDo = true;
			}

			return canDo;
		},
		url: 'ofc/api/order/lock/'
	},

	'do-check': {
		id: 'do-check',
		label: '客审通过',
		event: 'do-check',
		canDo: function(no, isLocked, isMeLocked){
			var canDo = false;
			no = parseInt(no, 10);

			if(no < 500 && isMeLocked === true){
				canDo = true;
			}

			return canDo;
		},
		url: 'ofc/api/order/cs_audit_pass/'
	},

	'do-check-manual':{
		url: 'ofc/api/order/cs_audit_data_save/',
		id: 'do-check-manual',
		label: '人工客审通过',
		event: 'do-check-manual',
		canDo: function(){
			return true;
		}
	},

	'do-cut': {
		id: 'do-cut',
		label: '剪贴',
		event: 'do-cut',
		canDo: function(no, isLocked, isMeLocked){
			var canDo = false;
			no = parseInt(no, 10);

			if(no < 500 && isMeLocked === true){
				canDo = true;
			}

			return canDo;
		},
		url: 'ofc/api/order/cut/'
	},

	'do-merge': {
		id: 'do-merge',
		label: '合并',
		event: 'do-merge',
		canDo: function(no, isLocked, isMeLocked){
			var canDo = false;
			no = parseInt(no, 10);

			if(no < 500 && isMeLocked === true){
				canDo = true;
			}

			return canDo;
		},
		url: 'ofc/api/order/merge/'
	},

	'do-separate': {
		id: 'do-separate',
		label: '拆分',
		event: 'do-separate',
		canDo: function(no, isLocked, isMeLocked){
			var canDo = false;
			no = parseInt(no, 10);

			if(no < 500 && isMeLocked === true){
				canDo = true;
			}

			return canDo;
		},
		url: 'ofc/api/order/split/'
	},

	'do-check-revert': {
		id: 'do-check-revert',
		label: '反审核',
		event: 'do-check-revert',
		canDo: function(no, isLocked, isMeLocked){
			var canDo = false;
			no = parseInt(no, 10);

			if(no >= 500 && no < 1300 && isMeLocked === true){
				canDo = true; //900 之前走正常反审， 900之后走生存新单
			}

			return canDo;
		},
		url: 'ofc/api/order/reverse_audit/'
	},

	'do-mark':{
		id: 'do-mark',
		label: '打标签',
		event: 'do-mark',
		canDo: function(no, isLocked, isMeLocked){
			if(isMeLocked === true){
				return true;
			}else{
				return false;
			}
		},
		url: 'ofc/api/order/stick_tags/'
	},

	'do-pause':{
		id: 'do-pause',
		label: '暂停',
		event: 'do-pause',
		canDo: function(no, isLocked, isMeLocked){
			if(isMeLocked === true){
				return true;
			}else{
				return false;
			}
		},
		url: ''
	},

	'do-restart':{
		id: 'do-restart',
		label: '取消暂停',
		event: 'do-restart',
		canDo: function(no, isLocked, isMeLocked){
			if(isMeLocked === true){
				return true;
			}else{
				return false;
			}
		},
		url: ''
	},

	'do-cancel':{
		id: 'do-cancel',
		label: '取消',
		event: 'do-cancel',
		canDo: function(no, isLocked, isMeLocked){
			if(isMeLocked === true){
				return true;
			}else{
				return false;
			}
		},
		url: 'ofc/api/order/cancel/'
	},

	'do-resend': {
		id: 'do-resend',
		label: '重新下发',
		event: 'do-resend',
		canDo: function(no){
			var canDo = false;
			no = parseInt(no, 10);

			/*if(no > 900){
			 canDo = true;
			 }

			 return canDo;*/

			return true;
		},
		url: 'ofc/api/order/order/redeliver/'
	},

	'do-refresh': {
		id: 'do-refresh',
		label: '刷新',
		event: 'do-refresh',
		canDo: function(){
			return true;
		},
		url: ''
	}
};

module.exports = orderOperationsConfig;

},{}],20:[function(require,module,exports){
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
},{}],21:[function(require,module,exports){
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
},{}],22:[function(require,module,exports){
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
},{}],23:[function(require,module,exports){
'use strict';

var orderOperationsMerge = function(){
	this.pageObj;
	this.confirmPop = null;
	this.goods = null;

	this.init = function(params){
		this.pageObj = params.pageObj;
	};

	this.doMergeConfirm = function(){
		var list = this.pageObj.orderDataGrid.selectedOrderList;
		var html, popHtml;

		list = JSON.parse(JSON.stringify(list));
		//list.quantity = list.total;

		html = H.template($('#J-cut-order-pop-order-list-tpl').html(), {list: list});
		popHtml = H.template($('#J-merge-order-pop-tpl').html(), {cutContent: html});

		this.confirmPop = H.dialog({
			title: '合并订单确认',
			content: popHtml,//弹窗内容
			width: 400,
			quickClose: true,//点击空白处快速关闭
			padding: 10,//弹窗内边距
			backdropOpacity: 0.3
		}).show();
	};

	this.doMerge = function(){
		var list = this.pageObj.orderDataGrid.selectedOrderList;
		var self = this;
		var url, mockUrl, order_ids = [];

		mockUrl = '../src/data/do-merge-result.json';
		url = SYS_VARS.INTERFACE_OFC_URL + this.pageObj.orderOperationsConfig['do-merge']['url'];
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
				self.handleError('订单：<br/>' + order_ids.join('<br/>')  + '<br/>合并失败，请稍后重试', 4000);
			}
		});
	};

	this.doCancel = function(){
		this.confirmPop.remove();
	};

	this.handleSuccess = function(res, order_ids){
		this.confirmPop.remove();

		if(res.code === 200 || res.code === '200'){
			this.showNewOrders(res.data);
			this.changeTabToAll();
		}else{
			this.handleError('订单：<br/>' + order_ids.join('<br/>')  + '<br/>合并失败，请稍后重试', 4000);
		}
	};

	this.showNewOrders = function(data){
		var html;

		data[0].order_quantity = data[0].quantity;

		html = H.template($('#J-cut-order-pop-order-list-tpl').html(), {list: data});

		H.dialog({
			title: '合并成功',
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

module.exports = new orderOperationsMerge();
},{}],24:[function(require,module,exports){
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
},{}],25:[function(require,module,exports){
'use strict';

var orderOperationsSeparate = function(){
	this.pageObj;
	this.confirmPop = null;
	this.goods = null;

	this.init = function(params){
		this.pageObj = params.pageObj;
	};

	this.doConfirm = function(){
		var list = this.pageObj.orderDataGrid.selectedOrderList;
		var self = this;
		var url, mockUrl;

		mockUrl = '../src/data/get-separate-order-list.json';
		url = SYS_VARS.INTERFACE_OFC_URL + 'ofc/api/order/split_info/';
		url = this.pageObj.needMockData ? mockUrl : url;
		//console.info('url:' + url);

		$.ajax({
			url: url,
			method: 'GET',
			type: 'json',
			timeout: 10000,
			headers: {
				'userToken': self.pageObj.orderCurrentUser.getCurrentToken()
			},
			data: {
				order_id: list[0]['order_id']
			},
			success: function (res) {
				if(res.code === 200 || res.code === '200'){
					self.showConfirmBox(res.data);
				}else{
					self.handleError('获取订单：' + list[0]['order_id'] + '的子订单失败，请稍后重试', 4000);
				}
			},
			error: function () {
				self.handleError('获取订单：' + list[0]['order_id'] + '的子订单失败，请稍后重试', 4000);
			}
		});
	};

	this.showConfirmBox = function(data){
		var list = this.pageObj.orderDataGrid.selectedOrderList;
		 var html, popHtml;

		 list = JSON.parse(JSON.stringify(list));
		 //list.quantity = list.total;

		 html = H.template($('#J-cut-order-pop-order-list-tpl').html(), {list: data});
		 popHtml = H.template($('#J-separate-order-pop-tpl').html(), {cutContent: html, order_id: list[0]['order_id']});

		 this.confirmPop = H.dialog({
		 title: '拆分订单确认',
		 content: popHtml,//弹窗内容
		 width: 400,
		 quickClose: true,//点击空白处快速关闭
		 padding: 10,//弹窗内边距
		 backdropOpacity: 0.3
		 }).show();
	};

	this.doSeparate = function(){
		var list = this.pageObj.orderDataGrid.selectedOrderList;
		var self = this;
		var url, mockUrl;

		mockUrl = '../src/data/do-check-result.json';
		url = SYS_VARS.INTERFACE_OFC_URL + this.pageObj.orderOperationsConfig['do-separate']['url'];
		url = this.pageObj.needMockData ? mockUrl : url;
		//console.info('url:' + url);

		self.pageObj.loadingBox.show();

		$.ajax({
			url: url,
			method: 'POST',
			type: 'json',
			timeout: 10000,
			data: JSON.stringify({
				order_id: list[0]['order_id']
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
				self.handleError('订单：' + list[0]['order_id'] + '拆分失败，请稍后重试', 4000);
			}
		});
	};

	this.doCancel = function(){
		this.confirmPop.remove();
	};

	this.handleSuccess = function(res){
		var list = this.pageObj.orderDataGrid.selectedOrderList;

		this.confirmPop.remove();

		if(res.code === 200 || res.code === '200'){
			H.alert('订单：' + list[0]['order_id'] + '拆分成功');
		}else{
			this.handleError('订单：' + list[0]['order_id'] + '拆分失败，请稍后重试', 4000);
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

module.exports = new orderOperationsSeparate();
},{}],26:[function(require,module,exports){
'use strict';

var orderOperations = function(){
	this.pageObj;

	this.init = function(params){
		this.pageObj = params.pageObj;
		/*this.selectedRecords = [];*/

		this.addEvent();
	};

	this.doRefreshData = function(){
		this.pageObj.orderDataGrid.refreshDataGrid();
	};

	this.handleClick = function(event){
		var target = event.target;
		var label = target.tagName.toLowerCase();
		var eventType = target.getAttribute('data-event');

		if(label === 'input' &&  eventType === 'do-refresh'){
			this.doRefreshData();
		}else if(label === 'input' &&  eventType === 'do-lock'){
			this.pageObj.orderOperationsLockUnLock.doLockUnlock(1);
		}else if(label === 'input' &&  eventType === 'do-unlock'){
			this.pageObj.orderOperationsLockUnLock.doLockUnlock(0);
		}else if(label === 'input' &&  eventType === 'do-check'){
			this.pageObj.orderOperationsCheck.doCheckConfirm();
		}else if(label === 'input' &&  eventType === 'do-cut'){
			this.pageObj.orderOperationsCut.doCutConfirm();
		}else if(label === 'input' &&  eventType === 'do-merge'){
			this.pageObj.orderOperationsMerge.doMergeConfirm();
		}else if(label === 'input' &&  eventType === 'do-separate'){
			this.pageObj.orderOperationsSeparate.doConfirm();
		}else if(label === 'input' &&  eventType === 'do-check-revert'){
			this.pageObj.orderOperationsCheckRevert.doConfirm();
		}else if(label === 'input' &&  eventType === 'do-mark'){
			this.pageObj.orderOperationsMark.getMarkList();
		}else if(label === 'input' &&  eventType === 'do-cancel'){
			this.pageObj.orderOperationsCancel.doConfirm();
		}else if(label === 'input' &&  eventType === 'do-pause'){
			this.pageObj.orderOperationsPauseRestart.doConfirm(1);
		}else if(label === 'input' &&  eventType === 'do-restart'){
			this.pageObj.orderOperationsPauseRestart.doConfirm(0);
		}else if(label === 'input' &&  eventType === 'do-resend'){
			this.pageObj.orderOperationsResend.doConfirm();
		}

	};

	this.resetOptionsStatus = function(list){
		var buttons = {};
		var operations = this.pageObj.orderOperationsConfig;
		var canDoEvent = {};
		var self = this;

		$('#optionPanel input[type="button"]').each(function(){
			var butEvent = $(this).attr('data-event');
			if(butEvent && butEvent !== ''){
				buttons[butEvent] = $(this);
			}

			if(butEvent !== 'do-refresh'){
				self.buttonSetStatus($(this), false);
			}
		});

		list.forEach(function(item){
			for(var key in operations){
				var operation, canDo, userId, orderUserId, isMeLocked;

				operation = operations[key];
				userId = self.pageObj.orderCurrentUser.info.userId;
				orderUserId = (item.locker_cs_id && item.locker_cs_id !== '') ? parseInt(item.locker_cs_id, 10) : -1;


				if(userId && userId === orderUserId){
					isMeLocked = true
				}else{
					isMeLocked = false;
				}

				canDo = operation['canDo'](item.order_status, item.is_lock, isMeLocked);

				if(canDo === true){
					//TODO if need revert should remove the key === 'do-check-revert'
					if(canDoEvent[key] === null || canDoEvent[key] === undefined || key === 'do-check-revert' || key === 'do-cut' || key === 'do-separate' || key === 'do-pause' || key === 'do-separate' || key === 'do-restart' || key === 'do-cancel'){
						canDoEvent[key] = 1;
					}else{
						canDoEvent[key] ++;
					}
				}
			}
		});

		for(var event in canDoEvent){
			if(buttons[event]){
				if(canDoEvent[event] === list.length){
					if(event === 'do-merge'){
						if(canDoEvent[event] >= 2){
							self.buttonSetStatus(buttons[event], true);
						}
					}else{
						self.buttonSetStatus(buttons[event], true);
					}
				}
			}

		}

	};

	this.buttonSetStatus = function(button, isEnable){
		var disable = 'btn btn-sm btn-gray';
		var enable = 'btn btn-sm btn-primary';

		button.attr('class', isEnable === true ? enable : disable);

		if(isEnable === false){
			button.attr('disabled', 'disabled');
		}else{
			button.removeAttr('disabled');
		}

	};

	this.clearOperationButtonStatus = function(){
		var self = this;

		$('#optionPanel input[type="button"]').each(function(){
			var butEvent = $(this).attr('data-event');
			if(butEvent === 'do-refresh'){
				self.buttonSetStatus($(this), true);
			}else{
				self.buttonSetStatus($(this), false);
			}
		});

	};

	this.addEvent = function(){
		var panel = $('#optionPanel');

		panel.bind('click', function(event){
			this.handleClick(event);
		}.bind(this));
	};
};

module.exports = new orderOperations();
},{}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
'use strict';

var orderTabFilter = function(){
	this.pageObj;
	this.currentStatus = 1;//1: 所有订单 2: 取消单待审批 3: 退换货待审批 6: 未发货 7: 待客审 9: 待锁定

	this.toggleTab = function(dom){
		if(!dom.hasClass('active')){
			this.currentStatus = parseInt(dom.attr('data-status'), 10);
			dom.siblings('li').removeClass('active');
			dom.addClass('active');

			if(this.pageObj && this.pageObj.orderSearch){
				this.pageObj.orderSearch.searchParams.tab_id = this.currentStatus;
				this.pageObj.orderSearch.doSearch();
			}
		}
	};

	this.init = function(params){
		this.pageObj = params.pageObj;
		this.addEvent();
	};

	this.handleClick = function(event){
		var target = event.target;
		var label = target.tagName.toLowerCase();

		target = $(target);

		if(label === 'li' && target.hasClass('item')){
			this.toggleTab(target);
		}

	};

	this.addEvent = function(){
		var panel = $('#tabStatusFilter');

		panel.bind('click', function(event){
			this.handleClick(event);
		}.bind(this));
	};
};

module.exports = new orderTabFilter();
},{}],29:[function(require,module,exports){
/**
 * format time string
 */

var formatDateTime = {
	doFormat: function(dateTimeString) {

		if(dateTimeString && dateTimeString !== '' && dateTimeString !== 'null' && dateTimeString !== 'undefined'){
			dateTimeString = dateTimeString.replace(/T/g, ' ').replace(/Z/g, '');
		}

		return dateTimeString;
	}
};

module.exports = formatDateTime;

},{}],30:[function(require,module,exports){
/**
 * add loading mask effect
 */

window.loading = {
	show : function () {
		$('body').append('<div id="J-loading" class="cm-loading"></div>');
	},

	hide: function () {
		$('#J-loading').remove();
	}
};

module.exports = window.loading;

},{}]},{},[1])