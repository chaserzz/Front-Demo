class GoodsEntity {
  late String _id;
  late String _name;
  late String _imageUrl;
  late double _price;

  String get id => _id;
  String get name => _name;
  String get imageUrl => _imageUrl;
  double get price => _price;

  static GoodsEntity fromJson(Map<String, dynamic> json) {
    GoodsEntity goods = GoodsEntity();
    goods._id = json['_id'];
    goods._name = json['name'];
    goods._imageUrl = json['imageUrl'];
    goods._price = json['price'];
    return goods;
  }
}
