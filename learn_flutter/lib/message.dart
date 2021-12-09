import 'package:flutter/material.dart';

class MessagePage extends StatelessWidget {
  const MessagePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final List<String> _options =
        List<String>.generate(20, (index) => "选项$index");
    return Scaffold(
      body: Column(
        children: [
          _getTextButton(
            '基础底部弹层',
            onPressed: () async {
              int selectedIndex =
                  await _showBasicModalBottomSheet(context, _options);
              print("基础底部弹层：选中了第$selectedIndex个选项");
            },
            foregroundColor: Colors.white,
            backgroundColor: Theme.of(context).primaryColor,
          ),
          _getTextButton(
            "full scren",
            onPressed: () async {
              int selectedIndex = await _showFullScrenSheet(context, _options);
              print("全屏:选中了第$selectedIndex个选项");
            },
            foregroundColor: Colors.white,
            backgroundColor: Theme.of(context).primaryColor,
          ),
          _getTextButton(
            "custom button",
            onPressed: () async {
              int selectedIndex =
                  await _showCustomModalBottomSheet(context, _options);
              print("自定义:选中了第$selectedIndex个选项");
            },
            foregroundColor: Colors.white,
            backgroundColor: Theme.of(context).primaryColor,
          ),
          _getTextButton("checkBox", onPressed: () async {
            List<int> selectedList =
                await _getStateBottomSheet(context, _options);
            print("选择框$selectedList");
          })
        ],
      ),
    );
  }

  Widget _getTextButton(String title,
      {required Function onPressed,
      Color foregroundColor = Colors.white,
      Color backgroundColor = Colors.lightBlue}) {
    return Container(
      height: 50,
      width: 200,
      margin: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: BorderRadius.circular(4.0),
      ),
      child: TextButton(
        style: ButtonStyle(
          foregroundColor: MaterialStateProperty.all<Color>(foregroundColor),
          backgroundColor: MaterialStateProperty.all<Color>(backgroundColor),
        ),
        child: Text(title),
        onPressed: () {
          onPressed();
        },
      ),
    );
  }

  // 底部弹窗基本使用
  Future<dynamic> _showBasicModalBottomSheet(context, List<String> options) {
    return showModalBottomSheet<int>(
      isScrollControlled: false,
      context: context,
      builder: (BuildContext context) {
        return ListView.builder(
          itemBuilder: (BuildContext context, int index) {
            return ListTile(
                title: Text(options[index]),
                onTap: () {
                  Navigator.of(context).pop(index);
                });
          },
          itemCount: options.length,
        );
      },
    );
  }

//全屏幕底部弹窗
  Future<dynamic> _showFullScrenSheet(context, List<String> options) {
    return showModalBottomSheet<int>(
        context: context,
        isScrollControlled: true,
        builder: (BuildContext context) {
          return ListView.builder(
              itemBuilder: (BuildContext context, int index) {
            return ListTile(
                title: Text(options[index]),
                onTap: () {
                  Navigator.of(context).pop(index);
                });
          });
        });
  }

// 自定义底部弹窗，注意要将自带的背景颜色设置为透明
  Future<dynamic> _showCustomModalBottomSheet(
      context, List<String> options) async {
    return showModalBottomSheet<int>(
      backgroundColor: Colors.transparent,
      isScrollControlled: true,
      context: context,
      builder: (BuildContext context) {
        return Container(
          clipBehavior: Clip.antiAlias,
          decoration: const BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.only(
              topLeft: Radius.circular(20.0),
              topRight: Radius.circular(20.0),
            ),
          ),
          height: MediaQuery.of(context).size.height / 3.0,
          child: Column(children: [
            _getModalSheetHeader(context, '自定义底部弹窗'),
            const Divider(height: 1.0),
            Expanded(
              child: ListView.builder(
                itemBuilder: (BuildContext context, int index) {
                  return ListTile(
                      title: Text(options[index]),
                      onTap: () {
                        Navigator.of(context).pop(index);
                      });
                },
                itemCount: options.length,
              ),
            ),
          ]),
        );
      },
    );
  }

// 带状态的底部弹窗
  Future<dynamic> _getStateBottomSheet(context, List<String> options) async {
    Set<int> selected = Set<int>();
    return showModalBottomSheet<List<int>>(
        backgroundColor: Colors.transparent,
        isScrollControlled: true,
        context: context,
        builder: (BuildContext context) {
          return StatefulBuilder(builder: (context1, setState) {
            return Container(
              clipBehavior: Clip.antiAlias,
              decoration: const BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(20.0),
                  topRight: Radius.circular(20.0),
                ),
              ),
              height: MediaQuery.of(context).size.height / 2.0,
              child: Column(
                children: [
                  _getModalConfirmSheetHneader("checkBox bottom demo", () {
                    // 关闭底部弹窗
                    Navigator.of(context).pop();
                  }, () {
                    // 退出页面前将选择的数据进行传递
                    Navigator.of(context).pop(selected.toList());
                  }),
                  const Divider(height: 1.0),
                  Expanded(
                    child: ListView.builder(
                      itemBuilder: (BuildContext context, int index) {
                        return ListTile(
                            trailing: Icon(
                              selected.contains(index)
                                  ? Icons.check_box
                                  : Icons.check_box_outline_blank,
                              color: Theme.of(context).primaryColor,
                            ),
                            title: Text(options[index]),
                            onTap: () {
                              if (selected.contains(index)) {
                                setState(() {
                                  selected.remove(index);
                                });
                              } else {
                                setState(() {
                                  selected.add(index);
                                });
                              }
                            });
                      },
                      itemCount: options.length,
                    ),
                  ),
                ],
              ),
            );
          });
        });
  }

  Widget _getModalConfirmSheetHneader(
      String title, Function onClose, Function onConfirm) {
    return SizedBox(
      height: 50,
      child: Row(
        children: [
          IconButton(
            icon: const Icon(Icons.close),
            onPressed: () {
              onClose();
            },
          ),
          Expanded(
              child: Text(title,
                  style:
                      TextStyle(fontWeight: FontWeight.bold, fontSize: 16.0))),
          IconButton(
            icon: const Icon(
              Icons.check,
              color: Colors.lightBlue,
            ),
            onPressed: () {
              onConfirm();
            },
          ),
        ],
      ),
    );
  }

  Widget _getModalSheetHeader(BuildContext context, String title) {
    return SizedBox(
      height: 50,
      child: Stack(
        textDirection: TextDirection.rtl,
        children: [
          Center(
            child: Text(
              title,
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16.0),
            ),
          ),
          IconButton(
              icon: Icon(Icons.close),
              onPressed: () {
                Navigator.of(context).pop();
              }),
        ],
      ),
    );
  }
}
