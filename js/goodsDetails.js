// 商品渲染 + 页面功能
// 商品渲染
new goodsRender({
    // 内容盒子
    contentBox: '#buySelect',
    // 顶部标题
    topTitle: "#title>div>div:first-child",
    // 轮播盒子(大)
    bannerBigBox: '#exhibition',
    // 轮播盒子(小)
    bannerSmallBox: '#exhibition>.exhBanner',
    // 轮播图标记
    bannerAfter: '.exhBanner>.exhBtn',
    // 名字（标题）
    name: '#choose>.name',
    // 活动
    activity: '#choose>.activity',
    // 价格
    price: '#choose>.price',
    // 赠品
    give: '#choose>.give',
    // 版本
    version: '#choose>.version',
    // 颜色
    theme: '#choose>.theme',
    // 套餐
    package: '#choose>.package',
    // 尺寸
    size: '#choose>.size',
    // 意外保护
    accident: '#choose>.accident',
    // 保修
    guarantee: '#choose>.guarantee',
    // 云空间
    cloudSpace: '#choose>.cloudSpace',
    // 安装服务
    install: '#choose>.install',
    // 总计
    total: '#choose>.total',
    // 总计价格 + 插入标记 
    totalPrice: '#choose>.total>.totalPrice',
    // 总计详情
    totalDetails: '#choose>.total>.details'
}, {
    // 节点对象群组
    // 暂无
});

window.addEventListener("load", function() {
    // 检测是否登陆后的提示
    new testingLoginTips('#tipsLogin');
    // 滚动条吸顶事件，商品名字栏
    new scrollCeiling('#title');
    // 根据异步任务执行顺序，必须在页面渲染后再加载小功能
    setTimeout(() => {
        // 商品轮播
        new exhBanner('.exhBanner>.bannerItem', '.exhBanner>.exhBtn>a:first-child', '.exhBanner>.exhBtn>a:last-child', '.exhBanner>.exhCircle', '.exhBanner');
        // 版本
        new activeTab({ a: '#choose>.version>a' });
        // 颜色
        new activeTab({ a: '#choose>.theme>a' });
        // 套餐
        new activeTab({ a: '#choose>.package>a' });
        // 尺寸
        new activeTab({ a: '#choose>.size>a' });
        // 意外保护
        new activeTab({ a: '#choose>.accident>ul>li', state: 2 });
        // 保修
        new activeTab({ a: '#choose>.guarantee>ul>li', state: 2 });
        // 安装服务
        new activeTab({ a: '#choose>.install>ul>li', state: 2 });
        // 云空间
        new activeTab({ a: '#choose>.cloudSpace>ul>li', state: 2 });
    }, 1000)
});