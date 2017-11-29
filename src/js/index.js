var wrapMod = {
    clickY: 0,
    mainScroll: null,
    subScroll: null,

    //模块初始化
    init: function () {
        var _this = this;

        _this.setContMinHeight();
        _this.getMenuData();

        $(window).on('resize', function () {
            _this.setContMinHeight();
        });
    },

    //设置内容区的最小高度
    setContMinHeight: function () {
        var _this = this,
            h = $(window).height() - $('#J-header').outerHeight();

        $('#J-sidebar, #J-container, #J-submenu-wrap').height(h);
        _this.mainScroll && _this.mainScroll.refresh();
    },

    //事件绑定
    addEvents: function () {
        $('#J-sidebar').find('li')
            .hover(function (e) {
                var $this = $(this);

                $this.addClass('active');

                if ($this.hasClass('J-has-submenu')) {
                    $('#J-submenu-wrap')
                        .show()
                        .html($this.find('ul.J-submenu').clone());

                    wrapMod.subScroll = null;
                    wrapMod.subScroll = new iScroll('J-submenu-wrap', {
                        snap: 'li',
                        bounce: false, //是否超过实际位置反弹
                        bounceLock: false, //当内容少于滚动是否可以反弹，这个实际用处不大
                        momentum: true, //动量效果，拖动惯性
                        hideScrollbar: true, //隐藏滚动条
                        onBeforeScrollStart: function (e) {
                            e.preventDefault();
                        }
                    });

                } else {
                    $('#J-submenu-wrap').hide();
                }

            }, function (e) {
                var $this = $(this),
                    $toElement = $(e.toElement);

                $this.removeClass('active');

                if ($toElement.closest('#J-submenu-wrap').length < 1) {
                    $('#J-submenu-wrap').hide();
                }
            });

        $('#J-submenu-wrap').on('mouseleave', function (e) {
            var $toElement = $(e.toElement);
            if ($toElement.closest('#J-sidebar li.J-has-submenu').length < 1) {
                $(this).hide();
            }
        });

        $(document)
            .on('click', '#J-submenu-wrap div.J-can-open', function (e) {
                var $this = $(this),
                    callBack = function () {
                        wrapMod.subScroll && wrapMod.subScroll.refresh();
                    };
                if ($this.hasClass('active')) {
                    $this.removeClass('active').next().slideUp(50, callBack);
                } else {
                    $this.addClass('active').next().slideDown(50, callBack);
                }
            })
            .on('click', '#J-sidebar a, #J-submenu-wrap a', function (e) {
                e.preventDefault();
            })
            .on('mousedown', '#J-sidebar a, #J-submenu-wrap a', function (e) {
                wrapMod.clickY = e.pageY;
            })
            .on('mouseup', '#J-sidebar a, #J-submenu-wrap a', function (e) {
                if (Math.abs(wrapMod.clickY - e.pageY) < 50) {
                    window.frames[e.target.target].location.href = e.target.href;
                }
            });
    },

    //菜单数据获取
    getMenuData: function () {
        var _this = this;
        $.ajax({
            type: 'get',
            dataType: 'json',
            url: 'dist/data/menu.json',
            success: function (re) {
                _this.createMenu(_this.processData(re.data));
                _this.addEvents();
            },
            error: function () {
                console.log('获取用户菜单列表失败');
            }
        });
    },

    //菜单数据处理
    processData: function (data) {
        var result = [],
            process = function (pid, list, targetList) {
                $.each(list, function (i, item) {

                    if (typeof item.submenu == 'undefined') {
                        item.submenu = [];
                    }

                    if (item.pid == pid) {
                        targetList.push(item);
                        process(item.id, list, item.submenu);
                    }

                });
            };

        process(0, data, result);

        return result;
    },

    //菜单生成
    createMenu: function (data) {
        var menuHtml = H.template($('#J-menu-tpl').html(), {
            items: data
        });
        $('#J-sidebar').html(menuHtml);

        this.mainScroll = new iScroll('J-sidebar', {
            snap: 'li',
            bounce: false, //是否超过实际位置反弹
            bounceLock: false, //当内容少于滚动是否可以反弹，这个实际用处不大
            momentum: true, //动量效果，拖动惯性
            hideScrollbar: true, //隐藏滚动条
            onBeforeScrollStart: function (e) {
                e.preventDefault();
            }
        });
    }
};

$(function () {
    wrapMod.init();
});

