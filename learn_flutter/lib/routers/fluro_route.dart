import 'package:fluro/fluro.dart';
import 'package:learn_flutter/dynamic_detail.dart';

import 'login.dart';
import "not_found.dart";
import "splash.dart";
import "../app.dart";

class RouterManager {
  static const String splashPath = '/';
  static const String loginPath = '/login';
  static const String homePath = '/home';
  static const String dynamicPath = '/dynamic';
  static const String dynamicDetailPath = '$dynamicPath/:id';
  static const String transitionPath = '/transition';
  static const String permissionDeniedPath = '/403';
  static const String notFoundPath = '/404';

  static FluroRouter? router;

  static initRouter() {
    if (router == null) {
      router = FluroRouter();
      defineRoutes();
    }
  }

  static final routeTable = {
    loginPath: Handler(handlerFunc: (context, parameters) {
      return LoginPage();
    }),
    splashPath: Handler(handlerFunc: (context, parameters) {
      return Splash();
    }),
    notFoundPath: Handler(handlerFunc: (context, parameters) {
      return NotFoundPage();
    }),
    dynamicDetailPath:
        Handler(handlerFunc: (context, Map<String, dynamic> parameters) {
      return DynamicDetailFluro(parameters['id']?[0]);
    }),
/*     homePath: Handler(
      handlerFunc: (context, parameters) {
        return AppHomePage();
      },
    ) */
  };
  static void defineRoutes() {
    routeTable.forEach((path, handler) {
      router!.define(path,
          handler: handler, transitionType: TransitionType.material);
    });
  }
}
