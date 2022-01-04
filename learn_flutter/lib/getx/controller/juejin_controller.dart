import 'package:get/get.dart';
import 'package:learn_flutter/getx/models/personal_entity.dart';
import '../api/juejin_service.dart';

enum LoadingStatus { loading, falied, success }

class PersonalController extends GetxController {
  PersonalController(this._userId);
  PersonalEntity? userInfo;
  LoadingStatus? loadingStatus;
  String _userId;
  @override
  void onReady() {
    getPersonalInfomation(_userId);
    super.onReady();
  }

  getPersonalInfomation(userId) async {
    loadingStatus = LoadingStatus.loading;
    userInfo = await JuejinService().getPersonalProfile(userId);
    if (userInfo != null) {
      loadingStatus = LoadingStatus.success;
    } else {
      loadingStatus = LoadingStatus.falied;
    }
    update();
  }
}
