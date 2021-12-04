main(List<String> args){
  // 字符串定义方式
  String s = "1";
  String s1 = '2';
  // 允许换行的字符串
  String s3 = """"
  line1
  line2
  """;
  //模版字符串
  String temp = "23123 ${s}";
  //  使用print进行打印

  // const , final 两个关键字都是用来修饰该变量不能进行变化
  const myName1 = "myName is const";
  // const myName2 = getName("const"); // 会报错，const不能被运行时确定的变量定义
  final myName3 = "myName is final";
  final myName4 = getName("final"); // 不会报错
  // 列表list
  List nums = [1,2,3,];
  Set sets = {1,2,3};
  

  print(myName4);

  // 函数调用
  sayHello1("zard");
  sayHello2("zard",1,"xxxx");
  sayHello3("zard", age: 2,);
  sayHello3("zard", addtress: "xx", age: 3);
}

String getName(String name){
  return "myName ${name}";
}

// 函数定义
// 返回值， 函数名， 参数
void sayHello1(String name ){
  print("sayHello1");
  return;
}
// 位置可选参数
// 需要添加默认值，否则会报错
void sayHello2(String name, [int age = 1, String addtress = ""]){
  return;
}

// 命名可选参数
void sayHello3(String name, {int age = 2, String addtress = ""}){
  return;
}