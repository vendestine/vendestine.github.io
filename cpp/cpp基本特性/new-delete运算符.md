---
title: new delete 运算符
slug: new-delete运算符
sidebar_position: 0
hide: false
---


# new delete 运算符

## 介绍

在C++中，`new`和`delete`是用于动态内存管理的运算符。它们允许程序在运行时分配和释放内存，这对于处理不确定大小的数据结构（如链表、树等）非常重要。下面是对这两个运算符的详细讲解：

### 1. `new` 运算符

- 功能：`new`运算符用于在堆上动态分配内存。它返回一个指向所分配内存的指针。
- 语法：

```cpp
Type* pointer = new Type; // 分配一个Type类型的对象  
Type* arrayPointer = new Type[size]; // 分配一个Type类型的数组
```

- 示例：

```cpp
int* p = new int; // 分配一个int类型的内存  
*p = 10; // 给分配的内存赋值  

int* arr = new int[5]; // 分配一个包含5个int的数组  
for (int i = 0; i < 5; ++i) {    
    arr[i] = i; // 初始化数组  
}
```

### 2. `delete` 运算符

- 功能：`delete`运算符用于释放之前通过`new`分配的内存。使用`delete`可以避免内存泄漏。
- 语法 + 示例：

```cpp
delete p; // 释放之前分配的int内存  
delete[] arr; // 释放之前分配的int数组内存
```

### 3. 注意事项

- 内存泄漏：如果使用`new`分配的内存没有用`delete`释放，就会导致内存泄漏，程序的内存使用量会不断增加。
- 双重释放：对同一块内存使用`delete`两次会导致未定义行为，因此在释放内存后，最好将指针设置为`nullptr`。
- 构造和析构：使用`new`分配对象时，会调用对象的构造函数；使用`delete`释放对象时，会调用对象的析构函数。

## 用法

new可以分配单个对象的内存，也可以分配数组对象的内存；分配的内存默认是在堆区；

> 相关术语：
> new分配单个对象的内存 &lt;=&gt; new创建单个对象 &lt;=&gt; new单个对象
> new分配数组对象的内存 &lt;=&gt; new创建数组对象 &lt;=&gt; new数组对象
> > new的时候 语法层面有三种写法,(..,), (), 没有()；分别对应有参初始化，无参初始化，不初始化；

 

### new单个对象

(1) 对象是普通变量，可以分配对应的内存 

- `(...)` 直接初始化，允许；
- `()`值初始化，允许，初始化为0；
- 没有`()` 默认初始化，允许，分配的内存未定义；

(2) 对象是类对象，会调用构造函数，如果没有对应的构造函数，就会报错

- `(...)` 直接初始化，允许，找到对应构造函数初始化，没有找到报错
- `()` 值初始化，允许，调用默认构造函数初始化，没有找到报错
- 没有`()` 默认始化，允许，调用默认构造函数初始化，没有找到报错

### new数组对象

(1) new普通变量数组，可以使用`()`将所有对象全部初始化为0

- `(...)` 直接初始化，不允许；会报错
- `()`值初始化，允许，数组中对象全部初始化为0；
- 没有`()` 默认初始化，允许，分配的内存未定义；

(2) new类对象数组，有没有`()`都一样，均使用默认构造函数，如果没有默认构造函数就 会报错

- `(...)` 直接初始化，不允许；会报错
- `()` 值初始化，允许，调用默认构造函数初始化，没有找到报错
- 没有`()` 默认初始化，允许，调用默认构造函数初始化，没有找到报错

代码：

```cpp
#include <iostream>
#include <string>


class Test
{
public:
    Test() {}
};

class TestA
{
public:
    TestA(int i_) : i(i_) {}

private:
    int i;
};

int main() {
    // 1. new可以在堆上分配 单个对象 的内存  <=> new可以在堆上创建 单个对象   <=> new单个对象

    // 以下对象 指 分配的对象/创建的对象/new的对象

    // 1.1 对象是普通变量，分配对应的内存
    
    int *pi = new int(10);    // 堆上分配int对象的内存，直接初始化
    std::cout << *pi << std::endl;
   
    int* pk = new int();     // 堆上分配int对象的内存，值初始化为0;
    std::cout << *pk << std::endl;
    
    int *pj = new int;       // 堆上分配int对象的内存，默认初始化，分配内存未定义
    std::cout << *pj << std::endl;
    
    delete pi;   
    delete pj;
    delete pk;

    // 1.2 对象是类对象，会调用对应的构造函数，如果没有对应的构造函数，就会报错
    
    std::string *pString1 = new std::string("hello world");  // 找到对应的构造函数初始化
    std::cout << *pString1 << std::endl;

    std::string *pString2 = new std::string();              // 调用默认构造函数初始化
    std::cout << *pString2 << std::endl;
    
    std::string *pString3 = new std::string;                // 调用默认构造函数初始化
    std::cout << *pString3 << std::endl;

    // 这里演示 new单个类对象，找不到对应构造函数报错
    //Test* t1 = new Test(10);     // 找不到对应构造函数报错
    
    delete pString1;
    delete pString2;
    delete pString3;


    // 2. new可以在堆上分配 数组对象 的内存 <=> new可以在堆上创建 数组对象 <=> new数组对象

    // 2.1 new 普通变量 数组   可以使用（）将所有对象全部初始化为 0    => 只有()初始化合法

    int *p1 = new int[100]();           // 分配数组对象内存，值参初始化，数组中所有对象全部初始化为0 
    std::cout << p1[20] << std::endl;

    int *p2 = new int[100];             // 分配数组对象内存，默认初始化，分配的内存未定义
    std::cout << p2[20] << std::endl;   

    //int* p3 = new int[100](10);        // 分配数组对象内存，直接初始化，报错，语法规定不允许
    //std::cout << p2[20] << std::endl;   

    delete[] p1;
    delete[] p2;
    //delete[] p3;

    // 2.2 对于 类对象 数组   有没有“（）”都一样，均使用默认构造函数，如果没有默认构造函数就会报错

    std::string *pString4 = new std::string[100]();                // 分配数组对象内存，数组中所有对象 使用默认构造函数初始化
    std::cout << pString4[20] << std::endl;

    std::string* pString5 = new std::string[100];                  // 分配数组对象内存，数组中所有对象 使用默认构造函数初始化
    std::cout << pString5[20] << std::endl;

    //std::string* pString6 = new std::string[100]("hello world");   // 分配数组对象内存，有参初始化，报错，语法规定不允许 
    //std::cout << pString6[20] << std::endl;

    // 这里演示 new类对象数组，找不到默认构造函数报错
    //TestA* t2 = new TestA[100];
    
    delete[] pString4;
    delete[] pString5;
    //delete[] pStirng6;

    return 0;
}
```

运行结果：

<img src="/assets/LdgmbcnnVom01NxADArc2CiWnIh.png" src-width="542" src-height="200"/>

上面代码 注释的地方都是之前提到的的问题

- 内存未定义
- 没有找到对应的构造函数
- new数组对象不允许直接初始化

<img src="/assets/Idwpbp19OoRj0PxXI7tcluVEnwg.png" src-width="823" src-height="316" align="center"/>

总结：

- new单个对象，语法层面上有，直接/值/默认 初始化都可以；但是new数组对象上，语法层面上不允许直接初始化；
- new 单个类对象 和 new 类对象数组时，就是要找对应的构造函数，没有找到就会报错

## new的所有初始化

### 1. 基本初始化方式

#### 1.1 默认初始化

```cpp
int* ptr1 = new int;  // 未初始化，内置类型值是随机的
```

#### 1.2 值初始化

```cpp
int* ptr2 = new int();  // 初始化为0
```

#### 1.3 直接初始化

```cpp
int* ptr3 = new int(42);  // 初始化为42
```

#### 1.4 列表初始化（C++11引入）

```cpp
int* ptr4 = new int{42};  // 使用花括号初始化
```

### 2. 对象初始化方式

#### 2.1 默认构造函数

```cpp
class MyClass {  
public:  
    MyClass() { value = 0; }  
    MyClass(int x) : value(x) {}  
    int value;  
};  

// 默认构造函数  
MyClass* obj1 = new MyClass();
```

#### 2.2 带参数构造函数

```cpp
// 带参数的构造函数  
MyClass* obj2 = new MyClass(10);
```

#### 2.3 列表初始化构造函数

```cpp
// 列表初始化  
MyClass* obj3 = new MyClass{10};
```

### 3. 数组初始化方式

#### 3.1 默认数组初始化

```cpp
// 默认初始化数组  
int* arr1 = new int[5];  // 未初始化
```

#### 3.2 值初始化数组

```cpp
// 值初始化数组  
int* arr2 = new int[5]();  // 全部元素初始化为0
```

#### 3.3 直接初始化数组

```cpp
// 部分初始化数组  
int* arr3 = new int[5]{1, 2, 3, 4, 5};  // C++11开始支持
```

### 4. 多维数组初始化

#### 4.1 二维数组初始化

```cpp
// 二维数组初始化  
int** matrix1 = new int*[3];  
for (int i = 0; i < 3; ++i) {    
    matrix1[i] = new int[4]();  // 每行初始化为0  
}  

// 列表初始化二维数组（C++11）  
int** matrix2 = new int*[2]{  
    new int[3]{1, 2, 3},  
    new int[3]{4, 5, 6}  
};
```

### 5. 复杂对象初始化

#### 5.1 复杂类的构造函数初始化

```cpp
class ComplexClass {  
public:  
    ComplexClass() = default;  
    ComplexClass(int a, double b, std::string c)        
        : x(a), y(b), str(c) {}  
    
    int x;  
    double y;
    std::string str;  
};  

// 多参数构造函数初始化  
ComplexClass* complex1 = new ComplexClass(10, 3.14, "Hello");
```

### 6. 智能指针初始化（现代C++推荐）

#### 6.1 unique_ptr

```cpp
#include <memory>  

// 使用 make_unique  
std::unique_ptr<int> uptr1 = std::make_unique<int>(42);  

// 直接构造  
std::unique_ptr<MyClass> uptr2 = std::make_unique<MyClass>(10);
```

#### 6.2 shared_ptr

```cpp
// 使用 make_shared  
std::shared_ptr<int> sptr1 = std::make_shared<int>(42);  

// 直接构造  
std::shared_ptr<MyClass> sptr2 = std::make_shared<MyClass>(10);
```

### 7. 特殊初始化场景

#### 7.1 placement new

```cpp
// 在预分配的内存上构造对象  
char buffer[sizeof(MyClass)];  
MyClass* placementObj = new (buffer) MyClass(100);
```

### 完整示例代码

```cpp
#include <iostream>  
#include <string>  
#include <memory>  

class MyClass {  
public:  
    MyClass() : value(0) {        
        std::cout << "默认构造函数" << std::endl;
    }
      
    MyClass(int x) : value(x) {        
        std::cout << "带参数构造函数: " << value << std::endl;
    }  
    ~MyClass() {        
        std::cout << "析构函数" << std::endl;
    }  
    
    int value;  
};  

int main() {  
    // 基本类型初始化  
    int* a = new int;           // 未初始化  
    int* b = new int();         // 初始化为0  
    int* c = new int(42);       // 初始化为42  
    int* d = new int{42};       // 列表初始化  

    // 对象初始化  
    MyClass* obj1 = new MyClass();        // 默认构造  
    MyClass* obj2 = new MyClass(10);      // 带参数构造  
    MyClass* obj3 = new MyClass{20};      // 列表初始化  
    
    // 数组初始化  
    int* arr1 = new int[5];                // 未初始化  
    int* arr2 = new int[5]();              // 全0  
    int* arr3 = new int[5]{1, 2, 3, 4, 5}; // 部分初始化  
    
    // 智能指针  
    auto uptr = std::make_unique<MyClass>(30);  
    auto sptr = std::make_shared<MyClass>(40);  
    
    // 释放内存  
    delete a;  
    delete b;  
    delete c;  
    delete d;  
    delete obj1;  
    delete obj2;  
    delete obj3;  
    delete arr1;  
    delete arr2;  
    delete arr3;  
    
    return 0;  
}
```

### 注意事项

1. 使用 `new` 分配的内存必须手动释放，否则会造成内存泄漏
2. 现代 C++ 推荐使用智能指针（`unique_ptr`、`shared_ptr`）
3. 不同的初始化方式适用于不同的场景
4. 列表初始化（`{}`）提供了更严格和安全的初始化方式

### 建议

- 尽量使用栈上对象和智能指针
- 避免手动管理动态内存
- 使用 RAII（资源获取即初始化）原则

## malloc/free 和 new/delete之间的区别

参考视频：

https://www.bilibili.com/video/BV1Qm411z7AH/?spm_id_from=333.337.search-card.all.click&vd_source=cb02f779bd17a3aad9801e0c4464dfc9

自己的理解：

背景：malloc、free c语言中库函数，new、delete是c+中操作符

(1) malloc和new的区别

内存大小的计算：new自动计算所需分配内存大小，malloc需要手动计算

返回的指针类型：new返回的是对象类型的指针，malloc返回的是void*,之后进行类型转换

分配失败后的处理：neW分配失败会抛出异常，malloc分配失败返回的是NULL;

分配区域：new是在free store上分配内存，malloc堆上分配：

(2) delete和free的区别

参数区别：delete需要对象类型的指针，free是vo1d*类型的指针：

new的简要流程

1. operator new
2. 申请足够的空间
3. 调用构造函数，初始化成员变量

delete的简要流程

1. 先调用析构函数
2. operator delete
3. 释放空间

引申问题：

(1) malloc是怎么分配空间的？

malloc内存分配的核心机制：

1-内存分配基本流程

```cpp
void* malloc(size_t size) {  
    // 1. 参数检查  
    if (size == 0) return NULL;  
    
    // 2. 内存大小调整  
    size_t actual_size = adjust_size(size);  
    
    // 3. 查找可用内存块  
    voidmemory_block = find_free_block(actual_size);  
    
    // 4. 如果没有可用内存块，向系统申请  
    if (memory_block == NULL) {
        memory_block = request_system_memory(actual_size);
    }  
    
    // 5. 标记内存块为已使用  
    mark_block_used(memory_block);  
    return memory_block;  
}
```

2-内存分配的关键步骤

2.1-大小调整

- 对齐内存大小（通常是8或16字节对齐）
- 增加内存块管理所需的额外空间

```cpp
size_t adjust_size(size_t size) {  
    // 内存对齐  
    size_t aligned_size = (size + 7) & ~0x7;  
    
    // 额外的块管理信息  
    return aligned_size + BLOCK_HEADER_SIZE;  
}
```

2.2-内存块查找策略

- 空闲链表查找
- 最佳匹配算法

```cpp
void* find_free_block(size_t size) {  
    // 遍历空闲链表  
    for (free_block* block = free_list_head; block != NULL; block = block->next) {  
        // 找到合适大小的块  
        if (block->size >= size) {  // 从空闲链表移除  
            remove_from_free_list(block);  
            return block;        
        }    
    }  
    return NULL;  
}
```

3-系统内存申请方法

3.1-小内存申请（&lt;128KB）

- 使用`sbrk()`系统调用
- 扩展进程堆空间

```cpp
void* request_small_memory(size_t size) {  
    // 使用sbrk()扩展堆  
    void new_memory = sbrk(size);  
    
    // 更新堆信息  
    update_heap_metadata(new_memory, size);  
    
    return new_memory;  
}
```

3.2 大内存申请（&gt;128KB）

- 使用`mmap()`系统调用
- 直接映射虚拟内存

```cpp
void* request_large_memory(size_t size) {  
    return mmap(NULL,           // 系统分配地址  
                size,           // 请求大小  
                PROT_READ | PROT_WRITE,  // 读写权限  
                MAP_PRIVATE | MAP_ANONYMOUS,   
                -1,             // 无文件描述符  
                0);             // 无文件偏移  
}
```

4-内存块管理结构

```cpp
// 内存块管理结构  
typedef struct memory_block {  
    size_t size;           // 块大小  
    int is_free;           // 是否空闲  
    struct memory_block* next;  // 下一个块  
    struct memory_block* prev;  // 前一个块  
} 
memory_block;
```

5-内存分配算法

5.1 空闲链表管理

- 维护空闲内存块链表
- 支持块的合并和分割

```cpp
void merge_free_blocks() {
    memory_block* current = free_list_head;  
    while (current && current->next) {  
        // 检查相邻块是否可以合并  
        if (is_contiguous_and_free(current, current->next)) {
            merge_blocks(current, current->next);
        }
        current = current->next;
    }  
}
```

6-内存对齐技术

```cpp
// 内存对齐宏  
#define ALIGN(size) (((size) + sizeof(size_t) - 1) & ~(sizeof(size_t) - 1))
```

实际分配流程总结

1. 检查请求大小
2. 调整内存大小（对齐）
3. 查找空闲内存块
4. 如果没有合适块，向系统申请内存
    - 小内存：使用`sbrk()`
    - 大内存：使用`mmap()`

5. 标记内存块为已使用
6. 返回内存指针

(2) mal1oc分配的物理内存还是虚拟内存？

malloc分配的是虚拟内存

- 当你调用`malloc()`时，实际上分配的是虚拟内存地址空间
- 操作系统使用虚拟内存映射机制，将虚拟内存映射到物理内存
- 只有当程序实际访问这些内存时，才会触发缺页中断，真正分配物理内存页

(3) malloc调用后是否立刻得到物理内存？

不是立即获得

- 分配虚拟内存是瞬间完成的
- 物理内存是延迟分配的（按需分页）
- 只有在程序首次读写这块内存时，操作系统才会分配真正的物理内存页
- 延迟分配示例:

```cpp
intptr = malloc(1024 * sizeof(int));  // 只分配虚拟内存  // 此时没有实际的物理内存分配  
ptr[0] = 42;  // 首次写入时，触发缺页中断，分配物理内存
```

(4) free(p)怎么知道该释放多大的空间？

通过内存块的元数据信息

- malloc在分配内存时，会在内存块前面添加一个头部（metadata）
- 头部记录了内存块的大小和其他管理信息
- free()通过读取这个头部，就能知道要释放的内存大小
- 内存块结构示例

```cpp
struct MemoryBlock {  
    size_t size;       // 记录内存块大小  
    int is_free;       // 标记是否空闲  
    // 其他管理信息  
};
```

(5) free释放内存后，内存还在吗？

内存仍然存在，但被标记为可重用

- free()并不会立即将内存返回给操作系统
- 内存被放回内存管理器的空闲列表
- 下次malloc可能会重用这块内存
- 只有在特定条件下（如大块内存），才会真正归还给操作系统
- 内存管理示意:

```cpp
void free(voidptr) {  
    // 1. 找到内存块  
    MemoryBlock* block = (MemoryBlock*)(ptr - sizeof(MemoryBlock));  
    
    // 2. 标记为空闲  
    block->is_free = 1;  
    
    // 3. 可能进行块合并  
    merge_adjacent_free_blocks(block);  
    
    // 4. 加入空闲链表，等待重用  
    add_to_free_list(block);  
}
```

(6) malloc, free, new, delete的伪代码

C语言风格：malloc 和 free

```cpp
// malloc 伪代码  
void* my_malloc(size_t size) {  
    // 1. 参数检查  
    if (size == 0) return NULL;  
    
    // 2. 内存大小调整（对齐）  
    size_t aligned_size = ALIGN(size);  
    
    // 3. 查找空闲内存块  
    voidmemory = find_free_block(aligned_size);  
    
    // 4. 如果没有空闲块，向系统申请内存  
    if (memory == NULL) {        
        memory = request_system_memory(aligned_size);
    }  
    
    // 5. 记录内存块元数据  
    if (memory) {  
        store_block_metadata(memory, aligned_size);
    }  
    
    return memory;  
}  

// free 伪代码  
void my_free(void* ptr) {  
    // 1. 空指针检查  
    if (ptr == NULL) return;  

    // 2. 获取内存块元数据  
    MemoryBlockHeader* header = get_block_header(ptr);  

    // 3. 标记内存块为可用  
    header->is_free = true;  

    // 4. 尝试合并相邻空闲块  
    merge_adjacent_free_blocks(header);  

    // 5. 可能返回系统（取决于内存管理策略）  
    try_return_to_system(header);  
}
```

C++风格：new 和 delete

```cpp
// new 伪代码  
void* operator new(size_t size) {  
    // 1. 调用 malloc 分配内存  
    void* memory = my_malloc(size);  

    // 2. 内存分配失败处理  
    if (memory == NULL) {  
        throw std::bad_alloc();  // C++ 特有的异常处理  
    }  
    
    return memory;  // 返回分配的内存指针
}  

// delete 伪代码  
void operator delete(void* ptr) noexcept {  
    // 1. 空指针检查  
    if (ptr == NULL) return;  

    // 2. 释放内存（调用 free）  
    my_free(ptr);  
}


// new 伪代码  
template <typename T, typename... Args>  
T* my_new(Args&&... args) {  
    // 1. 调用 operator new 分配内存  
    void* raw_memory = operator new(sizeof(T));  

   // 2. 在分配的内存上调用构造函数  
    T* object = static_cast<T*>(raw_memory);  
    new (object) T(std::forward<Args>(args)...);  // placement new   

    return object;  // 返回指向新对象的指针  
}  

// delete 伪代码  
template <typename T>  
void my_delete(T* ptr) {  
    // 1. 空指针检查  
    if (ptr == NULL) return;  

    // 2. 调用析构函数  
    ptr->~T();  

    // 3. 调用 operator delete 释放内存  
    operator delete(static_cast<void*>(ptr));  
}
```

