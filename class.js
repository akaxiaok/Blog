/**
 * Created by Kimi on 2017/3/7.
 */

define = function (func) {
    func();
};

// 直接创建 -- 创建多个相似对象
var person = {'name': 'Kimi', 'age': 25};

define(function () {
    // 工厂模式 -- 对象识别问题
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
    p1.say();
});

define(function () {
    // 构造函数 -- 应该以大写开头；创建一个对象，将作用域赋给该对象，执行构造函数中的代码，返回该对象
    // 函数不能重用
    function Person(name, age) {
        this.name = name;
        this.age = age;
        this.say = function () {
            console.log('I\'m ' + this.name + ', from constructor.');
        }
    }

    var p1 = new Person('Kimi', '23');
    var p2 = new Person('Lili', '21');
    p1.say();
    console.log(p1.hasOwnProperty('constructor'));
    console.log(p1.constructor);
    console.log('-');
    console.log(p1 instanceof Person);
    console.log('-');
    console.log(p1.say == p2.say);
});
define(function () {
    // 原型模式 -- 只要创建一个新函数，就会按特定规则创建一个prototype，指向函数的原型对象。原型对象都会获得一个构造函数constructor属性，该属性指向prototype所在的函数。
    // 实例通过一个[[Prototype]]指针指向函数原型,没有标准的访问方式,在浏览器中通过为__proto__属性
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
    console.log(p1.hasOwnProperty('name'));
    console.log('name' in p1);

    console.log(p2.hasOwnProperty('name'));
    console.log('name' in p2);


    console.log(p1.say === p2.say);
    console.log(Person.prototype.isPrototypeOf(p1));
    console.log(Object.getPrototypeOf(p1));//返回[[Prototype]] ES5
    console.log(Object.keys(Person.prototype));//可枚举属性 ES5
    console.log(Object.keys(p1));//ES5
    console.log(Object.getOwnPropertyNames(p1));//所有自有属性

    for (var pro in p1) {
        console.log(pro);
    }
    // 重写原型对象会导致原型链断裂
    // 所有属性都是共享的
});

define(function () {
    // 混合构造函数和原型模式
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
});
define(function () {
    // 动态原型模式
    function Person(name, age) {
        this.name = name;
        this.age = age;
        if (typeof this.say != "function") {
            var that = this;
            Person.prototype.say = function () {
                console.log('I\'m ' + that.name + ', from dynamic');
            }
        }
    }

    var p1 = new Person('Kimi', 23);
    p1.say();
});
define(function () {
    // 寄生构造
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }

    function MyPerson() {
        var p = new Person('Kimi', 23);
        p.say = function () {
            console.log('I\'m ' + this.name + ', from MyPerson');
        };
        return p;
    }

    var p1 = new MyPerson();
    p1.say();
});

/**
 * 继承
 */

define(function () {
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
    console.log('chain');
    console.log(instance.getSuperValue());
    console.log(instance instanceof Object);
    console.log(instance instanceof SuperType);
    console.log(instance instanceof SubType);
    console.log(Object.prototype.isPrototypeOf(instance));
    console.log(SuperType.prototype.isPrototypeOf(instance));
    console.log(SubType.prototype.isPrototypeOf(instance));
    var instance2 = new SubType();
    instance2.colors.push('green');
    console.log(instance.colors);
    console.log('chain');
});

define(function () {
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
    // instance.say(); 父类原型中的方法子类不可见
    instance.sayName();
});

define(function () {
    //组合原型链和构造函数
    function SuperType(name) {
        this.name = name;
        this.colors = ['red', 'blue', 'green'];
    }

    SuperType.prototype.sayName = function () {
        console.log('I\'m ' + this.name + ' from SuperType prototype');
    };
    function SubType(name, age) {
        SuperType.call(this, name);
        this.age = age;
    }

    SubType.prototype = new SuperType();
    SubType.prototype.sayAge = function () {
        console.log(this.age);
    };
    var instance1 = new SubType('Kimi', 23),
        instance2 = new SubType('Lili', 21);
    instance1.sayName();

    instance1.colors.push('yellow');
    console.log(instance2.colors);

    console.log(instance1 instanceof SuperType);
    console.log(instance1.__proto__.colors);

});

define(function () {
    var person = {
        name: 'Kimi',
        friends: ['Lili', 'Nico']
    };
    var person1 = Object.create(person);
    person1.name = 'Joe';
    person1.friends.push('Rob');
    var person2 = Object.create(person);
    person2.name = 'Linda';
    person2.friends.push('Lucy');
    console.log(person.friends);
});

define(function () {
    // 寄生组合
    function inheritPrototype(subType, superType) {
        var prototype = Object.create(superType.prototype);
        prototype.constructor = subType;
        subType.prototype = prototype;
    }

    function SuperType(name) {
        this.name = name;
        this.colors = ['red', 'blue'];
    }

    SuperType.prototype.sayName = function () {
        console.log(this.name);
    };
    function SubType(name, age) {
        SuperType.call(this, name);
        this.age = age;
    }

    inheritPrototype(SubType, SuperType);
    SubType.prototype.sayAge = function () {
        console.log(this.age);
    };
    var p = new SubType('Kimi', 23);
    console.log(p instanceof SuperType);
    console.log(p.hasOwnProperty('name'));
    console.log('name' in p);
    console.log(p.sayName());
    console.log(p.__proto__);
});


if (!Object.create) {
    Object.create = function (o) {
        function F() {
        }

        F.prototype = o;
        return new F();
    }
}