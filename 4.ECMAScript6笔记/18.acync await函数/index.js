/*
async含义：
    async函数是Generator的语法糖
        // const fs = require('fs');
        //
        // const readFile = function (fileName) {
        //     return new Promise(function (resolve, reject) {
        //         fs.readFile(fileName, function(error, data) {
        //             if (error) return reject(error);
        //             resolve(data);
        //         });
        //     });
        // };
        //
        // const gen = function* () {
        //     const f1 = yield readFile('/etc/fstab');
        //     const f2 = yield readFile('/etc/shells');
        //     console.log(f1.toString());
        //     console.log(f2.toString());
        // };
        // const asyncReadFile = async function () {
        //     const f1 = await readFile('/etc/fstab');
        //     const f2 = await readFile('/etc/shells');
        //     console.log(f1.toString());
        //     console.log(f2.toString());
        // };
    async将Generator函数中的*替换成async，yield替换成await
    async和generator比较
        1。内置执行器
            Generator靠执行器co模块/next方法，async自带执行器（相当于普通函数执行）
        2。更好的语义
            async标识函数里有异步操作，await标识紧跟在后面的表达式需要等待结果
        3。更广的适应性
            co模块规定， yield命令后面只能是Thunk函数或者Promise对象，而async函数的await命令后面可以使promise对象和原始类型的值（数值、字符串、布尔值，但此时等同同步操作）
        4。返回的是promise
            async返回promise可以直接使用then方法指定下一步的操作
    async函数就是由多个异步操作包装成的一个promise对象，await命令就是内部then命令的语法糖

基本用法：
    async返回的是promise对象，可用then添加回调函数， 函数执行时，遇到await时候就会等执行异步操作完成再接着执行函数体后面的语句
    async函数返回值会成为then方法回调函数的参数

await命令：
    await后面是一个promise对象，如果不是会被专程一个立即resolve的promise对象
        // async function f() {
        //     return await 123;
        // }
        //
        // f().then(v => console.log(v))
        // // 123
    await命令后面的promise对象如果变为reject状态则reject的参数会被catch方法的回调函数接收
    只要一个await语句侯曼的promise变为reject，真个async函数都会中断执行，可以使用try{}catch{}阻止中断执行，有多个await就都放进try中，也可以在await后面的promise对象再跟一个catch方法，处理前面出现的错误
        // async function f() {
        //     try {
        //         await Promise.reject('出错了');
        //     } catch(e) {
        //     }
        //     return await Promise.resolve('hello world');
        // }
        //
        // f().then(v => console.log(v))
        // // hello world
        // async function f() {
        //     await Promise.reject('出错了').catch(e => console.log(e));
        //     return await Promise.resolve('hello world');
        // }
        //
        // f().then(v => console.log(v))
        // // 出错了
        // // hello world

注意事项：
    1.错误处理
    2.对个await名利后面的异步操作，若不存在激发关系，最好让他们同时进行
        //let foo = await getFoo();
        //let bar = await getBar();
        ////继发关系，耗时
        // 非继发写法一
        //let [foo, bar] = await Promise.all([getFoo(), getBar()]);
        // 非继发写法二
        //let fooPromise = getFoo();
        //let barPromise = getBar();
        //let foo = await fooPromise;
        //let bar = await barPromise;
    3.await只能在async函数中使用

async函数的实现原理
    将Generator函数和自执行器包装在一个函数里
        // async function fn(args) {
        //     // ...
        // }
        //
        // // 等同于
        //
        // function fn(args) {
        //     return spawn(function* () {
        //         // ...
        //     });
        // }
        // function spawn(genF) {
        //     return new Promise(function(resolve, reject) {
        //         const gen = genF();
        //         function step(nextF) {
        //             let next;
        //             try {
        //                 next = nextF();
        //             } catch(e) {
        //                 return reject(e);
        //             }
        //             if(next.done) {
        //                 return resolve(next.value);
        //             }
        //             Promise.resolve(next.value).then(function(v) {
        //                 step(function() { return gen.next(v); });
        //             }, function(e) {
        //                 step(function() { return gen.throw(e); });
        //             });
        //         }
        //         step(function() { return gen.next(undefined); });
        //     });
        // }

与其他异步处理方法的比较:
    1.promise会用到大量promise方法（then、catch）语义化不好
    2.generator语义化比较好，但需要一个执行器
    3.语义化最清晰且不需要执行器

异步遍历器有时间再看
*/