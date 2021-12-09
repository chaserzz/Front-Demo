import 'package:flutter/material.dart';
import 'package:flutter_easyrefresh/easy_refresh.dart';

import 'dynamic_item.dart';
import 'modal/dynamic_entity.dart';

class DynamicData {
  String imageUrl;
  String title;
  int viewCount;
  DynamicData(this.title, this.imageUrl, this.viewCount);
}

// 列表数据模拟
class DynamicMockData {
  static Future<List<Map<String, Object>>> list(int page, int size) async {
    return List<Map<String, Object>>.generate(size, (index) {
      return {
        'title': '标题${index + (page - 1) * size + 1}: 这是一个列表标题，最多两行，多处部分将会被截取',
        'imageUrl':
            'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3331308357,177638268&fm=26&gp=0.jpg',
        'viewCount': 180,
      };
    });
  }
}

class DynamicPage extends StatefulWidget {
  ValueChanged<DynamicEntity> onItemTapped;
  DynamicPage(this.onItemTapped, {Key? key}) : super(key: key);

  @override
  State<DynamicPage> createState() => _DynamicPageState(onItemTapped);
}

class _DynamicPageState extends State<DynamicPage> {
  int _currentPage = 1;
  final ValueChanged<DynamicEntity> onItemTapped;
  _DynamicPageState(this.onItemTapped);

  List<Map<String, Object>> _listItems = [];
  static const int pageSize = 18;
  // 获取列表数据
  void _requestNewItems() async {
    List<Map<String, Object>> list =
        await DynamicMockData.list(_currentPage, pageSize);
    setState(() {
      if (_currentPage > 1) {
        _listItems += list;
      } else {
        _listItems = list;
      }
    });
  }

  void _load() async {
    _currentPage += 1;
    _requestNewItems();
  }

  void _refresh() async {
    _currentPage = 1;
    _requestNewItems();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: EasyRefresh(
      onRefresh: () async {
        _refresh();
      },
      onLoad: () async {
        _load();
      },
      firstRefresh: true,
      child: ListView.builder(
          itemCount: _listItems.length,
          itemBuilder: (context, index) {
            return DynamicListItem(
                _listItems[index]['title'].toString(),
                _listItems[index]['imageUrl'].toString(),
                _listItems[index]['viewCount'].toString(),
                index,
                onItemTapped);
          }),
    ));
  }
}
