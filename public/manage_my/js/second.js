$(function () {
    var myPageNum = 1;
    var mypageSize = 5;

    function getData() {
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            data: {
                page: myPageNum,
                pageSize: mypageSize
            },
            success: function (data) {
                console.log(data);

                $('tbody').html(template('second', data));
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
            //校验用户名，对应name表单的name属性
            categoryName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '分类名称不能为空'
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

})