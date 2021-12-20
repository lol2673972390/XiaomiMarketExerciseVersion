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