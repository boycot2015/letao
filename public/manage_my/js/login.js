$(function () {


    $('form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok-circle',
            invalid: 'glyphicon glyphicon-remove-circle',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 3,
                        max: 12,
                        message: '用户名长度必须在3到12之间'
                    },
                    callback:{
                        message:'用户名不存在！'
                    }
                }
            },
            password: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 16,
                        message: '密码长度必须在6到16之间'
                    },
                    callback:{
                        message:'密码错误！'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        //开启进度条
        NProgress.start();
        //使用ajax提交逻辑
        $.ajax({
            url: '/employee/employeeLogin',
            data: $('form').serialize(),
            type: 'post',
            success: function (data) {
                console.log(data);
                if (data.success) {
                    window.location.href = './index.html';
                }else{
                    var validator = $("form").data('bootstrapValidator');  //获取表单校验实例
                    if(data.error==1000){
                        validator.updateStatus('username', 'INVALID', 'callback');
                    }else if(data.error==1001){
                        validator.updateStatus('password', 'INVALID', 'callback');
                    }
                }
                //结束进度条
                setTimeout(function(){
                    NProgress.done();
                },500);
            }
        })
    });
    $('button[type=reset]').click(function(){
        var validator = $("form").data('bootstrapValidator');
        validator.resetForm();
    })
})