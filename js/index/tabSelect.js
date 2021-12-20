// 拥有选项卡的展示内容的切换
// 根据当前选中样式
class tabSelect {
    /*
    @param {span,ul} 节点对象
    span 对应版块下的选项卡
    ul 对应版块下的显示内容
     */
    constructor(span, ul) {
        this.span = document.querySelectorAll(span);
        this.ul = document.querySelectorAll(ul);
        // 绑定选项卡功能
        this.tabFn()
    }
    tabFn() {
        for (let i = 0; i < this.span.length; i++) {
            // 根据原版对比只需要移入事件
            this.span[i].onmouseover = () => {
                // 排他方法，清空所有被选中时的样式
                for (let j = 0; j < this.span.length; j++) {
                    // 用classList方法对css类进行增删
                    this.span[j].classList.remove('tab-active');
                    this.ul[j].classList.remove('show');
                }
                // 给当前添加选中样式
                this.span[i].classList.add('tab-active');
                this.ul[i].classList.add('show');
            }
        }
    }
}