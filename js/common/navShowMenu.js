// 悬停时打开展示栏
class navShowMenu {
    // @param {showMenu,ulLi}
    // showMenu: 展示框
    // ulLi: 导航栏父级，使用事件委托
    constructor(showMenu, ulLi) {
        this.showMenu = document.querySelector(showMenu);
        this.navUl = document.querySelectorAll(ulLi);
        // 绑定事件
        this.Delegate();
        // 绑定展示框显示或掩藏事件
    }
    Delegate() {
        // 循环绑定事件
        for (let i = 0; i < this.navUl.length; i++) {
            // 移入
            this.navUl[i].onmouseover = (eve) => {
                this.showMenu.querySelector(`ul`).innerHTML = ``
                this.showMenuContent(eve.target)
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
    async showMenuContent(tar) {
        let label = tar.className.split(` `)[1];
        // 根据标签查询内容
        let data = await axios({
            method: `get`,
            url: `http://localhost:3000/goods?label=${label}&_page=1&_limit=6`
        })
        data.data.forEach((val, i) => {
            let css = ``
            if (i == 0) {
                css = `first`
            }
            let li = `<li class="${css}">
                         <a href="./goodsDetails.html?gId=${val.id}">
                             <img src="${val.src}" alt="">
                                <div>${val.name}</div>
                             <p class="pirce">${val.price}元起</p>
                         </a>
                     </li>`
            this.showMenu.querySelector(`ul`).innerHTML += li
        })
    }
}