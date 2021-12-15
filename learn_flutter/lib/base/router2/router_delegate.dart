import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:learn_flutter/app.dart';
import 'package:learn_flutter/dynamic_detail.dart';
import 'package:learn_flutter/modal/dynamic_entity.dart';
import 'package:learn_flutter/routers/login.dart';
import 'package:learn_flutter/routers/not_found.dart';
import 'package:learn_flutter/routers/splash.dart';
import "package:learn_flutter/dynamic.dart";
import "./app_router_path.dart";

class AppRouterDelegate extends RouterDelegate<AppRouterConfiguration>
    with
        ChangeNotifier,
        PopNavigatorRouterDelegateMixin<AppRouterConfiguration> {
  @override
  final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();

  late RouterPaths _routerPath; // 当前路径，作为私有变量保存
  RouterPaths get routerPath => _routerPath; // 获得当前路径
  set routerPath(RouterPaths value) {
    // 设置当前路由路径
    if (_routerPath == value) return; //如果推入的路径和当前是同一个路径，则不会使路由发生改变
    _routerPath = value;
    notifyListeners();
  }

  late dynamic _state; //当前的路由的参数
  get state => _state; // 提供通过state来获取ß路由的参数

  bool _splashFinished = false; // 是否完成首页渲染
  bool get splashFinished => _splashFinished; //获得首屏渲染标识
  set splashFinished(bool value) {
    if (_splashFinished == value) return;
    _splashFinished = value;

    notifyListeners();
  }

  //获得当前的视图
  List<Page<void>> _buildPages() {
    print("enter buildPages");
    print(_splashFinished);
    if (_splashFinished) {
      return [
        MaterialPage(
            child: DynamicPage(_handlePushDynamicDetail),
            key: ValueKey('home')),
        if (_routerPath == RouterPaths.splash)
          MaterialPage(
              key: ValueKey('splash'),
              child: SplashV2(_handleSplashPageFinish)),
        if (_routerPath == RouterPaths.dynamicDetail)
          MaterialPage(
              key: ValueKey('dynamicDetail'), child: DynamicDetailV2(state)),
        if (_routerPath == RouterPaths.notFound)
          MaterialPage(key: ValueKey('notFound'), child: NotFoundPage()),
        if (_routerPath == RouterPaths.login)
          MaterialPage(key: ValueKey('login'), child: LoginPage()),
      ];
    } else {
      return [
        MaterialPage(
            key: ValueKey('splash'), child: SplashV2(_handleSplashPageFinish)),
      ];
    }
  }

  //首屏事件
  void _handleSplashPageFinish(state) {
    //  修改首屏加载完成,推入首页,并且通知重新构建page
    _splashFinished = true;
    _routerPath = RouterPaths.home;
    notifyListeners();
  }

  // 点击详情页事件
  void _handlePushDynamicDetail(DynamicEntity state) {
    _routerPath = RouterPaths.dynamicDetail;
    _state = state;
    notifyListeners();
  }

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Navigator(
      key: navigatorKey,
      pages: _buildPages(),
      onPopPage: _handlePopPage,
    );
  }

  @override
  Future<void> setNewRoutePath(AppRouterConfiguration configuration) async {
    _routerPath = configuration.path;
    _state = configuration.state;
  }

  bool _handlePopPage(Route<dynamic> route, dynamic result) {
    final bool success = route.didPop(result);
    print(success);
    return success;
  }
}
