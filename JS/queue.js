class Queue{
  constructor(length){
    this.queue = new Array(length + 1); // 队列
    this.first = 0; // 队首
    this.last = 0; // 队尾
    this.size = 0; // 队列大小
  };
  // 加入队列
  enQueue(item){
    // 需要设置队首和队尾的指针
    // 如果队首和队尾相等,说明队列空间不足，需要进行扩容
    if(this.first === ((this.last + 1) % this.queue.length)){
      this.resize(this.getLength() * 2 + 1)
    }
    this.queue[this.last + 1] = item; // 加入队列
    this.size++;                      // 队列的长度加1
    this.last = (this.last + 1) % this.queue.length     
  };
  // 推出队列
  deQueue(){
    // 头部指针和尾部指针都指向同一个对象
    if (this.isEmpty()) {
      throw Error('Queue is empty')
    }
    let r = this.queue[this.first]; //获取首部元素
    this.queue[this.first] = null;
    this.first = (this.first + 1) % this.queue.length;
    this.size --;
    // 判断当前队列大小是否过小
    // 为了保证不浪费空间，在队列空间等于总长度四分之一时
    // 且不为 2 时缩小总长度为当前的一半
    if (this.size === this.getLength() / 4 && this.getLength() / 2 !== 0) {
      this.resize(this.getLength() / 2)
    }
    return r;
  };
  getHeader() {
    if (this.isEmpty()) {
      throw Error('Queue is empty')
    }
    return this.queue[this.first]
  }
  // 获得队列的长度
  getLength(){
    return this.queue.length - 1; // 减去一个空队头占据的位置
  };
  
  // 队列是否为空
  isEmpty(){
    return this.first === this.last
  }
  
  resize(length){
    const queue = new Array(length);
    for(let i = 0; i < length; i++){
      // 防止数组越界
      queue[i] = this.queue[(i + this.first) % this.queue.length];
    };
    this.queue = queue;
    this.first = 0;
    this.last = this.size;
  }
}