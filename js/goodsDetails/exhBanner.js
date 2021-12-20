// 商品展示时的轮播
class exhBanner {
    // @params {img,prev,next,circle} 节点对象
    /*
        img：图片组
        prev：上一个按钮
        next：下一个按钮
        circle：指定选中按钮
        box：大盒子，移入停止轮播 
    */
    constructor(img, prev, next, circle, box) {
        this.img = document.querySelectorAll(img);
        this.circle = document.querySelector(circle);
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.box = document.querySelector(box);
        // 保存图片序列号
        this.order = 0;
        // 设置开关
        this.flag = true;
        // 设置定时器
        this.time = null;
        // 初始化方法
        this.init();
    }
    init() {
        // 如果img有数据再执行
        if (this.img.length) {
            // 生成对应个数的按钮
            this.setCircle();
            // 绑定指定图片按钮功能
            this.circleFn();
            // 绑定上一张
            this.prevFn();
            // 绑定下一张
            this.nextFn();
            // 绑定自动轮播
            this.auto();
            // 停止轮播
            this.stopAuto();
            // 恢复轮播
            this.recoveryAuto();
        }
    }
    setCircle() {
        for (let i = 0; i < this.img.length; i++) {
            // 生成一个a标签 并且让它不置顶
            let a = document.createElement('a');
            a.setAttribute('href', '#none');
            // 设置宽度 没必要
            // a.style.width = `${this.circle.offsetWidth / this.img.length}px`;
            // 插入a标签
            this.circle.appendChild(a);
        }
        // 给第一个a标签设置选中样式
        this.circle.children[0].className = `active`
    }
    circleFn() {
        // 指定选中按钮
        for (let i = 0; i < this.img.length; i++) {
            // 循环绑定事件
            this.circle.children[i].onclick = () => {
                // 保存当前序列
                this.order = i;
                // 排他方法清除样式
                for (let j = 0; j < this.img.length; j++) {
                    // 指定按钮class为空
                    this.circle.children[j].className = '';
                    // 图片删除show
                    this.img[j].classList.remove('show')
                }
                // 单独设置当前选中样式
                this.circle.children[i].className = 'active';
                this.img[i].classList.add('show')
            }
        }
    }
    prevFn() {
        this.prev.onclick = () => {
            if (this.flag) {
                this.flag = false;
                // 先判断图片在第几张
                if (this.order == 0) {
                    // 如果为第一张则跳转到最后一张
                    this.order = this.img.length;
                }
                this.order--;
                // 排他清楚样式
                for (let j = 0; j < this.img.length; j++) {
                    // 指定按钮class为空
                    this.circle.children[j].className = '';
                    // 图片删除show
                    this.img[j].classList.remove('show');
                };
                // 单独设置当前选中样式
                this.circle.children[this.order].className = 'active';
                this.img[this.order].classList.add('show');
                // 恢复开关
                this.flag = true
            }
        }
    }
    nextFn() {
        this.next.onclick = () => {
            if (this.flag) {
                this.flag = false;
                // 先加一
                this.order++;
                // 再判断图片在第几张
                if (this.order > this.img.length - 1) {
                    // 如果为第一张则跳转到最后一张
                    this.order = 0;
                }
                // 排他清楚样式
                for (let j = 0; j < this.img.length; j++) {
                    // 指定按钮class为空
                    this.circle.children[j].className = '';
                    // 图片删除show
                    this.img[j].classList.remove('show');
                };
                // 单独设置当前选中样式
                this.circle.children[this.order].className = 'active';
                this.img[this.order].classList.add('show');
                // 恢复开关
                this.flag = true
            }
        }
    }
    auto() {
        this.time = setInterval(() => {
            this.next.onclick()
        }, 3000)
    }
    stopAuto() {
        this.box.onmouseover = () => {
            clearInterval(this.time)
            this.time = null
        }
    }
    recoveryAuto() {
        this.box.onmouseout = () => {
            this.time = setInterval(() => {
                this.next.onclick()
            }, 3000)
        }
    }
}