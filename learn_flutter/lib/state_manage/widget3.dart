import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:learn_flutter/state_manage/models/model2.dart';
import 'package:provider/provider.dart';

class Widget3 extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => StateWidget3();
}

class StateWidget3 extends State<Widget3> {
  @override
  Widget build(BuildContext context) {
    print('Widget3 build');

    return Text('Widget3 Model2 count:${Provider.of<Model2>(context).count}');
  }
}
