import 'package:flutter/material.dart';
import 'package:learn_flutter/base/dynamic_detail.dart';
import 'login.dart';
import './not_found.dart';
import './splash.dart';
import 'package:flutter/cupertino.dart';

class RouteTable {
  static String splashPath = 'splash';
  static String loginPath = 'login';
  static String homePath = '/';
  static String notFoundPath = '404';
  static String dynamicDetailPath = 'dynamicDetailPath';
  static Map<String, WidgetBuilder> routeTables = {
    //404页面
    notFoundPath: (context) => const NotFoundPage(),
    //启动页
    splashPath: (context) => const Splash(),
    //登录
    loginPath: (context) => const LoginPage(),
    //首页
    /* homePath: (context) => AppHomePage(), */
    //商品详情页
    dynamicDetailPath: (context) => const DynamicDetail(),
  };

  static Route onGenerateRoute<T extends Object>(RouteSettings settings) {
    return CupertinoPageRoute<T>(
        settings: settings,
        builder: (context) {
          String name = settings.name.toString();
          if (routeTables[name] == null) {
            name = notFoundPath;
          }

          Widget widget = routeTables[name]!(context);

          return widget;
        });
  }
}
