import 'package:flutter/material.dart';
import 'package:learn_flutter/state_manage_pro/model/model_binding_v0.dart';
import 'package:learn_flutter/state_manage_pro/model/view_model.dart';

class Version extends StatefulWidget {
  const Version({Key? key}) : super(key: key);

  @override
  _VersionState createState() => _VersionState();
}

class _VersionState extends State<Version> {
  ViewModel _viewmodel = ViewModel();

  updateModel(ViewModel newModel) {
    setState(() {
      _viewmodel = newModel;
    });
  }

  @override
  Widget build(BuildContext context) {
    print(_viewmodel.value);
    return ModelBinding(
      model: _viewmodel,
      child: ViewControl(updateModel),
    );
  }
}

class ViewControl extends StatelessWidget {
  const ViewControl(this.updateModel, {Key? key}) : super(key: key);
  final ValueChanged<ViewModel> updateModel;

  @override
  Widget build(BuildContext context) {
    final value = ViewModel.of(context).value;
    return Container(
      child: TextButton(
        child: Text("current: ${value}"),
        onPressed: () {
          updateModel(ViewModel(value: value + 1));
        },
      ),
    );
  }
}
