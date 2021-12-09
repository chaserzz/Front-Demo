import "package:flutter/material.dart";
import "dart:async";
/* import "./router_table.dart";*/
import './fluro_route.dart';

class Splash extends StatefulWidget {
  const Splash({Key? key}) : super(key: key);

  @override
  State<Splash> createState() => _SplashState();
}

class _SplashState extends State<Splash> {
  bool _initialized = false;
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Image.network(
          'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202004%2F14%2F20200414214834_YJZ3H.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1641274362&t=2a94aae56c39f2ececf78e8a1787b1d7'),
    );
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (!_initialized) {
      _initialized = true;
      Timer(const Duration(milliseconds: 2000), () {
        // router v1.0
        /*         Navigator.of(context).pushReplacementNamed(RouteTable.homePath);*/
        print(RouterManager.router);
        //fluro clearStack: 无法退回
        RouterManager.router!
            .navigateTo(context, RouterManager.homePath, clearStack: true);
      });
    }
  }
}

class SplashV2 extends StatefulWidget {
  final ValueChanged<dynamic> onFinishCallBack;
  const SplashV2(this.onFinishCallBack, {Key? key}) : super(key: key);

  @override
  State<SplashV2> createState() => _SplashStateV2(onFinishCallBack);
}

class _SplashStateV2 extends State<SplashV2> {
  bool _initialized = false;
  final ValueChanged<dynamic> onFinishCallBack;
  _SplashStateV2(this.onFinishCallBack);
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Image.network(
          'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202004%2F14%2F20200414214834_YJZ3H.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1641274362&t=2a94aae56c39f2ececf78e8a1787b1d7'),
    );
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (!_initialized) {
      _initialized = true;
      Timer(const Duration(milliseconds: 2000), () {
        onFinishCallBack(null);
      });
    }
  }
}
