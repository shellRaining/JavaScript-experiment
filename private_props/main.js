var PrivateProps = (function () {
  var storage = new WeakMap();

  return function () {
    var privateProps = {};

    // 添加你的私有属性
    privateProps.privateVariable = "Hello, world!";

    privateProps.privateMethod = function () {
      console.log(privateProps.privateVariable);
    };

    storage.set(this, privateProps);

    this.publicMethod = function () {
      storage.get(this).privateMethod();
    };
  };
})();

var myInstance = new PrivateProps();

// 这行代码会正常工作，会打印 "Hello, world!"
myInstance.publicMethod();

// 下面两行代码会未定义错误，因为不能直接访问私有变量或私有方法
console.log(myInstance.privateVariable); // undefined
myInstance.privateMethod(); // TypeError: myInstance.privateMethod is not a function
