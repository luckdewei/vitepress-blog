# vue相关

## nextTick使用及其原理, 为什么能在DOM更新后获取
nextTick 是Vue提供的一个全局API，用于在DOM更新完成后执行回调函数
```js
// 基本用法
this.$nextTick(() => {
  // DOM更新后执行的代码
  console.log(this.$refs.myElement.offsetHeight);
});

// Vue3中可以直接导入使用
import { nextTick } from 'vue';
nextTick(() => {
  // DOM更新后执行的代码
});

// 也可以使用async/await语法
async function updateData() {
  this.message = '更新后的数据';
  await this.$nextTick();
  // 此时DOM已更新
  console.log(this.$refs.myElement.textContent);
}
```
### 原理解析
1. Vue的DOM更新过程
- 数据变化 → 触发setter → 通知Watcher → 进入异步更新队列
- Vue将DOM更新操作放在微任务队列中执行
- nextTick的回调被放入微任务队列的后面或下一个宏任务
2. 事件循环保证执行顺序
- 同步代码执行完毕
- 执行微任务队列（包括Vue的DOM更新操作）
- 执行nextTick的回调（如果是微任务）或等待下一个宏任务（如果是宏任务）
这种机制确保了nextTick的回调总是在DOM更新完成后才执行，因此可以获取到最新的DOM状态。

## data为什么是函数
进行数据隔离，当一个组件被复用多次时，每个组件实例需要维护一份被返回对象的独立拷贝，而不是共享同一个对象引用。
## 组件通信方式

## key的作用，没有key会有什么问题

## vue2和 vue3对比

### 响应式系统
- Vue2 : 使用 Object.defineProperty 实现响应式
  - 无法检测对象属性的添加/删除
  - 数组变异方法需要特殊处理
- Vue3 : 使用 Proxy 重构响应式系统
  - 支持动态属性增删
  - 更好的数组支持
  - 性能提升约2倍
### 虚拟DOM优化
- Vue2 : 基于 diff 算法
  - 对静态节点进行优化
  - 对频繁更新的节点进行标记
- Vue3 : 基于静态标记和基于差异的算法
  - 静态标记：在编译时对模板进行静态分析，标记出哪些节点是静态的
  - 基于差异的算法：只更新变化的部分，减少DOM操作
### 代码组织方式
- Vue2 Options API
- Vue3 Composition API

优势：
- 更好的逻辑复用
- 更灵活的代码组织
- 更好的TypeScript支持

### TS支持
- Vue2 : 需要额外配置，类型推断有限
- Vue3 : 完全用TypeScript重写，提供完整类型定义
### 打包优化
Vue3 :
- 更好的tree-shaking支持
- 核心库体积减少约41%
- 按需引入组合式API
### 新特性
- Fragment组件
  - 可以拥有多个根节点
- 支持 Teleport


## params参数和 query参数

### params参数
1. 定义方式 ：在路由路径中使用冒号 :param 定义
2. 传递方式 ：作为URL路径的一部分
3. 访问方式 ：通过 this.$route.params 访问
```js
// 路由定义
const routes = [
  { path: '/user/:id', component: User }
]

// 路由跳转
this.$router.push('/user/123')
// 或
this.$router.push({ name: 'User', params: { id: '123' } })

// 获取参数
this.$route.params.id // '123'
```
### query参数
- 定义方式 ：不需要在路由中预先定义
- 传递方式 ：作为URL查询字符串的一部分（?key=value）
- 访问方式 ：通过 this.$route.query 访问
```js
// 路由跳转
this.$router.push('/user?id=123&name=张三')
// 或
this.$router.push({ 
  path: '/user', 
  query: { id: '123', name: '张三' } 
})

// 获取参数
this.$route.query.id    // '123'
this.$route.query.name  // '张三'
```