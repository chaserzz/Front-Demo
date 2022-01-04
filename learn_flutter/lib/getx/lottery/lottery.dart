import 'dart:async';
import 'dart:math';

import 'package:flutter/material.dart';

import 'package:get/get.dart';
import '../api/lottery_service.dart';
import 'lottery_entity.dart';

// ToDo：中奖触发事件
// ToDo：抽奖按钮防抖
// ToDo：扣减矿石
class LotteryController extends GetxController {
  final LotteryService lotteryService;
  LotteryController(this.lotteryService);

  final int lotteryCardNumber = 9;
  final _rewardedIndex = (-1).obs;
  get rewardedIndex => _rewardedIndex;
  set rewardedIndex(value) => _rewardedIndex.value = value;

  final _currentIndex = 0.obs;
  get currentIndex => _currentIndex.value;
  List<int> _lotteryOrder = [0, 1, 2, 4, 7, 6, 5, 3];
  get lotteryOrder => _lotteryOrder;

  final _isRunning = false.obs;
  get isRunning => _isRunning.value;

  var _timerStep = 1;
  var _stepCounter = 0;
  late Timer _downcountTimer;

  var _lotteries = Rx<List<LotteryEntity>>([]);
  get lotteries => _lotteries.value;

  @override
  void onReady() async {
    var lotteriesFetched = await lotteryService.listAll();
    if (lotteriesFetched != null) {
      _lotteries.value = lotteriesFetched;
    }

    super.onReady();
  }

  void simulate(int times) {
    int bigReward = 0;
    var orderedLotteries = this.lotteries.map((e) => e.probability).toList();

    for (var i = 1; i < orderedLotteries.length; i++) {
      orderedLotteries[i] += orderedLotteries[i - 1];
    }
    int maxRandomNum = this
        .lotteries
        .map((e) => e.probability)
        .toList()
        .reduce((value, element) => value + element);
    for (int i = 0; i < times; i++) {
      var rewardedValue = Random().nextInt(maxRandomNum);
      var orderIndex = 0;
      for (var i = orderedLotteries.length - 2; i >= 0; --i) {
        if (rewardedValue >= orderedLotteries[i]) {
          orderIndex = i + 1;
          break;
        }
      }
      if (orderIndex != 0 && orderIndex != 3) {
        bigReward++;
      }
      print('第$i 次抽奖，奖品：${this.lotteries[orderIndex].name}');
    }

    print(
        '中大奖次数：$bigReward，中大奖概率${(bigReward / times * 100).toPrecision(2)}%。');
  }

  void startLottery() {
    if (!_isRunning.value) {
      _isRunning.value = true;
      _rewardedIndex.value = -1;
      _currentIndex.value = 0;
      _timerStep = 1;
      _downcountTimer =
          Timer.periodic(Duration(milliseconds: 100), _rotateCard);
    }
    Future.delayed(Duration(seconds: 3), () {
      int maxRandomNum = this
          .lotteries
          .map((e) => e.probability)
          .toList()
          .reduce((value, element) => value + element);
      var rewardedValue = Random().nextInt(maxRandomNum);
      _updateRewardIndex(rewardedValue);
    });
  }

  void _updateRewardIndex(int rewardedValue) {
    var orderedLotteries = this.lotteries.map((e) => e.probability).toList();
    // 思路：所有奖项的概率值为正整数，构建好奖项数组按概率值逐项求和
    // 之后判断随机数落入哪个区间得知获奖的奖品序号
    // 因为求和的数组是从小到大排列，所以可以从倒数第二个下标判断，
    // 如果超出该下标对应的值，那么就是落入了该下标的下一个区间内，即中奖下标需要+1
    // 如果都没有命中，说明数值落入了最小值的范围也就是第一个序号的奖品
    for (var i = 1; i < orderedLotteries.length; i++) {
      orderedLotteries[i] += orderedLotteries[i - 1];
    }
    var orderIndex = 0;
    for (var i = orderedLotteries.length - 2; i >= 0; --i) {
      if (rewardedValue >= orderedLotteries[i]) {
        orderIndex = i + 1;
        break;
      }
    }
    print(rewardedValue);
    _rewardedIndex.value = orderIndex;
    print(_rewardedIndex.value);
  }

  void _rotateCard(Timer timer) {
    if (_rewardedIndex.value == -1) {
      _loopIndex();
    } else {
      if (_stepCounter++ > _timerStep) {
        _loopIndex();
        _stepCounter = 0;
        _timerStep += 1;
        if (_lotteryOrder[_currentIndex.value] == _rewardedIndex.value) {
          timer.cancel();
          _isRunning.value = false;
          _showReward();
        }
      }
    }
  }

  void _loopIndex() {
    _currentIndex.value++;
    if (_currentIndex.value == _lotteryOrder.length) {
      _currentIndex.value = 0;
    }
  }

  void _showReward() {
    LotteryEntity rewardedLottery = this.lotteries[_rewardedIndex.value];
    Get.defaultDialog(
      title: '恭喜中奖!',
      titleStyle: TextStyle(color: Colors.orange[400]),
      content: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Image.network(
            rewardedLottery.imageUrl,
            width: 60,
            height: 60,
          ),
          Text(
            rewardedLottery.name,
            style: TextStyle(
              color: Colors.orange[400],
            ),
          ),
        ],
      ),
    );
  }

  @override
  void onClose() {
    _downcountTimer.cancel();
    super.onClose();
  }
}

class MiddleAutumnLotteryPage extends StatelessWidget {
  const MiddleAutumnLotteryPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('抽奖大解密'),
        brightness: Brightness.dark,
      ),
      body: Center(
        child: Stack(
            children: [const LotteryBackground(), LotteryPage()],
            alignment: Alignment.center),
      ),
    );
  }
}

class LotteryBackground extends StatelessWidget {
  const LotteryBackground({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width - 40,
      height: 450,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8.0),
        gradient: RadialGradient(
          radius: 1.0,
          focalRadius: 0.5,
          colors: [
            Colors.yellow[50]!,
            Colors.orange[300]!,
          ],
        ),
      ),
    );
  }
}

class LotteryPage extends StatelessWidget {
  LotteryPage({Key? key}) : super(key: key);
  final LotteryController lotteryController =
      LotteryController(Get.find<LotteryService>());

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 320,
      height: 410,
      padding: EdgeInsets.all(20.0),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8.0),
        color: Colors.orange[400],
      ),
      child: GetX<LotteryController>(
        init: lotteryController,
        builder: (controller) => controller.lotteries.length == 0
            ? Container(
                width: 80,
                height: 80,
                child: CircularProgressIndicator(
                  color: Colors.orange[400],
                ),
              )
            : GridView.count(
                crossAxisCount: 3,
                crossAxisSpacing: 10.0,
                mainAxisSpacing: 20.0,
                childAspectRatio: 0.8,
                shrinkWrap: true,
                physics: NeverScrollableScrollPhysics(),
                children: List<Widget>.generate(
                  9,
                  (index) {
                    int lotteryIndex =
                        index < (controller.lotteryCardNumber ~/ 2)
                            ? index
                            : index - 1;
                    LotteryEntity lottery = controller.lotteries[lotteryIndex];
                    return index != (controller.lotteryCardNumber ~/ 2)
                        ? LotteryCard(
                            lottery: lottery,
                            color: index ==
                                        controller.lotteryOrder[
                                            controller.currentIndex] &&
                                    controller.isRunning
                                ? Colors.green[200]!
                                : Colors.white,
                          )
                        : LotteryButton(
                            name: '抽奖',
                            onPressed: controller.isRunning
                                ? null
                                : () {
                                    controller.startLottery();
                                  },
                          );
                  },
                ),
              ),
      ),
    );
  }
}

class LotteryButton extends StatelessWidget {
  final String name;
  final VoidCallback? onPressed;
  const LotteryButton({
    Key? key,
    required this.name,
    required this.onPressed,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    bool enabled = onPressed != null;
    return Container(
      padding: EdgeInsets.all(10.0),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8.0),
        gradient: RadialGradient(
          radius: 1.0,
          colors: enabled
              ? [
                  Colors.yellow[50]!,
                  Colors.orange[300]!,
                ]
              : [
                  Colors.grey[300]!,
                  Colors.grey,
                ],
        ),
      ),
      child: TextButton(
        onPressed: onPressed,
        child: Text(
          name,
          style: TextStyle(
            color: enabled ? Colors.orange : Colors.black54,
            fontSize: 20.0,
          ),
        ),
      ),
    );
  }
}

class LotteryCard extends StatelessWidget {
  final LotteryEntity lottery;
  final Color color;
  const LotteryCard({
    Key? key,
    required this.lottery,
    required this.color,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(5.0),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8.0),
        color: color,
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Image.network(
            lottery.imageUrl,
            fit: BoxFit.fitWidth,
          ),
          Text(
            lottery.name,
            style: TextStyle(
              color: Colors.orange[400],
              fontSize: 12.0,
            ),
          ),
        ],
      ),
    );
  }
}
