---
title: CSS FOR FUN
---
## CSS For Fun
*本篇介绍的效果可能只适用于“现代”浏览器 ┑(￣Д ￣)┍*
### 毛玻璃效果

**知识点：视口单位，伪元素，滤镜，负外边距**

我们想实现如下效果
![](http://images.cnblogs.com/cnblogs_com/castdream/763932/o_%e6%af%9b%e7%8e%bb%e7%92%83.png)
文档结构如下
``` xml
<body>
<main>
    <blockquote>
        This is a demo. This is a demo. This is a demo.This is a demo.This is a demo.This is a demo.
    </blockquote>
</main>
</body>
```
先添加一些基本样式。vh、vw是基于视口的单位，就是浏览器窗口的高和宽的百分之一。还有两者中的较小值vmin(或者vm)和最大值vmax。这样设置后，中间的“玻璃”宽高永远是浏览器窗口的80%。
``` css
*{
    margin: 0;
    padding: 0;
}
body {
    background: url("Koala.jpg") 0 /cover fixed;
    height: 90vh;
}
main {
    background: hsla(0, 0%, 100%, .3);
    width: 80%;
    margin: 10vh auto;
    height: 80vh;
}
```
![透明背景](http://images.cnblogs.com/cnblogs_com/castdream/763932/o_%e9%80%8f%e6%98%8e%e8%83%8c%e6%99%af.png)
现在要让“玻璃”变成“毛玻璃”，我们需要用到伪元素、滤镜属性filter和blur滤镜。
先去掉main元素的background，设置position为relative。
再为main添加一个伪元素，定位在主元素之上，背景设置和为和body一致，并且设置filter为blur(15px)。z-index设置为-1以使文字不被覆盖。
``` css
  main::before {
            background: url("Koala.jpg") 0 /cover fixed;
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            filter: blur(15px);
            z-index: -1;
        }
```
![](http://images.cnblogs.com/cnblogs_com/castdream/763932/o_%e4%b8%8d%e5%a4%aa%e5%ae%8c%e7%be%8e.png)
看起来不错，但是让我们添加个黑色背景看看。
![](http://images.cnblogs.com/cnblogs_com/castdream/763932/o_%e8%be%b9%e7%bc%98%e7%be%bd%e5%8c%96.png)
嗯，边缘的效果和整体不同。为此我们设置负外边距来使内容扩展出去，并设置父容器的overflow为hidden。
``` css
main {
	/*其他样式*/
    overflow: hidden;
    }
main::befroe{
	/*其他样式*/
    margin: -20px;
    }
```
再为文字添加一些样式，就是我们想要的效果啦
``` css
blockquote{
    padding: 10vh;
    font-size: 2em;
}
```

### 自定义复选框

**知识点：伪元素，剪切**

我们要利用伪元素来模拟复选框，再把原来的复选框隐藏掉，同时保留对键盘tab事件的响应。

文档结构如下
``` xml
<input type="checkbox" id="awesome"/>
<label for="awesome">Awesome</label>
```
先为lable添加伪元素，画一个选框出来
``` css
input[type="checkbox"] + label::before{
    content: '\a0';/*不换行空格*/
    display: inline-block;
    vertical-align: .2em;
    width: .8em;
    height: .8em;
    margin-right: .2em;
    border-radius: .2em;
    background: silver;
    text-indent: .15em;
    line-height: .65;
}
```
![](http://images.cnblogs.com/cnblogs_com/castdream/763932/o_%e6%b7%bb%e5%8a%a0lable.png)
再添加勾选样式
``` css
input[type="checkbox"]:checked + label::before{
    content: '\2713';
    background: yellowgreen;
}
```
![](http://images.cnblogs.com/cnblogs_com/castdream/763932/o_%e5%8b%be%e9%80%89%e6%a0%b7%e5%bc%8f.png)
接下来把原来的选框隐藏，不能使用display:none，因为这个就不能响应tab了。我们使用position: absolute将它移除正常文档流，再用clip把它剪切掉。
``` css
 input[type="checkbox"]{
     position: absolute;
     clip:rect(0,0,0,0);
 }
```
再加上聚焦的样式就完成了
``` css
 input[type="checkbox"]:focus + label::before{
     box-shadow: 0 0 .1em .1em #58a;
 }
```
![](http://images.cnblogs.com/cnblogs_com/castdream/763932/o_%e5%a4%8d%e9%80%89%e6%a1%86.png)
