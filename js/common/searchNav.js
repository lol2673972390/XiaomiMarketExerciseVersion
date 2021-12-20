// 搜索框快捷导航 + 默认提示轮换
class searchNav {
    // @param {input,div} 节点对象
    // input 搜索框
    // div 快捷导航
    constructor(input, div) {
        this.input = document.querySelector(input);
        this.div = document.querySelector(div);
        // 绑定获取焦点事件
        this.focusFn();
        // 绑定失去焦点事件
        this.blurFn();
    }
    focusFn() {
        this.input.oninput = () => {
            if (this.input.value == '') {
                this.div.classList.remove('show');
            } else {
                this.div.classList.add('show');
            }
        }
    }
    blurFn() {
        this.input.onblur = () => {
            if (this.input.value == '') {
                this.div.classList.remove('show');
            } else {
                this.input.focus()
            }
        }
    }
}