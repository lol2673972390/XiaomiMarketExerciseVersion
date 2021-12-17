// 检测是否登陆后的提示
class testingLoginTips {
    // @param {div} 节点对象
    // div 提示登陆的选项
    constructor(div) {
        this.div = document.querySelector(div);
        // 检测是否有用户登录
        this.testingLogin();
        // 关闭按钮
        this.tipsClose();
    }
    testingLogin() {}
    tipsClose() {
        this.div.children[1].onclick = () => {
            this.div.style.display = 'none';
        }
    }
}
new testingLoginTips('#tipsLogin')

// 滚动条吸顶事件，商品名字栏
class scrollCeiling {
    // @param {div} 节点对象
    constructor(div) {
        this.div = document.querySelector(div);
        // 绑定事件
        this.scrollCeilingFn();
    }
    scrollCeilingFn() {
        window.addEventListener('scroll', () => {
            // 当彻底滚动过这个标题栏的时候再添加定位
            if (window.scrollY > (this.div.offsetTop + this.div.offsetHeight)) {
                this.div.classList.add('fixedPosition');
            } else {
                this.div.classList.remove('fixedPosition');
            }
        })
    }
}
new scrollCeiling('#title');

// 商品展示时的轮播
class exhBanner {
    // @params {img,prev,next,circle} 节点对象
    /*
        img：图片组
        prev：上一个按钮
        next：下一个按钮
        circle：指定选中按钮
        box：大盒子，移入停止轮播 
    */
    constructor(img, prev, next, circle, box) {
        this.img = document.querySelectorAll(img);
        this.circle = document.querySelectorAll(circle);
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.box = document.querySelector(box)
            // 保存图片序列号
        this.order = 0;
        // 设置开关
        this.flag = true;
        // 设置定时器
        this.time = null;
        // 初始化方法
        this.init();
    }
    init() {
        // 绑定指定图片按钮功能
        this.circleFn();
        // 绑定上一张
        this.prevFn();
        // 绑定下一张
        this.nextFn();
        // 绑定自动轮播
        this.auto();
        // 停止轮播
        this.stopAuto();
        // 恢复轮播
        this.recoveryAuto();
    }
    circleFn() {
        // 指定选中按钮
        for (let i = 0; i < this.circle.length; i++) {
            // 循环绑定事件
            this.circle[i].onclick = () => {
                // 保存当前序列
                this.order = i;
                // 排他方法清除样式
                for (let j = 0; j < this.circle.length; j++) {
                    // 指定按钮class为空
                    this.circle[j].className = '';
                    // 图片删除show
                    this.img[j].classList.remove('show')
                }
                // 单独设置当前选中样式
                this.circle[i].className = 'active';
                this.img[i].classList.add('show')
            }
        }
    }
    prevFn() {
        this.prev.onclick = () => {
            if (this.flag) {
                this.flag = false;
                // 先判断图片在第几张
                if (this.order == 0) {
                    // 如果为第一张则跳转到最后一张
                    this.order = this.img.length;
                }
                this.order--;
                // 排他清楚样式
                for (let j = 0; j < this.circle.length; j++) {
                    // 指定按钮class为空
                    this.circle[j].className = '';
                    // 图片删除show
                    this.img[j].classList.remove('show');
                };
                // 单独设置当前选中样式
                this.circle[this.order].className = 'active';
                this.img[this.order].classList.add('show');
                // 恢复开关
                this.flag = true
            }
        }
    }
    nextFn() {
        this.next.onclick = () => {
            if (this.flag) {
                this.flag = false;
                // 先加一
                this.order++;
                // 再判断图片在第几张
                if (this.order > this.img.length - 1) {
                    // 如果为第一张则跳转到最后一张
                    this.order = 0;
                }
                // 排他清楚样式
                for (let j = 0; j < this.circle.length; j++) {
                    // 指定按钮class为空
                    this.circle[j].className = '';
                    // 图片删除show
                    this.img[j].classList.remove('show');
                };
                // 单独设置当前选中样式
                this.circle[this.order].className = 'active';
                this.img[this.order].classList.add('show');
                // 恢复开关
                this.flag = true
            }
        }
    }
    auto() {
        this.time = setInterval(() => {
            this.next.onclick()
        }, 3000)
    }
    stopAuto() {
        this.box.onmouseover = () => {
            clearInterval(this.time)
            this.time = null
        }
    }
    recoveryAuto() {
        this.box.onmouseout = () => {
            this.time = setInterval(() => {
                this.next.onclick()
            }, 3000)
        }
    }
}
new exhBanner('.exhBanner>.bannerItem', '.exhBanner>.exhBtn>a:first-child', '.exhBanner>.exhBtn>a:last-child', '.exhBanner>.exhCircle>a', '.exhBanner')


// 选中效果切换 && 修改当前总价

class activeTab {
    // @params {total,a/li,state} 节点对象
    // a/li：选项卡组
    // state 意外保险再点击时可以取消(2),默认不取消(1)
    constructor(a, state = 1 || 2) {
        this.aS = document.querySelectorAll(a);
        this.state = state
        this.activeTabFn()
    }
    activeTabFn() {
        // 排他方法
        for (let i = 0; i < this.aS.length; i++) {
            // 使用2级监听，还要绑定别的事件
            this.aS[i].addEventListener('click', () => {
                if (this.aS[i].classList.contains('active')) {
                    // 如果state为1则不执行这一条命令
                    if (this.state == 1) return
                    this.aS[i].classList.remove('active')
                } else {
                    for (let j = 0; j < this.aS.length; j++) {
                        this.aS[j].classList.remove('active');
                    }
                    this.aS[i].classList.add('active');
                }
            })
        }
    }
}
// 版本
new activeTab('#choose>.version>a');
// 颜色
new activeTab('#choose>.theme>a');
// 套餐
new activeTab('#choose>.package>a');
// 意外保护
new activeTab('#choose>.accident>ul>li', 2)