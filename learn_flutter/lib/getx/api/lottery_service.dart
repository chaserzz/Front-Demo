import '../lottery/lottery_entity.dart';

abstract class LotteryService {
  Future<List<LotteryEntity>?> listAll();
}
