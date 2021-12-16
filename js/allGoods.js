// 商品列表
class goodsList {
    // @params {tabH3,ul}
    // tabH3 切换按钮
    // ul 显示列表
    constructor(tabH3, span, ul) {
        this.tabH3 = document.querySelector(tabH3);
        this.span = document.querySelector(span);
        this.ul = document.querySelector(ul);
        // 生成内容
        // 点击打开
        this.H3clickShow()
    }
    createHTML() {}
    H3clickShow() {
        console.log(this.tabH3, this.ul)
        this.tabH3.onclick = () => {
            if (this.ul.classList.contains('show')) {
                this.ul.classList.remove('show')
                this.tabH3.className = ''
                    // this.span.style.tran
            } else {
                this.ul.classList.add('show')
                this.tabH3.className = 'show'
            }
        }
    }
}
new goodsList('#phone>h3', '#phone>h3>span', '#phone>.contentList');
//