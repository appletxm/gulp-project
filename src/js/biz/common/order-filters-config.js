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
