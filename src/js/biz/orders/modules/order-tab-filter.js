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