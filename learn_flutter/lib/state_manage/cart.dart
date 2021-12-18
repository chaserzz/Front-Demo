import 'package:flutter/material.dart';
import 'package:learn_flutter/state_manage/goods_list.dart';
import 'package:learn_flutter/state_manage/models/cart.dart';
import 'package:provider/provider.dart';

import 'models/goods_entity.dart';

class Cart extends StatelessWidget {
  const Cart({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    List<GoodsEntity> goods = context.read<CartModel>().goodList;
    return Scaffold(
      appBar: AppBar(
        title: Text("shopping_cart"),
      ),
      body: Consumer<CartModel>(
        builder: (context, value, child) {
          print(value);
          return ListView.builder(
            itemBuilder: (context, index) {
              return GoodsItem(goods[index]);
            },
            itemCount: goods.length,
          );
        },
      ),
      bottomNavigationBar: Container(
        height: 70,
        width: MediaQuery.of(context).size.width,
        padding: const EdgeInsets.all(10),
        alignment: Alignment.center,
        decoration: const BoxDecoration(
          border: Border(
              top: BorderSide(
            color: Colors.grey,
            width: 1.0,
          )),
          color: Colors.white,
        ),
        child: Text("total Price: ${context.read<CartModel>().totalPrice}"),
      ),
    );
  }
}
