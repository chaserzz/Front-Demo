import 'package:flutter/material.dart';
import 'package:learn_flutter/state_manage_pro/model/model_binding_v2.dart';
import 'package:learn_flutter/state_manage_pro/model/view_model2.dart';

class Version2 extends StatelessWidget {
  const Version2({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    print("version2 build");
    return ModelBindingV2<ViewModel2>(
      create: () => ViewModel2(),
      child: Column(
        children: [ViewControl2(), OtherWidget()],
      ),
    );
  }
}

class ViewControl2 extends StatelessWidget {
  const ViewControl2({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final model = ModelBindingV2.of<ViewModel2>(context);
    print((model?.value ?? 0) + 1);
    return Container(
        child: TextButton(
      child: Text("count: ${model?.value ?? 0}"),
      onPressed: () {
        ModelBindingV2.updateModel<ViewModel2>(
            context, ViewModel2(value: (model?.value ?? 0) + 1));
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
