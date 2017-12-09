$(function () {
    //获取表格数据
    var myPageNum = 1;
    var myPagSize = 5;
    function getData(){
        $.ajax({
            url: '/user/queryUser',
            data: {
                page: myPageNum,
                pageSize: myPagSize
            },
            success: function (data) {
                // console.log(data);
                $('tbody').html(template('user',data));               
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: myPageNum, //当前页
                    totalPages: Math.ceil(data.total/data.size), //总页数
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
    $('tbody').on('click','button',function(){
        var id = $(this).parent().attr('data-id');
        if($(this).html()=='启用'){
            var isDelete = 0;
        }else{
            var isDelete = 1;
        }
        $.ajax({
            url:'/user/updateUser',
            data:{
                id:id,
                isDelete:isDelete
            },
            type:'post',
            success:function(data){
                getData();
            }
        })
    })

})