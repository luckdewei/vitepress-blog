# 前言

此篇以面试题来复习 js 相关知识

## JavaScript 有哪些数据类型，区别是什么

JavaScript 共有八种数据类型，分别是 Undefined、Null、Boolean、
Number、String、Object、Symbol、BigInt。

其中 Symbol 和 BigInt 是 ES6 中新增的数据类型：

- Symbol 代表创建后独一无二且不可变的数据类型，它主要是为了
  解决可能出现的全局变量冲突的问题。
- BigInt 是一种数字类型的数据，它可以表示任意精度格式的整数，
  使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了
  Number 能够表示的安全整数范围。
  这些数据可以分为原始数据类型和引用数据类型：
  - 栈：原始数据类型（Undefined、Null、Boolean、Number、String）
  - 堆：引用数据类型（对象、数组和函数）
    两种类型的区别在于存储位置的不同：
    - 原始数据类型直接存储在栈（stack）中的简单数据段，占据空间
      小、大小固定，属于被频繁使用数据，所以放入栈中存储；
    - 引用数据类型存储在堆（heap）中的对象，占据空间大、大小不固
      定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈
      中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引
      用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。
      堆和栈的概念存在于数据结构和操作系统内存中，在数据结构中：
      - 在数据结构中，栈中数据的存取方式为先进后出。
      - 堆是一个优先队列，是按优先级来进行排序的，优先级可以按照大
        小来规定。
        在操作系统中，内存被分为栈区和堆区：
      - 栈区内存由编译器自动分配释放，存放函数的参数值，局部变量的
        值等。其操作方式类似于数据结构中的栈。
      - 堆区内存一般由开发着分配释放，若开发者不释放，程序结束时可
        能由垃圾回收机制回收。

## 数据类型检测的方式有哪些

### typeof

```js
console.log(typeof 2) // number
console.log(typeof true) // boolean
console.log(typeof 'str') // string
console.log(typeof []) // object
console.log(typeof function () {}) // function
console.log(typeof {}) // object
console.log(typeof undefined) // undefined
console.log(typeof null) // object
```

其中数组、对象、null 都会被判断为 object，其他判断都正确

### instanceof

instanceof 可以正确判断对象的类型，其内部运行机制是判断在其
原型链中能否找到该类型的原型

```js
console.log(2 instanceof Number) // false
console.log(true instanceof Boolean) // false
console.log('str' instanceof String) // false
console.log([] instanceof Array) // true
console.log(function () {} instanceof Function) // true
console.log({} instanceof Object) // true
```

可以看到，instanceof 只能正确判断引用数据类型，而不能判断基本数据类型。instanceof 运算符可以用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。

### constructor

constructor 有两个作用，一是判断数据的类型，二是对象实例通过
constrcutor 对象访问它的构造函数。

```js
console.log((2).constructor === Number) // true
console.log(true.constructor === Boolean) // true
console.log('str'.constructor === String) // true
console.log([].constructor === Array) // true
console.log(function () {}.constructor === Function) // true
console.log({}.constructor === Object) // true
```

### Object.prototype.toString.call()

Object.prototype.toString.call() 使用 Object 对象的原型方法 toString 来判断数据类型

```js
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(“abc”) // "[object String]"
Object.prototype.toString.call(123) // "[object Number]"
Object.prototype.toString.call(true) // "[object Boolean]"
Object.prototype.toString.call(function () {}) // "[object Function]"
Object.prototype.toString.call([]) // "[object Array]"
Object.prototype.toString.call({}) // "[object Object]"
```

## intanceof 操作符的实现原理及实现

instanceof 运算符用于判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。

```js
/**
 *
 * @param {*} target 校验目标
 * @param {*} Fn 构造函数 Array, String...
 */
function myInstanceOf(target, Fn) {
  // 获取对象的原型
  let targetProto = Object.getPrototypeOf(target)
  // 获取构造函数的 prototype 对象
  const prototype = Fn.prototype
  while (true) {
    if (!targetProto) return false
    if (targetProto === prototype) return true
    targetProto = Object.getPrototypeOf(targetProto)
  }
}
```

## Object.is() 与比较操作符 “===”、“==” 的区别

使用双等号（==）进行相等判断时，如果两边的类型不一致，则会进
行强制类型转化后再进行比较。
使用三等号（===）进行相等判断时，如果两边的类型不一致时，不
会做强制类型准换，直接返回 false。
使用 Object.is 来进行相等判断时，一般情况下和三等号的判断相
同，它处理了一些特殊的情况，比如 -0 和 +0 不再相等，两个 NaN
是相等的。

## 什么是 JavaScript 中的包装类型

在 JavaScript 中，基本类型是没有属性和方法的，但是为了便于操
作基本类型的值，在调用基本类型的属性或方法时 JavaScript 会在
后台隐式地将基本类型的值转换为对象

```js
const a = 'abc'
a.length // 3
a.toUpperCase() // ABC
```

在访问 'abc'.length 时 ，JavaScript 将 'abc' 在后台转换成
String('abc')，然后再访问其 length 属性。

JavaScript 也可以使用 Object 函数显式地将基本类型转换为包装类
型：

```js
const a = 'abc'
Object(a) // String {'abc'}
```

也可以使用 valueOf 方法将包装类型倒转成基本类型：

```js
const a = 'abc'
const b = Object(a) // String {'abc'}
const c = b.valueOf() // 'abc'
```

## 如何判断一个对象是空对象

使用 JSON 自带的.stringify 方法来判断

```js
JSON.stringify({}) === '{}'
```

使用 ES6 新增的方法 Object.keys()来判断

```js
Object.keys({}).length === 0
```

## const 对象的属性可以修改吗

const 保证的并不是变量的值不能改动，而是变量指向的那个内存地址不能改动。
对于基本类型的数据（数值、字符串、布尔值），其值就保存在变量指向的那个内存地址，因此等同于常量。
但对于引用类型的数据（主要是对象和数组）来说，变量指向数据的内存地址，保存的只是一个指针，const 只能保证这个指针是固定不
变的，至于它指向的数据结构是不是可变的，就完全不能控制了。

## 如果 new 一个箭头函数的会怎么样

箭头函数是 ES6 中的提出来的，它没有 prototype，也没有自己的 this
指向，更不可以使用 arguments 参数，所以不能 new 一个箭头函数。
new 操作符的实现步骤如下：

1.创建一个对象

2.将构造函数的作用域赋给新对象（也就是将对象的**proto**属性
指向构造函数的 prototype 属性）

3.指向构造函数中的代码，构造函数中的 this 指向该对象（也就是
为这个对象添加属性和方法）

4.返回新的对象

所以，上面的第二、三步，箭头函数都是没有办法执行的。

## 箭头函数的 this 指向哪⾥

箭头函数不同于传统 JavaScript 中的函数，箭头函数并没有属于⾃⼰的 this，它所谓的 this 是捕获其所在上下⽂的 this 值，
作为⾃⼰的 this 值，并且由于没有属于⾃⼰的 this，所以是不会被 new 调⽤的，这个所谓的 this 也不会被改变。

## Proxy 可以实现什么功能

在 Vue3.0 中通过 Proxy 来替换原本的 Object.defineProperty
来实现数据响应式。
Proxy 是 ES6 中新增的功能，它可以用来自定义对象中的操作。

```js
const p = new Proxy(target, handler)
```

target 代表需要添加代理的对象，handler 用来自定义对象中的操作，比如
可以用来自定义 set 或者 get 函数。

通过 Proxy 来实现一个数据响应式：

```js
const obj = new Proxy(
  {},
  {
    get: function (target, propKey, receiver) {
      console.log(`getting ${propKey}!`)
      return Reflect.get(target, propKey, receiver)
    },
    set: function (target, propKey, value, receiver) {
      console.log(`setting ${propKey}!`)
      return Reflect.set(target, propKey, value, receiver)
    }
  }
)

obj.count = 1
//  setting count!
++obj.count
//  getting count!
//  setting count!
//  2
```

## escape、encodeURI、encodeURIComponent 的区别

encodeURI 是对整个 URI 进行转义，将 URI 中的非法字符转换为合法字符，
所以对于一些在 URI 中有特殊意义的字符不会进行转义。
encodeURIComponent 是对 URI 的组成部分进行转义，所以一些特殊字符也会得到转义。
escape 和 encodeURI 的作用相同，不过它们对于 unicode 编码为
0xff 之外字符的时候会有区别，escape 是直接在字符的 unicode
编码前加上 %u，而 encodeURI 首先会将字符转换为 UTF-8 的格式，
再在每个字节前加上 %。

## 什么是尾调用，使用尾调用有什么好处

尾调用指的是函数的最后一步调用另一个函数。代码执行是基于执行
栈的，所以当在一个函数里调用另一个函数时，会保留当前的执行上
下文，然后再新建另外一个执行上下文加入栈中。使用尾调用的话，
因为已经是函数的最后一步，所以这时可以不必再保留当前的执行上
下文，从而节省了内存，这就是尾调用优化。但是 ES6 的尾调用优
化只在严格模式下开启，正常模式是无效的。

## ES6 模块与 CommonJS 模块有什么异同

ES6 Module 和 CommonJS 模块的区别：
CommonJS 是对模块的浅拷⻉，ES6 Module 是对模块的引⽤，即 ES6
Module 只存只读，不能改变其值，也就是指针指向不能变，类似 const；
import 的接⼝是 read-only（只读状态），不能修改其变量值。 即
不能修改其变量的指针指向，但可以改变变量内部指针指向，可以对
CommonJS 对重新赋值（改变指针指向），但是对 ES6 Module 赋值会
编译报错。
ES6 Module 和 CommonJS 模块的共同点：
CommonJS 和 ES6 Module 都可以对引⼊的对象进⾏赋值，即对对象内
部属性的值进⾏改变。

## 对 Promise 的理解

Promise 是异步编程的一种解决方案，它是一个对象，可以获取异步
操作的消息，他的出现大大改善了异步编程的困境，避免了地狱回调，
它比传统的解决方案回调函数和事件更合理和更强大。

所谓 Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
从语法上说，Promise 是一个对象，
从它可以获取异步操作的消息。Promise 提供统一的 API，
各种异步操作都可以用同样的方法进行处理。

（1）Promise 的实例有三个状态:

Pending（进行中）

Resolved（已完成）

Rejected（已拒绝）

当把一件事情交给 promise 时，它的状态就是 Pending，任务完成了
状态就变成了 Resolved、没有完成失败了就变成了 Rejected。

（2）Promise 的实例有两个过程：

pending -> fulfilled : Resolved（已完成）

pending -> rejected：Rejected（已拒绝）

注意：一旦从进行状态变成为其他状态就永远不能更改状态了。

Promise 的特点：

对象的状态不受外界影响。promise 对象代表一个异步操作，有三种
状态，pending（进行中）、fulfilled（已成功）、rejected（已失败）。
只有异步操作的结果，可以决定当前是哪一种状态，任何其他
操作都无法改变这个状态，这也是 promise 这个名字的由来——“承
诺”；

一旦状态改变就不会再变，任何时候都可以得到这个结果。promise
对象的状态改变，只有两种可能：从 pending 变为 fulfilled，从
pending 变为 rejected。这时就称为 resolved（已定型）。如果改变已经发生了，
你再对 promise 对象添加回调函数，也会立即得到这个结果。
这与事件（event）完全不同，事件的特点是：如果你错过了它，再去监听是得不到结果的。

Promise 的缺点：

无法取消 Promise，一旦新建它就会立即执行，无法中途取消。
如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。
当处于 pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

总结：

Promise 对象是异步编程的一种解决方案，最早由社区提出。Promise
是一个构造函数，接收一个函数作为参数，返回一个 Promise 实例。
一个 Promise 实例有三种状态，分别是 pending、resolved 和
rejected，分别代表了进行中、已成功和已失败。实例的状态只能由
pending 转变 resolved 或者 rejected 状态，并且状态一经改变，
就凝固了，无法再被改变了。
状态的改变是通过 resolve() 和 reject() 函数来实现的，
可以在异步操作结束后调用这两个函数改变 Promise 实例的状态，它的原型上定义了一个 then 方法，
使用这个 then 方法可以为两个状态的改变注册回调函数。
这个回调函数属于微任务，会在本轮事件循环的末尾执行。

注意：在构造 Promise 的时候，构造函数内部的代码是立即执行的

## 对 async/await 的理解

async/await 其实是 Generator 的语法糖，它能实现的效果都能用
then 链来实现，它是为优化 then 链而开发出来的。从字面上来看，
async 是“异步”的简写，await 则为等待，所以很好理解 async 用于申明一个 function 是异步的，
而 await 用于等待一个异步方法执行完成。
当然语法上强制规定 await 只能出现在 asnyc 函数中，
先来看看 async 函数返回了什么：

```js
async function testAsync() {
  return 'hello world'
}

const result = testAsync()

console.log(result) // Promise {<fulfilled>: 'hello world'}
```

所以，async 函数返回的是一个 Promise 对象。async 函数（包含
函数语句、函数表达式、Lambda 表达式）会返回一个 Promise 对象，
如果在函数中 return 一个直接量，async 会把这个直接量通过
Promise.resolve() 封装成 Promise 对象。
async 函数返回的是一个 Promise 对象，所以在最外层不能用
await 获取其返回值的情况下，当然应该用原来的方式：then() 链
来处理这个 Promise 对象，就像这样

```js
async function testAsync() {
  return 'hello world'
}

const result = testAsync()

console.log(result)

result.then(v => {
  console.log(v) // hello world
})
```

那如果 async 函数没有返回值，又该如何？很容易想到，它会返回 Promise.resolve(undefined)。
联想一下 Promise 的特点 —— 无等待，所以在没有 await 的情况下
执行 async 函数，它会立即执行，返回一个 Promise 对象，并且，
绝不会阻塞后面的语句。这和普通返回 Promise 对象的函数并无二
致。
注意：Promise.resolve(x) 可以看作是 new Promise(resolve =>
resolve(x)) 的简写，可以用于快速封装字面量对象或其他对象，将
其封装成 Promise 实例。

## async/await 的优势

单一的 Promise 链并不能发现 async/await 的优势，但是，如果需要处理由多个 Promise 组成的 then 链的时候，
优势就能体现出来了（很有意思，Promise 通过 then 链来解决多层回调的问题，
现在又用 async/await 来进一步优化它）。
假设一个业务，分多个步骤完成，每个步骤都是异步的，而且依赖于上一个步骤的结果。
仍然用 setTimeout 来模拟异步操作：

```js
function takeLongTime(n) {
  return new Promise(resolve => {
    setTimeout(() => resolve(n + 200), n)
  })
}

function step1(n) {
  console.log(`step1 with ${n}`)
  return takeLongTime(n)
}

function step2(n) {
  console.log(`step2 with ${n}`)
  return takeLongTime(n)
}

function step3(n) {
  console.log(`step3 with ${n}`)
  return takeLongTime(n)
}

function p() {
  console.time('promise do')
  const time1 = 300
  step1(time1)
    .then(time2 => step2(time2))
    .then(time3 => step2(time3))
    .then(result => {
      console.log(`result is ${result}`)
      console.timeEnd('promise do')
    })
}

p()
// step1 with 300
// step2 with 500
// step2 with 700
// result is 900
// promise do: 1.516s

async function a() {
  console.time('async do')
  const time1 = 300
  const time2 = await step1(time1)
  const time3 = await step1(time2)
  const result = await step3(time3)
  console.log(`result is ${result}`)
  console.timeEnd('async do')
}

a()

// step1 with 300
// step1 with 500
// step3 with 700
// result is 900
// async do: 1.514s
```

async await 的结果和 Promise 实现是一样的，但是这个代码看起来是不是
清晰得多，几乎跟同步代码一样。

## async/await 对比 Promise 的优势

- 代码读起来更加同步，Promise 虽然摆脱了回调地狱，但是 then 的
  链式调⽤也会带来额外的阅读负担

- Promise 传递中间值⾮常麻烦，⽽ async/await ⼏乎是同步的写法，
  ⾮常优雅

- 错误处理友好，async/await 可以⽤成熟的 try/catch，Promise 的
  错误捕获⾮常冗余

- 调试友好，Promise 的调试很差，由于没有代码块，
  你不能在⼀个返回表达式的箭头函数中设置断点，
  如果你在⼀个.then 代码块中使⽤调试器的步进(step-over)功能，
  调试器并不会进⼊后续的.then 代码块，因为调试器只能跟踪同步代码的每⼀步。

## 对象创建的方式有哪些

一般使用字面量的形式直接创建对象，但是这种创建方式对于创建大
量相似对象的时候，会产生大量的重复代码。但 js 和一般的面向对
象的语言不同，在 ES6 之前它没有类的概念。但是可以使用函数来
进行模拟，从而产生出可复用的对象创建方式，常见的有以下几种：

（1）第一种是工厂模式，工厂模式的主要工作原理是用函数来封装
创建对象的细节，从而通过调用函数来达到复用的目的。但是它有一
个很大的问题就是创建出来的对象无法和某个类型联系起来，它只是
简单的封装了复用代码，而没有建立起对象和类型间的关系。

（2）第二种是构造函数模式。js 中每一个函数都可以作为构造函数，
只要一个函数是通过 new 来调用的，那么就可以把它称为构造函数。
执行构造函数首先会创建一个对象，然后将对象的原型指向构造函数
的 prototype 属性，然后将执行上下文中的 this 指向这个对象，
最后再执行整个函数，如果返回值不是对象，则返回新建的对象。因
为 this 的值指向了新建的对象，因此可以使用 this 给对象赋值。
构造函数模式相对于工厂模式的优点是，所创建的对象和构造函数建
立起了联系，因此可以通过原型来识别对象的类型。但是构造函数存
在一个缺点就是，造成了不必要的函数对象的创建，因为在 js 中函
数也是一个对象，因此如果对象属性中如果包含函数的话，那么每次
都会新建一个函数对象，浪费了不必要的内存空间，因为函数是所有
的实例都可以通用的。

（3）第三种模式是原型模式，因为每一个函数都有一个 prototype
属性，这个属性是一个对象，它包含了通过构造函数创建的所有实例
都能共享的属性和方法。因此可以使用原型对象来添加公用属性和方
法，从而实现代码的复用。这种方式相对于构造函数模式来说，解决
了函数对象的复用问题。但是这种模式也存在一些问题，一个是没有
办法通过传入参数来初始化值，另一个是如果存在一个引用类型如
Array 这样的值，那么所有的实例将共享一个对象，一个实例对引用
类型值的改变会影响所有的实例。

（4）第四种模式是组合使用构造函数模式和原型模式，这是创建自
定义类型的最常见方式。因为构造函数模式和原型模式分开使用都存
在一些问题，因此可以组合使用这两种模式，通过构造函数来初始化
对象的属性，通过原型对象来实现函数方法的复用。这种方法很好的
解决了两种模式单独使用时的缺点，但是有一点不足的就是，因为使
用了两种不同的模式，所以对于代码的封装性不够好。

（5）第五种模式是动态原型模式，这一种模式将原型方法赋值的创
建过程移动到了构造函数的内部，通过对属性是否存在的判断，可以
实现仅在第一次调用函数时对原型对象赋值一次的效果。这一种方式
很好地对上面的混合模式进行了封装。

（6）第六种模式是寄生构造函数模式，这一种模式和工厂模式的实
现基本相同，我对这个模式的理解是，它主要是基于一个已有的类型，
在实例化时对实例化的对象进行扩展。这样既不用修改原来的构造函
数，也达到了扩展对象的目的。它的一个缺点和工厂模式一样，无法
实现对象的识别

## 对象继承的方式有哪些

（1）第一种是以原型链的方式来实现继承，但是这种实现方式存在
的缺点是，在包含有引用类型的数据时，会被所有的实例对象所共享，
容易造成修改的混乱。还有就是在创建子类型的时候不能向超类型传
递参数。

（2）第二种方式是使用借用构造函数的方式，这种方式是通过在子
类型的函数中调用超类型的构造函数来实现的，这一种方法解决了不
能向超类型传递参数的缺点，但是它存在的一个问题就是无法实现函
数方法的复用，并且超类型原型定义的方法子类型也没有办法访问到。

（3）第三种方式是组合继承，组合继承是将原型链和借用构造函数
组合起来使用的一种方式。通过借用构造函数的方式来实现类型的属
性的继承，通过将子类型的原型设置为超类型的实例来实现方法的继
承。这种方式解决了上面的两种模式单独使用时的问题，但是由于我
们是以超类型的实例来作为子类型的原型，所以调用了两次超类的构
造函数，造成了子类型的原型中多了很多不必要的属性。

（4）第四种方式是原型式继承，原型式继承的主要思路就是基于已
有的对象来创建新的对象，实现的原理是，向函数中传入一个对象，
然后返回一个以这个对象为原型的对象。这种继承的思路主要不是为
了实现创造一种新的类型，只是对某个对象实现一种简单继承，ES5
中定义的 Object.create() 方法就是原型式继承的实现。缺点与原
型链方式相同。

（5）第五种方式是寄生式继承，寄生式继承的思路是创建一个用于
封装继承过程的函数，通过传入一个对象，然后复制一个对象的副本，
然后对象进行扩展，最后返回这个对象。这个扩展的过程就可以理解
是一种继承。这种继承的优点就是对一个简单对象实现继承，如果这
个对象不是自定义类型时。缺点是没有办法实现函数的复用。

（6）第六种方式是寄生式组合继承，组合继承的缺点就是使用超类
型的实例做为子类型的原型，导致添加了不必要的原型属性。寄生式
组合继承的方式是使用超类型的原型的副本来作为子类型的原型，这
样就避免了创建不必要的属性。

## 哪些情况会导致内存泄漏

以下四种情况会造成内存的泄漏：

意外的全局变量：由于使用未声明的变量，而意外的创建了一个全局
变量，而使这个变量一直留在内存中无法被回收。

被遗忘的计时器或回调函数：设置了 setInterval 定时器，而忘记
取消它，如果循环函数有对外部变量的引用的话，那么这个变量会被
一直留在内存中，而无法被回收。

脱离 DOM 的引用：获取一个 DOM 元素的引用，而后面这个元素被删
除，由于一直保留了对这个元素的引用，所以它也无法被回收。

闭包：不合理的使用闭包，从而导致某些变量一直被留在内存当中。

## 如何理解闭包

内部函数 inner 如果引⽤了外部函数 outer 的变量 a，会形成闭包。

如果这个内部函数作为外部函数的返回值，就会形成词法环境的引⽤闭环（循环引⽤），
对应变量 a 就会常驻在内存中，形成⼤家所说的“闭包内存泄漏”。
虽然闭包有内存上的问题，但是却突破了函数作⽤域的限制，使函数内外搭起了沟通的桥梁。
闭包也是实现私有⽅法或属性，暴露部分公共⽅法的渠道。还可以引申出柯⾥化，bind 等概念。

## 变量提升问题

JS 分为词法分析阶段和代码执⾏阶段。在词法分析阶段，变量和函数会被提升（Hoist），注意 let 和 const 不会提升。
⽽赋值操作以及函数表达式是不会被提升的。
出现变量声明和函数声明重名的情况时，函数声明优先级⾼，会覆盖掉同名的变量声明！为了降低出错的⻛险，尽量避免使⽤ hoist！
注意混杂了函数参数时的坑，主要还是考虑按两个阶段分析，包括函数参数也是有声明和赋值的阶段

## 暂时性死区

这个其实在 ES6 规范就有提到了：

The variables are created when their containing Lexical
Environment <https://262.ecma-international.org/6.0/#sec-lexical-environments> is instantiated but may not be accessed in any way until
the variable’s LexicalBinding is evaluated.

通过 let 或 const 声明的变量是在包围它的词法环境实例化时被创建，但是在变量的词法绑定执⾏前，该变量不能被访问。
