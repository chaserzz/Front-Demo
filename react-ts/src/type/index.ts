// 该文件是用于实现typescript的interface的各种使用方式

import { Interface } from "readline";

//1. 保证变量的定义
interface ILength {
  length: number
}

// 传入的泛型T确保为是实现了ILength的对象，一定会拥有属性length
function getLen<T extends ILength>(arg : T){
  return arg.length;
};

getLen({
  length: 10
}); // 10
getLen([]); // 0

//2. 检查对象上的键是否存在
interface IPerson {
  age: number,
  name: string,
  addtress?: string
};

type K1 = keyof IPerson; // IPerson上所有的键名
type K2 = keyof IPerson[]; // push|reduce|... 数组的方法名称

//3. 默认参数
interface IDefalutType <T = String>{
  name: T
};
const str: IDefalutType = {
  name: 'str'
};
str.name; // str string
const num: IDefalutType<Number> = {
  name: 2
};
num.name; // 2 number

// 条件类型
interface Dictionary<T = any> {
  [key: string]: T
};

type strDic = Dictionary<string>;
type DicMember<T> = T extends strDic ? string : never;

//其实就是当上面的T为联合类型的时候，会进行拆分，有点类似数学中的分解因式:
// 使用条件类型查找交集和并集
type Diff<T,U> = T extends U ? never : T; // 找差集
type Filter<T,U> = T extends U ? T : never; // 找交集

type N = Diff<"a" | "b" | "c", "a" | "b" |"c" |"d">; // never
type diff = Diff<"a" | "b" | "c", "a" | "b" >; // "c"
type filt = Filter<"a" | "b" | "c", "a" | "b">; // "a" | "b"

// inter  配合上面的条件类型可以推断出一个类型
type Func<T> = T extends () => infer R ? R : boolean;

type notFunc = Func<number> // boolean
type PromiseFunc = Func<() => string | number > // string | number

// Partial

// 源码实现
/* type Partial<T> = {
  [P in keyof T]?: T[P];
}; */
interface NotNull {
  prop: string,
  state: string,
}
type P = Partial<NotNull> // {props?: string, state?: string}


// Record 映射成新的对象类型，key为K中的属性，类型为T
/**
 * 
 * type Record<K extends keyof any, T> = {
 *   [P in K]: T;
 * };
 */
type Page = 'about' | "home" | "contact" 
 interface PageInfo {
  title: string;
}
const x: Record<Page, PageInfo> = {
  about: { title: "about" },
  contact: { title: "contact" },
  home: { title: "home" }
};


// ReturnType 获得函数的返回值的类型
type T1 = ReturnType<() => string> // string
type T2 = ReturnType<() => string | number> // string | number
export {}