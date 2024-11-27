---
title: inline mutable default delete
slug: inline-mutable-default-delete
sidebar_position: 3
hide: false
---


# inline mutable default delete

## 介绍

### inline（内联函数）

inline关键字用于函数定义，是一个编译器优化建议，用于提高函数调用的效率。

```cpp
inline int add(int a, int b) {  
    return a + b;  
}
```

特点：

- 建议编译器在调用处直接展开函数，避免函数调用开销
- 编译器可以自行决定是否真正内联
- 适用于短小、频繁调用的函数
- 可以减少函数调用的栈开销

### mutable（可变成员）

mutable用于修饰类的成员变量，允许在const成员函数中修改该成员变量。

```cpp
class Cache {  
private:  
    mutable int access_count = 0;  // 可以在const成员函数中被修改  
public:  
    int getData() const {  
        access_count++;  // 即使在const函数中也可以修改  
        return 42;  
    }  
};
```

特点：

- 允许在const成员函数中修改特定成员变量
- 常用于缓存、计数等辅助性成员
- 不影响对象的整体const语义

### default（默认函数）

default用于显式地声明编译器默认生成的特殊成员函数。

```cpp
class MyClass {  
public:  
    MyClass() = default;  // 显式使用编译器生成的默认构造函数  
    MyClass(const MyClass&) = default;  // 默认拷贝构造  
    MyClass& operator=(MyClass&&) = default;  // 默认移动赋值  
};
```

特点：

- 明确告诉编译器使用默认实现
- 可以提高代码可读性
- 在某些情况下可以避免编译器阻止特殊成员函数的生成

### delete（删除函数）

delete用于禁止使用特定的函数或运算符。

```cpp
class Singleton {  
public:  
    Singleton(const Singleton&) = delete;  // 禁止拷贝构造  
    Singleton& operator=(const Singleton&) = delete;  // 禁止拷贝赋值  
    static Singleton& getInstance() {  
        static Singleton instance;  
        return instance;  
    }  
private:  
    Singleton() {}  // 私有构造函数  
};  

class NonHeap {  
public:  
    void* operator new(size_t) = delete;  // 禁止在堆上分配  
    void* operator new[](size_t) = delete;  
}; 

void processOnly(int x) { /* 处理整数 */ }  
void processOnly(double) = delete;  // 禁止double重载
```

特点：

- 明确禁止某些函数的使用
- 可以阻止不期望的类型转换和函数调用
- 在编译期就能检查和阻止不正确的使用

### 综合示例

```cpp
class SmartCache {  
private:  
    mutable int access_count = 0;  
    int* data = nullptr;  

public:  
    SmartCache() = default;  // 默认构造  
    SmartCache(const SmartCache&) = delete;  // 禁止拷贝  
    SmartCache& operator=(const SmartCache&) = delete;  

    inline int getData() const {  
        access_count++;  // mutable允许在const函数中修改  
        return data ? *data : 0;  
    }  
};
```

## 用法

### inline

inline关键字作用：

在函数定义中函数返回类型前加上关键字inline就可以把函数指定为内联函数

内联函数的作用，普通函数在调用时需要给函数分配栈空间以供函数执行，压栈等操作会影响成员运行效率，于是C++提供了内联函数将函数体放到需要调用函数的地方，用空间换效率。

简单来说：普通函数调用需要分配新的栈空间，然后执行压栈等操作，而内联函数调用可以继续在当前的函数栈帧里执行，提高了运行效率，典型的以空间换时间

总结：使用 inline 关键字就是一种提高效率，但加大编译后文件大小的方式，现在随着硬件性能的提高，inline关键字用的越来越少了

inline关键字的注意事项：

(1) inline关键字只是一个建议，开发者建议编译器将成员函数当做内联函数，一般适合搞内联的情况编译器都会采纳建议

eg: 如果一个函数所需要分配的栈非常大，例如代码量很大的函数，或者是递归函数，他们需要分配的栈空间都很大，这个时候编译器就不会把它当作内联函数；

(2) 关键字 inline 必须与函数定义放在一起才能使函数成为内联，仅仅将inline放在函数声明前不起任何作用；简单来说：就是inline关键字必须与函数定义放在一起，函数声明加不加inline无所谓；

(3) 直接在类内部实现的函数，相当于函数默认加了inline关键字

inline相关代码：

```cpp
#include <iostream>

class Test
{
public:
    Test() {}
    ~Test() {}
    inline void func1();
    inline void func2();
    void func3();
    void func4()
    {
        std::cout << "call func4()" << std::endl;
    }
};

inline void Test::func1()
{
    std::cout << "call func1()" << std::endl;
}

void Test::func2()
{
    std::cout << "call func2()" << std::endl;
}

inline void Test::func3()
{
    std::cout << "call func3()" << std::endl;
}

int main()
{
    Test t1;
    t1.func1();   // 函数声明和定义都加inline关键字，建议成内联函数
    t1.func2();   // 函数声明加inline，函数定义不加，不是内联函数
    t1.func3();   // 函数声明不加，函数定义加inline关键字，建议成内联函数
    t1.func4();   // 类内实现函数，建议成内联函数

    // 总结：
    // 1. 关键字 inline 必须与函数定义放在一起才能使函数成为内联，
    // 2. 直接在类内部实现的函数，默认相当于加了inline关键字
    return 0;
}
```

### mutable 关键字

mutable关键字的作用：

mutable意为可变的，与const相对，被mutable修饰的成员变量，永远处于可变的状态；

mutable关键字修饰的变量在常函数中，该变量也可以被更改  （常函数中原本是不允许修改成员变量的）这个关键字在现代 C++中使用情况并不多，只有在统计函数调用次数这类情况下才推荐使用

mutable 关键字的注意事项：

(1) mutable不能修饰静态成员变量和常成员变量

mutable相关代码

```cpp
#include <iostream>

class Test
{
public:
    Test() {}
    ~Test(){}

    void output() const   // mutable关键字修饰的成员变量 可以在常函数里修改
    {
        ++outputCallCount;
        std::cout << "hello world" << std::endl;
    }


    // C++11新特性，直接初始化成员变量 <=> 代替 定义成员 + 构造函数初始化
    mutable unsigned outputCallCount = 0;   // mutable关键字可以修饰普通成员变量
    //mutable static int i = 0;               // mutable关键字不能修饰静态成员变量
    //mutable const int j = 0;                // mutable关键字不能修饰常成员变量

};


int main()
{
    Test t1;
    t1.output();
    t1.output();
    t1.output();

    std::cout << t1.outputCallCount << std::endl;

    return 0;
}
```

### default 关键字

default 关键字的作用:

(1) 便于书写默认构造函数，默认拷贝构造函数，默认的赋值运算符重载函数，默认的析构函数，default关键字表示使用的是系统默认提供的代码，这样可以使代码更加直观，方便；

defalut 关键字注意事项：

(1) 现代 C++中，哪怕没有构造函数，也推荐将构造函数用default关键字标记，可以让代码看起来更加直观，方便

Comment

(2) 使用default关键字 语法层面就是函数声明 return_type fucntion_name (para list) = default

default相关代码：

```cpp
#include <iostream>

class Test
{
public:
    Test() = default;             // 默认构造函数  
    ~Test() = default;            // 默认析构函数
    Test(const Test& test) = default;   // 默认复制构造函数
    Test& operator=(const Test& test) = default;   // 赋值运算符重载函数   赋值运算符
};

int main()
{
    return 0;
}
```

### delete 关键字

delete 关键字的作用：

(1) C++会为一个类生成默认构造函数，默认析构函数，默认复制构造函数，默认重载赋值运算符，在很多情况下，我们并不希望这些默认的函数被生成，为了解决这个问题，在 C++11 以前，只能有将此函数声明为私有函数或是将函数只声明不定义两种方式。于是在C++11中提供了 delete 关键字，只要在函数最后加上“=delete”就可以明确告诉编译期不要默认生成该函数

总结：delete关键字还是推荐使用的，在现代 C++代码中，如果不希望一些函数默认生 成，就用 delete 表示，这个功能还是很有用的，比如在单例模式中

delete 关键字注意事项：

(1) delete一般不会用使用在析构函数

delete相关代码

```cpp
#include <iostream>

class Test
{
public:
    Test() = delete;                                // 默认构造函数  
    ~Test() = delete;                               // 默认析构函数
    Test(const Test& test) = delete;                // 默认复制构造函数
    Test& operator=(const Test& test) = delete;     // 默认重载运算符
};

int main()
{
    return 0;
}
```

