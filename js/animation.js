class animation {
    // 匀速动画
    static evenlyAnimate(ele, step, target, attr, callback) {
        // 运行前清除定时器
        clearInterval(ele.timer);
        // 设置定时动画
        ele.timer = setInterval(function() {
            // 获取初始值
            let start = parseInt(animation.getStyle(ele, attr));
            // 设置移动距离
            let res = start + step;
            // 判断终点
            if (res >= target && step > 0) {
                res = target;
                // 清除定时器
                clearInterval(ele.timer);
                // 回调函数有就调用
                callback && callback();
            }
            if (res <= target && step < 0) {
                res = target;
                // 清除定时器
                clearInterval(ele.timer);
                // 回调函数有就调用
                callback && callback();
            }
            // 设置css属性
            ele.style[attr] = `${res}px`
        }, 30)
    }
    static easingAnimate(ele, target, attr, callback) {
        // 清除定时器
        clearInterval(ele.timer);
        // 设置动画
        ele.timer = setInterval(function() {
            // 获取初始值
            let start = parseInt(animation.getStyle(ele, attr));
            // 计算步长
            let speed = (target - start) / 10;
            // 步长不能为0
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            // 设置移动距离
            let res = start + speed;
            // 设置css属性
            ele.style[attr] = `${res}px`;
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
    static getStyle(ele, attr) {
        // 获取页面渲染最终css样式
        if (window.getComputedStyle) {
            return getComputedStyle(ele, null)[attr]
        } else {
            return ele.currentStyle[attr]
        }
    }
}