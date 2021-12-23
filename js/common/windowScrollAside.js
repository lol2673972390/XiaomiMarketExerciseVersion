// 窗口滚动侧边栏显示回到顶部事件
class windowScrollAside {
    // @param {a} 节点对象
    // a 侧边栏最后一个盒子
    constructor(a) {
        this.box = document.querySelector(a);
        // 根据窗口滚动，显示回到顶部
        this.watchScroll();
        // 滚动条置顶动画
        this.fn()
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
    fn() {
        this.box.addEventListener(`click`, () => {
            console.log(document.documentElement.scrollTop)
                // 清除定时器
            this.easing(document.documentElement, 0, `scrollTop`)
        })
    }
    easing(ele, target, attr, callback) {
        clearInterval(ele.timer);
        // 设置动画
        ele.timer = setInterval(function() {
            // 获取初始值
            let start = ele[attr];
            // console.log(start);
            // 计算步长
            let speed = (target - start) / 10;
            // 步长不能为0
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            // 设置移动距离
            let res = start + speed;
            // 设置css属性
            ele[attr] = `${res}`;
            // 判断终点
            if (res == target) {
                res = target;
                // 清除定时器
                clearInterval(ele.timer);
                // 回调函数存在就调用
                callback && callback();
            }
        }, 15)
    }
}