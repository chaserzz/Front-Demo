class LotteryEntity {
  final String id;
  final String imageUrl;
  final String name;
  final int probability;

  LotteryEntity({
    required this.id,
    required this.name,
    required this.imageUrl,
    required this.probability,
  });

  static LotteryEntity fromJson(Map<String, dynamic> json) {
    return LotteryEntity(
      id: json['lottery_id'],
      name: json['lottery_name'],
      imageUrl: json['lottery_image'],
      probability: json['lottery_type'] == 4 ? 4000 : 1,
    );
  }
}
