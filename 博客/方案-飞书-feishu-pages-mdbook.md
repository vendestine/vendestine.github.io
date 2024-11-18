---
title: 方案：飞书 + feishu-pages + mdbook
slug: 方案-飞书-feishu-pages-mdbook
sidebar_position: 0
hide: false
---


# 方案：飞书 + feishu-pages + mdbook

# 飞书编写文档

飞书支持的内容非常强大，但是飞书导出的markdown，会丧失一部分功能，所以这里为了兼容mdbook渲染后的体验，对飞书内部文档的编写要做出一定的规范要求。

规范要求主要是取决于文档 [飞书文档转化markdown测试](/博客\飞书文档转化markdown测试)

## 添加yaml header

首先为了保证导出的markdown的文件名是nested url风格，我们需要在每个文档的前面手动编写yaml header也就是我们熟知的page meta

> 注意 slug的值，千万不能设置一些特殊的字符，否则url会不合法而失效，访问不到对应的markdown，这里推荐只是用字母，数字，下划线_，连字符-，就行了，绝对不会出错

例如本文我们可以这样设置yaml header

```yaml
slug: 方案-飞书-feishu-pages-mdbook
hide: false
```

# Feishu-pages

feishu-pages是一个第三方库，这里简单的介绍一下如何使用

## 配置环境

安装node，npm，yarn

## 使用

由于feishu-pages会持续更新，所以我们要以官方最新的使用教程为主：https://github.com/longbridgeapp/feishu-pages

官方的教程没有图片，所以有的时候会不太清楚，这里也给出另一个大佬的教程：https://github.com/ftyszyx/feishu-vitepress

(1) 新建存放feishu-pages的目录，可以取名例如 feishu-book

(2) feishu-book目录下

```bash
yarn init -y             # 生成一个yarn项目
yarn add feishu-pages    # 安装feishu-pages

# 从node-modules中将feishu-docx和feishu-pages拷贝到feishu-book目录下
# 拷贝feishu-book的env.default文件到feishu-book目录下，并重命名为.env
# .env文件编辑好自己的飞书相关内容后保存

yarn feishu-pages        # 生成dist目录，里面存放的是飞书知识库导出的所有markdown文件和资源
```

<img src="/assets/GBXGb8SQToU4oxxImCecalaYnMg.png" src-width="739" src-height="350"/>

# mdbook

## 安装

mdbook的使用，推荐直接看官方教程https://github.com/rust-lang/mdBook

## 创建项目

(1) 新建一个mdbook项目

```bash
mdbook init md-book
cd md-book
mdbook serve --open
```

md-book目录结构

<img src="/assets/BIGDbJIbCo2bWbxZf1aclnconjf.png" src-width="679" src-height="256"/>

其中src为markdown文件存放的目录，book为渲染后的页面存放的目录

为了之后的正常部署，我们自己调整一下目录结构，将src文件夹删除，然后book.toml的src = "."

<img src="/assets/CwdJbk4NPosf0ux6hoJcqNB1nad.png" src-width="647" src-height="155"/>

(2) md-book和book目录下，初始化git仓库，然后添加remote。mdbook分两个部分上传到远程仓库，

- mdbook根目录下，上传到远程仓库的main分支，用来方便github直接查看markdown文件
- mdbook book目录下，上传到远程仓库的gh-pages分支，用来部署网站

```bash
# md-book下
git init
git remote add origin https://github.com/vendestine/vendestine.github.io.git

# book目录下
git init
git remote add origin https://github.com/vendestine/vendestine.github.io.git

# 查看是否添加远程仓库成功
git remote -vv
```

## 编写book.toml，安装第三方插件

官方推荐的插件列表：https://github.com/rust-lang/mdBook/wiki/Third-party-plugins

个人认为必要的插件列表

1. <u>mdbook-yml-header</u>：由于我们的飞书文档前面加了yaml header，所以这里一定要使用第三方插件
2. <u>mdbook-katex</u>:mardown公式的渲染，官方好像没有集成，使用这个插件
3. <u>mdBook-pagetoc</u>：弃用，生成右侧文章目录，会影响很多其他的内容
4. <u>mdbook-toc</u>：弃用，也是生成文章目录，但是不美观

这里提出我的book.toml文件，主要是参考官方的用法

```bash
[book]
authors = ["vendestine"]
language = "en"
multilingual = false
src = "."
title = "md-book"

[rust]
edition = "2018"

[output.html]
smart-punctuation = true
mathjax-support = true
git-repository-url = "https://github.com/vendestine/vendestine.github.io/tree/main"
edit-url-template = "https://github.com/vendestine/vendestine.github.io/tree/main/{path}"

[output.html.playground]
editable = true
line-numbers = true

[output.html.code.hidelines]
python = "~"

[output.html.search]
limit-results = 20
use-boolean-and = true
boost-title = 2
boost-hierarchy = 2
boost-paragraph = 1
expand = true
heading-split-level = 2

[output.html.fold]
enable = true

[preprocessor.yml-header]
```

## 准备上传到仓库

(1) 将`cswiki\feishu-book\dist\docs`的所有内容，拷贝的mdbook的src目录里，拷贝之后打开cmd，执行`mdbook serve --open` 本地检查是否渲染成功，如果是自己想要的页面，那么就执行`mdbook build` 生成最后需要部署的页面

# Github Pages

如果要部署到github pages，其实不需要什么github actions，因为github actions，每次要重装mdbook和相关插件很消耗资源，所以我们直接将mdbook的book目录下的所有内容上传到仓库就行了

(1) 创建远程仓库，username.github.io，注意一定要取名这个，后面会解释为什么

(2) 本地新建一个仓库，用来上传网站内容到远程仓库

(3) 将mdbook book目录下的内容，全部拷贝到本地仓库里，然后push到远程仓库的gh-pages分支

(4) 远程仓库，settings里设置github pages选型为，deploy from branch，然后选择gh-pages分支

(5) 此时应该会自动出发 github action，部署网站

## 为什么取名username.github.io

因为markdown的图片引用都是使用的相对路径，根目录是你选用的域名。但是如果你创建的仓库名是别的，例如blog，那么主站的url是username.github.io/blog，实际图片是存储在主站url下，但markdown内部加载图片的请求是在根目录下，所以网站上请求图片就会失败

解决方法有两种，主要就是确保根目录和主站url相同

(1) 直接使用username.github.io，这样就可以保证根目录和主站url都是username.github.io

(2) 使用自定义的一级域名，如果我们使用自己的一级域名，那么也可以保证根目录和主站url都是域名，自然也就相同

