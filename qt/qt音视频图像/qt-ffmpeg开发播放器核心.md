---
title: 案例：QT + FFmpeg开发播放器核心
slug: qt-ffmpeg开发播放器核心
sidebar_position: 0
hide: false
---


# 案例：QT + FFmpeg开发播放器核心

## 搭建环境

该案例需要用到FFmpeg和x264这两个库，所以我们首先要创建一个QT工程，然后为了能正确链接FFmpeg和x264库，并且在开发中使用这些库提供的API。

QT工程中，要使用这两个库，需要去编辑配置文件，这里使用qmake去组织项目，所以就是要编辑.pro文件如果不熟悉.pro文件的编写语法，请参考之前的QT基础开发中的.pro相关文章。

要在项目中加载这些库，我们首先在项目中创建3rdparty文件夹，这里专门用来存放项目中使用的第三方库。

### Win32

我们这里假设已经拿到了FFmpeg和x264的静态库文件，动态库文件，头文件。

(1) 在3rdparty中，创建win文件夹，存放win平台下，所有要使用的第三方库

(2) win文件中，创建子文件夹 libFFmpeg和libx264，因为我们要使用这两个库

(3) libxxx文件夹下存放所有关于该库的内容，一般有头文件，静态库文件，动态库文件

3rdpatry的目录结构：

```bash
3rdparty
+---mac
|   +---libFFmpeg
|   |   +---include
|   |   |   +---libavcodec
|   |   |   +---libavdevice
|   |   |   +---libavfilter
|   |   |   +---libavformat
|   |   |   +---libavutil
|   |   |   +---libpostproc
|   |   |   +---libswresample
|   |   |   \---libswscale
|   |   \---lib
|   |       \---pkgconfig
|   \---libx264
|       \---lib
\---win
    +---libFFmpeg
    |   +---bin
    |   +---include
    |   |   +---libavcodec
    |   |   +---libavdevice
    |   |   +---libavfilter
    |   |   +---libavformat
    |   |   +---libavutil
    |   |   +---libpostproc
    |   |   +---libswresample
    |   |   \---libswscale
    |   \---lib
    \---libx264
        \---lib
```

在工程目录中添加了ffmpeg和x264库，现在需要编辑pro文件，来去链接这些库，包含这些库的头文件，主要是使用`INLCUDEPATH +=`添加头文件，`LIBS+=`添加静态库文件，动态库文件我们需要自己拷贝到最终的可执行文件夹的同级目录下，这一步很关键

```cmake
QT       += core gui

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets multimedia

TARGET = JCMPlayer
TEMPLATE = app

macx {
}

win32 {
DEFINES += JCMPLAYER_WINDOWS

INCLUDEPATH += $$PWD/3rdparty/win/libFFmpeg/include
LIBS +=   $$PWD/3rdparty/win/libFFmpeg/lib/libavformat.dll.a \
          $$PWD/3rdparty/win/libFFmpeg/lib/libavcodec.dll.a \
          $$PWD/3rdparty/win/libFFmpeg/lib/libavutil.dll.a \
          $$PWD/3rdparty/win/libFFmpeg/lib/libswresample.dll.a \
          $$PWD/3rdparty/win/libFFmpeg/lib/libswscale.dll.a \
          $$PWD/3rdparty/win/libFFmpeg/lib/libpostproc.dll.a \
          $$PWD/3rdparty/win/libFFmpeg/lib/libavfilter.dll.a

LIBS += -lOpengl32
}

SOURCES += 

HEADERS += 

FORMS += 

RESOURCES +=
```

添加好后在QT工程中，引入头文件并使用；build没有报错证明头文件和静态库都找到了，但要注意动态库是运行时加载，所以build之后我们还要去run程序，检测动态库文件是否找到，如果run没问题，那么此时win环境搭建完毕，之后就可以愉快开发了。

### Mac

### Linux

