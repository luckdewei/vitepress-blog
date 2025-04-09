# css相关
## 如何让一个盒子水平垂直居中

1. Flex布局（最常用）
```css
.parent {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
  height: 100vh;           /* 可选，使父容器占满视口高度 */
}
```
2. Grid布局
```css
.parent {
  display: grid;
  place-items: center;     /* 水平垂直居中的简写 */
  height: 100vh;           /* 可选，使父容器占满视口高度 */
}
```
3. 绝对定位和负边距
```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```
4. 绝对定位和margin:auto
```css
.parent {
  position: relative;
  height: 100vh;           /* 可选，使父容器占满视口高度 */
}
.child {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 200px;   /* 必须设置宽度 */
  height: 100px;  /* 必须设置高度 */
}
```

5. 绝对定位和calc函数（适用于不定宽高）
```css
.parent {
  position: relative;
  height: 100vh;           /* 可选，使父容器占满视口高度 */
}
.child {
  position: absolute;
  width: 200px;   /* 必须设置宽度 */
  height: 100px;  /* 必须设置高度 */
  top: calc(50% - 50px); /* 50px 是子元素高度的一半 */
  left: calc(50% - 100px); /* 100px 是子元素宽度的一半 */
}
```
## css的盒模型
CSS盒模型是CSS中的一个基础概念，它描述了元素在页面上占据的空间。每个HTML元素都可以看作是一个盒子，由以下部分组成：

### 盒模型的组成部分
1. 内容区域(Content) - 显示元素的实际内容（如文本、图像等）
2. 内边距(Padding) - 内容与边框之间的空间
3. 边框(Border) - 围绕内容和内边距的线条
4. 外边距(Margin) - 元素与其他元素之间的空间

CSS中有两种盒模型
### 标准盒模型(Content-Box)
- 在标准盒模型中， width 和 height 只包括内容区域的宽高
- 元素实际占用的宽度 = width + padding-left + padding-right + border-left + border-right
- 元素实际占用的高度 = height + padding-top + padding-bottom + border-top + border-bottom
- 这是默认的盒模型
```css
.box {
  box-sizing: content-box; /* 默认值 */
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
}
/* 实际宽度 = 200px + 20px*2 + 5px*2 = 250px */
```
### IE盒模型(Border-Box)
- 在IE盒模型中， width 和 height 包括内容区域、内边距和边框
- 元素实际占用的宽度 = width (已包含padding和border)
- 元素实际占用的高度 = height (已包含padding和border)
- 这种模型更符合直觉，在现代CSS中被广泛使用
```css
.box {
  box-sizing: border-box;
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
}
/* 实际宽度 = 200px (内容区域会自动缩小以适应padding和border) */
```
### 实际应用
在现代CSS开发中，通常会在全局样式中设置所有元素使用 border-box 盒模型，这样更容易进行布局计算：
```css
* {
  box-sizing: border-box;
}
```
这样设置后，当你指定一个元素的宽度为100px时，无论添加多少内边距和边框，它的总宽度都保持为100px，内容区域会自动调整大小。

## BFC(Block Formatting Context)
BFC是CSS中的一个重要概念，它是Web页面中的一块独立渲染区域，内部元素的布局不会影响到外部元素。

BFC 是页面中的一块独立的渲染区域，有自己的渲染规则：

1. 内部的盒子会在垂直方向上一个接一个地放置
2. 同一个BFC的两个相邻盒子的margin会发生重叠
3. BFC的区域不会与float元素区域重叠
4. 计算BFC的高度时，浮动元素也会参与计算
5. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素

### 如何创建BFC
- 根元素或包含根元素的元素（`<html>`）
- `float`的值不为`none`
- `overflow`的值不为`visible`
- `display`的值为`inline-block`、`table-cell`、`table-caption`
- `position`的值为`absolute`或`fixed`
- `overflow` 不为 `visible` 的块元素
- `display` 为 `flow-root` 的元素
- `contain` 为 `layout` 、 `content` 或 `paint` 的元素
- 弹性元素（ `display` 为 `flex` 或 `inline-fle`x 的元素的直接子元素）
- 网格元素（ `display` 为 `grid` 或 `inline-grid` 的元素的直接子元素）
- 多列容器（ `column-count` 或 `column-width` 不为 `auto` ）

### BFC的应用场景
---
#### 1. 清除浮动（解决高度塌陷）
当父元素没有设置高度，子元素浮动时，会导致父元素高度塌陷。通过将父元素设置为BFC，可以清除浮动。

```css
.parent {
  overflow: hidden; /* 创建BFC */
}
.child {
  float: left;
}
```
#### 2. 防止margin重叠

在同一个BFC中，相邻的两个元素的margin会发生重叠。通过将其中一个元素设置为BFC，可以防止margin重叠。

```css
.box1 {
  margin-bottom: 20px;
}
.box2-wrapper {
  overflow: hidden; /* 创建新的BFC */
}
.box2 {
  margin-top: 20px;
}
```
#### 3. 自适应两栏布局
利用BFC不会与浮动元素重叠的特性，可以实现自适应两栏布局。
```css
.aside {
  float: left;
  height: 100vh;
  width: 200px;
}
.main {
  height: 100vh;
  overflow: hidden; /* 创建BFC */
  /* main会自动填充剩余空间且不会与浮动的aside重叠 */
}
```
#### 4. 防止文字环绕
当有浮动元素时，文字会环绕在浮动元素周围。通过创建BFC，可以防止文字环绕。
```css
.float-element {
  float: left;
}
.text-container {
  overflow: hidden; /* 创建BFC，防止文字环绕 */
}
```
### 现代CSS中的简便方法
在现代CSS中，可以使用 display: flow-root 来创建BFC，这是专门为创建BFC而设计的属性值，语义更清晰：
```css
.bfc-container {
  display: flow-root;
}
```
## Flex布局的属性

### 容器属性（应用于父元素）
---
#### 1. display: flex | inline-flex
```css
.container {
  display: flex; /* 块级弹性容器 */
  /* 或 */
  display: inline-flex; /* 行内弹性容器 */
}
```
2. flex-direction（主轴方向）
3. flex-wrap（换行方式）
4. flex-flow（flex-direction和flex-wrap的简写）
```css
.container {
  flex-flow: row nowrap; /* 默认值 */
  /* 等同于 */
  flex-direction: row;
  flex-wrap: nowrap;
}
```
5. justify-content（主轴对齐方式）
6. align-items（交叉轴对齐方式）
7. align-content（多根轴线的对齐方式）
### 项目属性（应用于子元素）
---
1. order（排列顺序）
```css
.item {
  flex-grow: 0; /* 默认值为0，即如果存在剩余空间，也不放大 */
  /* 如果所有项目的flex-grow属性都为1，则它们将等分剩余空间 */
}
```
2. flex-grow（放大比例）
```css
.item {
  flex-grow: 0; /* 默认值为0，即如果存在剩余空间，也不放大 */
  /* 如果所有项目的flex-grow属性都为1，则它们将等分剩余空间 */
}
```
3. flex-shrink（缩小比例）
```css
.item {
  flex-shrink: 1; /* 默认值为1，即如果空间不足，该项目将缩小 */
  /* 如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小 */
}
```
4. flex-basis（基准值）
```css
.item {
  flex-basis: auto; /* 默认值为auto，即项目的本来大小 */
  /* 可以设置为具体的长度值，如100px */
}
```
5. flex（flex-grow, flex-shrink 和 flex-basis的简写）
6. align-self（交叉轴单独对齐方式）