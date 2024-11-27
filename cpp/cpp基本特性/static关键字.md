---
title: extern关键字
slug: static关键字
sidebar_position: 4
hide: false
---


# extern关键字

## 用法

在C/C++中，`extern`关键字用于声明一个变量或函数的外部链接性。它的主要作用是告诉编译器该变量或函数在其他文件中定义，而不是在当前文件中定义。下面是对`extern`关键字的详细讲解：

### 变量的使用

当你在一个源文件中定义了一个变量，并希望在其他源文件中访问这个变量时，可以使用`extern`关键字来声明它。例如：

```cpp
// file1.c

#include <stdio.h>  

int globalVar = 10; // 定义一个全局变量  

void display() {  
    printf("Global Variable: %d/n", globalVar);  
}
```

```cpp
// file2.c
#include <stdio.h>  

extern int globalVar; // 声明外部变量  

void modify() {  
    globalVar = 20; // 修改外部变量  
}
```

在这个例子中，`file1.c`中定义了一个全局变量`globalVar`，而在`file2.c`中使用`extern`关键字声明了这个变量。这样，`file2.c`就可以访问和修改`file1.c`中定义的`globalVar`

### 函数的使用

`extern`关键字也可以用于函数声明，尽管在C/C++中，函数默认具有外部链接性，因此通常不需要显式使用`extern`。但为了清晰起见，可以这样写：

```cpp
extern void myFunction(); // 声明一个外部函数
```

### extern "C" 在C++中的使用

在C++中，`extern`关键字还可以与`"C"`一起使用，以指示编译器使用C语言的链接方式。这在C++代码中调用C语言库时非常有用，避免了C++的名称修饰（name mangling）问题。

```cpp
extern "C" {  
    void cFunction(); // 声明一个C语言函数  
}
```

作用域和链接性

外部链接性：使用`extern`声明的变量或函数可以在多个文件中共享。

内部链接性：如果在一个文件中定义了一个变量而没有使用`extern`，那么这个变量的作用域仅限于该文件。

总结

`extern`用于声明在其他文件中定义的变量或函数。

在C++中，`extern "C"`用于处理C和C++之间的链接问题。

`extern`关键字有助于管理大型项目中的变量和函数的可见性和链接性。

## extern关键字的作用

视频讲解：https://www.bilibili.com/video/BV1gqpLeVEfV/?spm_id_from=333.337.search-card.all.click

<img src="/assets/WGN4byhIMozxKOxvn3rcM1aJnwe.png" src-width="1990" src-height="401" align="center"/>

