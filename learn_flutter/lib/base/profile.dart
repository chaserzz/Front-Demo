import 'package:flutter/material.dart';
import './profile.mock.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView(
        children: [
          HeadContainer(),
          MenuContainer('金融理财', GridMockData.financeGrids(), 4, Colors.grey),
          MenuContainer('生活服务', GridMockData.serviceGrids(), 4, Colors.grey),
          MenuContainer('购物消费', GridMockData.thirdpartyGrids(), 4, Colors.grey)
        ],
      ),
    );
  }
}

class HeadContainer extends StatelessWidget {
  static double HEIGHT = 144;
  static const MARGIN = 8.0;
  static const INNER_MARGIN = 16.0;
  final List<Map<String, String>> buttons = GridMockData.headerGrids();

  HeadContainer({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    print(buttons);
    return Container(
      height: HEIGHT,
      margin: const EdgeInsets.fromLTRB(MARGIN, MARGIN, MARGIN, MARGIN / 2),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(4.0),
        gradient: const LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Color(0xFF56AF6D),
              Color(0xFF56AA6D),
            ]),
      ),
      child: Center(
        child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: buttons
                .map((item) => MenuItem(item['icon'].toString(),
                    item['name'].toString(), Colors.white))
                .toList()),
      ),
    );
  }
}

class MenuContainer extends StatelessWidget {
  static double gridSpace = 5;
  static const MARGIN = 8.0;
  static const INNER_MARGIN = 16.0;

  final List<Map<String, String>> buttons;
  final int crossAxisCount;
  final Color textColor;
  final String name;

  const MenuContainer(
      this.name, this.buttons, this.crossAxisCount, this.textColor,
      {Key? key})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.fromLTRB(MARGIN, MARGIN, MARGIN, MARGIN / 2),
      padding: const EdgeInsets.all(MARGIN),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            name,
            style: TextStyle(color: Colors.grey[700]),
          ),
          const SizedBox(height: 20),
          _getButtons()
        ],
      ),
    );
  }

  Widget _getButtons() {
    return GridView.count(
      crossAxisSpacing: gridSpace,
      mainAxisSpacing: gridSpace,
      crossAxisCount: crossAxisCount,
      //设置以下两个参数，禁止GridView的滚动，防止与 ListView 冲突
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      children: buttons.map((item) {
        return MenuItem(
            item['icon'].toString(), item['name'].toString(), textColor);
      }).toList(),
    );
  }
}

// 小图标组件
class MenuItem extends StatelessWidget {
  final String icon;
  final String name;
  final Color color;
  const MenuItem(this.icon, this.name, this.color, {Key? key})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        SizedBox(
          child: Image.asset(icon),
          width: 50,
          height: 50,
        ),
        SizedBox(
          height: 5,
        ),
        Text(
          name,
          style: TextStyle(fontSize: 14, color: color, height: 1),
        )
      ],
    );
  }
}
