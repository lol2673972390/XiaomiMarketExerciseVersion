// 迷你购物车菜单检测内容效果 
class miniCartMenu {
    // @param {ele,eleSon} 节点对象
    // ele: 迷你购物车菜单栏
    // eleSon: 迷你购物车显示内容节点
    constructor(ele, eleSon) {
        // 获取节点对象
        this.menuBox = document.querySelector(ele);
        this.eleSon = document.querySelectorAll(eleSon);
        // 获取注销按钮上的id
        setTimeout(() => {
            this.userId = document.querySelector(`#header .testingLogin>a:nth-child(2)`).getAttribute(`login-id`) - 0;
            this.testingCreate();
        }, 200)
    }
    async testingCreate() {
        // 在菜单里添加一个box
        this.menuBox.innerHTML = ``;
        let box = document.createElement(`div`)
        box.className = `box`
        this.menuBox.appendChild(box)
            // 判断有无用户登录
        if (this.userId) {
            // 登录
            // 根据id查询数据
            let res = await axios({
                method: `get`,
                url: `http://localhost:3000/cart?belongTo=${this.userId}`
            });
            // 如果有数据
            if (res.data.length != 0) {
                // 计算总数
                let num = 0;
                let price = 0;
                res.data.forEach(async(val) => {
                    // 根据商品id查询图片
                    let data = await axios({
                        method: `get`,
                        url: `http://localhost:3000/goods/${val.gID}`
                    })
                    let div = `<div class="list">
                                <img src="${data.data.src}" alt="">
                                <p>${val.name}</p>
                                <span>${val.totalPrice}元</span>
                                <span>x ${val.num}</span>
                                <span cId="${val.id}">清除</span>
                            </div>`
                    this.menuBox.querySelector('.box').innerHTML += div
                    num += (val.num - 0)
                    price += ((val.num - 0) * (val.totalPrice - 0))
                });
                // 宏任务，等到渲染完迷你购物车后再显示总数
                setTimeout(() => {
                    // 设置两个显示总数的地方
                    this.menuBox.previousElementSibling.innerHTML = num;
                    // 显示总价
                    this.menuBox.innerHTML += `<div class="clearF last"><span class="left">共 ${num} 件商品</span><span class="right">${price} 元</span></div>`;
                    // 侧边固定栏
                    let span = document.querySelector(`#aside a:nth-child(5)`).lastElementChild
                    span.innerHTML = num
                    span.classList.remove(`hide`);
                    // 给每个清除按钮绑定功能
                    let div = this.menuBox.querySelectorAll(`.list span:last-child`)
                    div.forEach(ele => {
                        ele.addEventListener('click', this.clear.bind(this, ele))
                    })
                }, 200);
            } else {
                this.menuBox.innerHTML = `购物车中没有数据,快去购物吧！`
            }
        } else {
            // 未登录
            // 取出localStorage
            let xmCart = localStorage.getItem(`xiaomiCart`)
            if (!xmCart) {
                this.menuBox.innerHTML = `购物车中没有数据,快去购物吧！`;
                return
            } else {
                // 计算总数
                let num = 0;
                let price = 0;
                // 遍历
                JSON.parse(xmCart).forEach(async(val, i) => {
                    // 根据商品id查询图片
                    let data = await axios({
                        method: `get`,
                        url: `http://localhost:3000/goods/${val.gID}`
                    })
                    let div = `<div class="list">
                                <img src="${data.data.src}" alt="">
                                <p>${val.name}</p>
                                <span>${val.totalPrice}元</span>
                                <span>x ${val.num}</span>
                                <span cId="${i}">清除</span>
                            </div>`
                    this.menuBox.querySelector('.box').innerHTML += div
                    num += (val.num - 0)
                    price += ((val.num - 0) * (val.totalPrice - 0))
                });
                // 宏任务，等到渲染完迷你购物车后再显示总数
                setTimeout(() => {
                    // 设置两个显示总数的地方
                    this.menuBox.previousElementSibling.innerHTML = num;
                    // 显示总价
                    this.menuBox.innerHTML += `<div class="clearF last"><span class="left">共 ${num} 件商品</span><span class="right">${price} 元</span></div>`;
                    // 侧边固定栏
                    let span = document.querySelector(`#aside a:nth-child(5)`).lastElementChild
                    span.innerHTML = num
                    span.classList.remove(`hide`);
                    // 给每个清除按钮绑定功能
                    let div = this.menuBox.querySelectorAll(`.list span:last-child`)
                    div.forEach(ele => {
                        ele.addEventListener('click', this.clear2.bind(this, ele))
                    })
                }, 200);
            }
        }
    }
    clear(ele) {
        // 获取自定义属性 id
        let id = ele.getAttribute(`cId`);
        // 删除
        axios({
            method: `delete`,
            url: ` http://localhost:3000/cart/${id}`
        });
        // 删除本行
        ele.parentNode.remove();
        // 如果没有数据了则隐藏掉购物车
        let span = document.querySelector(`#aside a:nth-child(5)`).lastElementChild
        if (!(span.innerHTML - 0)) {
            span.classList.add(`hide`)
        }
    }
    clear2(ele) {
        // 获取自定义属性 id
        let id = ele.getAttribute(`cId`);
        // 删除localStorage
        let xm = JSON.parse(localStorage.getItem(`xiaomiCart`))
        xm.splice(id, 1)
        localStorage.setItem(`xiaomiCart`, JSON.stringify(xm));
        // 删除本行
        ele.parentNode.remove();
        // 如果没有数据了则隐藏掉购物车
        let span = document.querySelector(`#aside a:nth-child(5)`).lastElementChild
        if (!(span.innerHTML - 0)) {
            span.classList.add(`hide`)
        }
    }
}