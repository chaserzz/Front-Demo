import 'package:flutter/material.dart';
import 'package:learn_flutter/base/modal/dynamic_entity.dart';

import "category.dart";
import "dynamic.dart";
import "message.dart";
import "profile.dart";

class AppHomePage extends StatefulWidget {
  ValueChanged<DynamicEntity> detailPageTap;
  AppHomePage(this.detailPageTap, {Key? key}) : super(key: key);

  @override
  _AppHomePageState createState() => _AppHomePageState(detailPageTap);
}

class _AppHomePageState extends State<AppHomePage> {
  int _index = 0;
  final ValueChanged<DynamicEntity> _detailPageTap;

  _AppHomePageState(this._detailPageTap)
      : _homeWidgets = [
          DynamicPage(_detailPageTap),
          const MessagePage(),
          const CategoryPage(),
          const ProfilePage(),
        ];

  final List<Widget> _homeWidgets;

  void _onBottomNagigationBarTapped(int index) {
    setState(() {
      _index = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("chaser"),
      ),
      body: IndexedStack(
        index: _index,
        children: _homeWidgets,
      ),
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        currentIndex: _index,
        onTap: (index) {
          _onBottomNagigationBarTapped(index);
        },
        items: [
          _getBottomNavigationBarItem(
              '动态',
              'https://img1.kpopmap.com/2019/11/iu-purple-hair-3.jpg',
              'https://tse1-mm.cn.bing.net/th/id/R-C.d069d8bce0d9293bbad8f347f7dd2733?rik=r2hUKAbGUo3FVw&riu=http%3a%2f%2fimages6.fanpop.com%2fimage%2fpolls%2f1589000%2f1589020_1475347163081_full.jpg&ehk=XuPeiWTcfjIJb9UH%2f5Q112D1PH7FtUnxB6jFS%2bNNkcs%3d&risl=&pid=ImgRaw&r=0',
              0),
          _getBottomNavigationBarItem(
              ' 消息',
              'https://c-ssl.duitang.com/uploads/item/202007/20/20200720042003_wkqoh.thumb.1000_0.jpg',
              'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202008%2F14%2F20200814120910_pubpp.thumb.400_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640881962&t=101f334e2fa6bdca6952183776e328f8',
              1),
          _getBottomNavigationBarItem(
              '分类浏览',
              'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0174145de0ada3a801215972cfd309.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640882033&t=5b528cb45c0252be834223be7111b2d6',
              'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0157b6594c95b7a8012193a32e3d5a.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640882033&t=b7e43d02354c05af7d8c68a96014e972',
              2),
          _getBottomNavigationBarItem(
              '个人中心',
              'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01c5ea5de0adaca80120686bf7d32e.jpg%402o.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640882033&t=bb2a5132a09dd898bc2f4f50a7debcdf',
              'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01fe055de0ada2a80120686b6a7a0f.jpg%402o.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640882033&t=cffab62dd3e894fc01215c625af9dfe0',
              3),
        ],
      ),
    );
  }

  BottomNavigationBarItem _getBottomNavigationBarItem(
      String title, String normalIcon, String pressedIcon, int index) {
    return BottomNavigationBarItem(
      icon: _index == index
          ? Image.network(
              pressedIcon,
              width: 32,
              height: 28,
            )
          : Image.network(
              normalIcon,
              width: 32,
              height: 28,
            ),
      label: title,
    );
  }
}
