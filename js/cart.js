class cartRender {
    // 参数看下面new
    // param 单个节点对象
    // params 多个同类型节点对象
    constructor(param = {}, params = {}) {
        for (let ele in param) {
            this[ele] = document.querySelector(param[ele])
        }
        console.log(this.allTotal, this.selectedTotal, this.totalPrice, this.buyBtn, this.listBox, this.user, this.noCartBox);
        setTimeout(() => {
            // 获取用户id
            this.userId = this.user.getAttribute(`login-id`) - 0;
            // 渲染商品数据
            this.listRenderFn();
            // 功能
            this.cartClickFn();
        }, 700)
    }
    async listRenderFn() {

        // 如果有人登录
        if (this.userId) {
            // 根据id查询对应购物车里的数据
            let cart = await axios({
                method: `get`,
                url: `http://localhost:3000/cart?belongTo=${this.userId}`
            })
            if (cart.data.length) {
                // 如果有数据 
                // 有数据
                this.noCartBox.classList.add(`hide`);
                // 循环购物车请求商品数据
                cart.data.forEach(async(val, i) => {
                    // 根据id请求对应数据
                    let data = await axios({
                        method: `get`,
                        url: `http://localhost:3000/goods/${val.gID}`
                    });
                    // console.log(data.data);
                    // 根据数据渲染页面
                    this.listBox.innerHTML += `${this.createHtml(data.data, val,'login')}`;
                })
            }
        } else {
            // 如果没有人登录则调取缓存
            let cart = JSON.parse(localStorage.getItem(`xiaomiCart`));
            // 判断购物车中有无数据
            if (cart) {
                // 有数据
                this.noCartBox.classList.add(`hide`);
                // 循环cart请求商品数据
                cart.forEach(async(val, i) => {
                    // 根据id请求对应数据
                    let data = await axios({
                        method: `get`,
                        url: `http://localhost:3000/goods/${val.gID}`
                    });
                    // console.log(data.data);
                    // 根据数据渲染页面
                    this.listBox.innerHTML += `${this.createHtml(data.data, val,i)}`;
                    // 渲染总共商品个数
                    this.allTotal.innerHTML = this.allTotal.innerHTML - 0 + val.num
                });
            } else {
                // 没有数据
            }
        }
        setTimeout(() => {
            this.totalTesting()
        }, 200)
    }
    cartClickFn() {
        this.listBox.addEventListener(`click`, (e) => {
            let target = e.target;
            console.log(target)
            if (target.classList.contains(`checkBox`)) {
                // 绑定复选框选中样式
                this.checkedFn(target);
            }
            if (target.classList.contains(`checkAll`)) {
                // 绑定全选功能
                this.checkAllFn(target)
            }
            if (target.classList.contains(`checkOne`)) {
                this.checkOneFn(target)
            }
            if (target.classList.contains(`add`)) {
                // 数量+1
                this.addNumFn(target)
            }
            if (target.classList.contains(`reduce`)) {
                // 数量-1
                this.reduceNum(target)
            }
            if (target.classList.contains(`modify`)) {
                // 输入框修改数量
                this.modifyNum(target)
            }
            if (target.classList.contains(`layui-icon-close`)) {
                // 删除
                this.delData(target);
            }
            // 每次触发点击事件都判断一次总价，和已选个数
            this.totalTesting()
        })
    }
    checkedFn(target) {
        // 判断有没有对应样式
        if (target.classList.contains(`checkBoxSelected`)) {
            // 有就删除
            target.classList.remove(`checkBoxSelected`)
        } else {
            // 没有就添加
            target.classList.add(`checkBoxSelected`)
        }
    }
    checkAllFn(target) {
        // 获取所有单选按钮
        let spanS = this.listBox.querySelectorAll(`.listStyleBox .checkBox`);
        // 通过some判断 如果有一个单选按钮没有被选中，那就全选
        if (Array.from(spanS).some(ele => {
                if (!ele.classList.contains(`checkBoxSelected`)) {
                    return true
                }
            })) {
            // 没有被全选
            spanS.forEach(ele => {
                ele.classList.add(`checkBoxSelected`)
            });
        } else {
            // 已经全选
            spanS.forEach(ele => {
                ele.classList.remove(`checkBoxSelected`)
            });
        }
    }
    checkOneFn(target) {
        // 获取所有已被选中的单选按钮
        let spanS = this.listBox.querySelectorAll(`.listStyleBox .checkBoxSelected`);
        // 获取商品列表
        let list = Array.from(this.listBox.querySelectorAll(`.listStyleBox`)).slice(1);
        // 如果商品列表的个数和已被选中的按钮不对等，那么取消掉全选
        if (spanS.length != list.length) {
            this.listBox.querySelector(`.checkAll`).classList.remove(`checkBoxSelected`)
        }
        // 如果选中个数和总列表个数相等则开启全选
        if (spanS.length == list.length) {
            this.listBox.querySelector(`.checkAll`).classList.add(`checkBoxSelected`)
        }
    }
    addNumFn(target) {
        // 对页面的修改是静态的所以直接进行操作
        // 拿到商品的父级
        let father = target.parentNode.parentNode;
        // 上一个兄弟节点的数量+1
        let input = target.previousElementSibling;
        if (input.value == 99) {
            layer.msg(`最大购买量不能超过99`)
            return
        }
        input.value = input.value - 0 + 1;
        // 计算小计
        let col_total = father.querySelector(`.col-total>span`);
        // 获取单价
        let col_price = father.querySelector(`.col-price>span`).innerHTML - 0;
        // 设置小计
        col_total.innerHTML = (input.value - 0) * col_price;
        // 拿到该商品存在浏览器中的序列号 或者id
        let index = father.getAttribute(`no-login`);
        // 判断用户登录
        if (this.userId) {
            // 已登录
            axios({
                method: `patch`,
                url: `http://localhost:3000/cart/${index}`,
                data: {
                    "num": (input.value - 0)
                }
            });
        } else {
            // 未登录
            // 取出localStorage
            let xiaomi = JSON.parse(localStorage.getItem(`xiaomiCart`));
            console.log(xiaomi)
                // 修改对应下标商品的数量
            xiaomi[index].num = xiaomi[index].num - 0 + 1;
            // 重新设置localStorage
            localStorage.setItem(`xiaomiCart`, JSON.stringify(xiaomi))
        }
    }
    reduceNum(target) {
        // 对页面的修改是静态的所以直接进行操作
        // 拿到商品的父级
        let father = target.parentNode.parentNode;
        // 上一个兄弟节点的数量-1
        let input = target.nextElementSibling;
        // 如果数量为1则不执行操作 
        if (input.value == 1) {
            layer.msg(`最小数量不能低于0`);
            return
        }
        input.value = input.value - 1;
        // 计算小计
        let col_total = father.querySelector(`.col-total>span`);
        // 获取单价
        let col_price = father.querySelector(`.col-price>span`).innerHTML - 0;
        // 设置小计
        col_total.innerHTML = (input.value - 0) * col_price;
        // 拿到该商品存在浏览器中的序列号
        let index = father.getAttribute(`no-login`);
        // 判断用户登录
        if (this.userId) {
            // 已登录
            axios({
                method: `patch`,
                url: `http://localhost:3000/cart/${index}`,
                data: {
                    "num": (input.value - 0)
                }
            });
        } else {
            // 未登录

            // 取出localStorage
            let xiaomi = JSON.parse(localStorage.getItem(`xiaomiCart`));
            // 修改对应下标商品的数量
            xiaomi[index].num = xiaomi[index].num - 1;
            // 重新设置localStorage
            localStorage.setItem(`xiaomiCart`, JSON.stringify(xiaomi))
        }
    }
    modifyNum(target) {
        // 对页面的修改是静态的所以直接进行操作
        // 拿到商品的父级
        let father = target.parentNode.parentNode;
        // 先保存自身的数量
        let num = target.value - 0;
        target.onblur = () => {
            // 获取内容，判断是否非数字
            if (isNaN((target.value - 0))) {
                target.value = num
                layer.msg(`不能输入非数字！`)
                return;
            } else {
                if ((target.value - 0) < 1) {
                    target.value = num;
                    layer.msg(`最小数量不能低于0`);
                    return;
                }
                if ((target.value - 0) > 99) {
                    target.value = num;
                    layer.msg(`最大数量不能超过99`);
                    return;
                }
                this.totalTesting();
                // 计算小计
                let col_total = father.querySelector(`.col-total>span`);
                // 获取单价
                let col_price = father.querySelector(`.col-price>span`).innerHTML - 0;
                // 设置小计
                col_total.innerHTML = (target.value - 0) * col_price;
                // 判断用户登录
                if (this.userId) {
                    // 已登录
                } else {
                    // 未登录
                    // 拿到该商品存在浏览器中的序列号
                    let index = father.getAttribute(`no-login`);
                    // 取出localStorage
                    let xiaomi = JSON.parse(localStorage.getItem(`xiaomiCart`));
                    // 修改对应下标商品的数量
                    xiaomi[index].num = target.value - 0;
                    // // 重新设置localStorage
                    localStorage.setItem(`xiaomiCart`, JSON.stringify(xiaomi))
                }
            }
        }
    }
    delData(target) {
        // 获取父级
        let father = target.parentNode.parentNode;
        if (this.userId) {

        } else {
            // 获取商品下标
            let index = father.getAttribute(`no-login`);
            layer.open({
                title: `友情提醒`,
                content: `您真的要删除这个商品吗？`,
                btn: [`确认`, `取消`],
                yes: () => {
                    // 删除此行
                    father.remove();
                    // 删除浏览器记录
                    // 取出localStorage
                    let xiaomi = JSON.parse(localStorage.getItem(`xiaomiCart`));
                    xiaomi.splice(index, 1);
                    // // 重新设置localStorage
                    localStorage.setItem(`xiaomiCart`, JSON.stringify(xiaomi));
                    // 关闭弹窗
                    layer.closeAll(`dialog`);
                    this.totalTesting()
                }
            })
        }
    }
    totalTesting() {
        // 获取被选中的单选按钮
        let spanS = this.listBox.querySelectorAll(`.listStyleBox .checkBoxSelected`);
        // 循环已被选中的商品组，计算个数和总价
        // 设置保存个数和价格的变量
        let num = 0;
        let price = 0;
        spanS.forEach(ele => {
            // 返回到他们的父级去获取数量和小计
            // 个数
            let number = ele.parentNode.parentNode.querySelector('input').value - 0;
            num += number;
            // 小计
            let subTotal = ele.parentNode.parentNode.querySelector(`.col-total>span`).innerHTML - 0;
            price += subTotal
        });
        // 设置内容
        this.selectedTotal.innerHTML = num;
        this.totalPrice.innerHTML = price;
        // 
        // 
        // 
        // 设置总个数
        let totalNum = 0;
        // 获取所有输入框
        let inputS = this.listBox.querySelectorAll(`.listStyleBox input`);
        inputS.forEach(ele => {
            totalNum += (ele.value - 0)
        });
        // 设置内容
        this.allTotal.innerHTML = totalNum
    }
    createHtml(data, val, i) {
        if (i != 'login') {
            i = i
        } else {
            i = val.id
        }
        let html = `
                    <div class="listStyleBox clearF" no-login="${i}">
                        <div class="col col-check checkOne">
                            <span class="checkOne layui-icon layui-icon-ok checkBox "></span>
                        </div>
                        <div class="col col-images">
                            <img src="${data.src}" alt="">
                        </div>
                        <div class="col col-name">
                            <h3>
                                ${val.name}
                            </h3>
                            <span>${val.additional}</span>
                        </div>
                        <div class="col col-price">
                            <span>${val.totalPrice}</span>元
                        </div>
                        <div class="col col-num clearF">
                            <a href="javascript:void(0)" class="reduce">-</a><input type="text" class="modify" name="goodsNum" id="" value="${val.num}"><a href="javascript:void(0)" class="add">+</a>
                        </div>
                        <div class="col col-total">
                            <span>${val.totalPrice * val.num}</span>元
                        </div>
                        <div class="col col-action">
                            <a href="javascript:void(0)" class="layui-icon layui-icon-close"></a>
                        </div>
                    </div>`
        return html
    }
}

window.addEventListener(`load`, () => {
    new cartRender({
        // 全选按钮
        // allCheck: `#listContent #top .col-check`,
        // 总计个数
        allTotal: `#cartTotal .cart-num-total`,
        // 已选个数
        selectedTotal: `#cartTotal .cart-selected-total`,
        // 合计价钱
        totalPrice: `#cartTotal .cart-price-total`,
        // 结算按钮
        buyBtn: `#cartTotal .buyBtn`,
        // 商品列表盒子
        listBox: `#listContent`,
        // 注销按钮
        user: `#header .testingLogin>a:nth-child(2)`,
        // 没有商品时显示的盒子
        noCartBox: `#listContent .noCart`
    }, {})
})