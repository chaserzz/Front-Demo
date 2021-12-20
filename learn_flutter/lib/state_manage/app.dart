import 'package:flutter/material.dart';
import 'package:learn_flutter/state_manage/cart.dart';
import 'package:learn_flutter/state_manage/goods_list.dart';
import 'package:learn_flutter/state_manage/login.dart';
import 'package:learn_flutter/state_manage/models/cart.dart';
import 'package:learn_flutter/state_manage/models/count.dart';
import 'package:learn_flutter/state_manage/models/model2.dart';
import 'package:learn_flutter/state_manage/show_count.dart';
import 'package:learn_flutter/state_manage/simple_modal1.dart';
import 'package:learn_flutter/state_manage/state.dart';
import 'package:provider/provider.dart';

class MyHomePage extends StatelessWidget {
  const MyHomePage({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    /* return ChangeNotifierProvider.value(
      value: Model1(),
      child: MaterialApp(
/*         routes: {
          '/': (context) => LoginPage(),
          '/goodList': (context) => GoodsList(),
          '/cart': (context) => Cart()
        }, */
        home: SimpleModal1(),
      ),
    ); */
    return MultiProvider(
      providers: [
        ChangeNotifierProvider.value(
          value: Model1(),
        ),
        ChangeNotifierProvider.value(value: Model2())
      ],
      child: MaterialApp(
        home: StateView(),
      ),
    );
  }
}
