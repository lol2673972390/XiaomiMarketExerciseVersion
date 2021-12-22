// 绑定window.onload事件，等到页面加载完以后再绑定事件
window.addEventListener('load', function() {
    // 窗口滚动侧边栏显示回到顶部事件
    new windowScrollAside('#aside>a:last-child');
    // 迷你购物车菜单检测内容效果 
    new miniCartMenu('#header .miniCart-menu');
    // 搜索框快捷导航 + 默认提示轮换
    new searchNav('#oneNavSearch>input', '#oneNavSearch>.searchSelect');
    // 悬停时打开展示栏
    new navShowMenu('#oneNavContent', '#oneNav>div>div:last-child>ul .navMenu');
    // 迷你购物车悬停效果
    new miniCartHover('#header .navCartMini', '#header .miniCart-menu', 'navCartMini-active');
    // 检测登陆状态,显示信息,注销
    new testingLogin('#header .testingLogin', '#header .testingLogin>a>span', '#header .testingLogin>a:nth-child(2)', '#main #tipsLogin')
})

// 获取当前页面
let htmlFile = location.href.split(`/`).slice(-1)
if (htmlFile != `index.html`) {
    document.querySelector(`#oneNav>div>div:last-child>ul>li:first-child>a`).classList.remove(`hide`)
}