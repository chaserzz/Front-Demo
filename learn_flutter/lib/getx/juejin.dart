import 'package:flutter/material.dart';
import 'package:get/get_state_manager/get_state_manager.dart';
import 'package:learn_flutter/getx/controller/juejin_controller.dart';

class PersonalPage extends StatelessWidget {
  const PersonalPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GetBuilder<PersonalController>(
      init: PersonalController('70787819648695'),
      builder: (controller) {
        print(controller.userInfo?.userName);
        return Center(
          child: Text(controller.userInfo?.userName ?? ''),
        );
      },
    );
  }
}
