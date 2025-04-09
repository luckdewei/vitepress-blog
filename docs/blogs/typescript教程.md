# 前言

此篇为阅读 typescript 官网的笔记

## 构建第一个 TypeScript 文件

> 安装 TypeScript

```shell
npm install -g typescript
```

> 创建一个 hello.ts 文件

```ts
const str: string = 'hello'

function seyHello(message: string) void {
  console.log('message', message)
}

seyHello(str)
```

> 编译代码

在终端运行

```shell
tsc hello.ts
```

## 基础类型

```ts
// 布尔值
let isDone: boolean = false

// 数字
let decLiteral: number = 6
let hexLiteral: number = 0xf00d
let binaryLiteral: number = 0b1010
let octalLiteral: number = 0o744

// 字符串
let name: string = 'bob'

// 数组
let list: number[] = [1, 2, 3]
// or
let list: Array<number> = [1, 2, 3]

// 元组 Tuple
// 定义一个 tuple 类型
let x: [string, number]
x = ['hello', 10]

// 枚举
enum Color {
  Red,
  Green,
  Blue
}
let c: Color = Color.Green

// Any 任意类型

// Void 空

// Null 和 Undefined

// Never never类型表示的是那些永不存在的值的类型
```

## 接口

> 介绍

TypeScript 的核心原则之一是对值所具有的结构进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。
在 TypeScript 里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约

```ts
interface Person {
  name: string
  age: number
}
const p: Person = { name: 'luckywei', age: 26 }
```

> 可选属性

接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。 可选属性在应用“option bags”模式时很常用，即给函数传入的参数对象中只有部分属性赋值了。

```ts
interface SquareConfig {
  color?: string
  width?: number
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: 'white', area: 100 }
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}

let mySquare = createSquare({ color: 'black' })
```

> 只读属性

一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 readonly 来指定只读属性

```ts
interface Point {
  readonly x: number
  readonly y: number
}
```

> 额外的属性检查

添加一个字符串索引签名，前提是你能够确定这个对象可能具有某些做为特殊用途使用的额外属性。

```ts
interface SquareConfig {
  color?: string
  width?: number
  [propName: string]: any
}
```

> 函数类型

接口能够描述 JavaScript 中对象拥有的各种各样的外形。 除了描述带有属性的普通对象外，接口也可以描述函数类型。

为了使用接口表示函数类型，我们需要给接口定义一个调用签名。 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。

```ts
interface SearchFunc {
  (source: string, subString: string): boolean
}

let mySearch: SearchFunc
mySearch = function (source: string, subString: string) {
  let result = source.search(subString)
  return result > -1
}
```

> 可索引的类型

与使用接口描述函数类型差不多，我们也可以描述那些能够“通过索引得到”的类型，比如 a[10]或 ageMap["daniel"]。 可索引类型具有一个 索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。

```ts
interface StringArray {
  [index: number]: string
}

let myArray: StringArray
myArray = ['Bob', 'Fred']

let myStr: string = myArray[0]
```

> 类类型（实现接口）

与 C#或 Java 里接口的基本作用一样，TypeScript 也能够用它来明确的强制一个类去符合某种契约。

```ts
interface ClockInterface {
  currentTime: Date
}

class Clock implements ClockInterface {
  currentTime: Date
  constructor(h: number, m: number) {}
}
```

> 继承接口

和类一样，接口也可以相互继承。 这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。

```ts
interface Shape {
  color: string
}

interface Square extends Shape {
  sideLength: number
}

let square = <Square>{}
square.color = 'blue'
square.sideLength = 10
```

一个接口可以继承多个接口，创建出多个接口的合成接口。

```ts
interface Shape {
  color: string
}

interface PenStroke {
  penWidth: number
}

interface Square extends Shape, PenStroke {
  sideLength: number
}

let square = <Square>{}
square.color = 'blue'
square.sideLength = 10
square.penWidth = 5.0
```

> 混合类型

接口能够描述 JavaScript 里丰富的类型。 因为 JavaScript 其动态灵活的特点，有时你会希望一个对象可以同时具有上面提到的多种类型。

```ts
interface Counter {
  (start: number): string
  interval: number
  reset(): void
}

function getCounter(): Counter {
  let counter = <Counter>function (start: number) {}
  counter.interval = 123
  counter.reset = function () {}
  return counter
}

let c = getCounter()
c(10)
c.reset()
c.interval = 5.0
```

> 接口继承类

当接口继承了一个类类型时，它会继承类的成员但不包括其实现。 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。 接口同样会继承到类的 private 和 protected 成员。 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。

```ts
class Control {
  private state: any
}

interface SelectableControl extends Control {
  select(): void
}

class Button extends Control implements SelectableControl {
  select() {}
}

class TextBox extends Control {
  select() {}
}

// 错误：“Image”类型缺少“state”属性。
class Image implements SelectableControl {
  select() {}
}

class Location {}
```

## 类

> 介绍
