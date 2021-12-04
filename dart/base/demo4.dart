main(List<String> args) {
  final p = new Person("zard", 0);
  print(p.name);
}

class Person {
  final String name;
  final int age;

  Person(this.name, var age) : this.age = age ?? 10 {}
  // this.name = name;
  // this.age = age;
}

class ConstPerson {
  String name;
  int age;

  static final Map<String, ConstPerson> nameMap = {};
  static final Map<int, ConstPerson> ageMap = {};

  ConstPerson(this.name, this.age);

  factory ConstPerson.withName(String name) {
    if (nameMap.containsKey(name)) {
      final p = nameMap[name];
      return p;
    } else {
      final p = new ConstPerson(name, 0);
      nameMap[name] = p;
      return p;
    }
  }
}
