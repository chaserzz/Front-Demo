import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'models/cart.dart';
import 'models/count.dart';

class ShowCount extends StatelessWidget {
  const ShowCount({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    var model = context.watch<Model1>();
    return Text('Model1 count:${model.count}');
  }
}
