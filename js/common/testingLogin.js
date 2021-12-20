// 检测登陆状态,显示信息,注销事件
class testingLogin {
    // @params {box span btn tipLoginBox} 节点对象
    // box 存储登陆注册和用户注销的盒子
    // span 显示登陆是的谁?
    // btn 注销
    // tipLoginBox 商品详情页的登陆提示
    constructor(box, span, btn, tipLoginBox) {
        this.box = document.querySelectorAll(box);
        this.span = document.querySelector(span);
        this.btn = document.querySelector(btn);
        this.tipLoginBox = document.querySelector(tipLoginBox);
        // 功能
        this.testingLoginFn();
        // 注销
        this.cancelFn();
    }
    async testingLoginFn() {
        // 发送axios get请求 获取数据
        let res = await axios({
            method: 'get',
            url: 'http://localhost:3000/users'
        });
        // 获取data
        res = res.data;
        // 设置一个变量保存已登录用户的下标
        let order = null;
        // 遍历，判断有无用户登陆
        // 判断依据，json里的loginStatus为1,每个页面都需要，且已有用户登录后不能再显示可跳转登陆的地方
        // 后期用一个cookie或者localStorage存,以防意外
        if (res.some((val, index) => {
                if (val.loginStatus == 1) {
                    order = index;
                    return true
                }
            })) {
            // 更换显示
            this.box[0].classList.add('hide');
            this.box[1].classList.remove('hide');
            // 显示已登录用户
            this.span.innerHTML = `${res[order].username}`;
            // 存储一个记录到localStorage
            localStorage.setItem('user', '已登录');
            // 绑定此用户的id到注销按钮上
            this.btn.setAttribute('login-id', res[order].id);
            // 商品详情页有个登陆提示也需要隐藏
            if (this.tipLoginBox) {
                this.tipLoginBox.style.display = `none`
            }
        } else {
            return
        }
    }
    cancelFn() {
        this.btn.addEventListener('click', () => {
            layer.open({
                title: '登出提示',
                content: `亲爱的${this.span.innerHTML}，真的要退出吗？`,
                // 图片标签
                icon: 5,
                // 显示动画
                anim: 5,
                // 按钮组
                btn: ['确认', '取消'],
                // 确认按钮的回调函数
                yes: async(index, layero) => {
                    // 获取用户的id
                    let id = this.btn.getAttribute('login-id');
                    // 发送axios patch修改该用户的登陆状态
                    let end = await axios({
                        method: 'patch',
                        url: `http://localhost:3000/users/${id}`,
                        data: {
                            "loginStatus": 0
                        }
                    });
                    // 切换显示
                    this.box[1].classList.add('hide');
                    this.box[0].classList.remove('hide');
                    // 删除后台localStorage
                    localStorage.removeItem('user');
                }
            });
        })
    }
}