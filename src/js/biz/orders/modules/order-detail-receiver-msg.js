'use strict';

var orderDetailReceiverMsg = {
    //承载对象缓存
    pageObj: null,
    //页面渲染数据缓存
    renderData: null,

    //初始化
    init: function (opts) {
        var _this = this;
        _this.pageObj = opts.pageObj;
    },

    //渲染收货信息
    renderReceiverMsg: function (data) {
        var _this = this;
        if (typeof data != 'undefined') {
            _this.renderData = data;
        }

        if (_this.renderData) {
            _this.renderData.province_name = _this.renderData.region_name||''; //todo remark:需后端程序提供接口
            _this.renderData.city_name = _this.renderData.region_name||''; //todo remark:接口开放后此处代码可删除
            _this.renderData.district_name = _this.renderData.region_name||'';  //todo remark:同上

            var html = H.template($('#J-receiver-msg-tpl').html(), _this.renderData);
            $('#J-receiver-msg-wrap').html(html);
        }
    },

    //设置模块为编辑状态
    setEditStatus: function () {
        $('#J-receiver-msg-wrap').find('table').addClass('cm-table-edit');
        this.getAreaData();
    },

    //设置模块为普通状态
    setSimpleStatus: function () {
        $('#J-receiver-msg-wrap').find('table').removeClass('cm-table-edit');
        this.renderReceiverMsg();
    },

    //获取模块修改参数
    getSubmitParams: function () {
        var params = {};
        var inputs = $('#J-receiver-msg-wrap').find('input');
        var selects = $('#J-receiver-msg-wrap').find('select');

        inputs.find('input').each(function () {
            var $this = $(this);
            params[$this.attr('name')] = $this.val();
        });
        selects.find('select').each(function () {
            var $this = $(this);
            params[$this.attr('name')] = $this.val();
        });

        return params;
    },

    //获取三级联动数据
    getAreaData: function(){
        if(SYS_VARS.NEED_MOCK_DATA){
            var $url = '../src/data/address.json';
        }else{
            var $url = SYS_VARS.INTERFACE_URL + 'order_apiv1/order/address.json';
        }

        var $province =  $('#J-receiver-msg-province'), $city = $('#J-receiver-msg-city'), $district = $('#J-receiver-msg-district');
        var $temp_html;

        //初始化省
        var province = function($areaJson){
            //$temp_html="<option>请选择省份</option>";

            $temp_html = [];

            $.each($areaJson,function(i, item){
                if(item.id && item.region_name){
                    $temp_html.push('<option value="' + item.id + '">' + item.region_name+ '</option>');
                }
            });
            $province.append($temp_html.join(''));
        };

        //赋值市
        var city = function($areaJson){
            $temp_html = ['<option>请选择城市</option>'];

            if($areaJson &&  $areaJson.length > 0){
                $.each($areaJson,function(i, item){
                    if(item.id && item.region_name){
                        $temp_html.push('<option value="' + item.id + '">' + item.region_name + '</option>');
                    }
                });
            }

            $city.html($temp_html);
        };

        //赋值县
        var district = function($districtJson){
            $temp_html = '<option>请选择区县</option>';

            if(typeof($districtJson) === 'undefined' || $districtJson === ''){
                $district.css('display', 'none');
            }else{
                $district.css('display', 'inline');
                $.each($districtJson,function(i,item){
                    if(item.id && item.region_name){
                        $temp_html += '<option value="' + item.id + '">' + item.region_name + '</option>';
                    }
                });
                $district.html($temp_html);
            }
        };

        //选择省改变市
        $province.change(function(){
            var $provinceId = parseInt($province.val() || 0, 10);
            var $json = {province: $provinceId};
            var $data = JSON.stringify($json); //contentType: application/json

            $.ajax({
                type: 'post',
                dataType: 'json',
                url: $url,
                data: $data,
                success: function(data){
                    city(data);
                    $district.html('<option>请选择区县</option>');
                },
                error: function(){
                    console.log('Bad Lucky! Something went wrong.');
                }
            });
        });

        //选择市改变县
        $city.change(function(){
            var $provinceId = parseInt($province.val() || 0, 10);
            var $cityId = parseInt($city.val() || 0, 10);

            var $json = {province: $provinceId, city: $cityId};
            var $data = JSON.stringify($json); //contentType: application/json
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: $url,
                data: $data,
                success: function(data){
                    district(data);
                },
                error: function(){
                    console.log('Bad Lucky! Something went wrong.');
                }
            });
        });

        //默认加载省份
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: $url,
            success: function(data){
                province(data);
            },
            error: function(){
                console.log('Bad Lucky! Something went wrong.');
            }
        });
    }
};

module.exports = orderDetailReceiverMsg;
