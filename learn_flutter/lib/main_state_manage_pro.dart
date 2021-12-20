import 'package:flutter/material.dart';
import 'package:learn_flutter/state_manage_pro/app.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  //final GlobalKey navigationKey = GlobalKey<NavigatorState>();

  @override
  Widget build(BuildContext context) {
/*     RouterManager.initRouter(); */
    return const MyHomePage();
  }
}
