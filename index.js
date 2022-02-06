function readonly(target, key, descriptor) {
  console.log(target,key,descriptor);
  descriptor.writable = false
  return descriptor
}

class Test {
  @readonly
  name = 'yck'
}

let t = new Test()
