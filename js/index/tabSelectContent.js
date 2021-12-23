// 页面对应选项卡内容的创建
// 待完成
class tabSelectContent {
    // @param {uls,type} ele
    // uls 是选项卡ul的集合
    // type 是对应选项卡的分类
    // label 是选项卡，要获取文字 
    constructor(uls, label = ``, type = ``) {
        this.uls = document.querySelectorAll(uls);
        this.type = type
        if (label != ``) {
            this.label = document.querySelectorAll(label)
        }
        // 手机单独写一个，分类不一样
        if (this.type == `phone`) {
            this.phoneCreate();
        } else {
            this.contentCreate();
        }
    };
    // 根据type 查询 对应 标签 的 数据
    contentCreate() {
        // 循环uls 创建内容
        this.uls.forEach(async(ele, i) => {
            // 拿到第一个css类，一定要第一个，因为位置是固定的
            let l = ele.className.split(` `)[0];
            let type = ele.getAttribute(`gType`);
            let txt = this.label[i].innerHTML;
            // 根据标签和类型拿到对应数据
            let res = await axios({
                method: `get`,
                url: `http://localhost:3000/goods?type=${type}&label=${l}&_page=1&_limit=7`
            })
            res.data.forEach(val => {
                let li = ` <li>
                                  <a href="./goodsDetails.html?gId=${val.id}">
                                     <div><img src="${val.src}" alt=""></div>
                                     <h3>${val.name}</h3>
                                        <p>${val.title}</p>
                                     <p><span>${val.price}</span>元起</p>
                                 </a>
                             </li>`
                ele.innerHTML += li
            })
            let more = ` <li class="lastMore">
                          <a href="./allgoods.html">
                              <div>浏览更多 <br> <small>${txt}</small></div>
                              <div>
                                    <span class="layui-icon layui-icon-more"></span>
                              </div>
                          </a>
                         </li>`
            ele.innerHTML += more
        })
    }
    phoneCreate() {
        // 循环uls 创建内容
        this.uls.forEach(async(ele) => {
            // 发送请求
            let res = await axios({
                method: `get`,
                url: `http://localhost:3000/goods?type=${this.type}`
            })
            res.data.forEach(val => {
                // 拿到title不为空的
                if (val.title != '') {
                    let li = ` <li>
                                  <a href="./goodsDetails.html?gId=${val.id}">
                                     <div><img src="${val.src}" alt=""></div>
                                     <h3>${val.name}</h3>
                                        <p>${val.title}</p>
                                     <p><span>${val.price}</span>元起</p>
                                 </a>
                             </li>`
                    ele.innerHTML += li
                }
            })
        })
    }
}