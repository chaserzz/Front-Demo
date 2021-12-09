class DynamicEntity {
  String _title;
  String _imageUrl;
  int _viewCount;
  int _id;

  get title => _title;
  get imageUrl => _imageUrl;
  get viewCount => _viewCount;
  get id => _id;

  DynamicEntity(this._title, this._imageUrl, this._id, this._viewCount);

  factory DynamicEntity.formJson(Map<String, dynamic> json) {
    DynamicEntity newEntity = DynamicEntity(
        json['title'], json['imageUrl'], json['id'], json['viewCount']);
    return newEntity;
  }

  Map<String, dynamic> toJson() {
    return {
      'id': _id,
      'title': _title,
      'imageUrl': _imageUrl,
      'viewCount': _viewCount
    };
  }
}
