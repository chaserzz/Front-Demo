import 'package:flutter/material.dart';

class Widget2 extends StatefulWidget {
  const Widget2({Key? key}) : super(key: key);

  @override
  _Widget2State createState() => _Widget2State();
}

class _Widget2State extends State<Widget2> {
  @override
  Widget build(BuildContext context) {
    print("widge2 build");
    return Text("widget2");
  }
}
