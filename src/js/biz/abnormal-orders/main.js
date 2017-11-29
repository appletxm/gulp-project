'use strict';

var loadingBox = require('../utils/loading.js');
var formatDateTime = require('../utils/format-date-time.js');

var currentUserInfo = require('../common/current-user-info.js');
var orderFilters = require('../common/order-filters-config.js');

var orderSearch = require('../abnormal-orders/modules/order-search.js');
var orderTabFilter = require('../abnormal-orders/modules/order-tab-filter.js');
var orderDataGrid = require('../abnormal-orders/modules/order-data-grid.js');

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
var orderOperationsCancel= require('../orders/modules/order-operations-cancel.js');
var orderOperationsLockUnLock = require('../orders/modules/order-operations-lock-unlock.js');
var orderOperationsResend = require('../abnormal-orders/modules/order-operations-resend.js');


window.abNormalOrders = {
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
	orderOperationsCancel: orderOperationsCancel,
	orderOperationsResend: orderOperationsResend,

	init: function(){
		$.jgrid.no_legacy_api = true;
		$.jgrid.useJSON = true;

		this.needMockData = SYS_VARS.NEED_MOCK_DATA || false;

		this.orderCurrentUser.init({
			pageObj: this,
			callBack: this.loadPageData.bind(this)
		});
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
			needMockData: this.needMockData
		});

		this.orderOperations.init({
			pageObj: this
		});
		this.orderOperationsLockUnLock.init({
			pageObj: this
		});
		this.orderOperationsCancel.init({
			pageObj: this
		});
		this.orderOperationsResend.init({
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

abNormalOrders.init();
