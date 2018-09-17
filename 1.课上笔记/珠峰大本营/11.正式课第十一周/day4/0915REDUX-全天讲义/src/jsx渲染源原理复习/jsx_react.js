let React = {};

React.createElement = function createElement(type, props, ...children) {
    let newOBJ = {
        type,
        key: null,
        ref: null,
        props: {
            ...props,//=>KEY&REF要提出来
        }
    };
    //=>CHILDREN
    let params = children,
        len = params.length;
    if (len > 0) {
        newOBJ.props.children = len === 1 ? params[0] : params;
    }
    //=>KEY和REF的提取
    props = newOBJ.props;
    for (const propsKey in props) {
        if (props.hasOwnProperty(propsKey)) {
            if (/^(KEY|REF)$/i.test(propsKey)) {
                newOBJ[propsKey] = props[propsKey];
                delete props[propsKey];
            }
        }
    }
    return newOBJ;
};


export default React;