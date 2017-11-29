/**config for project**/
var SYS_VARS = {
	/**python: for local environment**/
	//INTERFACE_URL: 'http://192.168.199.238:8000/',
	//INTERFACE_OFC_URL: 'http://192.168.199.238:9999/',

	/**python: for 17 test environment**/
	INTERFACE_URL: 'http://10.7.31.17:7100/',
	INTERFACE_OFC_URL: 'http://10.7.31.17:7200/',

	/**node: for 17 test environment**/
	//INTERFACE_URL_NODE: 'http://10.7.31.17:3000/',
	INTERFACE_URL_NODE: 'http://ofc_admin.com/',

	//if you want to use the mock data, you can set this item's value to be true
	NEED_MOCK_DATA: true,

	// value of CURRENT_MODE item are 'release', 'dev', 'debug'
	// if you want to open the dev or debug mode you can set this item's value to be 'dev' or 'debug'
	CURRENT_MODE: 'release'
};


