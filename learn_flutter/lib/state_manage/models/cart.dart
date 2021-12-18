import 'package:flutter/material.dart';

import 'package:flutter/foundation.dart';
import "./goods_entity.dart";

class CartModel extends ChangeNotifier {
  List<GoodsEntity> _goodsList = [];

  get goodList => _goodsList;
  double get totalPrice =>
      _goodsList.fold(0, (total, cur) => cur.price + total);

  void add(GoodsEntity goods) {
    _goodsList.add(goods);
    notifyListeners();
  }

  bool isInCart(GoodsEntity goods) {
    return _goodsList.any((element) => element.id == goods.id);
  }

  void removeAll() {
    if (_goodsList.isNotEmpty) {
      _goodsList.clear();
    }
    notifyListeners();
  }
}
