import 'package:flutter/material.dart';

import "./view_model2.dart";

class ModelBindingV2<T> extends StatefulWidget {
  ModelBindingV2({required this.child, required this.create, Key? key})
      : assert(create != null),
        super(key: key);
  final ValueGetter<T> create;
  Widget child;

  static T? of<T>(BuildContext context) {
    ModelBindingScope2<T>? scope =
        context.dependOnInheritedWidgetOfExactType(aspect: ModelBindingScope2);
    return scope?.modelBindingState.currentModel;
  }

  static void updateModel<T>(BuildContext context, T newModel) {
    // 需要指定泛型才可以找到对应的InheritedWidget，才会执行对应的state当中的updatemodel
    // 的方法
    ModelBindingScope2<T>? scope =
        context.dependOnInheritedWidgetOfExactType(aspect: ModelBindingScope2);
    print("scope $scope");
    scope?.modelBindingState.updateModel(newModel);
  }

  @override
  _ModelBindingV2State createState() {
    //return _ModelBindingV2State(); 不指定泛型将会导致无法进行更新视图
    return _ModelBindingV2State<T>();
  }
}

class _ModelBindingV2State<T> extends State<ModelBindingV2> {
  T? currentModel;

  @override
  void initState() {
    super.initState();
    currentModel = widget.create();
  }

  updateModel(T nextModel) {
    if (currentModel != nextModel) {
      setState(() {
        currentModel = nextModel;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    print(currentModel);
    return ModelBindingScope2(
      modelBindingState: this,
      child: widget.child,
    );
  }
}

class ModelBindingScope2<T> extends InheritedWidget {
  ModelBindingScope2({
    Key? key,
    required this.modelBindingState,
    required Widget child,
  })  : assert(modelBindingState != null),
        super(key: key, child: child);

  final _ModelBindingV2State<T> modelBindingState;

  @override
  bool updateShouldNotify(ModelBindingScope2 oldWidget) => true;
}
