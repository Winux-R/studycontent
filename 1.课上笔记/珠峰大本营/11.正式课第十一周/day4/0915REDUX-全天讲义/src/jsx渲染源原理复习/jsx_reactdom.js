let ReactDOM = {};

ReactDOM.render = function render(jsxOBJ, container, callback) {
    let {type, props} = jsxOBJ;
    //=>CREATE
    let newElement = document.createElement(type);
    for (let attr in props) {
        if (!props.hasOwnProperty(attr)) break;
        let valueInfo = props[attr];//=>props['style/className/children...']
        if (/^CLASSNAME$/i.test(attr)) {
            newElement.setAttribute('class', valueInfo);
            continue;
        }
        if (/^STYLE$/i.test(attr)) {
            for (let styleKEY in valueInfo) {
                if (valueInfo.hasOwnProperty(styleKEY)) {
                    newElement.style[styleKEY] = valueInfo[styleKEY];
                }
            }
            continue;
        }
        if (/^CHILDREN$/i.test(attr)) {
            //=>可能是一个值，可能是一个数组（值都是字符串或者是元素等）
            valueInfo = valueInfo.length === 1 ? [valueInfo] : valueInfo;
            for (let i = 0; i < valueInfo.length; i++) {
                let item = valueInfo[i];
                if (typeof item === 'string') {
                    //=>文本元素
                    newElement.appendChild(document.createTextNode(item));
                } else {
                    //=>元素节点：
                    //重新执行RENDER方法，把创建的子元素插入到创建的外层新元素中
                    render(item, newElement);
                }
            }
            continue;
        }
        if (/^__(SOURCE|SELF)$/i.test(attr)) {
            continue;
        }
        newElement.setAttribute(attr, valueInfo);
    }
    container.appendChild(newElement);
    callback && callback();
};

export default ReactDOM;