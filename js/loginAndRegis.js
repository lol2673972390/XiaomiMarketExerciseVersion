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
    // @params {inputs,submitBtn,agreeBtn,tips,method} ele
    // inputs 输入框组
    // submitBtn 提交按钮
    // agreeBtn 同意协议按钮
    // tips 提示信息 p标签
    // method 注册or登录？regis or login
    constructor(inputs, submitBtn, agreeBtn, tips, method) {
        this.inputs = document.querySelectorAll(inputs);
        this.submitBtn = document.querySelector(submitBtn);
        this.agreeBtn = document.querySelector(agreeBtn);
        this.tips = document.querySelectorAll(tips)
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
                    this.inputs[i].classList.add('error')
                } else {
                    // 有内容不显示错误
                    this.inputs[i].classList.remove('error')
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
            // (this.method.toLowerCase() == 'regis') 
            // 调用方法，绑定事件
            this.submitBtnFn();
        } else {
            this.submitBtn.style.opacity = '0.7'
            this.submitBtn.onclick = null
        }
    }
    submitBtnFn() {
        this.submitBtn.onclick = () => {
            // 先判断有没有同意协议！
            if (!this.agreeBtn.classList.contains('agree')) {
                layer.msg('请您同意用户条款！', { icon: 7 })
                return
            }
            // 由于三个框为空时已经不触发点击事件，所以现在进行正则判断
            // if (this.inputs[0].value.indexOf(' ') != -1) {
            //     return
            // 此处为判断空格，小米官网自动去空格，所以不写
            // }
            // 手机号正则判断
            let res = this.phoneReg(this.inputs[0].value.trim())
        }
    };
    // 手机号正则判断
    phoneReg(val) {
        // let reg = /\+?(86)?1/g
    }
}

window.addEventListener('load', function() {
    // 判断点击的是登陆还是注册的选项并显示对应页面事件
    new testingInterfaceAndTabSelect('.loginAndRegis .interface', '', '.loginAndRegis .tabSelect a', 'active', '.loginAndRegis .main');
    // 窗口大小改变事件
    new windowSize('#bg', 1000);
    // 当input获取焦点和失去焦点时，提示信息的位置改变的方法
    new inputFocus('.interface input', '.interface input+label', 'labelFocus')
        // 注册功能事件
    new loginAndRegis('.regis input', '.regis .regisBtn', '.regis .agreement', '.regis input~p', 'regis');
})