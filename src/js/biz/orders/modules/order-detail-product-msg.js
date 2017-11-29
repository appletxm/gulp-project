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
