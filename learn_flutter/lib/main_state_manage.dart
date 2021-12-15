import 'package:flutter/material.dart';
import "./state_manage/app.dart";

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  //final GlobalKey navigationKey = GlobalKey<NavigatorState>();

  @override
  Widget build(BuildContext context) {
/*     RouterManager.initRouter(); */
    return MyHomePage();
  }
}
