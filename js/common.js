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