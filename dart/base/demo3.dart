main(List<String> args) {
  var name = "zard";
  name ??= "nsdioasniod"; //当name为null时，才会进行赋值操作

  print(name); //zard

  var job = null;
  var temp = job ?? "coder"; //?? 类似于三元运算符  但由于flutter中不存在类型转换，需要注意空字符串的判断

  print(job);
  print(temp);

  final p = new Person()
    ..name = "abc"
    ..eat()
    ..run(); //级联运算  简化版的链式调用

  return;
}

class Person {
  String name = '1';

  void eat() {
    print("eating");
  }

  void run() {
    print("running");
  }
}
