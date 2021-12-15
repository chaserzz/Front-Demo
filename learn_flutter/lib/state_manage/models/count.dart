import 'package:flutter/foundation.dart';

class Model1 extends ChangeNotifier {
  int _count = 0;
  int get count => _count;
  set count(int value) {
    _count = value;
    print("change count $value");
    notifyListeners();
  }
}
