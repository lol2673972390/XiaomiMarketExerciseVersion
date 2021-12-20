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