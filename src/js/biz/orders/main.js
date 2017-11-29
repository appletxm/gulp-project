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
