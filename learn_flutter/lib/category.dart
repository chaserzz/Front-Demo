import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import "components/formUtil.dart";
/* import "./routers/router_table.dart"; */
import './routers/fluro_route.dart';

class CategoryPage extends StatelessWidget {
  const CategoryPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [_getLoginButton(context), _getNotFoundButton(context)],
        ),
      ),
    );
  }

  Widget _getLoginButton(context) {
    return TextButton(
        onPressed: () {
          // router v1.0
          /*  Navigator.of(context).pushNamed(RouteTable.loginPath); */
          RouterManager.router!.navigateTo(context, RouterManager.loginPath);
        },
        child: Text("Login Page"));
  }

  Widget _getNotFoundButton(context) {
    return TextButton(
        onPressed: () {
          // router v1.0
          /* Navigator.of(context).pushNamed(RouteTable.notFoundPath); */
          RouterManager.router!.navigateTo(context, RouterManager.notFoundPath);
        },
        child: Text("notFound Page"));
  }
}
