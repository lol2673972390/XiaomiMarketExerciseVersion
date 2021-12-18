// 窗口大小改变事件

class windowSize {
    // @param {box,size} 节点对象,数值
    // box: 需要被隐藏的盒子
    // size: 当窗口缩放到多少宽度时
    constructor(box, size = 1170) {
        this.box = document.querySelector(box);
        this.size = size;
        // 绑定事件
        this.windowSizeChange();
    }
    windowSizeChange() {
        window.onresize = () => {
            if (window.innerWidth <= this.size) {
                this.box.style.display = 'none'
            } else {
                this.box.style.display = 'block'
            }
        }
    }
}




// 判断点击的是登陆还是注册的选项并显示对应页面
// 以及   点击切换事件
class testingInterfaceAndTabSelect {
    // @param{interface,tabSelect} ele
    // interface: 登陆和注册的界面的集合
    // tabSelect: 切换按钮的集合
    // active: 选中样式 1 / 2
    // box: 容纳登录和注册两个界面的盒子
    constructor(interfaceBox, active1, tabSelect, active2, box) {
        this.interfaceBox = document.querySelectorAll(interfaceBox);
        this.tabSelect = document.querySelectorAll(tabSelect);
        this.active2 = active2;
        this.box = document.querySelector(box);
        // 获取地址栏的传参,如果为空，则默认显示登陆
        this.method = (location.search.split('='))[1] ? (location.search.split('='))[1] : `login`;
        // 设置开关，避免用户点击过快导致两个界面都显示
        this.flag = true;
        // 获取地址栏参数
        this.testingLocation();
        // 绑定切换事件
        this.tabSelectFn();
    }
    testingLocation() {

        this.interfaceBox.forEach((ele, i) => {
            if (ele.classList.contains(this.method)) {
                // 将当前界面设置为可见
                this.interfaceBox[i].style.display = 'block';
                // 给选中的界面绑定设置好的样式
                this.tabSelect[i].classList.add(this.active2);
                // 该界面的初始坐标为0
                this.interfaceBox[i].style.marginLeft = `0px`
            }
        })
    }
    tabSelectFn() {
        for (let i = 0; i < this.tabSelect.length; i++) {
            this.tabSelect[i].onclick = () => {
                if (this.flag) {
                    // 关闭开关
                    this.flag = false
                        // 排他清空
                    for (let j = 0; j < this.tabSelect.length; j++) {
                        this.tabSelect[j].className = '';
                        // 界面删除style属性
                        this.interfaceBox[j].removeAttribute('style')
                    }
                    // 给选中界面绑定设置好的样式
                    this.tabSelect[i].classList.add(this.active2);
                    // 当前界面设为可见
                    // 页面出现
                    this.interfaceBox[i].style.display = 'block';
                    // 这里写的是固定的东西，如果有需要就改成动态的
                    animation.easingAnimate(this.interfaceBox[i], 0, 'marginLeft', () => {
                        // 恢复开关
                        this.flag = true;
                    })
                }
            }
        }
    }
}

// 当input获取焦点和失去焦点时，提示信息的位置改变的方法
class inputFocus {
    // @params {input label css} ele
    // input组
    // label组
    // css样式名字
    constructor(inputs, labels, css) {
        this.inputs = document.querySelectorAll(inputs);
        this.labels = document.querySelectorAll(labels);
        this.css = css;
        // 获取焦点
        this.inputsFocus();
        // 失去焦点
        this.inputsBlur();
    }
    inputsFocus() {
        for (let i = 0; i < this.inputs.length; i++) {
            this.inputs[i].addEventListener('focus', () => {
                // 添加css
                this.labels[i].classList.add(this.css)
            })
        }
    }
    inputsBlur() {
        for (let i = 0; i < this.inputs.length; i++) {
            this.inputs[i].addEventListener('blur', () => {
                // 判断内容，如果有则不取消css，反之
                if (this.inputs[i].value == '') {
                    this.labels[i].classList.remove(this.css)
                }
            })
        }
    }
}


// 注册功能 + 登陆功能 合并

class loginAndRegis {
    // @params {inputs,submitBtn,agreeBtn,tips1,tips2,tips3,method} ele
    // inputs 输入框组
    // submitBtn 提交按钮
    // agreeBtn 同意协议按钮
    // tips1 提示信息 p标签
    // tips2 提示信息 p标签
    // tips3 提示信息 p标签
    // method 注册or登录？regis or login
    constructor(inputs, submitBtn, agreeBtn, tips1, tips2, tips3, method) {
        this.inputs = document.querySelectorAll(inputs);
        this.submitBtn = document.querySelector(submitBtn);
        this.agreeBtn = document.querySelector(agreeBtn);
        this.tips1 = document.querySelectorAll(tips1)
        this.tips2 = document.querySelectorAll(tips2)
        this.tips3 = document.querySelectorAll(tips3)
        this.method = method;
        // 初始化方法 
        this.init();
    }
    init() {
        // agree同意协议事件
        this.agreeBtnFn();
        // 输入框判断内容事件
        this.inputJudge();
        // 判断三个内容是否为空，按钮样式改变
        // 如果三个为空，按钮没有事件
        this.inputTestingNULL();
    }
    agreeBtnFn() {
        this.agreeBtn.addEventListener('click', function() {
            // 判断是否有  .agree的css类
            if (this.classList.contains('agree')) {
                // 去除
                this.classList.remove('agree')
            } else {
                // 添加
                this.classList.add('agree')
            }
        })
    }
    inputJudge() {
        for (let i = 0; i < this.inputs.length; i++) {
            this.inputs[i].addEventListener('blur', () => {
                // 注意点，两个input如果name属性重名的话会发生获取焦点却也触发了失去焦点的事件
                if (this.inputs[i].value == '') {
                    // 为空显示错误
                    this.inputs[i].className = `error`
                } else {
                    // 有内容不显示错误
                    this.inputs[i].className = ``
                }
                this.inputTestingNULL()
            })
        }
    };
    inputTestingNULL() {
        if (Array.from(this.inputs).every(ele => {
                if (ele.value.trim() != '') {
                    return true
                }
            })) {
            this.submitBtn.removeAttribute('style');
            // 调用方法，绑定事件
            this.submitBtnFn();
        } else {
            this.submitBtn.style.opacity = '0.7'
            this.submitBtn.onclick = null
        }
    }
    submitBtnFn() {
        this.submitBtn.onclick = () => {
            // 获取地址栏，应对live server服务打开时地址栏的不同
            // 此项目跳转登录注册时有参数传递，所以以？分割，然后取前面一项
            let address = location.href.split('?')[0];
            // 主页链接
            let indexHtml = address.split('/').slice(0, -1).join('/');
            // 先判断有没有同意协议！
            if (!this.agreeBtn.classList.contains('agree')) {
                layer.msg('请您同意用户条款！', { icon: 7 })
                return
            }
            // 然后判断一下三个框有没有错误样式
            // 暂时没发现bug
            if (Array.from(this.inputs).some(ele => {
                    if (ele.className != '') {
                        return true
                    }
                })) return;
            // 由于三个框为空时已经不触发点击事件，所以现在进行正则判断
            // if (this.inputs[0].value.indexOf(' ') != -1) {
            //     return
            // 此处为判断空格，小米官网自动去空格，所以不写
            // }
            // 获取手机号，去除所有空格
            let phone = this.inputs[0].value.replace(/\s/gim, '');
            // 手机号正则判断
            phone = this.phoneReg(phone);
            // 根据返回结果判断
            if (!phone) {
                // 如果内容错误则添加错误2
                this.inputs[0].className = `error2`
            } else {
                // 正确的时候需要清除错误2
                this.inputs[0].className = ``
            }
            // 获取密码
            let pwd = this.inputs[1].value;
            // 获取用户名
            let username = ``;
            if (this.method.toLowerCase() == 'regis') {
                username = this.inputs[2].value;
                // 调用验证正则的方法
                pwd = this.passwordReg(pwd);
                username = this.usernameReg(username);
                // 进入注册功能
                this.regisFn(phone, pwd, username, address);
            }
            if (this.method.toLowerCase() == 'login') {
                // 进入登陆功能
                this.loginFn(phone, pwd, indexHtml);
            }
        }
    };
    async regisFn(phone, pwd, username, address) {
        // 创建一个开关，表示正则通过
        // 如果为注册则对用户名进行正则判断
        // 根据返回结果判断
        if (pwd === 3) {
            // 如果长度不够则添加错误3
            this.inputs[1].className = `error${pwd}`;
        } else if (pwd === 2) {
            // 如果格式不对则添加错误2
            this.inputs[1].className = `error${pwd}`;
        } else {
            // 正确的时候清除class
            this.inputs[1].className = ``
        }
        if (username === 2) {
            // 如果格式不对则添加错误2
            this.inputs[2].className = `error${username}`;
        } else if (username === 3) {
            // 如果格式不对则添加错误3
            this.inputs[2].className = `error${username}`;
        } else {
            // 正确的时候清除class
            this.inputs[2].className = ``
        }
        // 遍历三个输入框， 如果有class则不进行后续操作
        // if (Array.from(this.inputs).some(ele => {
        //         if (ele.className != '') {
        //             return true
        //         }
        //     })) return;
        // 发送axios get请求  获取数据
        let res = await axios({
            method: 'get',
            url: 'http://localhost:3000/users'
        });
        // 取出所有用户数据
        res = res.data;
        // 遍历判断手机号是否已经注册
        if (res.some(ele => {
                if (ele.phone == phone) {
                    // 有重复的返回true
                    return true
                }
            })) {
            // 设置错误3
            this.inputs[0].className = `error3`;
            return
        }
        // 删除错误
        this.inputs[0].className = ``;
        // 显示一个提示信息
        layer.msg('正在注册，成功后跳转到登录界面');
        // 发送axios post 添加数据
        setTimeout(async() => {
            // 传参
            let end = await axios({
                method: 'post',
                url: 'http://localhost:3000/users',
                data: {
                    "phone": phone,
                    "password": pwd,
                    "username": username,
                    "loginStatus": 0
                }
            });
            // 跳转到登陆界面
            location.href = `${address}?method=login`
        }, 3000)
    };
    async loginFn(phone, pwd, indexHtml) {
        // 先密码长度判断,不符合规范则结束
        if (pwd.length < 6 || pwd.length > 18) {
            this.inputs[1].className = `error3`
            return
        } else {
            this.inputs[1].className = ``
        }
        // axios get 获取用户数据
        let res = await axios({
            method: 'get',
            url: 'http://localhost:3000/users'
        });
        res = res.data;
        // 判断手机号，如果没有则提示，有的话就保存下标order
        let order = null;
        if (res.some((ele, index) => {
                if (ele.phone == phone) {
                    order = index;
                    return true
                }
            })) {
            // 有该手机号
            // 判断密码是否正确
            if (res[order].password == pwd) {
                // 获取localStorage,判断是否有人登录
                let local = localStorage.getItem('user');
                // 如果有数据，则不允许登陆，并2秒后跳转到首页
                if (local) {
                    layer.msg(`已经有人登录了，不允许悄悄挤别人下线哦！`);
                    setTimeout(() => {
                        location.href = `${indexHtml}`;
                    }, 2000)
                    return
                }
                layer.msg(`登陆成功！欢迎"${res[order].username}"来到小米商城`);
                // 2秒后修改对应用户的登陆状态并且跳转到主页
                setTimeout(async() => {
                    let a = await axios({
                        method: 'patch',
                        url: `http://localhost:3000/users/${res[order].id}`,
                        data: {
                            "loginStatus": 1
                        }
                    })
                    location.href = `${indexHtml}`
                }, 2000)
            } else {
                this.inputs[1].className = `error2`
            }
        } else {
            // 没找到该手机号
            this.inputs[0].className = `error3`
        }
    };
    // 手机号正则判断
    phoneReg(val) {
        // 验证手机号规则
        let reg1 = /^((\+86|0086)|\+)?1[3-9]\d{9}?$/gim;
        // 提取手机号
        let reg2 = /^((\+86|0086)|\+)?/gim;
        if (reg1.test(val)) {
            return val.replace(reg2, '')
        } else {
            return 0
        }
    };
    // 密码正则
    passwordReg(val) {
        // 验证是否有空格
        let reg1 = /\s/gim;
        // 验证格式,以字母数字、下划线、斜杠、点任意组成
        let reg2 = /^[\w\\_.]*$/gim;
        // 先判断长度
        if (val.length < 6 || val.length > 18) {
            return 3
        } else if (reg1.test(val) || !reg2.test(val)) {
            return 2
        } else {
            return val
        }
    };
    // 用户名正则 
    usernameReg(val) {
        // 用户名去空格
        val = val.replace(/\s/gim, '');
        // 验证内容
        let reg1 = /^[\u4e00-\u9fa5\w]*$/gim;
        // 先判断长度，如果不输入已经有错误显示
        if (val.length > 8) {
            // console.log('长度')
            return 2
        } else if (reg1.test(val)) {
            return val
        } else {
            // console.log('有其他字符')
            return 3
        }
    }
}

window.addEventListener('load', function() {
    // 判断点击的是登陆还是注册的选项并显示对应页面事件
    new testingInterfaceAndTabSelect('.loginAndRegis .interface', '', '.loginAndRegis .tabSelect a', 'active', '.loginAndRegis .main');
    // 窗口大小改变事件
    new windowSize('#bg', 1000);
    // 当input获取焦点和失去焦点时，提示信息的位置改变的方法
    new inputFocus('.interface input', '.interface input+label', 'labelFocus');
    // 注册功能事件
    new loginAndRegis('.regis input', '.regis .regisBtn', '.regis .agreement', '.regis input~p:nth-of-type(1)', '.regis input~p:nth-of-type(2)', '.regis input~p:nth-of-type(3)', 'regis');
    // 登陆功能事件
    new loginAndRegis('.login input', '.login .loginBtn', '.login .agreement', '.login input~p:nth-of-type(1)', '.login input~p:nth-of-type(2)', '.login input~p:nth-of-type(3)', 'login');
})