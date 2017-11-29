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