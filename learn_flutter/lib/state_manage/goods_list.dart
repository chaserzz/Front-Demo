import 'package:flutter/material.dart';
import 'package:learn_flutter/state_manage/models/cart.dart';
import 'package:learn_flutter/state_manage/models/goods_entity.dart';
import 'package:provider/provider.dart';
import "package:learn_flutter/state_manage/mock/goods_mock_data.dart";

class GoodsList extends StatelessWidget {
  const GoodsList({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    List<Map<String, dynamic>> mockGoods = GoodsMockData.list(1, 20);
    List<GoodsEntity> goods =
        mockGoods.map((item) => GoodsEntity.fromJson(item)).toList();
    return Scaffold(
        appBar: AppBar(
          title: Text("AppBar"),
          actions: [
            IconButton(
              icon: Icon(Icons.shopping_cart),
              onPressed: () {
                Navigator.pushReplacementNamed(context, '/cart');
              },
            ),
          ],
        ),
        body: Consumer<CartModel>(
          builder: (context, cartList, child) {
            return ListView.builder(itemBuilder: (context, int index) {
              GoodsEntity good = goods[index];
              bool isInCart = context.read<CartModel>().isInCart(good);
              return Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Expanded(child: GoodsItem(good)),
                  TextButton(
                    onPressed: isInCart
                        ? null
                        : () {
                            var cart = context.read<CartModel>();
                            cart.add(good);
                          },
                    child: isInCart
                        ? const Icon(Icons.check, semanticLabel: 'ADDED')
                        : const Text('ADD'),
                    style: ButtonStyle(
                      overlayColor:
                          MaterialStateProperty.resolveWith<Color?>((states) {
                        if (states.contains(MaterialState.pressed)) {
                          return Theme.of(context).primaryColor;
                        }
                        return null; // Defer to the widget's default.
                      }),
                    ),
                  )
                ],
              );
            });
          },
        ));
  }
}

class GoodsItem extends StatelessWidget {
  final GoodsEntity goodsEntity;
  static const double ITEM_HEIGHT = 80;
  static const double TITLE_HEIGHT = 30;
  static const double MARGIN_SIZE = 10;
  const GoodsItem(this.goodsEntity, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      margin: EdgeInsets.all(MARGIN_SIZE),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          _imageWrapper(goodsEntity.imageUrl),
          Expanded(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _titleWrapper(context, goodsEntity.name),
                _titleWrapper(context, '￥${goodsEntity.price}'),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _titleWrapper(BuildContext context, String text) {
    return Container(
      height: TITLE_HEIGHT,
      margin: EdgeInsets.fromLTRB(MARGIN_SIZE, 0, 0, 0),
      alignment: Alignment.centerLeft,
      child: Text(
        text,
        maxLines: 2,
        overflow: TextOverflow.ellipsis,
        style: Theme.of(context).textTheme.headline6,
      ),
    );
  }

  Widget _imageWrapper(String imageUrl) {
    return SizedBox(
        width: 80, height: ITEM_HEIGHT, child: Image.network(imageUrl));
  }
}
