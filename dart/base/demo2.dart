main(List<String> args){
  test(myPrint); 
  test((){
    print("匿名函数被调用");
  }); //匿名函数
  return;

  // 箭头函数: 函数体只有一行代码
  test(() => print("箭头函数被调用"));

  // 传递参数
  // 方式一
  printNum((num1,num2) {
    return num1 + num2;
  });

  // 方式二，函数签名
  printNum2((num1,num2){
    return num1 + num2;
  });
}


// 函数可以作为参数传递并且被调用
void test(Function func){
  func();
  return;
}

void myPrint(){
  print("print print");
  return;
}

// 定义add参数是一个函数，需要传参
void printNum (int add(int num1, int num2)){
  add(1,2);
}


// 函数签名
//             返回值类型  函数类型  参数类型 参数名
typedef Calculate = int Function (int num1, int num2);

void printNum2 (Calculate calc){
   print(calc(20,30));
}