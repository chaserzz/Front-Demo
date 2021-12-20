import 'package:flutter/material.dart';

import 'view_model.dart';

class ModelBinding extends InheritedWidget {
  ModelBinding({
    Key? key,
    this.model = const ViewModel(),
    required Widget child,
  })  : assert(model != null),
        super(key: key, child: child);

  final ViewModel model;

  @override
  bool updateShouldNotify(ModelBinding oldWidget) => model != oldWidget.model;
}
