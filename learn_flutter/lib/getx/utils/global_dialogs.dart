import 'package:flutter/material.dart';
import 'package:flutter_easyloading/flutter_easyloading.dart';

class GlobalDialogs {
  static void showError(String message) {
    EasyLoading.showError(message);
  }

  static void showInfo(String message) {
    EasyLoading.showInfo(message);
  }

  static void showSuccess(String message) {
    EasyLoading.showSuccess(message);
  }

  static void show(String message) {
    EasyLoading.show(status: message);
  }

  static TransitionBuilder initDialogs() {
    return EasyLoading.init();
  }
}
