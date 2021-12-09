// 列表展示组件
import 'package:flutter/material.dart';
import "./routers/router_table.dart";
import "./routers/fluro_route.dart";
import 'modal/dynamic_entity.dart';

class DynamicListItem extends StatelessWidget {
  const DynamicListItem(
      this.title, this.imageUrl, this.viewCount, this.id, this.onTapped,
      {Key? key})
      : super(key: key);

  final ValueChanged<DynamicEntity> onTapped;
  final String imageUrl;
  final String title;
  final String viewCount;
  final int id;

  static const double ITEM_HEIGHT = 100;
  static const double TITLE_HEIGHT = 80;
  static const double MARGIN_SIZE = 10;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      child: Container(
          padding: EdgeInsets.all(MARGIN_SIZE),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _imageWrapper(),
              Expanded(
                  child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [_titleWrapper(context), _viewCountWrapper(context)],
              ))
            ],
          )),
      onTap: () {
        /*Map<String, dynamic> routeParams = {'id': id};*/
        // route v1.0 路由传参
        /* var arguments = await Navigator.of(context)
            .pushNamed(RouteTable.dynamicDetailPath, arguments: routeParams); */

        //fluro
        /*   var arguments = await RouterManager.router!
            .navigateTo(context, "${RouterManager.dynamicDetailPath}/$id?");
        ScaffoldMessenger.of(context)
            .showSnackBar(SnackBar(content: Text("from $arguments"))); */

        // router 2.0
        onTapped(DynamicEntity(title, imageUrl, id, int.parse(viewCount)));
      },
    );
  }

  Widget _viewCountWrapper(context) {
    return Container(
      margin: EdgeInsets.fromLTRB(MARGIN_SIZE, 0, 0, 0),
      height: ITEM_HEIGHT - TITLE_HEIGHT,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Icon(
            Icons.remove_red_eye_outlined,
            size: 14.0,
            color: Colors.grey,
          ),
          const SizedBox(width: 5),
          Text(
            viewCount,
            style: TextStyle(color: Colors.grey, fontSize: 14.0),
          ),
        ],
      ),
    );
  }

  // 获得title组件
  Widget _titleWrapper(context) {
    return Container(
      height: TITLE_HEIGHT,
      margin: EdgeInsets.fromLTRB(MARGIN_SIZE, 0, 0, 0),
      child: Text(
        title,
        maxLines: 2,
        overflow: TextOverflow.ellipsis,
        style: Theme.of(context).textTheme.headline6,
      ),
    );
  }

  //获得图片组件
  Widget _imageWrapper() {
    return SizedBox(
      width: 150,
      height: ITEM_HEIGHT,
      child: Image.network(imageUrl),
    );
  }
}
