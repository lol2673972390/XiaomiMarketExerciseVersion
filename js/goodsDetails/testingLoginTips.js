// 检测是否登陆后的提示
class testingLoginTips {
    // @param {div} 节点对象
    // div 提示登陆的选项
    constructor(div) {
        this.div = document.querySelector(div);
        // 检测是否有用户登录
        this.testingLogin();
        // 关闭按钮
        this.tipsClose();
    }
    testingLogin() {}
    tipsClose() {
        this.div.children[1].onclick = () => {
            this.div.style.display = 'none';
        }
    }
}