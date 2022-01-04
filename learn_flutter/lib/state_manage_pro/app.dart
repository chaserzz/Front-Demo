import 'package:flutter/material.dart';
import 'package:learn_flutter/state_manage_pro/page/version0.dart';
import 'package:learn_flutter/state_manage_pro/page/version1.dart';
import 'package:learn_flutter/state_manage_pro/page/version2.dart';

class MyHomePage extends StatelessWidget {
  const MyHomePage({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text("state_manage_pro"),
        ),
        body: Version2(),
      ),
    );
  }
}
