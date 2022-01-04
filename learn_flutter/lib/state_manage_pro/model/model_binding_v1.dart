import 'package:flutter/material.dart';

import "./view_model1.dart";

class ModelBindingV1 extends StatefulWidget {
  ModelBindingV1(
      {required this.child, this.iniState = const ViewModel1(), Key? key})
      : assert(iniState != null),
        super(key: key);
  ViewModel1 iniState;
  Widget child;
  @override
  _ModelBindingV1State createState() {
    print("createState");
    return _ModelBindingV1State(iniState);
  }
}

class _ModelBindingV1State extends State<ModelBindingV1> {
  ViewModel1 currentModel;
  _ModelBindingV1State(this.currentModel);

  updateModel(ViewModel1 nextModel) {
    if (currentModel != nextModel) {
      setState(() {
        currentModel = nextModel;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    print("rebuild");
    return ModelBindingScope(
      modelBindingState: this,
      child: widget.child,
    );
  }
}

class ModelBindingScope extends InheritedWidget {
  ModelBindingScope({
    Key? key,
    required this.modelBindingState,
    required Widget child,
  })  : assert(modelBindingState != null),
        super(key: key, child: child);

  final _ModelBindingV1State modelBindingState;

  @override
  bool updateShouldNotify(oldWidget) => true;
}
