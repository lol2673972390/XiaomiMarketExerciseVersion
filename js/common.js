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
        window.addEventListener('scroll', () => {
            // 如果滚动距离大于当前视窗高度，则显示回到顶部
            if (window.scrollY > window.innerHeight) {
                this.box.classList.remove('hide')
            } else {
                this.box.classList.add('hide')
            }
        })
    }
}


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



// 绑定window.onload事件，等到页面加载完以后再绑定事件
window.addEventListener('load', function() {
    // 窗口滚动侧边栏显示回到顶部事件
    new windowScrollAside('#aside>a:last-child');
    // 迷你购物车菜单检测内容效果 
    new miniCartMenu('#header .miniCart-menu');
    // 搜索框快捷导航 + 默认提示轮换
    new searchNav('#oneNavSearch>input', '#oneNavSearch>.searchSelect');
    // 悬停时打开展示栏
    new navShowMenu('#oneNavContent', '#oneNav>div>div:last-child>ul .navMenu');
    // 迷你购物车悬停效果
    new miniCartHover('#header .navCartMini', '#header .miniCart-menu', 'navCartMini-active');
    // 检测登陆状态,显示信息,注销
    new testingLogin('#header .testingLogin', '#header .testingLogin>a>span', '#header .testingLogin>a:nth-child(2)', '#main #tipsLogin')
})