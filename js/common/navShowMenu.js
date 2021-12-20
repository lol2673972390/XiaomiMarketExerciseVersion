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