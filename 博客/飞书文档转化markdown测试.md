---
title: 飞书文档转化markdown测试
slug: 飞书文档转化markdown测试
sidebar_position: 1
hide: false
---


# 飞书文档转化markdown测试

本文用于演示当前 [feishu-docx](https://github.com/longbridgeapp/feishu-pages/tree/main/feishu-docx) 导出后能完美支持的格式，在下面列出的均可以有较好的支持。

由于 Feishu OpenAPI 数据给出有限，feishu-docx 导出并不能 100% 还原在飞书文档里面的格式，实际可以达到 99% 的效果。

参考：[新版文档 OpenAPI 操作 Block 能力边界](https://open.feishu.cn/document/server-docs/docs/docs/docx-v1/guide)

<b>已知不支持格式：</b>

- 多维表格 - 飞书多维表格（电子表格）是独立的数据，且数据格式庞大复杂，暂时不支持，请编写文档的时候使用<b>普通表格</b>。
- 流程图 / UML 图 / 画板 / 思维导图 - 以上几种为飞书文档的子应用功能，目前对接的飞书文档未给出此类数据或图片，所以无法实现。
    - 兼容方式：[流程图、思维导图](UH2mwGrOiiYlw8kZ3M3cg1g5nSh) 

- 图片尺寸、裁剪 - 图片将以原图的方式输出，由于飞书 OpenAPI 未给出图片的裁剪和缩放尺寸信息，所以导出内容不含宽度、高度，这项可以依据最终页面的设定图片 100% 宽度来实现。
- 公式 - 暂未支持，这个后面可能会支持。
- 其他飞书三方组件 - 这个无法支持，API 未提供数据。
- 文字颜色 - 文字的前景色、背景色，考虑到 Markdown 输出，暂时未做支持。

基于以上，建议在飞书侧编写文档的时候，尽量采用支持的格式，目前已经支持的格式能满足文档撰写（如帮助文档、博客）等场景的文档格式需要。

# 下面是完整格式演示

## This is heading 2

### This is heading 3

#### This is heading 4

##### This is heading 5

###### This is heading 6

> This is a block quote.
> With a new line.

## Paragraph

导出飞书知识库，并按相同目录结构生成 [Static Page Generator](https://www.google.com/search?q=Static+Page+Generator) 支持 `Markdown` 文件组织方式，用于发布为<b>静态网站</b>。

Generate <b>Feishu Wiki</b> into a Markdown for work with Static Page Generators.

## Callout

<div class="callout callout-bg-1 callout-border-1 callout-color-1">
<div class='callout-emoji'>❤️</div>
<p>Red Callout</p>
<p>And a <a href="https://github.com/longbridgeapp/feishu-pages">Link</a> and <b>Bold</b> in the Callout.</p>
</div>

<div class="callout callout-bg-2 callout-border-2 callout-color-2">
<div class='callout-emoji'>💡</div>
<p>Orange Callout</p>
</div>

<div class="callout callout-bg-3 callout-border-3 callout-color-3">
<div class='callout-emoji'>🤖</div>
<p>Yellow Callout</p>
</div>

<div class="callout callout-bg-4 callout-border-4 callout-color-4">
<div class='callout-emoji'>✅</div>
<p>Green Callout</p>
</div>

<div class="callout callout-bg-5 callout-border-5 callout-color-5">
<div class='callout-emoji'>🐳</div>
<p>Blue Callout</p>
</div>

<div class="callout callout-bg-6 callout-border-6 callout-color-6">
<div class='callout-emoji'>🐳</div>
<p>Purple Callout</p>
</div>

<div class="callout callout-bg-14 callout-border-7 callout-color-7">
<div class='callout-emoji'>🐼</div>
<p>Gray Callout</p>
</div>

## Grid

Here is a 3 column grid example:

<div class="flex gap-3 columns-3" column-size="3">
<div class="w-[17%]" width-ratio="17">
<img src="/assets/A28qbYMxCoFdFgxz3Cnc6Rrbnod.jpeg" src-width="440" src-height="440" align="center"/>
</div>
<div class="w-[52%]" width-ratio="52">
<img src="/assets/KIQSbfhsLosav1xWlp2clrgKnJh.png" src-width="440" src-height="440" align="center"/>
</div>
<div class="w-[29%]" width-ratio="29">
<img src="/assets/CtfUbGNqjolWnOxWZg2cIdqSnhb.jpeg" src-width="440" src-height="440" align="center"/>
</div>
</div>

<div class="flex gap-3 columns-2" column-size="2">
<div class="w-[70%]" width-ratio="70">
<blockquote>
<p>BlockQuote in Grid Line 1<br/>This is line 2</p>
</blockquote>
</div>
<div class="w-[30%]" width-ratio="30">
<ul>
<li><p>List Item in Grid</p>
<ul>
<li>This is level 1.1</li>
</ul>
</li>
<li><p>Level 2</p>
<ol>
<li>Level 2.1 as Ordered</li>
<li>Level 2.2</li>
</ol>
</li>
</ul>
</div>
</div>

## Bullet List

- Projects
    - GitHub
    - Twitter
        - x.com
    - Facebook 

- OpenSource
    - feishu-pages
    - feishu-docx

## Ordered List

1. This is 1 item
    1. This is a item
        1. This is i 
    2. This is b
    3. This c

2. This is 2 item
    1. This is 2.1
    2. This is 2.2

## CodeBlock

A JSON example:

```json
{
  "name": "feishu-pages",
}
```

A TypeScript example:

```ts
const name = "feishu-pages";
```

## TODO

- [x] This item is completed

- [ ] This is imcomplete

## Divider

There is a divider

To split contents.

## Image

An example of an image with caption.

<img src="/assets/ULOSbLiCrop4JxxCI6scEvxInve.png" src-width="1280" src-height="720" align="center"/>

## File

[test-file.zip](/assets/SlQbbWIjlooG1TxbWu3cAWQ7nRe.zip)

## Table

Currently, feishu-docx only supports pure Table.

<table header_column="1" header_row="1">
<colgroup>
<col width="180"/>
<col width="222"/>
<col width="418"/>
</colgroup>
<thead>
<tr><th><p>Name</p></th><th><p>Type</p></th><th><p>Website</p></th></tr>
</thead>
<tbody>
<tr><td colspan="3"><p>This is merge row.</p></td></tr>
<tr><td><p>GitHub</p></td><td><p>Programming</p></td><td><p><a href="https://github.com">https://github.com</a></p></td></tr>
<tr><td rowspan="2"><p>Twitter</p></td><td rowspan="2"><p>Social Network</p></td><td><p><a href="https://x.com">https://x.com</a></p></td></tr>
<tr><td><p><a href="https://twitter.com">https://twitter.com</a></p></td></tr>
<tr><td><p>Dribbble</p></td><td><p>Design</p></td><td><p><a href="https://dribbble.com">https://dribbble.com</a></p></td></tr>
</tbody>
</table>

## Equation

$$E = mc^2$$

## Iframe

<iframe src="https://www.ixigua.com/7299339232005325364?logTag=ba0d2e6368561e74ff60"/>

## Artboard

<img src="/assets/E3ziw5JbDhtOfYb2CEwcQ2NMnBh-board.png"/>

