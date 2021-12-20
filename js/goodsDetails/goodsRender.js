// 商品渲染 + 页面功能?
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
            url: 'http://localhost:3000/goodsPhone/1'
        });
        // 获取data
        res = res.data;
        console.log(res);
        // 生成页面 安装从上到下顺序依次赋值
        // 生成标题 name 属性
        this.titleCreate(res.name);
        // 插入轮播图片 bannerSrc 属性 数组 、Src 属性 字符串
        this.bannerCreate(res.bannerSrc, res.src);
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
            img.setAttribute(`class`, ``);
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
                a.setAttribute(`href`, `#none`);
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
    static createEle(tag) {
        // 创建节点对象
        return document.createElement(tag)
    }
}