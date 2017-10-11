---
title: Charles 前端代理工具
---

在前端开发的过程中，有时候生产环境出了问题需要解决，但是那上面的代码又不能随便修改，就需要在本地将远程文件拦截并替换为自己本地的文件。fiddler 这样的软件就有这个功能。但是公司最近的环境不知道做了什么变动，fiddler 用不了，折腾了几天也解决不了，只好谋它法。最后，找到了 Charles，它能够很好的适应公司环境，使用起来也比较方便。接下来介绍一下它的使用方法。
## 安装
下载安装不用多说。一路确定即可，中间会让你选择是否安装 Firefox 插件，按需选择即可。
## 安装证书
为了拦截 HTTPS 请求，需要安装 SSL 证书。安装过程如图
![install SSl](./1.install SSL.png);
![install SSl](./2.install SSL.png);
![install SSl](./3.install SSL.png);
## 设置代理
SLL 解密没有默认打开，需要手动设置。可以只设置需要拦截的地址和端口，也可以留空，则全部地址和端口都会解密。
![not decode](./4.not%20decode.png)
![set decode](./5.set%20decode.png)
![set decode](./6.set%20decode.png)

## 使用
下图是 GitHub 头像图片的请求，我们拦截它修改为本地的一个图片。
![remote](./7.remote.png)
这里 Charles 为会将请求按地址归类，看起来比 fiddler 每个请求单独一行要清晰。
![local](./8.local.png)
在 Charles 里找到该请求，右键然后点击 Map Local。大部分情况需要将 Query 一栏清空保证该路径所有请求都使用本地文件。Local Path 选择需要替换为哪一个本地文件。
![map local](./9.map%20local.png)
![map local](./10.map%20local.png)
回到浏览器刷新，可以看到已经成功的将请求替换为了本地文件。
![complete](./11.complete.png)
