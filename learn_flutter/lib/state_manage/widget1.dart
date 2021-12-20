import 'package:flutter/material.dart';

class Widget1 extends StatefulWidget {
  const Widget1({Key? key}) : super(key: key);

  @override
  _Widget1State createState() => _Widget1State();
}

class _Widget1State extends State<Widget1> {
  @override
  Widget build(BuildContext context) {
    print("widge1 build");
    return Text("widget1");
  }
}
