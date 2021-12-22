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
    async Show(ele) {
        let type = ele.className;
        // 发送Ajax请求 
        let data = await axios({
            method: `get`,
            url: `http://localhost:3000/goods?type=${type}&_page=1&_limit=20`
        })
        if (data.data.length != 0) {
            data.data.forEach(val => {
                let dd = `<dd>
                         <a href="./goodsDetails.html?gId=${val.id}">
                             <img src="${val.src}" alt="">
                             <span>${val.name}</span>
                         </a>
                        </dd>`
                ele.querySelector(`dl`).innerHTML += dd
            })
        }
    }
    createDl(cssName) {
        let dl = document.createElement('dl');
        // 发送ajax请求 
        let dd = document.createElement('dd')
        dd.innerHTML = cssName
        dl.appendChild(dd)
        return dl
    }
}