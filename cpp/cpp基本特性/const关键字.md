---
title: const关键字
slug: const关键字
sidebar_position: 2
hide: false
---


# const关键字

## 用法

在C/C++中，`const`关键字用于声明常量，表示某个变量的值在初始化后不能被修改。它可以用于变量、指针、函数参数和返回值等多种场景。下面是对`const`关键字的详细讲解：

### const修饰变量

使用`const`声明的变量在初始化后不能被修改。例如：

```cpp
const int x = 10;  
// x = 20; // 错误：不能修改常量
```

### const修饰指针

`const`可以与指针结合使用

- 常量指针（Pointer to Constant）：指向常量，不能修改指向的值，但可以改变指针的指向。

```cpp
const Type* pointer;  // const修饰指针指向的对象

const int a = 10;  
const int* ptr = &a; // ptr是一个指向常量整数的指针  

// *ptr = 20; // 错误：不能通过ptr修改a的值  
int b = 30;  
ptr = &b; // 合法：ptr可以指向其他地址
```

- 指针常量（Constant Pointer）：指针本身是常量，不能改变指针的指向，但可以修改指向的值。

```cpp
Type* const pointer;  // const修饰指针本身

int a = 10;  
int* const ptr = &a; // ptr是一个常量指针，指向整数  

*ptr = 20; // 合法：可以通过ptr修改a的值  
// ptr = &b; // 错误：不能改变ptr的指向
```

- 常量指针指向常量（Constant Pointer to Constant）：指针和指向的值都是常量，既不能修改指针的指向，也不能修改指向的值。

```cpp
const Type* const pointer;

const int a = 10;  
const int* const ptr = &a; // ptr是一个指向常量整数的常量指针  

// *ptr = 20; // 错误：不能通过ptr修改a的值  
// ptr = &b; // 错误：不能改变ptr的指向
```

### 常量函数参数

在函数参数中使用`const`可以防止函数修改传入的参数，尤其是对于引用和指针类型的参数。

```cpp
void func(const int* arr) {  
    // arr[0] = 10; // 错误：不能修改数组内容  
}
```

### 常量成员函数

在类中，使用`const`修饰成员函数，表示该函数不会修改类的成员变量。

```cpp
class MyClass {  
public:  
    void display() const {  
        // this->value = 10; // 错误：不能在const成员函数中修改成员变量  
    }  
};
```

### 常量返回值

函数可以返回`const`类型的值，表示返回的值不能被修改。

```cpp
const int getValue() {  
    return 10;  
}  

// int val = getValue();  
// val = 20; // 合法：val是一个普通变量，可以修改
```

### 总结

`const`关键字在C/C++中是一个重要的工具，用于提高代码的安全性和可读性。它可以帮助开发者明确哪些变量是常量，防止意外修改，从而减少错误和提高代码的可维护性。使用`const`的最佳实践是尽可能多地使用它，以确保代码的意图清晰。

## const修饰的变量和常量的区别

const是让编译器将变量视为常量，用const修饰的变量和真正的常量有本质的区别

<b>什么是真正的常量？</b>

真正的常量就是字面值，它们一般都存储在只读区。

一般来说只读区中包含.text段和.rodata段（因为它们都是仅可读的），数字字面值有时会直接嵌入指令中，所以存储在.text段，而字符串字面值通常都是存储在.rodata段。

例如：

```cpp
const char* str = "abcdefg";
const int a = 3;
const int b = 100;
```

str, a, b这些是const变量，并不是真正的常量，可以通过一些方式进行修改；而”abcdefg“，3，100这些是字面值，是真正的常量，无法修改。其中“abcdefg"这个字符串就存储在.rodata段， 而3, 100这些数字就存储在.text段中，这些都是真正的常量，无法用任何方式修改。

<b>const修饰的变量</b>

const修饰的变量，从内存分布的角度讲，和普通变量没有区别。

const 修饰的变量并非不可更改的，C++本身就提供了mutable 关键字用来修改const修饰的变量，从汇编的角度讲，const 修饰的变量也是可以修改的

代码分析：

```cpp
#include <iostream>
#include <string>

int main() {
    int i = 100;                        // i在栈区
    const int i2 = 200;                 // i2也在栈区, i2的值无法修改，但是i和i2在内存上是相邻的；
    static int i3;                      // i3在.bss段
    static int i4 = 400;                // i4在.data段
    const static int i5 = 500;          // i5在.rodata段
    std::string str = "hello world";    // str在栈区，"hello world"在常量区
    
    // 真正的常量 100 200 400 500存储在.text代码段（代码区），"hello world"存储在.rodata段（常量区）
    return 0;
}
```

## const在C和C++中的区别

- C/C++中都可以通过指针间接修改（不在只读区）const对象（全局未初始化的const对象，局部const对象）；但是C中可以修改成功，C++中虽然编译器不会报错，但是修改失败，因为在使用const对象时还是使用编译期常量进行替换。
- C中的const对象可以不初始化；C++中const对象必须初始化

这一段代码，可以改成.c文件或者.cpp文件试试，会发现上面的结论。

```cpp
#include <stdio.h>

const int a = 10;

int main()
{
    const int b = 20;

    // 使用指针强制类型转换来修改 const 对象的值
    int* pa = (int*)&a;
    int* pb = (int*)&b;
    //*pa = 30;
    *pb = 40;

    printf("a = %d\n", a);
    printf("b = %d\n", b);
    printf("*pb = %d\n", *pb);
    return 0;
}


// C中 输出 10 40 40
// C++中 输出 10 20 40
```

## const的作用，详细分析

视频讲解：
https://www.bilibili.com/video/BV1FWtre2EJo/?spm_id_from=333.337.search-card.all.click&vd_source=cb02f779bd17a3aad9801e0c4464dfc9

C/C++中的区别有误，看上面的总结，其他的没问题，可以作为回答问题的思路

<img src="/assets/QbLjbt12goFA8ixG73hcMV5qnFb.png" src-width="2342" src-height="1580" align="center"/>

