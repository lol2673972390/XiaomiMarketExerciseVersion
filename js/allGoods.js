// 商品列表
class goodsList {
    // @params {tabH3,ul}
    // tabH3 切换按钮
    // ul 显示列表
    constructor(tabH3, span, ul) {
        this.tabH3 = document.querySelector(tabH3);
        this.span = document.querySelector(span);
        this.ul = document.querySelector(ul);
        // 生成内容 异步
        // 点击打开 
        this.H3clickShow()
    }
    createHTML() {}
    H3clickShow() {
        console.log(this.tabH3, this.ul)
        this.tabH3.onclick = () => {
            // 如果当前显示则关闭列表，并取消标题的选中样式
            if (this.ul.classList.contains('show')) {
                this.ul.classList.remove('show');
                this.tabH3.className = ''
            } else {
                // 否则打开列表，标题添加选中样式
                this.ul.classList.add('show')
                this.tabH3.className = 'show'
            }
        }
    }
}
new goodsList('#phone>h3', '#phone>h3>span', '#phone>.contentList');
//