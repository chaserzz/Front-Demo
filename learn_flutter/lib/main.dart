import 'package:flutter/material.dart';
import 'routers/fluro_route.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  //final GlobalKey navigationKey = GlobalKey<NavigatorState>();

  @override
  Widget build(BuildContext context) {
    RouterManager.initRouter();
    return MaterialApp(
      title: 'App 框架',
      theme: ThemeData(
        primaryColor: Colors.blue,
        accentColor: Colors.blue[600],
        textTheme: TextTheme(
          headline1: TextStyle(
              fontSize: 36.0, fontWeight: FontWeight.bold, color: Colors.white),
          headline2: TextStyle(
              fontSize: 32.0, fontWeight: FontWeight.w400, color: Colors.white),
          headline3: TextStyle(
              fontSize: 28.0, fontWeight: FontWeight.w400, color: Colors.white),
          headline4: TextStyle(
              fontSize: 24.0, fontWeight: FontWeight.w400, color: Colors.white),
          headline6: TextStyle(
            fontSize: 16.0,
            fontWeight: FontWeight.w200,
            color: Colors.black,
          ),
          bodyText1: TextStyle(
            fontSize: 20.0,
            fontWeight: FontWeight.w200,
          ),
        ),
        fontFamily: 'Georgia',
      ),
      //navigatorKey: navigationKey,
      onGenerateRoute:
          RouterManager.router!.generator, //RouterTable.onGenerateRoute,
    );
  }
}
