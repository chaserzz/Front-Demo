import '../lottery/lottery_entity.dart';
import 'lottery_service.dart';

class LotteryServiceMock implements LotteryService {
  Future<List<LotteryEntity>?> listAll() async {
    return [
      LotteryEntity(
        id: '1',
        name: '66矿石',
        imageUrl:
            'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32ed6a7619934144882d841761b63d3c~tplv-k3u1fbpfcp-no-mark:0:0:0:0.image',
        probability: 7000,
      ),
      LotteryEntity(
        id: '2',
        name: '掘金限量徽章',
        imageUrl:
            'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ae4860cad7e48468885b2912271e544~tplv-k3u1fbpfcp-no-mark:0:0:0:0.image',
        probability: 100,
      ),
      LotteryEntity(
        id: '3',
        name: '星巴克月饼',
        imageUrl:
            'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c8a1101bf5494f539c17394dfc67477e~tplv-k3u1fbpfcp-no-mark:0:0:0:0.image',
        probability: 100,
      ),
      LotteryEntity(
        id: '4',
        name: 'Bug',
        imageUrl:
            'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a4ce25d48b8405cbf5444b6195928d4~tplv-k3u1fbpfcp-no-mark:0:0:0:0.image',
        probability: 2400,
      ),
      LotteryEntity(
        id: '5',
        name: '新款T恤',
        imageUrl:
            'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b03ef90fa28846269fb56149370d0ee3~tplv-k3u1fbpfcp-no-mark:0:0:0:0.image',
        probability: 100,
      ),
      LotteryEntity(
        id: '6',
        name: '乐高海洋巨轮',
        imageUrl:
            'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aabe49b0d5c741fa8d92ff94cd17cb90~tplv-k3u1fbpfcp-no-mark:0:0:0:0.image',
        probability: 100,
      ),
      LotteryEntity(
          id: '7',
          name: 'Switch',
          imageUrl:
              'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4decbd721b2b48098a1ecf879cfca677~tplv-k3u1fbpfcp-no-mark:0:0:0:0.image',
          probability: 100),
      LotteryEntity(
        id: '8',
        name: '希尔顿月饼',
        imageUrl:
            'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/68e0e52ded724daebaa7702406b45b59~tplv-k3u1fbpfcp-no-mark:0:0:0:0.image',
        probability: 100,
      ),
    ];
  }
}
