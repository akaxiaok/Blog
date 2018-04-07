## 工具版本
Node.js version 8.11.1 LTS
Chrome 65
WebStorm 2017.2.2

## Chrome
使用 --inspect 或者 --inspect-brk 启动程序。--inspect-brk 会在代码第一行暂停。
``` bash
$ node --inspect-brk foo.js
Debugger listening on ws://127.0.0.1:9229/53bd6640-621f-4e31-bc89-a00fd7c34f71
```
控制台会显示程序运行的端口号，例如 9229。也可以自定义端口号如 `--inspect = 8848`。
打开 Chrome 输入 `chrome://inspect`，点击 Configure 设置地址和端口号，在 Remote Target
里就会显示正在运行的 Node 程序，点击 inspect 即可进行调试。

## WebStorm
### 本地调试
直接使用 WebStorm 自带的调试工具就行。
### 远程调试
使用 --inspect 参数启动程序，在 WebStorm 依次点击 `Run >  Edit Configurations > + > Chromium Remote` ，设置好端口号，然后点击 debug 即可。

## 多线程
为子线程设置新的调试端口。fork 和 spawn 设置方法有所不同。
```javascript
child_process.fork(child, [], { execArgv: ['--inspect-brk=9222'] });
child_process.spawn('node', ['--inspect-brk=9222', child]);
```
子线程即可在 Chrome 和 WebStorm 中调试了。


## 参考
[debugging-getting-started](https://nodejs.org/en/docs/guides/debugging-getting-started/)
[Running and Debugging Node.js](https://www.jetbrains.com/help/webstorm/running-and-debugging-node-js.html)