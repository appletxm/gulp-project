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
