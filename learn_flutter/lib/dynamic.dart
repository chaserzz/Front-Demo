import 'package:flutter/material.dart';
import 'package:flutter_easyrefresh/easy_refresh.dart';

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
  const DynamicPage({Key? key}) : super(key: key);

  @override
  State<DynamicPage> createState() => _DynamicPageState();
}

class _DynamicPageState extends State<DynamicPage> {
  int _currentPage = 1;
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
                _listItems[index]['viewCount'].toString());
          }),
    ));
  }
}

// 列表展示组件
class DynamicListItem extends StatelessWidget {
  const DynamicListItem(this.title, this.imageUrl, this.viewCount, {Key? key})
      : super(key: key);
  final String imageUrl;
  final String title;
  final String viewCount;
  static const double ITEM_HEIGHT = 100;
  static const double TITLE_HEIGHT = 80;
  static const double MARGIN_SIZE = 10;
  @override
  Widget build(BuildContext context) {
    return Container(
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
        ));
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
