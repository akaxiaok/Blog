---
title: 《JavaScript函数式编程》的一个 bug
date: 2017-10-10 23:04:33
tags:
---

《JavaScript函数式编程》里介绍柯里化的时候有个例子写错了，代码如下
``` js
function curry3(fun) {
  return function (last) {
    return function (middle) {
      return function (first) {
        return fun(first, middle, last);
      };
    };
  };
};
var songsPlayed = curry3(_.uniq)(false)(songToString);
```
_.uniq 的参数如下
``` js
_.uniq(array, [isSorted], [iteratee])
```
作者想要柯里化 Underscore 的 _.uniq 函数，依次接收最后和中间的参数，返回一个接收第一个参数的方法，但是参数传入的顺序写错了，应该写成
``` js
var songsPlayed = curry3(_.uniq)(songToString)(false);
```
但是，作者的代码返回的结果却是正确。这是因为， _.uniq 函数会判断第二个参数，如果不是布尔值，会把它当做第三个参数，也就是迭代方法。
看了下该书的勘误表，已经有人提交了这个问题，看名字应该是个中国哥们。
![bug list](https://raw.githubusercontent.com/akaxiaok/Blog/master/source/img/2017/10/error%20list.png)