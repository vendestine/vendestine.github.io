---
title: auto关键字
slug: auto关键字
sidebar_position: 5
hide: false
---


# auto关键字

## 介绍

`auto`是C++11引入的一个非常有用的类型推导关键字，它能够让编译器自动推断变量的类型。

<b>基本用法</b>

```cpp
auto x = 42;        // x 被推导为 int  
auto y = 3.14;      // y 被推导为 double  
auto str = "Hello"; // str 被推导为 const char*
```

<b>与容器和迭代器一起使用</b>

```cpp
std::vector<int> vec = {1, 2, 3, 4, 5};  
for (auto it = vec.begin(); it != vec.end(); ++it) {  
    // it 被自动推导为 std::vector<int>::iterator  
}
```

<b>处理复杂类型</b>

```cpp
std::map<std::string, std::vector<int>> complexMap;  
for (auto& pair : complexMap) {  
    // pair 被推导为 std::pair<const std::string, std::vector<int>>&  
}
```

<b>函数返回值类型推导</b>

```cpp
auto add(int a, int b) {  
    return a + b;  // 返回值类型自动推导为 int  
}
```

<b>Lambda表达式</b>

```cpp
auto lambda = [](int x) { return x * 2; };
```

优点：

- 减少冗长的类型声明
- 简化代码
- 在模板编程中特别有用
- 自动处理复杂类型

潜在缺点：

- 可能降低代码可读性
- 编译时间可能略微增加
- 需要程序员对类型推导有清晰理解

建议：在类型明确且简单的场景下使用`auto`，保持代码的清晰和可读性。

## 用法

auto是C++11 新加入的关键字，就是为了简化一些写法。

使用auto推断类型确实简单方便，但有个基本要求，就是在使用auto的时清楚的知道编译器会给auto推断出什么类型。

推导规则：

1. `auto`默认推导为值类型
2. 丢弃`const`和引用
3. 使用`auto&`可以保留引用类型和const
4. 如果需要const或引用属性，可以显示添加

这里给出一个程序，充分说明auto的推导规则

```cpp
int main() {  
    // 原始类型  
    int x = 10;  
    const int cx = 20;  

    // auto 推导  
    auto a = x;     // a 是 int
    auto b = cx;    // b 是 int（const 被丢弃）  

    // 如果想保留 const，需要手动指定  
    auto const ca = x;     // ca 是 const int  
    const auto cb = x;     // cb 是 const int  

    // 引用推导  
    int& rx = x;  
    const int& crx = x;  

    auto r1 = rx;   // r1 是 int（引用被丢弃）  
    auto r2 = crx;  // r2 是 int（const 和引用都被丢弃）  

    // 保留引用和 const 需要使用auto&
    auto& ref1 = rx;      // ref1 是 int&  
    auto& ref2 = crx;     // ref2 是 const int&  
}
```

(1) auto无法推断出引用类型，要使用引用只能显示添加；

```cpp
#include <iostream>
#include <boost/type_index.hpp>

using boost::typeindex::type_id_with_cvr;

int main() {
    auto i1 = 100;
    auto& i2 = i1;
    auto i3 = i1;

    std::cout << type_id_with_cvr<decltype(i1)>().pretty_name() << std::endl;   // int
    std::cout << type_id_with_cvr<decltype(i2)>().pretty_name() << std::endl;   // int &
    std::cout << type_id_with_cvr<decltype(i3)>().pretty_name() << std::endl;   // int

    return 0;
}
```

(2) auto无法推断出const，要使用引用只能自己显示添加

```cpp
#include <iostream>
#include <boost/type_index.hpp>

using boost::typeindex::type_id_with_cvr;


int main() {
    int i = 100;
    const auto i2 = i;

    std::cout << type_id_with_cvr<decltype(i2)>().pretty_name() << std::endl;   // const int = int const
    return 0;
}
```

(3) auto关键字在推断引用的类型时：

使用auto时，引用和const会被剥离

使用`auto&`时，保留引用的特性，包括`const`属性。

```cpp
#include <iostream>
#include <boost/type_index.hpp>

using boost::typeindex::type_id_with_cvr;


int main() {
    int i = 100;
    const int& refI = i;
    auto i2 = refI;         // 推断引用的类型
    auto& i3 = refI;
    auto& i4 = i;

    std::cout << type_id_with_cvr<decltype(i2)>().pretty_name() << std::endl;   // int
    std::cout << type_id_with_cvr<decltype(i3)>().pretty_name() << std::endl;   // int const &
    std::cout << type_id_with_cvr<decltype(i4)>().pretty_name() << std::endl;   // int &

    return 0;
}
```

(4) auto关键字在推断类型时，如果没有引用符号，会忽略值类型的const修饰（本身的const，顶层const)，而保留指向对象的const修饰（底层const)，典型的就是指针；

```cpp
#include <iostream>
#include <boost/type_index.hpp>

using boost::typeindex::type_id_with_cvr;


int main() {
    int i = 100;
    const int* const pi = &i;
    auto pi2 = pi;    // 忽略值类型的const，保留指向对象的const

    const int i2 = 100;
    auto i3 = i2;     // 忽略值类型的const

    std::cout << type_id_with_cvr<decltype(pi2)>().pretty_name() << std::endl;   // const int * = int const *
    std::cout << type_id_with_cvr<decltype(i3)>().pretty_name() << std::endl;   // int 

    return 0;
}
```

(5) auto关键字在推断类型时，如果有了引用符号，那么值类型的const修饰 和 指向对象的const修饰 都会保留

```cpp
#include <iostream>
#include <boost/type_index.hpp>

using boost::typeindex::type_id_with_cvr;


int main() {
    int i = 100;
    const int* const pi = &i;
    auto& pi2 = pi;    // 都保留

    const int i2 = 100;
    auto& i3 = i2;     // 都保留

    std::cout << type_id_with_cvr<decltype(pi2)>().pretty_name() << std::endl;   // const int * const & = int const * const & 
    std::cout << type_id_with_cvr<decltype(i3)>().pretty_name() << std::endl;   // const int & = int const &

    return 0;
}
```

auto 不会影响编译速度，甚至会加快编译速度。因为编译器在处理 XX a = b 时，当 XX 是传统类型时，编译期需要检查 b 的类型是否可以转化为 XX。当 XX 为 auto 时，编译期 可以按照 b 的类型直接给定变量 a 的类型，所以效率相差不大，甚至反而还有提升。

最重要的一点，就是 auto 不要滥用，对于一些自己不明确的地方不要乱用 auto， 否则很可能出现事与愿违的结果，使用类型应该安全为先。

auto 主要用在与模板相关的代码中，一些简单的变量使用模板常常导致可读性 下降，经验不足还会导致安全性问题。

## 现代auto的用法

视频讲解：https://www.bilibili.com/video/BV1b94y1k7dm/?spm_id_from=333.337.search-card.all.click&vd_source=cb02f779bd17a3aad9801e0c4464dfc9

