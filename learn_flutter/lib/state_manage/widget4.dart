import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:learn_flutter/state_manage/models/count.dart';
import 'package:learn_flutter/state_manage/models/model2.dart';
import 'package:provider/provider.dart';

class Widget4 extends StatefulWidget {
  const Widget4({Key? key}) : super(key: key);

  @override
  _Widget4State createState() => _Widget4State();
}

class _Widget4State extends State<Widget4> {
  Selector<Model1, int>? selector;
  @override
  void initState() {
    selector = buildSelector();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    print("widget4 build");
    return selector!;
  }

  Selector<Model1, int> buildSelector() {
    print("widget4 selector build");
    return Selector<Model1, int>(
      builder: (context, value, child) {
        print("widet4 buildFunc run");
        return Text("widget4 count$value");
      },
      selector: (context, model) => model.count,
    );
  }
}
