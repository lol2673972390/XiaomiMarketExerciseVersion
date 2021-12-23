// 商品渲染 + 提交按钮 + 喜欢按钮
class goodsRender {
    // @param {obj1,obj2} 对象传参
    // obj1 存放单个节点对象 
    // obj2 存放群组节点对象
    // 传参详情看下面new的文件，太多了
    constructor(obj1 = {}, obj2 = {}) {
        // 循环赋值 for in
        for (let ele in obj1) {
            this[ele] = document.querySelector(obj1[ele]);
        }
        // 
        let link = location.href.split(`?`);
        // 跳转链接
        this.hf = link[0].split(`/`).slice(0, -1).join(`/`);
        // 当前HTML文件
        this.htmlFile = link[0].split(`/`).pop();
        // 没有商品参数默认为1
        this.receiveId = 1;
        // 有参数获取参数   只有一个传参的情况下
        if (link[1]) {
            this.receiveId = link[1].split(`=`)[1]
        }
        // 两个页面引用的共同js文件，需要判断当前页面是否是商品详情页
        if (this.htmlFile != `goodsDetails.html`) return;
        // 获取地址栏的传参生成内容
        this.localSearchCreateHtml()
    }
    async localSearchCreateHtml() {
        // 添加请求拦截器
        // 
        // 
        // 现在没有先测试
        let res = await axios({
            method: 'get',
            url: `http://localhost:3000/goods/${this.receiveId}`
        });
        // 获取data
        res = res.data;
        // 生成页面 安装从上到下顺序依次赋值
        // 生成标题 name 属性
        this.titleCreate(res.name);
        // 插入轮播图片 bannerSrc 属性 数组 、Src 属性 字符串
        this.bannerCreate(res.bannerSrc, res.src2);
        // 设置活动
        this.activityCreate(res.activity);
        // 设置价格
        this.priceCreate(res.price);
        // 设置赠品
        this.giveCreate(res.give);
        // 设置版本 二维数组，有附带价格
        if (res.version || res.version.length != 1) {
            this.choiceCreate(res.version, `version`, true);
        }
        // 设置颜色
        this.choiceCreate(res.theme, `theme`);
        // 设置套餐
        this.choiceCreate(res.package, `package`);
        // 设置尺寸
        this.choiceCreate(res.size, `size`);
        // 设置意外保护
        this.additionalCreate(res.accident, `accident`);
        // 设置保修服务
        this.additionalCreate(res.guarantee, `guarantee`);
        // 设置云空间
        this.additionalCreate(res.cloudSpace, `cloudSpace`);
        // 设置安装服务
        this.additionalCreate(res.install, `install`);
        // 设置总计
        this.totalCreate(res);
        // 绑定提交购物车功能
        this.addCartFn();
        // 绑定喜欢商品功能
        this.likeGoodsFn();
    }
    titleCreate(name) {
        // 顶部标题和商品标题
        this.topTitle.innerHTML = `${name}`;
        this.name.innerHTML = `${name}`
    }
    bannerCreate(bannerSrc = [], src) {
        // 如果有数据就生成轮播图，如果没有就隐藏
        // 有数据为数组，没有数据为false
        if (bannerSrc) {
            // 按钮前插入img
            bannerSrc.forEach((ele, index) => {
                // 创建img标签
                let img = goodsRender.createEle('img');
                // 设置路径
                img.setAttribute('src', ele);
                // 给第一个img设置show
                let show = ``
                if (index == 0) {
                    show = `show`
                }
                // 设置css
                img.setAttribute('class', `bannerItem ${show}`);
                // 追加到页面中
                this.bannerSmallBox.insertBefore(img, this.bannerAfter)
            })
        } else {
            // 不显示轮播图组件
            this.bannerSmallBox.style.display = `none`;
            // 创建一个预览图
            let img = goodsRender.createEle(`img`);
            // 设置路径
            img.setAttribute(`src`, src);
            // 设置cs
            img.setAttribute(`class`, `oneImg`);
            // 追加到页面中 大盒子
            this.bannerBigBox.appendChild(img);
        }
    }
    activityCreate(activity = []) {
        if (activity) {
            // 生成一个html字符串
            let html = `<span>${activity[0]}</span> ${activity[1]}`;
            // 添加到页面中
            this.activity.innerHTML = `${html}`
        } else {
            // 没有则隐藏
            this.activity.classList.add(`noDataHide`)
        }
    }
    priceCreate(price) {
        if (price) {
            // 生成一个html字符串
            let html = `${price} 元`;
            // 添加到页面中
            this.price.innerHTML = `${html}`
        } else {
            // 没有则隐藏
            this.price.classList.add(`noDataHide`)
        }
    }
    giveCreate(give) {
        if (give) {
            // 生成一个html字符串
            let html = `<span>${give[0]}</span>${give[1]}`;
            // 添加到页面中
            this.give.innerHTML = `${html}`
        } else {
            // 没有则隐藏
            this.give.classList.add(`noDataHide`);
            // 隐藏一个分隔线
            this.give.previousElementSibling.classList.add(`noDataHide`)
        }
    }
    choiceCreate(content, ele, price = false) {
        // 选择文本内容的创建
        if (content) {
            content.forEach((val, index) => {
                // 创建A标签
                let a = goodsRender.createEle('a');
                // 取消链接
                a.setAttribute(`href`, `javascript:void(0)`);
                // 设置样式
                // 给一个默认添加选中
                let active = ``;
                if (index == 0) { active = `active` };
                a.setAttribute(`class`, `editionItem ${active}`);
                // 设置文本
                if (!price) {
                    a.innerHTML = `${val}`;
                } else {
                    a.innerHTML = `${val[0]}`;
                    // 如果有隐藏价格选项则添加到自定义属性中
                    a.setAttribute(`gPrice`, `${val[1]}`);
                }
                // 追加到页面中
                this[ele].appendChild(a)
            })
        } else {
            // 没有则隐藏
            this[ele].classList.add(`noDataHide`)
        }
    }
    additionalCreate(content = false, ele) {
        if (content) {
            this[ele].classList.remove(`noDataHide`)
        }
    }
    totalCreate(data) {
        // 设置默认选项--名字
        this.totalDetails.children[0].innerHTML = `${data.name}`;
        // 设置默认选项--版本/尺寸
        let str1 = ``;
        // 谁有就设置谁
        if (data.version) { str1 = data.version[0][0] }
        if (data.size) { str1 = data.size[0] }
        this.totalDetails.children[1].innerHTML = `${str1}`;
        // 设置默认选项--颜色
        let str2 = ``;
        // 如果有就设置
        if (data.theme) { str2 = data.theme[0] }
        this.totalDetails.children[2].innerHTML = `${str2}`;
        // 设置默认选项--价格
        let str3 = ``;
        if (data.version) {
            str3 = data.version[0][1]
        } else {
            str3 = data.price
        }
        this.totalDetails.children[3].innerHTML = `${str3}元`;
        // 设置默认选项下的总价
        this.totalPrice.innerHTML = `总计：<span>${str3}</span>元`;
    }
    addCartFn() {
        this.addCart.addEventListener('click', async() => {
            // 获取总计里的文本信息和总价
            let li = this.total.querySelectorAll(`ul:not(:first-child) li`);
            // 第一个配置详情结构不一样所以单独获取处理
            let details = this.total.querySelectorAll(`.details li`);
            // 设置两个字符串分别处理文本
            let detailsText = ``;
            Array.from(details).forEach(e => {
                detailsText += `${e.innerHTML} `
            })
            detailsText = detailsText.trim()
            let liText = ``;
            Array.from(li).forEach(e => {
                liText += `${e.innerHTML} `
            });
            liText = liText.trim();
            // 获取总价
            let price = this.totalPrice.querySelector(`span`).innerHTML - 0;
            // 获取名字
            // let name = this.name.innerHTML;
            // 获取页面登陆者信息---id
            let userID = document.querySelector(`#header .testingLogin>a:nth-child(2)`).getAttribute(`login-id`) - 0;
            // 存储到购物车
            // 先判断有无用户登陆，没有则存到localStorage
            if (userID) {
                this.cartJSONData(detailsText, liText, price, userID)
            } else {
                this.cartLocalStorage(detailsText, liText, price)
            }
        })
    }
    likeGoodsFn() {
        this
    }
    async cartJSONData(detailsText, liText, price, userID) {
        // 发送Ajax请求
        let cart = await axios({
            method: "get",
            url: `http://localhost:3000/cart?belongTo=${userID}`
        });
        // 设置一个标记
        let flag = false;
        // 保存id
        let cId = null;
        // 保存下标
        let order = null;
        // 遍历有无重复数据
        cart.data.forEach((v, i) => {
            if (v.name == detailsText) {
                flag = true;
                cId = v.id;
                order = i
                return
            }
        })
        if (flag) {
            // 有
            let num = cart.data[order].num - 0 + 1
            if (cart.data[order].additional == liText) {
                // 如果服务重复，数量加1
                axios({
                    method: `patch`,
                    url: `http://localhost:3000/cart/${cId}`,
                    data: {
                        "num": num
                    }
                });
            } else {
                // 提示是否修改？
                layer.open({
                    title: `友情提示`,
                    content: `该商品已存在，是否更改服务选项？`,
                    btn: [`取消`, `确认`],
                    yes: () => {
                        // 取消直接修改数量
                        axios({
                            method: `patch`,
                            url: `http://localhost:3000/cart/${cId}`,
                            data: {
                                "num": num
                            }
                        });
                        // layer.closeAll('dialog')
                    },
                    btn2: () => {
                        // 确认修改其他
                        axios({
                            method: `patch`,
                            url: `http://localhost:3000/cart/${cId}`,
                            data: {
                                "num": num,
                                "additional": liText,
                                "totalPrice": price
                            }
                        });
                    }
                })
            }
        } else {
            // 新增
            axios({
                method: 'post',
                url: `http://localhost:3000/cart`,
                data: {
                    "name": `${detailsText}`,
                    "num": 1,
                    "additional": `${liText}`,
                    "belongTo": userID,
                    "totalPrice": price,
                    "gID": this.receiveId,
                }
            })
        }
    }
    cartLocalStorage(detailsText, liText, price) {
        // 获取
        let cart = localStorage.getItem(`xiaomiCart`);
        if (cart) {
            // 有
            cart = JSON.parse(cart);
            // 设置一个标记
            let flag = false;
            let order = null
            cart.forEach((val, i) => {
                if (val.name == detailsText) {
                    // 打开标记
                    flag = true;
                    // 记录下标
                    order = i
                    return
                }
            })
            if (flag) {
                // 修改数量+1
                cart[order].num = cart[order].num - 0 + 1;
                layer.open({
                    title: `友情提示`,
                    content: `该商品已存在，是否更改服务选项？`,
                    btn: [`取消`, `确认`],
                    yes: () => {
                        // 设置新cart
                        localStorage.setItem(`xiaomiCart`, JSON.stringify(cart))
                        layer.closeAll('dialog')
                    },
                    btn2: () => {
                        cart[order].additional = liText;
                        cart[order].totalPrice = price;
                        // 设置新cart
                        localStorage.setItem(`xiaomiCart`, JSON.stringify(cart))
                    }
                })
            } else {
                // 如果没有就新增一个
                let obj = {
                    "name": `${detailsText}`,
                    "num": 1,
                    "additional": `${liText}`,
                    "belongTo": null,
                    "totalPrice": price,
                    "gID": this.receiveId,
                }
                cart.push(obj);
                // 设置新cart
                localStorage.setItem(`xiaomiCart`, JSON.stringify(cart))
            }
        } else {
            // 没有
            let obj = [{
                "name": `${detailsText}`,
                "num": 1,
                "additional": `${liText}`,
                "belongTo": null,
                "totalPrice": price,
                "gID": this.receiveId,
            }];
            // 添加
            localStorage.setItem(`xiaomiCart`, JSON.stringify(obj))
        }
    }
    static createEle(tag) {
        // 创建节点对象
        return document.createElement(tag)
    }
}