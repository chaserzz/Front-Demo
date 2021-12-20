import 'package:flutter/material.dart';
import 'package:learn_flutter/state_manage/models/count.dart';
import 'package:learn_flutter/state_manage/widget1.dart';
import 'package:learn_flutter/state_manage/widget2.dart';
import 'package:learn_flutter/state_manage/widget4.dart';
import 'package:learn_flutter/state_manage/widget3.dart';
import 'package:provider/provider.dart';

import 'models/model2.dart';

class StateView extends StatefulWidget {
  const StateView({Key? key}) : super(key: key);

  @override
  _StateViewState createState() => _StateViewState();
}

class _StateViewState extends State<StateView> {
  final ValueNotifier<int> _counter = ValueNotifier<int>(0);
  var widget4;

  @override
  void initState() {
    // TODO: implement initState
    widget4 = Widget4();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    _counter.value = Provider.of<Model1>(context).count;

    return Center(
      child: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Padding(padding: const EdgeInsets.only(bottom: 17)),
            ElevatedButton(
              onPressed: () {
                Provider.of<Model1>(context, listen: false).count++;
              },
              child: Text("Model1 ++"),
            ),
            ElevatedButton(
              onPressed: () {
                Provider.of<Model2>(context, listen: false).count++;
              },
              child: Text("Model2 ++"),
            ),
            Padding(
              padding: const EdgeInsets.only(bottom: 8.0),
              child: Text('Model count值变化监听'),
            ),
            Padding(
              padding: const EdgeInsets.only(bottom: 8.0),
              child: Text(
                'Model1 count:${Provider.of<Model1>(context).count}',
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(bottom: 8.0),
              child: Text(
                'Model2 count:${Provider.of<Model2>(context).count}',
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(bottom: 8.0),
              child: Selector<Model1, int>(
                builder: (context, value, child) {
                  return Text("selector demo:$value");
                },
                selector: (context, model) => model.count,
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(bottom: 8.0),
              child: Text("Selector2 Demo"),
            ),
            Padding(
              padding: const EdgeInsets.only(bottom: 8.0),
              child: Selector2<Model1, Model2, int>(
                builder: (context, value, child) {
                  return Text("total Count: $value");
                },
                selector: (context, model1, model2) {
                  return model1.count + model2.count;
                },
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(bottom: 8),
              child: Text("Consumer Demo"),
            ),
            Padding(
              padding: const EdgeInsets.only(bottom: 8.0),
              child: Consumer<Model1>(
                builder: (context, model, child) {
                  print('Model1 Consumer build');
                  return Text('Model1 count:${model.count}');
                },
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(bottom: 24.0),
              child: Consumer<Model2>(
                builder: (context, model, child) {
                  print('Model2 Consumer build');
                  return Text(
                    'Model2 count:${model.count}',
                  );
                },
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(bottom: 8.0),
              child: Text('Widget build?'),
            ),
            ValueListenableBuilder(
              valueListenable: _counter,
              builder: (context, value, child) {
                return Text(
                  'ValueListenableBuilder count:$value',
                );
              },
            ),
            Widget1(),
            Widget2(),
            Widget3(),
            widget4,
            /* Padding(padding: const EdgeInsets.only(bottom: 30)),
            FutureProvider<Model1>(
              create: (context) {
                return Future.delayed(Duration(seconds: 2))
                    .then((value) => Model1()..count = 11);
              },
              initialData: Model1(),
              builder: (context, child) => Text(
                'FutureProvider ${Provider.of<Model1>(context).count}',
              ),
            ),
            ProxyProvider<Model1, User>(
              update: (context, value, previous) =>
                  User("change value ${value.count}"),
              builder: (context, child) => Text(
                'ProxyProvider: ${Provider.of<User>(context).name}',
              ),
            ),
            StreamProvider(
              create: (context) {
                return Stream.periodic(
                    Duration(seconds: 2), (data) => Model1()..count = data);
              },
              initialData: Model1(),
              builder: (context, child) => Text(
                'StreamProvider: ${Provider.of<Model1>(context).count}',
              ),
            ), */
          ],
        ),
      ),
    );
  }
}

class User {
  var name;
  User(this.name);
}
