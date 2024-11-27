---
title: 方案：飞书 + feishu-pages + mdbook
slug: 方案-飞书-feishu-pages-mdbook
sidebar_position: 0
hide: false
---


# 方案：飞书 + feishu-pages + mdbook

# 飞书编写文档

飞书支持的内容非常强大，但是飞书导出的markdown，会丧失一部分功能，所以这里为了兼容mdbook渲染后的体验，对飞书内部文档的编写要做出一定的规范要求。

规范要求主要是取决于文档 [飞书文档转化markdown测试](/博客/飞书文档转化markdown测试)

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

为了之后的正常部署，我们自己调整一下目录结构，将src文件夹删除，然后book.toml的src = "."，为什么要这样做，之后详细解释。

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
2. <u>mdbook-katex</u>: <b>弃用</b>，mardown公式的渲染，官方好像没有集成，使用这个插件
3. <u>mdBook-pagetoc</u>：<b>弃用</b>，生成右侧文章目录，会影响很多其他的内容
4. <u>mdbook-toc</u>：<b>弃用</b>，也是生成文章目录，但是不美观

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

## 上传到github仓库

(1) 将`cswiki/feishu-book/dist/docs`的所有内容，拷贝的md-book目录下，拷贝之后打开cmd，执行`mdbook serve --open` 本地检查是否渲染成功，如果是自己想要的页面，那么就执行`mdbook build` 生成最后需要部署的页面

(2) 将md-book目录下的内容上传到main分支

(3) 将md-book/book目录下的内容上传到gh-pages分支

# Github Pages

如果要部署到github pages，其实不需要什么github actions，因为github actions，每次要重装mdbook和相关插件很消耗资源，所以我们直接将mdbook的book目录下的所有内容上传到仓库就行了

(1) 创建远程仓库，username.github.io，注意一定要取名这个，后面会解释为什么

(2) 远程仓库，settings里设置github pages选型为，deploy from branch，然后选择gh-pages分支

(3) 有新内容push到gh-pages分支后，应该会自动触发github action，部署网站

# 更新网站

一般记录是在飞书的知识库下，那么我们要更新到网站的话只需要执行如下步骤

首先所有的操作都发生在`C:/Users/ventu/Desktop/tmp/cswiki`目录下

(1) 准备好markdown文件

```bash
cd feishu-book
yarn feishu-pages        # 生成dist目录，里面存放的是飞书知识库导出的所有markdown文件和资源
```

(2) copy `C:/Users/ventu/Desktop/tmp/cswiki/feishu-book/dist/docs`所有文件到mdbook项目的根目录下，选择全部替换

(3) 查看网页渲染效果，没有问题就build

```bash
# md-book目录下
mdbook serve --open
mdbook build
```

(4) 上传到github仓库

```bash
md-book根目录，git push到main分支，这样之后可以在github上查看这些markdown文件
book目录，git push到gh-pages分支，将这些渲染后的pages文件上传到网站上
```

# 问题

## 为什么远程仓库取名username.github.io

因为我这边的markdown的资源引用都是使用的绝对路径（例如 <em>base-url/assets/xxx.jpg</em>）

base-url会拼接在请求的url里，site-url会拼接在存储的url里。

为了正确加载资源，我们必须保证，资源的存储url和请求url相等，才能正确访问资源。因为存储和请求的话，都是使用一样的prefix和path。<b>所以简单来讲，我们只需要让site-url和base-url一致就可以正确加载</b>

### 部署情况

prefix为域名

如果创建的仓库名是别的，例如blog，

那么site-url是/blog，存储url是username.github.io/blog/path；base-url默认是/，请求url是username.github.io/path，所以此时网站上请求资源就会失败。

解决方法有两种

要么改变site-url，要么改变base-url，这里选择改变site-url为/

(1) 仓库名使用username.github.io，这样site-url就是/

(2) 使用自定义的一级域名，site-url此时是/

## 为什么markdown文件放在mdbook项目的根目录下，而不是放在src目录下

按照上个问题的的解决方案，我们已经可以在自己的网站上正确加载markdown中的资源引用，但是在github上查看还是不行。

其实这个问题也是和上面的问题类似，<b>为了正确加载资源，我们必须保证site-url和base-url一致。</b>

### 非部署情况

如果在github查看或者本地查看，那么prefix为项目根目录

如果markdown文件存放在src目录下，那么存储url是root/src/path，此时site-url是/src，请求url是root/path，base-url是/，所以加载资源失败。

解决方法：

site-url改成/

将markdown文件存放在mdbook项目根目录下，这样子site-url和base-url就都是/，此时请求url和存储url都是root/path

