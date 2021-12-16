// 迷你购物车悬停效果
class miniCartHover {
    // @param {ele,ele} 节点
    // @param {eleCssName} css样式
    // ele1: 导航处迷你购物车
    // ele2：迷你购物车绑定菜单
    // eleCssName: 迷你购物车选中样式
    constructor(ele1, ele2, eleCssName) {
        // 获取元素
        this.miniCart = document.querySelector(ele1);
        this.miniCartMenu = document.querySelector(ele2);
        // 设置选中样式
        this.eleCssName = eleCssName;
        // 绑定鼠标移入事件
        this.miniCartMouseoverFn();
        // 绑定鼠标移出事件
        this.miniCartMouseoutFn();
    }
    miniCartMouseoverFn() {
        // 外置this
        let _this = this;
        // 给迷你购物车绑定事件
        this.miniCart.onmouseover = function() {
            // 添加被选中css类
            this.classList.add(_this.eleCssName);
            // 给迷你购物车菜单绑定展开动画
            animation.easingAnimate(_this.miniCartMenu, 100, 'height')
        }
    }
    miniCartMouseoutFn() {
        // 外置this
        let _this = this;
        // 绑定事件
        this.miniCart.addEventListener('mouseout', function() {
            // 存储当前节点对象的this
            let tart = this
            animation.easingAnimate(_this.miniCartMenu, 0, 'height', function() {
                // 动画执行完毕后再删除选中样式
                tart.classList.remove(_this.eleCssName);
            })
        })
    }
}
new miniCartHover('#header .navCartMini', '#header .miniCart-menu', 'navCartMini-active');
// 迷你购物车菜单检测内容效果 
class miniCartMenu {
    // @param {ele,eleSon} 节点对象
    // ele: 迷你购物车菜单栏
    // eleSon: 迷你购物车显示内容节点
    constructor(ele, eleSon) {
        // 获取节点对象
        this.menuBox = document.querySelector(ele);
    }
}
new miniCartMenu('#header .miniCart-menu')

// 搜索框快捷导航 + 默认提示轮换
class searchNav {
    // @param {input,div} 节点对象
    // input 搜索框
    // div 快捷导航
    constructor(input, div) {
        this.input = document.querySelector(input);
        this.div = document.querySelector(div);
        // 绑定获取焦点事件
        this.focusFn();
        // 绑定失去焦点事件
        this.blurFn();
    }
    focusFn() {
        this.input.oninput = () => {
            if (this.input.value == '') {
                this.div.classList.remove('show');
            } else {
                this.div.classList.add('show');
            }
        }
    }
    blurFn() {
        this.input.onblur = () => {
            if (this.input.value == '') {
                this.div.classList.remove('show');
            } else {
                this.input.focus()
            }
        }
    }
}
new searchNav('#oneNavSearch>input', '#oneNavSearch>.searchSelect')

// 悬停时打开展示栏
class navShowMenu {
    // @param {showMenu,ulLi}
    // showMenu: 展示框
    // ulLi: 导航栏父级，使用事件委托
    constructor(showMenu, ulLi) {
        this.showMenu = document.querySelector(showMenu);
        this.navUl = document.querySelectorAll(ulLi);
        // this.navUl = document.querySelector(ele2);
        // 绑定事件
        this.Delegate();
        // 绑定展示框显示或掩藏事件
        // this.showMenuSoHFn()
    }
    Delegate() {
        // 循环绑定事件
        for (let i = 0; i < this.navUl.length; i++) {
            // 移入
            this.navUl[i].onmouseover = () => {
                this.show()
            };
            // 移出
            this.navUl[i].onmouseout = () => {
                this.hide()
            }
        }
        // 一定要给展示框再绑定显示
        this.showMenu.onmouseover = () => {
            this.show()
        };
        // 绑定移出
        this.showMenu.onmouseout = () => {
            this.hide()
        }
    }
    show() {
        this.showMenu.style.display = 'block';
        animation.easingAnimate(this.showMenu, 229, 'height')
    }
    hide() {
        animation.easingAnimate(this.showMenu, 0, 'height', () => {
            // 动画完毕后再隐藏，否则会有边框残留
            this.showMenu.style.display = 'none';
        })
    }
}
new navShowMenu('#oneNavContent', '#oneNav>div>div:last-child>ul .navMenu')

// 窗口滚动侧边栏显示回到顶部事件
class windowScrollAside {
    // @param {a} 节点对象
    // a 侧边栏最后一个盒子
    constructor(a) {
        this.box = document.querySelector(a);
        // 根据窗口滚动，显示回到顶部
        this.watchScroll();
    }
    watchScroll() {
        window.onscroll = () => {
            // 如果滚动距离大于当前视窗高度，则显示回到顶部
            if (window.scrollY > window.innerHeight) {
                this.box.classList.remove('hide')
            } else {
                this.box.classList.add('hide')
            }
        }
    }
}
new windowScrollAside('#aside>a:last-child')