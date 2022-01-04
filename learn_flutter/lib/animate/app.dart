import 'package:flutter/material.dart';
import 'package:learn_flutter/animate/base.dart';

class AppHomePage extends StatelessWidget {
  const AppHomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "animate_demo",
      home: AnimateDemo(),
    );
  }
}
