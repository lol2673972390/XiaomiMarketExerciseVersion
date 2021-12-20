// 当input获取焦点和失去焦点时，提示信息的位置改变的方法
class inputFocus {
    // @params {input label css} ele
    // input组
    // label组
    // css样式名字
    constructor(inputs, labels, css) {
        this.inputs = document.querySelectorAll(inputs);
        this.labels = document.querySelectorAll(labels);
        this.css = css;
        // 获取焦点
        this.inputsFocus();
        // 失去焦点
        this.inputsBlur();
    }
    inputsFocus() {
        for (let i = 0; i < this.inputs.length; i++) {
            this.inputs[i].addEventListener('focus', () => {
                // 添加css
                this.labels[i].classList.add(this.css)
            })
        }
    }
    inputsBlur() {
        for (let i = 0; i < this.inputs.length; i++) {
            this.inputs[i].addEventListener('blur', () => {
                // 判断内容，如果有则不取消css，反之
                if (this.inputs[i].value == '') {
                    this.labels[i].classList.remove(this.css)
                }
            })
        }
    }
}