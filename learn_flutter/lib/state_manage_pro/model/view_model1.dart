import 'package:flutter/material.dart';
import 'package:learn_flutter/state_manage_pro/model/model_binding_v1.dart';

class ViewModel1 {
  final int value;
  const ViewModel1({this.value = 0});

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    if (other.runtimeType != runtimeType) {
      return false;
    }
    final ViewModel1 otherModel = other as ViewModel1;
    return otherModel.value == value;
  }

  @override
  int get hashCode => value.hashCode;

  static void updateModel(BuildContext context, ViewModel1 nextModel) {
    ModelBindingScope? scope =
        context.dependOnInheritedWidgetOfExactType(aspect: ModelBindingScope);
    scope?.modelBindingState.updateModel(nextModel);
  }

  static ViewModel1 of(BuildContext context) {
    final ModelBindingScope? modelScope =
        context.dependOnInheritedWidgetOfExactType(aspect: ModelBindingScope);
    return modelScope?.modelBindingState.currentModel ?? const ViewModel1();
  }
}
