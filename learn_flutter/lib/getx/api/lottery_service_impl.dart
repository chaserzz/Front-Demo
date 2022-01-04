import '../utils/http.dart';
import '../lottery/lottery_entity.dart';
import 'lottery_service.dart';

class LotteryServiceImpl implements LotteryService {
  Future<List<LotteryEntity>?> listAll() async {
    var response = await HttpUtil.getDioInstance()
        .get('https://api.juejin.cn/growth_api/v1/lottery_config/get');
    if (response.statusCode == 200) {
      if (response.data['err_no'] == 0) {
        List<dynamic> _jsonItems = response.data['data']['lottery'];
        return _jsonItems.map((json) => LotteryEntity.fromJson(json)).toList();
      }
    }

    return null;
  }
}
