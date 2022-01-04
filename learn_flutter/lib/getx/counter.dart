import 'package:flutter/material.dart';
import 'package:get/get.dart';

class CounterController extends GetxController {
  final int count = 0.obs; //.obs 将count变量设置为可观察到对象
  final String str = "aaff".obs;
  CounterController();
  increament() => count++;
}

class CounterPage extends StatelessWidget {
  const CounterPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("counter"),
      ),
      body: Center(
        child: GetBuilder<CounterController>(
          init: CounterController(),
          builder: (controller) {
            print("controller builder");
            return Obx(() => Text("current count ${controller.count.vlaue}"));
          },
        ),
      ),
      floatingActionButton: FloatingActionButton(
        child: const Icon(Icons.add),
        onPressed: () {
          var controller = Get.find<CounterController>();
          controller.increament();
        },
      ),
    );
  }
}
