---
title: JavaScript 基础补缺
---

- javascript中，若省略var关键字而直接赋值，那么这个变量为全局变量，哪怕是在function里定义的。
- 所有window对象的属性拥有全局作用域
- 在Js中函数是没有重载，定义相同函数名、不同参数签名的函数，后面的函数会覆盖前面的函数。调用时，只会调用后面的函数。
``` js
var n1 = 1;
function add(value1) {
    return n1 + 1;
}
alert(add(n1));//调用的是下面的函数，输出：3
function add(value1, value2) {
    return value1 + 2;
}
alert(add(n1));//输出：3
```
- arguments 类似于C#的params，操作可变参数：传入函数的参数数量大于定义时的参数数量。
``` js
function showNames(name) {
    alert(name);//张三
    for (var i = 0; i < arguments.length; i++) {
        alert(arguments[i]);//张三、李四、王五
    }
}
showNames('张三','李四','王五');
```
- 若函数没有指明返回值，默认返回的是'undefined'
- IIFE(立即执行函数)
An immediately-invoked function expression (or IIFE, pronounced "iffy") is a JavaScript design pattern which produces a lexical scope using JavaScript's function scoping.
``` js
(function (p1) {
    alert(p1);
})(1);
```
- 假设，函数A内部声明了个函数B，函数B引用了函数B之外的变量，并且函数A的返回值为函数B的引用。那么函数B就是闭包函数。
- 执行以下两个函数，会返回相同的东西吗？
``` js
function foo1()
{
  return {
      bar: "hello"
  };
}
function foo2()
{
  return
  {
      bar: "hello"
  };
}
```
不会，第二个函数返回undefined。如果某行代码，return 关键词后没有任何东西了，将会自动插入一个分号
- NaN 不是一个数字 Number.isNaN()检测
- 判断回文 1拆分；2反转；3对比

### IE8、9的 console
在IE8中没有`console`对象，而在IE9中，要打开 Dev Tools 才能使用`console`对象，因此如果代码中使用了`console`会出现代码执行不下去，而一打开调试工具就正常的奇怪现象。因此，如果要支持IE8、9，最好在代码规范检测中添加对`console`的检查，在提交代码之前移除`console`。
### isNaN
`isNaN('')`和`isNaN(flase)`返回`false`，这可能不太符合预期，因此在使用之前需要先对参数使用parse。



















