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