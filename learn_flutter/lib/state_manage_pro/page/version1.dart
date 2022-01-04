import 'package:flutter/material.dart';
import 'package:learn_flutter/state_manage_pro/model/model_binding_v1.dart';
import 'package:learn_flutter/state_manage_pro/model/view_model1.dart';
import 'package:learn_flutter/state_manage_pro/page/version0.dart';

class Version1 extends StatelessWidget {
  const Version1({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    print("version1 build");
    return ModelBindingV1(
      iniState: ViewModel1(),
      child: Column(
        children: [ViewControl1(), OtherWidget()],
      ),
    );
  }
}

class ViewControl1 extends StatelessWidget {
  const ViewControl1({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final model = ViewModel1.of(context);
    return Container(
        child: TextButton(
      child: Text("count: ${model.value}"),
      onPressed: () {
        ViewModel1.updateModel(context, ViewModel1(value: model.value + 1));
      },
    ));
  }
}

class OtherWidget extends StatelessWidget {
  const OtherWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    print("other Build");
    return Text("otherChild");
  }
}
