# js相关

## promise优势
1. 解决回调地狱问题（链式调用）
2. 统一的错误处理机制（可以通过 `.catch()` 捕获链中任何一步的错误）
3. 更好的异步操作控制（`Promise` 提供了多种静态方法（如 `Promise.all` 、 `Promise.race` 等），可以更灵活地控制多个异步操作）
4. 状态明确(一旦状态改变，就不会再变，这使得异步操作的结果可预测)

## promise缺点
1. 无法取消 `Promise` ，一旦新建它就会立即执行，无法中途取消
2. 如果不设置回调函数， `Promise` 内部抛出的错误，不会反应到外部
3. 当处于 `pending` 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）

## promise为什么支持链式调用

### 1. then方法返回新的Promise对象
Promise的 then 方法本身会返回一个 新的Promise对象 ，而不是返回this（原Promise）。这是链式调用的基础
### 2. 返回值会被自动包装成Promise
then 方法的回调函数返回的任何值都会被自动包装成一个Promise：

- 如果回调函数返回一个值，那么 then 返回的Promise将会以该值被解决（resolved）
- 如果回调函数返回一个Promise，那么 then 返回的Promise将跟随这个Promise的状态
- 如果回调函数抛出异常，那么 then 返回的Promise将以该异常被拒绝（rejected）
```js
Promise.resolve(1)
  .then(value => {
    console.log(value); // 1
    return value + 1;   // 返回普通值，会被包装成Promise.resolve(2)
  })
  .then(value => {
    console.log(value); // 2
    return Promise.resolve(value + 1); // 返回Promise
  })
  .then(value => {
    console.log(value); // 3
    throw new Error('出错了'); // 抛出异常
  })
  .catch(error => {
    console.error(error.message); // "出错了"
  });
```
### 3. Promise状态传递机制
每个新Promise的状态取决于前一个Promise的处理结果：

- 如果前一个Promise成功解决，则调用 then 中的第一个回调函数
- 如果前一个Promise被拒绝，则调用 then 中的第二个回调函数或 catch 中的回调函数
这种状态传递机制确保了异步操作可以按顺序执行。
### 4. 异步操作的顺序控制
链式调用允许我们按顺序执行异步操作，每一步都依赖于前一步的结果：
```js
fetchUserData(userId)
  .then(userData => {
    // 使用用户数据获取该用户的订单
    return fetchUserOrders(userData.orderId);
  })
  .then(orders => {
    // 使用订单信息获取订单详情
    return fetchOrderDetails(orders[0].id);
  })
  .then(details => {
    // 处理订单详情
    console.log(details);
  })
  .catch(error => {
    // 统一处理错误
    console.error('处理过程中出错:', error);
  });
```
通过这种机制，Promise能够优雅地支持链式调用，使异步代码更加清晰和易于维护，有效避免了回调地狱问题。
## promise静态方法
1. Promise.resolve()
2. Promise.reject()
3. Promise.all()
4. Promise.race()
5. Promise.allSettled() (ES2020)

接收一个Promise数组，返回一个新的Promise。该Promise在所有输入的Promise都已完成（无论成功或失败）后解决，结果是一个对象数组，每个对象表示对应的Promise结果。
```js
const promise1 = Promise.resolve('成功');
const promise2 = Promise.reject('失败');
const promise3 = new Promise(resolve => setTimeout(() => resolve('延迟成功'), 1000));

Promise.allSettled([promise1, promise2, promise3])
  .then(results => {
    console.log(results);
    // 输出:
    // [
    //   { status: 'fulfilled', value: '成功' },
    //   { status: 'rejected', reason: '失败' },
    //   { status: 'fulfilled', value: '延迟成功' }
    // ]
  });
```
6. Promise.any() （ES2021）

接收一个Promise数组，返回一个新的Promise。一旦数组中的任何一个Promise成功，返回的Promise就会成功；如果所有Promise都失败，则返回的Promise会失败，并带有AggregateError。
```js
const promise1 = Promise.reject('失败1');
const promise2 = new Promise(resolve => setTimeout(() => resolve('成功'), 1000));
const promise3 = Promise.reject('失败3');

Promise.any([promise1, promise2, promise3])
  .then(result => {
    console.log(result); // 输出: '成功'
  })
  .catch(error => {
    console.error(error); // 如果所有Promise都失败，这里会捕获AggregateError
  });
```
7. Promise.withResolvers() （ES2024）

创建一个Promise及其resolve和reject函数，并将它们作为对象的属性返回
```js
// 传统方式
let resolveFunction, rejectFunction;
const promise = new Promise((resolve, reject) => {
  resolveFunction = resolve;
  rejectFunction = reject;
});

// 使用withResolvers
const { promise, resolve, reject } = Promise.withResolvers();

// 现在可以直接使用resolve和reject函数
setTimeout(() => resolve('完成'), 1000);

promise.then(result => {
  console.log(result); // 输出: '完成'
});
```
## async和 await
async 和 await 是 JavaScript 中处理异步操作的语法糖，它们让异步代码看起来更像同步代码，更易于理解和维护

### 1. async 函数

async 函数是一种特殊的函数，它总是返回一个 Promise。你可以使用 await 关键字来等待一个 Promise 的解决。

```js
async function fetchData() {
  return 'data';  // 自动被包装成 Promise.resolve('data')
}
// 等价于
function fetchData() {
  return Promise.resolve('data');
}
```
### 2. await 关键字

await 关键字只能在 async 函数内部使用。它会暂停 async 函数的执行，等待 Promise 的解决，然后返回 Promise 的结果。
```js
async function fetchData() {
  const data = await fetch('some-url');
  return data;
}
```
### 3. 错误处理

async 函数内部的错误会被自动捕获并被 Promise 拒绝。你可以使用 try/catch 来处理这些错误。
```js
async function fetchData() {
  try {
    const data = await fetch('some-url');
    return data;  // 如果 fetch 失败，这里的代码不会执行  
  }
  catch (error) {
    console.error(error);
    throw error;  // 重新抛出错误，以便外部处理
  }
}
```
### 4. async/await 的优势
- 可读性更强 - 代码结构更接近同步代码，逻辑更清晰
- 错误处理更简单 - 可以使用传统的 try/catch 结构
- 调试更容易 - 断点可以在 await 表达式处正常工作
- 条件语句更自然 - 在 Promise 链中处理条件逻辑比较复杂，而 async/await 可以使用普通的 if/else

## this指向
`this`: 函数的执行主体， 和执行上下文不是一个概念
+ 全局的`this`是window
+ `this`是谁和函数在哪执行，以及在哪定义都没有必然的联系

### 按照以下规律来确定执行主体是谁

1. 给当前元素的某个事件行为绑定方法，执行对应的方法，方法中的`this`是当前元素
2. 函数执行，首先看函数名之前是否有`.`，有`.`前面是谁`this`就是谁，没有`.`非严格模式下`this`就是window
3. 自执行函数中的`this`一般都是window
4. 回调函数中的`this`一般也都是window
5. 构造函数中的`this`是当前类的实例
6. 箭头函数没有自己的`this`，用到的`this`都是上下文中的`this`
7. 基于call/apply/bind可以强制改变`this`的指向
8. 严格模式下，全局`this`是undefined

## 深拷贝和浅拷贝
浅拷贝只复制对象的第一层属性，如果属性是引用类型，则只复制引用地址。
深拷贝会递归复制对象的所有属性，包括引用类型的属性。

### 常见的浅拷贝方法
1. Object.assign()
2. 展开运算符(...)
3. Array.prototype.slice()
4. Array.prototype.concat()
### 常见的深拷贝方法
1. JSON.parse(JSON.stringify(obj))
2. 递归拷贝
3. 使用第三方库，如lodash的_.cloneDeep()
4. 使用Proxy和Reflect
## 原型和原型链
每个 JavaScript 对象都有一个原型对象，对象从原型继承属性和方法

原型链是对象之间通过原型继承的一种关系链。当访问一个对象的属性时，如果该对象本身没有这个属性，JavaScript 会沿着原型链向上查找，直到找到该属性或者到达原型链的顶部（null）
## 闭包
闭包是指一个函数可以访问其外部作用域中的变量，即使在其外部函数执行完毕后

## 防抖和节流
防抖是指在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。
```js
function debounce(fn, delay, immediate = false) {
  let timer = null;
  
  return function(...args) {
    if (timer) clearTimeout(timer);
    
    if (immediate && !timer) {
      fn.apply(this, args);
    }
    
    timer = setTimeout(() => {
      if (!immediate) fn.apply(this, args);
      timer = null;
    }, delay);
  };
}
```
节流是指在事件被触发后，在 n 秒内只会执行一次回调。
```js
function throttle(fn, delay) {
  let timer = null;
  
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, delay);
    }
  };
}

```
## 事件循环

1. 事件循环机制是指浏览器或Node.js的一种解决JavaScript单线程运行时不会阻塞的一种机制
2. 事件循环机制的执行顺序是：先执行全局(同步)代码，再执行微队列，再执行其他队列
3. 微队列包括：Promise.then、MutationObserver、process.nextTick
4. 微队列优先级最高，交互队列(用户操作产生的事件)优先级高，延时队列优先级中