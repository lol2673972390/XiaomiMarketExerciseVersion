window.addEventListener('load', function() {
    // 判断点击的是登陆还是注册的选项并显示对应页面事件
    new testingInterfaceAndTabSelect('.loginAndRegis .interface', '', '.loginAndRegis .tabSelect a', 'active', '.loginAndRegis .main');
    // 窗口大小改变事件
    new windowSize('#bg', 1000);
    // 当input获取焦点和失去焦点时，提示信息的位置改变的方法
    new inputFocus('.interface input', '.interface input+label', 'labelFocus');
    // 注册功能事件
    new loginAndRegis('.regis input', '.regis .regisBtn', '.regis .agreement', '.regis input~p:nth-of-type(1)', '.regis input~p:nth-of-type(2)', '.regis input~p:nth-of-type(3)', 'regis');
    // 登陆功能事件
    new loginAndRegis('.login input', '.login .loginBtn', '.login .agreement', '.login input~p:nth-of-type(1)', '.login input~p:nth-of-type(2)', '.login input~p:nth-of-type(3)', 'login');
})