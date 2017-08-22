---
title: 前端笔记—babel
---

新的 es 标准新增了许多的语法特性和方法，但是许多运行环境还不支持新的标准，我们就需要一个工具来将使用新标准写成的代码转换为符合久标准的代码。babel 就是这样一个工具。
## 安装
### 安装 babel
``` bash
$ npm install -g babel-cli
```
``` bash
$ npm install --save-dev babel-cli
```
### 安装 preset
没有 preset，bable 不会做任何事。preset 有很多，可以参考[官方文档](https://babeljs.io/docs/plugins/#presets)选择自己需要的，最简单的就是使用 ==babel-preset-env== ,它包含了所有 es 标准和还未确定的标准。
``` bash
$ npm install --save-dev babel-preset-env
```
如果要使用react，再添加一个 ==babel-preset-react== 就行。
``` bash
$ npm install --save-dev babel-preset-react
```
## 配置.babelrc
在 .babelrc 里配置需要使用的preset
``` json
{
  "presets": ["env","react"]
}
```
## 使用
### 直接使用
现在就可以使用 bebel-cli 命令行工具来转换 es或者react 代码了。
例如，新建文件 test.js
``` js
let x = ()=>{
    console.log(1);
};
```
直接使用
``` bash
$ babel test.js
```
会将转换结果输出到命令行。结果如下
``` js
"use strict";
var x = function x() {
  console.log(1);
};
```
使用 -o 选项可以指定输出文件
``` bash
$ babel test.js -o babel.js
```
babel-cli 还提供了一个直接执行新标准 es 代码的环境 babel-node。在 test.js 添加
``` js
x();
```
执行代码
``` bash
babel-node test.js
```
可以在控制台看到执行结果

### 配合其他工具使用
参考babel以及各个工具的官方文档，也可以关注我后续介绍其他工具的博客。
## babel-polyfill
babel 只转换新的语法，而不会转换新的 es 标准新增的对象和方法，要使用这些对象和方法，需要为当前环境增加一个垫片。
``` bash
$ npm install --save babel-polyfill
```
在代码头部引入
``` js
// 根据使用的代码模块化工具
import 'babel-polyfill';
// 或者
require('babel-polyfill');
```