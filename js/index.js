// 垂直导航栏悬停时打开的详情页面的内容生成
// 异步
new verticalMenu('#verticalNav>ul>li', '#verticalNav>ul>li>dl')

// 页面对应选项卡内容的创建
// 待完成 异步
new tabSelectContent(`#phone ul`, ``, `phone`)
new tabSelectContent(`#wear ul`, `#wear .listTitle span`)
new tabSelectContent(`#appliances ul`, `#appliances .listTitle span`)
new tabSelectContent(`#laptop ul`, `#laptop .listTitle span`)


window.addEventListener('load', function() {
    // 轮播图 宏任务
    new banner({
        ul: '#banner>ul',
        ol: '#banner>ol',
        prev: '#banner>#btnBox>button:first-child',
        next: '#banner>#btnBox>button:last-child',
        bannerBox: '#banner'
    });
    // 拥有选项卡的展示内容的切换
    // 根据当前选中样式
    new tabSelect('#wear .listTitle>div>span', '#wear .contentList')
    new tabSelect('#appliances .listTitle>div>span', '#appliances .contentList')
    new tabSelect('#laptop .listTitle>div>span', '#laptop .contentList')
})