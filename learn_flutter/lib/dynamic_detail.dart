import 'package:flutter/material.dart';

import 'modal/dynamic_entity.dart';

// route 1.0 路由
class DynamicDetail extends StatelessWidget {
  const DynamicDetail({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final routeParams = ModalRoute.of(context)?.settings.arguments;

    return WillPopScope(
        child: Scaffold(
          appBar: AppBar(
            title: Text("detail"),
          ),
          body: Center(
            child: Text(
                "products Detail id: ${(routeParams as Map<String, dynamic>)["id"]}"),
          ),
        ),
        // 退出页面传递到上一个页面的参数
        onWillPop: () async {
          Navigator.of(context).pop({'id': routeParams['id']});
          // 设置是否退出该页面，用于电商退出页面
          return true;
        });
  }
}

class DynamicDetailFluro extends StatelessWidget {
  final String id;
  const DynamicDetailFluro(this.id, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
        child: Scaffold(
          appBar: AppBar(
            title: Text("detail"),
          ),
          body: Center(
            child: Text("products Detail id: $id"),
          ),
        ),
        // 退出页面传递到上一个页面的参数
        onWillPop: () async {
          Navigator.of(context).pop({'id': id});
          // 设置是否退出该页面，用于电商退出页面
          return true;
        });
  }
}

// route 1.0 路由
class DynamicDetailV2 extends StatelessWidget {
  final DynamicEntity dynamicEntity;
  const DynamicDetailV2(this.dynamicEntity, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('动态详情'),
      ),
      body: Center(
        child: Text("产品 id: ${dynamicEntity.id}"),
      ),
    );
  }
}
