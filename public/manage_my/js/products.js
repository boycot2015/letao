$(function () {
    var myPageNum = 1;
    var mypageSize = 5;

    function getData() {
        $.ajax({
            url: '/product/queryProductDetailList',
            data: {
                page: myPageNum,
                pageSize: mypageSize
            },
            success: function (data) {
                console.log(data);

                $('tbody').html(template('products', data));
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: myPageNum, //当前页
                    totalPages: Math.ceil(data.total / data.size), //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        myPageNum = page;
                        getData();
                        
                    }
                });
            }
        })
    }
    getData();

    //点击上架换成下架
    // $('tbody').on('click','button',function(){
    //     if($(this).parent().attr('data-status')==1){
    //         var status = 0;
    //     }else{
    //         var status = 1;
    //     }
    //     })
    // })
    
    //新增分类查询数据

    //使用表单校验插件
    $('form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        // excluded: [':disabled', ':hidden', ':not(:visible)'],
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok-circle',
            invalid: 'glyphicon glyphicon-remove-circle',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            //校验商品名，对应name表单的name属性
            proName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '商品名称不能为空'
                    }
                }
            },
            oldPrice: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '商品原价不能为空'
                    }
                }
            },
            price: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '商品价格不能为空'
                    }
                }
            },
            proDesc: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '商品描述不能为空'
                    }
                }
            },
            size: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '商品尺码不能为空'
                    }
                }
            },
            statu: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '商品状态不能为空'
                    }
                }
            },
            num: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '商品库存不能为空'
                    }
                }
            },
            brandId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '商品归属品牌不能为空'
                    }
                }
            },
            pic: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '商品图片不能为空'
                    }
                }
            }               
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            url: '/category/addTopCategory',
            data: $('form').serialize(),
            type: 'post',
            success: function (data) {
                console.log(data);
                //隐藏添加分类模态框
                $('.modal-add').modal('hide');
                //清除输入框的内容并重置
                $('.modal-add').find('input[type=text]').val('');
                var validator = $("form").data('bootstrapValidator');
                validator.resetForm();
                getData();
            }
        })
    });
    //点击编辑弹出编辑框
    $('tbody').on('click','button.btn-edit',function(){
        
    })
})