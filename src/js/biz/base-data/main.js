'use strict';

var storeData = require('../base-data/modules/base-store-data.js');

var baseData = {
	storeData: storeData,

	init: function(){
		console.info('**************', storeData);
	}
};

baseData.init();