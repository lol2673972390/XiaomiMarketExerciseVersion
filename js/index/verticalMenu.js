// 垂直导航栏悬停时打开的详情页面的内容生成
class verticalMenu {
    // @param {ul,dl} 节点对象
    // ul 每个li
    constructor(ul, dl) {
        this.ul = document.querySelectorAll(ul);
        this.dl = document.querySelector(dl);
        // 给每个li绑定事件
        this.liOverFn()
    }
    liOverFn() {
        for (let i = 0; i < this.ul.length; i++) {
            this.Show(this.ul[i])
        }
    }
    Show(ele) {}
    createDl(cssName) {
        let dl = document.createElement('dl');
        // 发送ajax请求 
        let dd = document.createElement('dd')
        dd.innerHTML = cssName
        dl.appendChild(dd)
        return dl
    }
}