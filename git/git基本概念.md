---
title: git基本概念
slug: git基本概念
sidebar_position: 6
hide: false
---


# git基本概念

# git索引和暂存区

git索引和暂存区是同一个概念的不同称呼，在 Git中，索引（Index）或暂存区（Staging Area）是一个中间区域，用于在提交之前准备和组织更改。以下是对索引/暂存区的详细解释：

<b>作用</b>

索引或暂存区是一个临时区域，用于保存即将提交到版本库的更改。它允许您选择性地添加文件或文件的部分更改，以便在提交时只包含您想要的内容。

<b>工作流程</b>

(1) <b>工作目录</b>：您在工作目录中进行更改（编辑、添加或删除文件）。

(2) <b>添加到暂存区</b>：使用 `git add` 命令将更改添加到暂存区。这些更改现在被标记为准备提交。

(3) <b>提交更改</b>：使用 `git commit` 命令将暂存区中的更改提交到本地仓库。提交后，暂存区会被清空。

<b>命令</b>

- `git add <file>`：将文件的更改添加到暂存区。
- `git status`：查看哪些更改在暂存区中，哪些在工作目录中。
- `git reset <file>`：从暂存区中移除文件的更改，但保留在工作目录中。

