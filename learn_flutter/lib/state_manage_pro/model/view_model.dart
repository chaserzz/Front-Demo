import 'package:flutter/material.dart';

import 'model_binding_v0.dart';

class ViewModel {
  final int value;
  const ViewModel({this.value = 0});

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    if (other.runtimeType != runtimeType) {
      return false;
    }
    final ViewModel otherModel = other as ViewModel;
    return otherModel.value == value;
  }

  @override
  int get hashCode => value.hashCode;

  static ViewModel of(BuildContext context) {
    final ModelBinding? binding =
        (context.dependOnInheritedWidgetOfExactType(aspect: ModelBinding));
    return binding?.model ?? ViewModel();
  }
}
