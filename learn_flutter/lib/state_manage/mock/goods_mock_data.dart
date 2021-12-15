class GoodsMockData {
  static List<Map<String, dynamic>> list(int page, int size) {
    return List<Map<String, dynamic>>.generate(size, (index) {
      int id = index + (page - 1) * size + 1;
      return {
        '_id': '$id',
        'name': ' 商品$id',
        'imageUrl': id % 2 == 0
            ? 'http://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/image1.28d4255.png'
            : 'http://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/image2.382cde7.png',
        'price': (id * 10.5)
      };
    });
  }
}
