import 'package:flutter/material.dart';
import 'package:learn_flutter/state_manage/models/count.dart';
import 'package:learn_flutter/state_manage/show_count.dart';
import 'package:provider/provider.dart';

class SimpleModal1 extends StatelessWidget {
  const SimpleModal1({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    int count = Provider.of<Model1>(context).count;
    print(Provider.of(context));
    return Scaffold(
      appBar: AppBar(
        actions: [
          IconButton(
              icon: Icon(Icons.shopping_cart),
              onPressed: () {
                final result = Navigator.of(context).push(MaterialPageRoute(
                    builder: (BuildContext context) => const ShowCount()));
              }),
        ],
        title: Text("demo"),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            FlatButton(
              color: Colors.blue,
              child: Text('Model1 count++'),
              onPressed: () {
                Provider.of<Model1>(context, listen: false).count++;
              },
            ),
            Padding(
                padding: const EdgeInsets.only(bottom: 8.0),
                child: Text(
                  'Model count值变化监听',
                  style: TextStyle(color: Colors.black12),
                )),
            Padding(
              padding: const EdgeInsets.only(bottom: 8.0),
              child: Text('Model1 count:$count'),
            )
          ],
        ),
      ),
    );
  }
}
