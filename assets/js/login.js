$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击“登陆按钮”切换到登陆界面，隐藏注册界面
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 从layui获取form对象
    let form = layui.form
    let layer = layui.layer
    // 通过form.verify()函数自定义校验规则
    form.verify({
        // 校验密码规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 确认第二次密码是否和第一次一样
        repwd: function (value) {
            let pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致，请重新输入！'
            }
        }
    })
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.post('/api/reguser', {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }, function (res) {
            if(res.status !== 0) {
                return layer.msg('你' + res.message)
            }
            layer.msg('注册成功！')
            $('#link_login').click()
        })
    })
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0) {
                    return layer.msg('你' + res.message)
                }
                layer.msg('登陆成功！')
                console.log(res)
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
            }
        })
    })
})