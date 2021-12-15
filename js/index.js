// 悬停时打开展示栏
class navShowMenu {
    // @param {ele1,ele2}
    // ele1: 展示框
    // ele2: 导航栏父级，使用事件委托
    constructor(ele1, ele2) {
        this.showMenu = document.querySelector(ele1);
        this.navUl = document.querySelector(ele2);
        // 事件委托
        this.ulDelegate();
        // 绑定展示框显示或掩藏事件
        this.showMenuSoHFn()
    }
    ulDelegate() {
        this.navUl.onmouseover = (eve) => {
            // 获取target属性
            let tar = eve.target;
            // 只有拥有navMenu的类才能触发
            if (tar.classList.contains('navMenu')) {
                this.navShowMenuFn(tar)
            }
            if (!tar.classList.contains('navMenu')) {
                this.navHideMenuFn(tar)
            }
        }
    }
    navShowMenuFn(target) {
        this.showMenu.style.display = 'block'
        this.showMenu.focus()
        animation.easingAnimate(this.showMenu, 229, 'height')

    }
    navHideMenuFn() {
        animation.easingAnimate(this.showMenu, 0, 'height', () => {
            this.showMenu.style.display = 'none'
        })
    }
    showMenuSoHFn() {
        this.showMenu.addEventListener('blur', () => {
            animation.easingAnimate(this.showMenu, 0, 'height', () => {
                this.showMenu.style.display = 'none'
            })
        })
    }
}
new navShowMenu('#oneNavContent', '#oneNav>div>div:last-child>ul')


// 轮播图
class banner {
    /*
        @param {ele} 节点对象 以对象形式传参
        
    */
    constructor(param = {}) {
        // 通过循环获取节点对象
        for (let ele in param) {
            this[ele] = document.querySelector(param[ele]);
        }
        // 获取轮播图子集
        this.pic = this.ul.children;
        // 设置一个初始值
        this.order = 0;
        // 设置一个序列初始值
        this.circle = 0;
        // 设置一个自动计时
        this.timer = null;
        // 设置一个开关,防止用户点击过快造成判断不及
        this.flag = true;
        // 初始化方法
        this.init();
    }
    init() {
        // 生成序列按钮
        this.setCircle();
        // 给每个序列按钮绑定点击事件
        this.circleFn();
        // 绑定前进事件
        this.nextFn();
        // 绑定后退事件
        this.prevFn();
        // 设置自动轮播
        this.auto();
        // 移入时取消自动轮播
        this.overClearAuto();
        // 移出时恢复自动轮播
        this.outAuto();
    }
    setCircle() {
        // 循环图片个数
        for (let i = 0; i < this.pic.length; i++) {
            // 创建节点对象
            let li = document.createElement('li');
            // 追加自定义属性保存当前序列
            li.setAttribute('index', i);
            // 追加到页面中
            this.ol.appendChild(li);
        }
        // 给第一个li设置样式
        this.ol.children[0].className = 'active';
        // 拷贝第一张图片并追加到ul最后
        let first = this.pic[0].cloneNode(true);
        this.ul.appendChild(first)
    }
    circleFn() {
        // 循环
        for (let i = 0; i < this.ol.children.length; i++) {
            this.ol.children[i].onclick = () => {
                if (this.flag) {
                    // 关闭开关
                    this.flag = false;
                    // 获取当前序列号
                    let index = parseInt(this.ol.children[i].getAttribute('index'));
                    // 同步序列号
                    this.order = this.circle = index;
                    // 利用排他思想清除所有class
                    for (let j = 0; j < this.ol.children.length; j++) {
                        this.ol.children[j].className = ''
                    }
                    // 单独添加选中样式
                    this.ol.children[i].className = 'active';
                    // 调用动画
                    animation.easingAnimate(this.ul, -this.pic[0].offsetWidth * index, 'left', () => {
                        // 恢复开关
                        this.flag = true
                    })
                }
            }
        }
    }
    nextFn() {
        this.next.onclick = () => {
            // 开关为开才能进行操作
            if (this.flag) {
                // 关闭开关
                this.flag = false;
                // 当前序列号+1
                this.order++;
                // 调用动画
                animation.easingAnimate(this.ul, -this.pic[0].offsetWidth * this.order, 'left', () => {
                    // 判断，如果序列号到了最后一张图片，则在瞬间拉回到第一张图片
                    if (this.order == this.pic.length - 1) {
                        this.order = 0;
                        this.ul.style.left = '0px';
                    }
                    // 打开开关
                    this.flag = true;
                });
                // 圆点序列+1
                this.circle++;
                // 判断如果大于序列按钮长度则归零
                if (this.circle == this.ol.children.length) {
                    this.circle = 0
                }
                // 排他思想改变选中样式
                for (let i = 0; i < this.ol.children.length; i++) {
                    this.ol.children[i].className = ''
                }
                // 给当前序列按钮设置样式
                this.ol.children[this.circle].className = 'active'
            }
        }
    }
    prevFn() {
        this.prev.onclick = () => {
            // 开关为开才能进行操作
            if (this.flag) {
                // 关闭开关
                this.flag = false;
                // 判断，如果序列号到了第一张图片，则在瞬间拉回到最后一张图片
                if (this.order == 0) {
                    this.order = this.pic.length - 1;
                    this.ul.style.left = `${-this.pic[0].offsetWidth * this.order}px`;
                }
                // 当前序列号-1
                this.order--;
                // 调用动画
                animation.easingAnimate(this.ul, -this.pic[0].offsetWidth * this.order, 'left', () => {
                    // 打开开关
                    this.flag = true;
                });
                // 圆点序列-1
                this.circle--;
                // 判断如果小于0，则变成最后一个
                if (this.circle < 0) {
                    this.circle = this.ol.children.length - 1
                }
                // 排他思想改变选中样式
                for (let i = 0; i < this.ol.children.length; i++) {
                    this.ol.children[i].className = ''
                }
                // 给当前序列按钮设置样式
                this.ol.children[this.circle].className = 'active'
            }
        }
    }
    auto() {
        // 3秒一次
        this.timer = setInterval(() => {
            this.next.onclick()
        }, 3000)
    }
    overClearAuto() {
        this.bannerBox.onmouseover = () => {
            clearInterval(this.timer)
        }
    }
    outAuto() {
        this.bannerBox.onmouseout = () => {
            this.timer = setInterval(() => {
                this.next.onclick()
            }, 3000)
        }
    }
}
new banner({
    ul: '#banner>ul',
    ol: '#banner>ol',
    prev: '#banner>#btnBox>button:first-child',
    next: '#banner>#btnBox>button:last-child',
    bannerBox: '#banner'
})

// 垂直导航栏悬停时打开的详情页面的内容生成
class verticalMenu {
    // @param {ul,dl} 节点对象
    // ul 每个li
    constructor(ul, dl) {
        this.ul = document.querySelectorAll(ul);
        this.dl = document.querySelector(dl);
        // 给每个li绑定事件
        this.liOverFn()
    }
    liOverFn() {
        for (let i = 0; i < this.ul.length; i++) {
            this.Show(this.ul[i])
        }
    }
    Show(ele) {}
    createDl(cssName) {
        let dl = document.createElement('dl');
        // 发送ajax请求 
        let dd = document.createElement('dd')
        dd.innerHTML = cssName
        dl.appendChild(dd)
        return dl
    }
}
new verticalMenu('#verticalNav>ul>li', '#verticalNav>ul>li>dl')

// 页面对应选项卡内容的创建
// 待完成
class tabSelectContent {}

// 拥有选项卡的展示内容的切换
// 根据当前选中样式
class tabSelect {
    /*
    @param {span,ul} 节点对象
    span 对应版块下的选项卡
    ul 对应版块下的显示内容
     */
    constructor(span, ul) {
        this.span = document.querySelectorAll(span);
        this.ul = document.querySelectorAll(ul);
        // 绑定选项卡功能
        this.tabFn()
    }
    tabFn() {
        for (let i = 0; i < this.span.length; i++) {
            // 根据原版对比只需要移入事件
            this.span[i].onmouseover = () => {
                // 排他方法，清空所有被选中时的样式
                for (let j = 0; j < this.span.length; j++) {
                    // 用classList方法对css类进行增删
                    this.span[j].classList.remove('tab-active');
                    this.ul[j].classList.remove('show');
                }
                // 给当前添加选中样式
                this.span[i].classList.add('tab-active');
                this.ul[i].classList.add('show');
            }
        }
    }
}
new tabSelect('#wear .listTitle>div>span', '#wear .contentList')