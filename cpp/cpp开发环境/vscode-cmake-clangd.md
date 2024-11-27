---
title: vscode + CMake + clangd
slug: vscode-cmake-clangd
sidebar_position: 1
hide: false
---


# vscode + CMake + clangd

## Vscode配置C++

vscode配置C++开发环境，一般使用MinGW，直接参考官方教程：https://code.visualstudio.com/docs/cpp/config-mingw

然后记得配置环境变量，工具链中所有的可执行文件都放入了`C:/msys64/ucrt64/bin`该目录，所以我们把这个目录添加到环境变量

> 注意，使用不同的shell，环境变量的选取和加载顺序不同，例如git bash shell，它会先加载git bash相关的环境变量，再添加主机的环境变量，qt也是同理，先加载qt文件的环境变量，再添加主机的环境变量，但是msys2，它只会添加自己的环境变量，不会添加主机的环境变量，它和主机之间是完全隔离的

### MSYS2, MSYS, MinGW之间的关系

MSYS2、MSYS和MinGW之间的关系可以通过它们的历史背景和功能来理解。以下是对这三者的详细讲解：

(1) MSYS（Minimal SYStem）

- 定义：MSYS是一个轻量级的Unix环境，旨在为Windows用户提供一个类Unix的命令行界面。它最初是为了支持MinGW（Minimalist GNU for Windows）项目而开发的。
- 功能：MSYS提供了一些基本的Unix工具（如bash、make、grep等），使得在Windows上使用GNU工具链变得更加容易。它允许开发者在Windows上编写和运行Unix风格的脚本。
- 局限性：MSYS的功能相对有限，主要用于提供一个基本的开发环境，支持一些简单的构建和编译任务。

(2) MinGW（Minimalist GNU for Windows）

- 定义：MinGW是一个为Windows平台提供GNU工具链的项目，允许开发者在Windows上编译和运行本地的Windows应用程序。
- 功能：MinGW提供了GCC（GNU Compiler Collection）编译器及其相关工具，支持C、C++等语言的编译。它生成的可执行文件是Windows本地的，不依赖于Cygwin等其他层。
- 局限性：MinGW本身并不提供完整的Unix环境，主要关注于编译和构建Windows应用程序。

(3) MSYS2

- 定义：MSYS2是MSYS的一个更新和扩展版本，结合了MSYS和MinGW的优点，提供了一个更现代化的开发环境。
- 功能：
    - 包管理：MSYS2使用`pacman`作为包管理器，允许用户轻松安装、更新和管理软件包。
    - 多种环境支持：MSYS2支持MSYS（用于Unix命令行工具）和MinGW-w64（用于编译Windows本地应用程序），同时支持32位和64位编译。
    - 丰富的软件库：MSYS2提供了大量的预编译软件包，用户可以通过包管理器轻松获取所需的工具和库。

- 优势：MSYS2比MSYS更强大，提供了更好的包管理和更新机制，适合现代开发需求。

### 
(4) 总结

- MSYS是一个基本的Unix环境，主要用于支持MinGW。
- MinGW是一个为Windows提供GNU编译器的项目，专注于编译Windows应用程序。
- MSYS2是MSYS的现代化版本，结合了MSYS和MinGW的优点，提供了更强大的功能和更好的用户体验。

这三者之间的关系可以看作是一个演变过程，MSYS2是对MSYS和MinGW的整合与扩展，旨在为Windows开发者提供一个更完整的开发环境。

## vscode中使用CMake

在vscode中使用cmake，直接安装extenstion：cmake tools，就会打包安装所有cmake相关的工具

### CMake内置命令

(1) 项目和版本相关命令

<b>cmake_minimum_required</b>

设置项目所需的最低 CMake 版本

```cmake
cmake_minimum_required(VERSION 3.10)
```

<b>project</b>

定义项目名称和支持的语言

```cmake
project(MyProject
    VERSION 1.0
    LANGUAGES CXX C  
)
```

(2) 目标创建命令

<b>add_executable</b>

创建可执行文件目标

```cmake
add_executable(app main.cpp utils.cpp)
```

<b>add_library</b>

创建库目标

```cmake
# 静态库
add_library(mylib STATIC source1.cpp source2.cpp)  
# 动态库
add_library(mylib SHARED source1.cpp source2.cpp)  
# 模块库
add_library(mylib MODULE source1.cpp source2.cpp)
```

<b>add_custom_target</b>

创建自定义目标

```cmake
add_custom_target(docs
    COMMAND doxygen Doxyfile  
)
```

(3) 目标配置命令

<b>target_link_libraries</b>

为目标链接库

```cmake
target_link_libraries(app
    PRIVATE mylib
    PUBLIC otherlib  
)
```

<b>target_include_directories</b>

设置目标的头文件包含路径

```cmake
target_include_directories(app
    PRIVATE ${CMAKE_CURRENT_SOURCE_DIR}/include
    PUBLIC /usr/local/include  
)
```

<b>target_compile_definitions</b>

为目标添加编译宏定义

```cmake
target_compile_definitions(app
    PRIVATE DEBUG_MODE
    PUBLIC USING_LIBRARY  
)
```

<b>target_compile_options</b>

设置编译选项

```cmake
target_compile_options(app
    PRIVATE -Wall -Wextra
    PUBLIC -O2  
)
```

(4) 条件和控制流命令

<b>if/elseif/else/endif</b>

条件判断

```cmake
if(UNIX)
    # Unix 系统特定配置  
elseif(WIN32)
    # Windows 系统特定配置  
else()
    # 其他系统  
endif()
```

<b>option</b>

定义可选编译选项

```cmake
option(USE_OPENGL "Enable OpenGL support" ON)  

if(USE_OPENGL)
    find_package(OpenGL REQUIRED)  
endif()
```

(5) 变量和路径相关命令

<b>set</b>

设置变量

```cmake
# 普通变量
set(SOURCES main.cpp utils.cpp)  
# 缓存变量
set(MY_VAR "value" CACHE STRING "Description")  
# 环境变量
set(ENV{PATH} "$ENV{PATH}:/new/path")
```

<b>list</b>

列表操作

```cmake
# 追加元素
list(APPEND SOURCES extra.cpp)  
# 删除元素
list(REMOVE_ITEM SOURCES extra.cpp)  
# 排序
list(SORT SOURCES)
```

(6) 查找和依赖命令

<b>find_package</b>

查找外部依赖库

```cmake
find_package(OpenCV REQUIRED)  
find_package(Boost COMPONENTS system filesystem)
```

<b>find_path</b>

查找头文件路径

```cmake
find_path(HEADER_DIR "myheader.h"
    PATHS /usr/include /usr/local/include  
)
```

<b>find_library</b>

查找库文件

```cmake
find_library(MATH_LIB m
    PATHS /usr/lib /usr/local/lib  
)
```

(7) 安装和导出命令

<b>install</b>

定义安装规则

```cmake
# 安装可执行文件
install(TARGETS app
    RUNTIME DESTINATION bin  
) 
 
# 安装头文件
install(FILES header.h
    DESTINATION include  
)
```

# 
(8) 其他实用命令

<b>message</b>

输出消息

```cmake
message(STATUS "Configuring project")  
message(WARNING "This is a warning")  
message(FATAL_ERROR "Compilation cannot continue")
```

<b>include</b>

包含其他 CMake 脚本

```cmake
include(CMakePrintHelpers)  
include(GNUInstallDirs)
```

(9) 高级命令

<b>macro/function</b>

定义可重用的 CMake 代码块

```cmake
# 函数
function(my_function ARG1 ARG2)
    message(STATUS "Function called with ${ARG1} and ${ARG2}")  
endfunction()  

# 宏
macro(my_macro ARG1)
    message(STATUS "Macro called with ${ARG1}")  
endmacro()
```

(10) 综合示例

```css
MyProject/  
├── CMakeLists.txt  
├── main.cpp  
├── utils.cpp  
├── source1.cpp  
├── source2.cpp  
├── header.h  
└── Doxyfile  # 如果你使用 Doxygen 文档生成
```

```cmake
# (1) 项目和版本相关命令  
cmake_minimum_required(VERSION 3.10)  # 设置所需的最低 CMake 版本  
project(MyProject VERSION 1.0 LANGUAGES CXX C)  # 定义项目名称和支持的语言  

# (2) 目标创建命令  
add_executable(app main.cpp utils.cpp)  # 创建可执行文件目标  
add_library(mylib STATIC source1.cpp source2.cpp)  # 创建静态库目标  

# (3) 目标配置命令  
target_link_libraries(app PRIVATE mylib)  # 为目标链接库  
target_include_directories(app PRIVATE ${CMAKE_CURRENT_SOURCE_DIR}/include)  # 设置头文件包含路径  
target_compile_definitions(app PRIVATE DEBUG_MODE)  # 添加编译宏定义  
target_compile_options(app PRIVATE -Wall -Wextra)  # 设置编译选项  

# (4) 条件和控制流命令  
if(UNIX)  
    message(STATUS "Configuring for Unix")  
elseif(WIN32)  
    message(STATUS "Configuring for Windows")  
else()  
    message(STATUS "Configuring for other systems")  
endif()  

# 可选编译选项  
option(USE_OPENGL "Enable OpenGL support" ON)  
if(USE_OPENGL)  
    find_package(OpenGL REQUIRED)  # 查找 OpenGL 库  
    target_link_libraries(app PRIVATE OpenGL::GL)  # 链接 OpenGL  
endif()  

# (5) 变量和路径相关命令  
set(SOURCES main.cpp utils.cpp)  # 设置源文件列表  
list(APPEND SOURCES extra.cpp)  # 追加额外的源文件  
message(STATUS "Sources: ${SOURCES}")  # 输出源文件列表  

# (6) 查找和依赖命令  
find_package(Boost COMPONENTS system filesystem REQUIRED)  # 查找 Boost 库  
find_path(HEADER_DIR "myheader.h" PATHS /usr/include /usr/local/include)  # 查找头文件路径  
find_library(MATH_LIB m PATHS /usr/lib /usr/local/lib)  # 查找库文件  

# (7) 安装和导出命令  
install(TARGETS app RUNTIME DESTINATION bin)  # 安装可执行文件  
install(TARGETS mylib DESTINATION lib)  # 安装库文件  
install(FILES header.h DESTINATION include)  # 安装头文件  

# (8) 其他实用命令  
message(STATUS "Configuring project: ${PROJECT_NAME} v${PROJECT_VERSION}")  # 输出项目配置消息  
include(CMakePrintHelpers)  # 包含其他 CMake 脚本  

# (9) 高级命令  
function(my_function ARG1 ARG2)  # 定义函数  
    message(STATUS "Function called with ${ARG1} and ${ARG2}")  
endfunction()  

macro(my_macro ARG1)  # 定义宏  
    message(STATUS "Macro called with ${ARG1}")  
endmacro()  

# 调用函数和宏  
my_function("Hello" "World")  
my_macro("Test")
```

### cmake内置命令

以下是 CMake 中最常用和重要的内置变量详细解析：

(1) 路径相关变量

<b>项目路径</b>

```cmake
CMAKE_SOURCE_DIR       # 顶层源代码目录（顶层 CMakeLists.txt 所在目录）  
CMAKE_CURRENT_SOURCE_DIR  # 当前处理的 CMakeLists.txt 所在目录  
CMAKE_BINARY_DIR       # 顶层构建目录  
CMAKE_CURRENT_BINARY_DIR  # 当前构建目录
```

示例:

```cmake
message(STATUS "项目根目录: ${CMAKE_SOURCE_DIR}")  
message(STATUS "当前源码目录: ${CMAKE_CURRENT_SOURCE_DIR}")
```

(2) 系统和编译器相关变量

<b>系统识别</b>

```cmake
CMAKE_SYSTEM_NAME          # 操作系统名称（Linux, Windows, Darwin）  
CMAKE_SYSTEM_VERSION       # 操作系统版本  
CMAKE_SYSTEM_PROCESSOR     # 处理器架构  

# 平台判断
WIN32                  # Windows 平台  
UNIX                   # Unix 类系统  
APPLE                  # macOS 系统  
LINUX                  # Linux 系统
```

<b>编译器相关</b>

```cmake
CMAKE_CXX_COMPILER         # C++ 编译器路径  
CMAKE_C_COMPILER           # C 编译器路径  
CMAKE_COMPILER_IS_GNUCXX   # 是否为 GCC 编译器  
MSVC                       # 是否为 MSVC 编译器  

#编译器版本
CMAKE_CXX_COMPILER_VERSION  # C++ 编译器版本
```

示例:

```cmake
if(WIN32)
    message(STATUS "当前系统: Windows")  
elseif(UNIX)
    message(STATUS "当前系统: Unix-like")  
endif()  

message(STATUS "编译器: ${CMAKE_CXX_COMPILER}")  
message(STATUS "编译器版本: ${CMAKE_CXX_COMPILER_VERSION}")
```

(3) 构建类型相关变量

```cmake
CMAKE_BUILD_TYPE           # 构建类型（Debug, Release, RelWithDebInfo, MinSizeRel）  
CMAKE_CONFIGURATION_TYPES  # 多配置生成器的可用配置类型  

# 编译选项和标志
CMAKE_CXX_FLAGS        # C++ 全局编译选项  
CMAKE_CXX_FLAGS_DEBUG  # Debug 模式下的编译选项  
CMAKE_CXX_FLAGS_RELEASE  # Release 模式下的编译选项
```

示例:

```cmake
# 设置默认构建类型
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE "Release" CACHE STRING "Build type" FORCE)  
endif()  

# 添加编译选项
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall -Wextra")
```

# 
(4) 安装和导出相关变量

```cmake
CMAKE_INSTALL_PREFIX      # 安装根目录（默认 /usr/local）  
CMAKE_INSTALL_LIBDIR      # 库文件安装目录  
CMAKE_INSTALL_BINDIR      # 可执行文件安装目录  
CMAKE_INSTALL_INCLUDEDIR  # 头文件安装目录
```

示例:

```cmake
# 自定义安装前缀
set(CMAKE_INSTALL_PREFIX "/opt/myapp" CACHE PATH "Installation prefix")  

# 安装目标
install(TARGETS myapp
    RUNTIME DESTINATION ${CMAKE_INSTALL_BINDIR}  
    LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR}
    ARCHIVE DESTINATION ${CMAKE_INSTALL_LIBDIR}/static  
)
```

(5) 编译工具链相关

```cmake
CMAKE_TOOLCHAIN_FILE   # 工具链文件路径  
CMAKE_CROSSCOMPILING   # 是否交叉编译  
CMAKE_HOST_SYSTEM_NAME # 主机系统名称
```

示例:

```cmake
# 检查是否交叉编译
if(CMAKE_CROSSCOMPILING)
    message(STATUS "正在进行交叉编译")  
endif()
```

(6) 高级配置变量

```cmake
CMAKE_MODULE_PATH      # CMake 模块搜索路径  
CMAKE_PREFIX_PATH      # 依赖库搜索路径  

#标准设置
CMAKE_CXX_STANDARD     # C++ 标准版本  
CMAKE_CXX_STANDARD_REQUIRED  # 是否强制要求标准版本
```

示例:

```cmake
# 添加自定义模块路径
list(APPEND CMAKE_MODULE_PATH "${CMAKE_SOURCE_DIR}/cmake/modules")  

# 设置 C++ 标准
set(CMAKE_CXX_STANDARD 17)  
set(CMAKE_CXX_STANDARD_REQUIRED ON)
```

(7) 完整示例：综合使用内置变量

```cmake
cmake_minimum_required(VERSION 3.15)  
project(SystemInfoProject)  

# 系统信息
message(STATUS "操作系统: ${CMAKE_SYSTEM_NAME}")  
message(STATUS "系统版本: ${CMAKE_SYSTEM_VERSION}")  
message(STATUS "处理器架构: ${CMAKE_SYSTEM_PROCESSOR}")  

# 编译器信息
message(STATUS "编译器: ${CMAKE_CXX_COMPILER}")  
message(STATUS "编译器版本: ${CMAKE_CXX_COMPILER_VERSION}")  

# 构建类型配置
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE "Release" CACHE STRING "Build type" FORCE)  
endif()
  
message(STATUS "构建类型: ${CMAKE_BUILD_TYPE}")  

# 平台特定配置
if(WIN32)
    add_definitions(-DWINDOWS_PLATFORM)  
elseif(UNIX)
    add_definitions(-DUNIX_PLATFORM)  
endif()
  
# 编译选项
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall -Wextra")  
set(CMAKE_CXX_STANDARD 17)  
set(CMAKE_CXX_STANDARD_REQUIRED ON)  

# 安装配置
set(CMAKE_INSTALL_PREFIX "/opt/myapp" CACHE PATH "Installation prefix")  

# 添加可执行文件
add_executable(system_info main.cpp)  

# 安装目标
install(TARGETS system_info
    RUNTIME DESTINATION ${CMAKE_INSTALL_BINDIR}  
)
```

## vscode + clangd

clangd的代码提示和补全，非常地强大，这里记录一下 vscode如何配置clangd。

### Windows

windows平台，在vscode上安装clangd比较简单。

直接在extenstions里搜素clangd，然后install这个插件即可，安装好后，重新打开窗口检查是否安装成功。clangd.exe存储在如下目录：

```bash
clangd path: C:/Users/ventu/AppData/Roaming/Code/User/globalStorage
/llvm-vs-code-extensions.vscode-clangd/install/18.1.3/clangd_18.1.3/bin/clangd.exe
```

### mac

### Ubuntu

(1) vscode 安装插件 clangd

<img src="/assets/VS4HbaU1voJ6HXxhgkFckdmlnbe.png" src-width="555" src-height="278"/>

(2) 然后`Ctrl + shift + p` reload window，一般这个时候会弹出install clangd的窗口，install即可。如果弹出的窗口显示fail，可以试着关闭代理reload window后再次尝试。

(3) 如果isntall失败，那么我们手动install，[https://clangd.llvm.org/installation.html](https://clangd.llvm.org/installation.html)

<img src="/assets/GYNBbxCbroIw8pxCeLUcZmXvnjh.png" src-width="753" src-height="310"/>

由于我们是ubuntu，所以安装clangd-linux-18.1.3.zip

<img src="/assets/OLeXbY4XBoNZzzxyQDEcL8sGnHc.png" src-width="1251" src-height="678"/>

安装好后，得到一个压缩包，我们解压后，将clangd_18.1.3放入对应install目录下

```bash
"clangd.path": "/home/xxxx/.vscode-server/data/User/globalStorage
/llvm-vs-code-extensions.vscode-clangd/install/18.1.3/clangd_18.1.3/bin/clangd",
```

vscode下，`ctrl + ,` 打开settings界面，然后输入proxy，打开settings.json (注意一定要选择正确的主机)，最后设置clangd.path。

<img src="/assets/GdADbqDrLoY9sOxzyFqcqHZEnWe.png" src-width="1880" src-height="887"/>

(4) 检查是否安装成功，vscode打开panel，然后输入clangd，check for language server update，如果已经安装会显示安装的版本。然后download language server，会提示发现installed clangd，直接set default，最后restart language server，reload window。到此，vscode上配置clangd完成。

<img src="/assets/U0vjbJnXaoqWMGxXEyZcFi4ynOb.png" src-width="1136" src-height="426"/>

