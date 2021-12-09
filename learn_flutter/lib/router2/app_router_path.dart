import 'package:flutter/cupertino.dart';

enum RouterPaths { splash, dynamicDetail, notFound, login, home }

// 路由信息配置，包括一个路径和一个路由参数组成
class AppRouterConfiguration {
  final RouterPaths path;
  final dynamic state;
  AppRouterConfiguration(this.path, this.state);
}

class AppRouterInformationParser
    extends RouteInformationParser<AppRouterConfiguration> {
  @override
  // 路由解析，每一次push一个新的路由对象都会进入这里
  Future<AppRouterConfiguration> parseRouteInformation(
      RouteInformation routeInformation) async {
    final String? routeName = routeInformation.location;
    print("routeName");
    print(routeName);
    switch (routeName) {
      case '/':
        {
          return AppRouterConfiguration(
              RouterPaths.splash, routeInformation.state);
        }
      case '/home':
        {
          return AppRouterConfiguration(
              RouterPaths.home, routeInformation.state);
        }
      case '/login':
        {
          return AppRouterConfiguration(
              RouterPaths.login, routeInformation.state);
        }
      case '/dynamicDetail':
        {
          return AppRouterConfiguration(
              RouterPaths.dynamicDetail, routeInformation.state);
        }
      default:
        {
          return AppRouterConfiguration(
              RouterPaths.notFound, routeInformation.state);
        }
    }
  }

  @override
  RouteInformation restoreRouteInformation(
      AppRouterConfiguration configuration) {
    switch (configuration.path) {
      case RouterPaths.splash:
        return RouteInformation(location: '/', state: configuration.state);
      case RouterPaths.home:
        return RouteInformation(location: '/home', state: configuration.state);
      case RouterPaths.dynamicDetail:
        return RouteInformation(
            location: '/dynamicDetail', state: configuration.state);
      case RouterPaths.login:
        return RouteInformation(location: '/login', state: configuration.state);
      default:
        return RouteInformation(location: '/404', state: configuration.state);
    }
  }
}
