// 窗口大小改变事件

class windowSize {
    // @param {box,size} 节点对象,数值
    // box: 需要被隐藏的盒子
    // size: 当窗口缩放到多少宽度时
    constructor(box, size = 1170) {
        this.box = document.querySelector(box);
        this.size = size;
        // 绑定事件
        this.windowSizeChange();
    }
    windowSizeChange() {
        window.onresize = () => {
            if (window.innerWidth <= this.size) {
                this.box.style.display = 'none'
            } else {
                this.box.style.display = 'block'
            }
        }
    }
}