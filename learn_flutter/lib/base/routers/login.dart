import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import "../components/formUtil.dart";

class LoginPage extends StatelessWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Login"),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            RoudImage(
                'https://img1.kpopmap.com/2019/11/iu-purple-hair-3.jpg', 150),
            LoginForm()
          ],
        ),
      ),
    );
  }
}

class RoudImage extends StatelessWidget {
  final String imageUrl;
  final double imageSize;

  const RoudImage(this.imageUrl, this.imageSize, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: imageSize,
      height: imageSize,
      clipBehavior: Clip.antiAlias,
      decoration: BoxDecoration(
          borderRadius: BorderRadius.all(Radius.circular(imageSize / 2))),
      child: Image.network(
        imageUrl,
        fit: BoxFit.fill,
      ),
    );
  }
}

class LoginForm extends StatefulWidget {
  const LoginForm({Key? key}) : super(key: key);

  @override
  _LoginFormState createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final Map<String, Map<String, Object>> _formData = {
    'username': {
      'value': '',
      'controller': TextEditingController(),
      'obsecure': false,
    },
    'password': {
      'value': '',
      'controller': TextEditingController(),
      'obsecure': true,
    },
  };
  _handleTextFieldChanged(String formKey, String value) {
    setState(() {
      _formData[formKey]!['value'] = value;
    });
  }

  _handleClear(String formKey) {
    setState(() {
      _formData[formKey]!['value'] = '';
      (_formData[formKey]!['controller'] as TextEditingController).clear();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(top: 60),
      child: Column(
        children: [
          FormUtil.textField(
            'username',
            _formData['username']!['value'].toString(),
            controller: _formData['username']!['controller'],
            focusNode: FocusNode(),
            hintText: '请输入手机号',
            prefixIcon: Icons.mobile_friendly,
            onChanged: _handleTextFieldChanged,
            onClear: _handleClear,
          ),
          FormUtil.textField(
            'password',
            _formData['password']!['value'].toString(),
            controller: _formData['password']!['controller'],
            obscureText: true,
            focusNode: FocusNode(),
            hintText: '请输入密码',
            prefixIcon: Icons.lock_open,
            onChanged: _handleTextFieldChanged,
            onClear: _handleClear,
          ),
          SizedBox(
            height: 10,
          ),
          _getConfirmButton(context)
        ],
      ),
    );
  }

  Widget _getConfirmButton(context) {
    return Container(
        height: 50,
        width: double.infinity,
        margin: EdgeInsets.all(10),
        decoration: BoxDecoration(
          color: Theme.of(context).primaryColor,
          borderRadius: BorderRadius.circular(4.0),
        ),
        child: TextButton(
            style: ButtonStyle(
              foregroundColor: MaterialStateProperty.all<Color>(Colors.white),
              backgroundColor: MaterialStateProperty.all<Color>(
                  Theme.of(context).primaryColor),
            ),
            onPressed: () {
              print(
                  '''Login: username=${(_formData['username']!['value'] as String).trim()}, 
              password=${(_formData['password']!['value'] as String).trim()}''');
            },
            child: Text("Login")));
  }
}
