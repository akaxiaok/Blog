---
title: JavaScript面向对象编程
---
# JavaScript面向对象编程
## 创建对象

1.工厂模式
``` js
    function createPerson(name, age) {
        var o = {};
        o.name = name;
        o.age = age;
        o.say = function () {
            console.log('I\'m ' + this.name + ', from factory.');
        };
        return o;
    }
    var p1 = createPerson('Kimi', '23');
    p1.say();// I'm Kimi, from factory.
```
**缺点：工厂模式能创建多个相似的对象，但都是Objec类型，无发区分。**

2.构造函数模式
```js
    function Person(name, age) {
        this.name = name;
        this.age = age;
        this.say = function () {
            console.log('I\'m ' + this.name + ', from constructor.');
        }
    }

    var p1 = new Person('Kimi', '23');
    var p2 = new Person('Lili', '21');
    p1.say();// I'm Kimi, from constructor.
    console.log(p1.constructor); // [Function: Person]
    console.log(p1 instanceof Person);// true
    console.log(p1.say == p2.say);// flase
```
构造函数一般应该以大写开头；对构造函数使用new，会在构造函数内部创建一个新对象并将作用域赋给该对象，然后执行构造函数中的代码，最终会返回该对象。构造函数也是一个对象，它拥有一个原型属性prototype称之为函数原型，prototype下有一个constructor属性指向该构造函数。通过构造函数创建的实例对象也包含一个[[prototype]]指针指向函数原型。
**缺点：在构造函数内声明的方法，在每个实例中都会重新生成一份，这不利于函数的重用。**
![](http://images.cnblogs.com/cnblogs_com/castdream/763932/o_%e5%87%bd%e6%95%b0%e5%8e%9f%e5%9e%8b.png)

3.原型模式
```  js
    function Person() {
    }

    Person.prototype.name = 'Kimi';
    Person.prototype.age = 23;
    Person.prototype.say = function () {
        console.log('I\'m ' + this.name + ',from prototype.');
    };
    var p1 = new Person();
    var p2 = new Person();
    p1.say();
    p1.name = 'New Name';
    p1.say();
    console.log(p1.hasOwnProperty('name'));// true
    console.log('name' in p1);// true

    console.log(p2.hasOwnProperty('name')); // false
    console.log('name' in p2); // true

    console.log(p1.say === p2.say);// true
    console.log(Person.prototype.isPrototypeOf(p1));// true
    console.log(Object.getPrototypeOf(p1));//返回[[Prototype]] ES5
    console.log(Object.keys(Person.prototype));//可枚举属性 ES5
    console.log(Object.keys(p1));//ES5
    console.log(Object.getOwnPropertyNames(p1));//所有自有属性

    for (var pro in p1) {
        console.log(pro);
    }
```
因为所有属性都是在原型对象上的，所以他们被所有的实例对象所共享。

4.组合使用构造函数和原型模式
``` js
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }

    Person.prototype = {
        constructor: Person,  // 使用字面量从写函数原型，需要将构造函数重置
        say: function () {
            console.log('I\'m ' + this.name + ', from mix');
        }
    };
    var p1 = new Person('Kimi', 23);
    p1.say();
```

## 继承

1.原型链
```   js
    //原型链
    function SuperType() {
        this.colors = ['red', 'blue'];
        this.property = true;
    }

    SuperType.prototype.getSuperValue = function () {
        return this.property;
    };
    function SubType() {
        this.subproperty = false;
    }

    SubType.prototype = new SuperType(); // 重写SubType的原型，将其修改为一个SuperType实例

    SubType.prototype.getSubValue = function () {
        return this.subproperty;
    };
    var instance = new SubType();
    console.log(instance.getSuperValue());
    console.log(instance instanceof Object);
    console.log(instance instanceof SuperType);
    console.log(instance instanceof SubType);
    console.log(Object.prototype.isPrototypeOf(instance));
    console.log(SuperType.prototype.isPrototypeOf(instance));
    console.log(SubType.prototype.isPrototypeOf(instance));
    var instance2 = new SubType();
    instance2.colors.push('green');
    console.log(instance.colors);// [ 'red', 'blue', 'green' ]
```
**缺点：1. 父类的属性被子类共享。2. 子类无法向父类传递参数。**

2.借用构造函数
``` js
    //借用构造函数
    function SuperType(name) {
        this.name = name;
        this.sayName = function () {
            console.log('I\'m ' + this.name + ' from SuperType constructor');
        }
    }

    SuperType.prototype.say = function () {
        console.log('I\'m ' + this.name + ' from SuperType prototype');
    };
    function SubType(name, age) {
        SuperType.call(this, name);// 借用构造函数
        this.age = age;
    }

    var instance = new SubType('Kimi', 23);
    console.log(instance instanceof SuperType);// false
    //instance.say(); 父类原型中的方法子类不可见
    instance.sayName();
```
**缺点：父类原型中的方法子类不可见，方法都在构造函数中定义无法复用**

3.组合原型链和借用构造函数
``` js
    //组合原型链和构造函数
    function SuperType(name) {
        this.name = name;
        this.colors = ['red', 'blue', 'green'];
    }

    SuperType.prototype.sayName = function () {
        console.log('I\'m ' + this.name + ' from SuperType prototype');
    };
    function SubType(name, age) {
        SuperType.call(this, name);// 第二次调用SuperType()
        this.age = age;
    }

    SubType.prototype = new SuperType();// 第一次调用SuperType()
    SubType.prototype.sayAge = function () {
        console.log(this.age);
    };
    var instance1 = new SubType('Kimi', 23),
        instance2 = new SubType('Lili', 21);
    instance1.sayName();

    instance1.colors.push('yellow');
    console.log(instance2.colors);

    console.log(instance1 instanceof SuperType);
```
**不够完美的地方就是调用了两次SuperType()，子类实例属性和子类的原型上创建了两组相同的属性**

4.寄生组合
``` js
if (!Object.create) {
    Object.create = function (o) {
        function F() {
        }
        F.prototype = o;
        return new F();
    }
}
```
原型式继承方法，该方法返回一个对象，该对象以传入的对象作为函数原型。ES5新增了该方法。
``` js
    // 寄生组合
    function inheritPrototype(subType, superType) {
        var prototype = Object.create(superType.prototype);
        prototype.constructor = subType;
        subType.prototype = prototype;
    }
    function SuperType(name) {
        this.name = name;
        this.colors = ['red','blue'];
    }
    SuperType.prototype.sayName = function () {
        console.log(this.name);
    };
    function SubType(name, age) {
        SuperType.call(this,name);
        this.age = age;
    }
    inheritPrototype(SubType,SuperType);
    SubType.prototype.sayAge = function () {
        console.log(this.age);
    }
```
只调用了一次SupperType()，不会创建冗余的属性，函数定义在prototype上可共享。

## jQuery创建对象

使用jQuery时，$('xxx')会返回一个对象，它是怎么做到不使用new关键字创建对象的呢？
我们可以在构造函数里使用new
``` js
let MyJQ = function (selector) {
    return new MyJQ();
};
```
但这是一个死循环。在jQuery的原型上有个初始化方法init()，类似
``` js
MyJQ.prototype = {
    constructor: MyJQ, // 修正被重写的constructor
    init(selector){
        this.selector = selector;
        this[0] = 'element1'; // 模拟选择
        this[1] = 'element2';
        return this;
    },
    otherFunc(){
        console.log(this.selector);
        console.log('do some thing');
        return this;  // 返回自身以实现链式调用
    }
};
```
修改构造函数，返回一个init()的实例
``` js
let MyJQ = function (selector) {
    return new MyJQ.prototype.init(selector);
};
```
要怎么让这个实例能够使用定义在jQuery上的方法呢，把init()的原型指向jQuery.prototype就行了

``` js
MyJQ.prototype.init.prototype = MyJQ.prototype;
```
这样init()的实例就可以使用定义在jQuery上的方法了，相当于继承了jQuery
![MyJQ](http://images.cnblogs.com/cnblogs_com/castdream/758571/o_MyJQ.png)

``` js
console.log(MyJQ('dom').otherFunc().selector);
```
## 新时代的面向对象

JavaScript 利用原型继承的方式与 C#、Java 相比更复杂、难懂，不过好在新的时代已经到来，各平台对ECMAScript 2015（ES6）的支持越来越完善，ECMAScript 2016（ES7）也刚刚完成了定稿，而利用 babel，我们已经能够提前用上这些新的特性。
###创建对象
es6新加入了Class让我们可以更方便的创建对象。
``` js
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    sayName(){
        console.log('My name is ' + this.name);
    }
}
let p = new Person('Kimi','24');
p.sayName();
console.log(p instanceof Person); // true
```
### 继承
class 之间可以通过 extends 关键字实现继承。
``` js
class Coder extends Person{
    constructor(name, age, language) {
        super(name, age);
        this.language = language;
    }

    code() {
        console.log('I write ' + this.language);
    }
}

let coder = new Coder('Kimi', '25', 'JavaScript');
coder.sayName();
coder.code();

console.log(coder instanceof Person); // true
```
### 方法和属性

类似 Java 和 C# 的写法，在方法前加上 static 关键字，该方法就不能通过实例调用，而是通过类来调用。

ES7提案新增了实例属性和静态属性的新写法。实例属性可以直接写入类中，而静态属性只要加上 static 关键字就行了。
``` js
class Coder extends Person {
    static nickname = 'Code Monkey';
    favor= 'write bug';
    constructor(name, age, language) {
        super(name, age);
        this.language = language;
    }

    // 静态方法
    static bug() {
        console.log('Oops,There is a bug!');
    }
}

console.log(coder.favor);

console.log(Coder.nickname);

Coder.bug(); // Oops,There is a bug!
```





