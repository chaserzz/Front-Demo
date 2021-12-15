import 'package:flutter/material.dart';
import 'package:learn_flutter/state_manage/cart.dart';
import 'package:learn_flutter/state_manage/goods_list.dart';
import 'package:learn_flutter/state_manage/models/cart.dart';
import 'package:provider/provider.dart';

class MyHomePage extends StatelessWidget {
  const MyHomePage({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Provider(
        create: (context) => CartModel(),
        child: MaterialApp(
          title: "peovide_demo",
          initialRoute: '/',
          routes: {'/': (context) => GoodsList(), '/cart': (context) => Cart()},
        ));
  }
}
