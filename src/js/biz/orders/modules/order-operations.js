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