import 'package:flutter/material.dart';
import 'package:learn_flutter/base/router2/app_router_path.dart';
import 'package:learn_flutter/base/router2/router_delegate.dart';
/* import 'routers/fluro_route.dart'; */

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  //final GlobalKey navigationKey = GlobalKey<NavigatorState>();

  @override
  Widget build(BuildContext context) {
/*     RouterManager.initRouter(); */
    return MaterialApp.router(
      title: 'App 框架',
      routeInformationParser: AppRouterInformationParser(),
      routerDelegate: AppRouterDelegate(),
      theme: ThemeData(
        primaryColor: Colors.blue,
        textTheme: const TextTheme(
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
      /*     onGenerateRoute:
          RouterManager.router!.generator, //RouterTable.onGenerateRoute, */
    );
  }
}
