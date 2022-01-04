class ViewModel2 {
  final int value;
  const ViewModel2({this.value = 0});

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    if (other.runtimeType != runtimeType) {
      return false;
    }
    final ViewModel2 otherModel = other as ViewModel2;
    return otherModel.value == value;
  }

  @override
  int get hashCode => value.hashCode;
}
