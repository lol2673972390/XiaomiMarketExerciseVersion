// 商品列表
class goodsList {
    // @params {tabH3,ul}
    // tabH3 切换按钮
    // ul 显示列表
    constructor(tabH3, span, ul) {
        this.tabH3 = document.querySelector(tabH3);
        // this.span = document.querySelector(span);
        this.ul = document.querySelector(ul);
        // 生成内容 异步
        this.createHTML();
        // 点击打开 
        setTimeout(() => {
            this.H3clickShow()
        }, 500)
    }
    async createHTML() {
        // 获取父级id
        let type = this.tabH3.parentNode.id;
        // 根据父级id查询内容
        let data = await axios({
            method: `get`,
            url: `http://localhost:3000/goods?type=${type}`
        });
        // 遍历数据生成内容
        data.data.forEach(val => {
            this.htmlContent(val)
        })
    }
    htmlContent(data) {
        let li = `<li>
                    <a href="./goodsDetails.html?gId=${data.id}">
                        <img src="${data.src}" alt="">
                        <span>${data.name}</span>
                    </a>
                </li>`
        this.ul.innerHTML += li
    }
    H3clickShow() {
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
new goodsList('#wear>h3', '#wear>h3>span', '#wear>.contentList');
new goodsList('#watchTv>h3', '#watchTv>h3>span', '#watchTv>.contentList');
new goodsList('#laptop>h3', '#laptop>h3>span', '#laptop>.contentList');
new goodsList('#appliances>h3', '#appliances>h3>span', '#appliances>.contentList');
//