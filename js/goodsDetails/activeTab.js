// 选中效果切换 && 修改当前总价
class activeTab {
    // @params {a/li,state,total,totalPrice,totalDetails} 节点对象
    // a/li：选项卡组
    // state 意外保险再点击时可以取消(2),默认不取消(1)
    // total 总计盒子
    // totalPrice 总计价格
    // totalDetails 总计的默认选项
    constructor(param = {}) {
        this.aS = document.querySelectorAll(param.a);
        this.total = document.querySelector(`#choose>.total`);
        this.totalPrice = document.querySelector(`#choose>.total>.totalPrice`);
        this.totalDetails = document.querySelector(`#choose>.total>.details`);
        this.state = param.state;
        // 选中效果
        this.activeTabFn();
        // 修改总价
        this.updateTotalPrice();
    }
    activeTabFn() {
        // 排他方法
        for (let i = 0; i < this.aS.length; i++) {
            // 使用2级监听，还要绑定别的事件
            this.aS[i].addEventListener('click', () => {
                if (this.aS[i].classList.contains('active')) {
                    // 如果没有携带state参数则不执行这一条命令
                    if (!this.state) return
                    this.aS[i].classList.remove('active')
                } else {
                    for (let j = 0; j < this.aS.length; j++) {
                        this.aS[j].classList.remove('active');
                    }
                    this.aS[i].classList.add('active');
                }
            })
        }
    }
    updateTotalPrice() {
        // console.log(this.aS);
        // 循环绑定事件
        for (let i = 0; i < this.aS.length; i++) {
            this.aS[i].addEventListener('click', () => {

                // 判断当前节点是否是a标签（必选）
                if (this.aS[i].nodeName == 'A') {
                    // 绑定修改价格的方法---必选
                    this.mandatoryFn(this.aS[i], i)
                } else {
                    // 绑定修改价格的方法---可选
                    this.optionalFn(this.aS[i])
                }
                // 检测总价
                this.totalPriceText();
            })
        }
    }
    mandatoryFn(ele, i) {
        // 获取价格
        let price = ele.getAttribute(`gprice`);
        // 取第一个用作标记的css
        let css = ele.parentNode.className.split(' ')[0];
        // 判断必选品是否是套餐
        if (ele.parentNode.classList.contains(`package`)) {
            // 有，追加在总计里
            // 存储innerHTML
            let str = ele.innerHTML;
            if (i != 0) {
                // 判断总计里是否存在，存在则终止
                if (this.total.querySelector(`.package`)) {
                    return
                }
                // 生成html追加到总计里
                this.total.insertBefore(this.createHTML1(str, css), this.totalPrice)
            } else {
                // 如果是第一个则删除节点 
                this.total.querySelector(`.package`).remove()
            }
            return
        }
        // 判断点击price是否有值
        if (price) {
            // 修改第二个选项和价格
            this.totalDetails.querySelector(`.versionOf`).innerHTML = `${ele.innerHTML}`
            this.totalDetails.querySelector(`.right`).innerHTML = `${price}元`
        } else {
            // 只修改显示内容
            this.totalDetails.querySelector(`.versionOf`).innerHTML = `${ele.innerHTML}`
        }
    }
    optionalFn(ele) {
        let css = ele.parentNode.parentNode.classList[0];
        let text = ele.querySelector(`h3`).childNodes[0].nodeValue.trim()
        let price = parseInt(ele.querySelector(`.accPrice`).innerHTML)
        let content = this.total.querySelector(`.${css}`)
        if (content) {
            if (ele.classList.contains(`active`)) {
                content.querySelector(`li`).innerHTML = `${text}`
                content.querySelector(`span`).innerHTML = `${price}元`
            } else {
                content.remove()
            }
        } else {
            this.total.insertBefore(this.createHTML2(css, text, price), this.totalPrice)
        }
    }
    createHTML1(str, css) {
        // 创建节点对象
        let li = document.createElement('li');
        // 插入文本
        li.innerHTML = str;
        // 创建ul
        let ul = document.createElement(`ul`);
        // 设置ul的css
        ul.className = `phoneOf ${css} clearF`;
        // 追加到ul
        ul.appendChild(li);
        // 返回ul
        return ul
    }
    createHTML2(css, text, price) {
        // 创建节点对象
        let li = document.createElement('li');
        // 插入文本
        li.innerHTML = text;
        // 创建节点对象
        let span = document.createElement(`span`);
        // 设置文本
        span.innerHTML = `${price}元`;
        // span设置浮动
        span.className = `right`;
        // 创建ul
        let ul = document.createElement(`ul`);
        // 设置ul的css
        ul.className = `phoneOf ${css} clearF`;
        // 追加到ul
        ul.appendChild(li);
        ul.appendChild(span);
        // 返回ul
        return ul
    }
    totalPriceText() {
        let price = 0;
        Array.from(this.total.querySelectorAll(`.right`)).forEach(ele => {
            price += parseInt(ele.innerHTML)
        })
        this.totalPrice.innerHTML = `总计：<span>${price}</span>元`
    }
}