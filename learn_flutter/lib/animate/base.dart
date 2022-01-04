import 'package:flutter/material.dart';

class AnimateDemo extends StatefulWidget {
  const AnimateDemo({Key? key}) : super(key: key);

  @override
  _AnimateDemoState createState() => _AnimateDemoState();
}

class _AnimateDemoState extends State<AnimateDemo>
    with SingleTickerProviderStateMixin {
  late Animation<double> animation;
  late AnimationController controller;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    // 创建一个2秒钟的线性增长
    controller =
        AnimationController(duration: const Duration(seconds: 2), vsync: this);
    // 将动画类的addlistener binding setState
    //创建一个2s从40到100的线性变化类
    animation = Tween(begin: 40.0, end: 100.0).animate(controller)
      ..addListener(() {
        setState(() {});
      });
    controller.addStatusListener((status) {
      print(status);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("anmiate_demo"),
      ),
      body: Container(
        child: Stack(
          alignment: Alignment.center,
          children: [
            Icon(
              Icons.favorite,
              color: Colors.red[200],
              size: animation.value * 1.5,
            ),
            Icon(
              Icons.favorite,
              color: Colors.red[400],
              size: animation.value,
            ),
            Icon(
              Icons.favorite,
              color: Colors.red[600],
              size: animation.value / 2,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.play_arrow),
        onPressed: () {
          if (controller.status == AnimationStatus.completed) {
            controller.reverse();
          } else {
            controller.forward();
          }
        },
      ),
    );
  }
}
