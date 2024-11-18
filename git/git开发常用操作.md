---
title: git开发常用操作
slug: git开发常用操作
sidebar_position: 1
hide: false
---


# git开发常用操作

# 本地在dev分支，做了一些修改，现在想要切换到本地的master分支

在切换到 `master` 分支之前，确保你不会丢失在 `dev` 分支上所做的更改。以下是几种安全切换分支的方法：

## 提交更改

如果你已经完成了在 `dev` 分支上的更改，并且希望保留这些更改，可以将它们提交到 `dev` 分支：

```bash
git add .  
git commit -m "Save changes before switching to master"
```

然后，你可以安全地切换到 `master` 分支：

```bash
git checkout master
```

## 暂存更改（Stash）

如果你不想立即提交更改，可以使用 `git stash` 将更改暂存起来：

```bash
git stash
```

这会将你的更改保存到一个临时存储区，并恢复工作目录到干净状态。然后，你可以切换到 `master` 分支：

```bash
git checkout master
```

当你准备好恢复 `dev` 分支上的更改时，可以使用：

```bash
git checkout dev  
git stash pop
```

这会将暂存的更改应用到 `dev` 分支上。

## 创建一个新的分支

如果你想保留当前的更改，但又不想提交到 `dev` 分支，可以创建一个新的分支：

```bash
git checkout -b temp-branch
```

这会创建一个名为 `temp-branch` 的新分支，并切换到该分支。你可以在这个新分支上继续工作，或者稍后再将更改合并回 `dev` 分支。

总结:

- <b>提交更改</b>：适用于你已经完成的工作。
- <b>暂存更改</b>：适用于你想暂时保存更改但不想提交的情况。
- <b>创建新分支</b>：适用于你想保留更改并继续工作的情况。

选择最适合你当前需求的方法，确保在切换分支之前不会丢失任何重要的更改。

 

# 本地dev分支合并到master分支，想以master分支为主，简单方法

如果你希望在将 `dev` 分支合并到 `master` 分支时以 `master` 分支的内容为主，可以使用 `-X ours` 选项。这样，Git 会在合并时自动选择 `master` 分支的内容，忽略 `dev` 分支的冲突部分。

简化操作步骤

## 切换到 `master` 分支：

```bash
git checkout master
```

## 合并 `dev` 分支并自动选择 `master` 的更改：

```bash
git merge -X ours dev
```

注意事项：

- 使用 `-X ours` 选项时，Git 会自动解决冲突，所有冲突的文件将以 `master` 分支的内容为主。
- 在合并完成后，建议检查合并结果，确保所有更改都符合预期。

总结：

通过使用 -X ours 选项，你可以快速合并 dev 分支到 master 分支，并自动选择 master 的更改，避免手动解决冲突的步骤。这是处理合并冲突时的一种简便方法。

# 本地dev分支合并到master分支，想以dev分支为主，简单方法

如果你希望在合并 dev 分支到 master 分支时自动选择 dev 分支的更改，可以使用 -X theirs 选项来简化操作。这样，Git 会在合并时自动选择 dev 分支的内容，忽略 master 分支的冲突部分。

简化操作步骤

## 切换到 master 分支：

```bash
git checkout master
```

## 合并 dev 分支并自动选择 dev 的更改：

```bash
git merge -X theirs dev
```

注意事项：

使用 -X theirs 选项时，Git 会自动解决冲突，所有冲突的文件将以 dev 分支的内容为主。

在合并完成后，建议检查合并结果，确保所有更改都符合预期。

总结：

通过使用 -X theirs 选项，你可以快速合并 dev 分支到 master 分支，并自动选择 dev 的更改，避免手动解决冲突的步骤。这是处理合并冲突时的一种简便方法。

# 本地dev分支merge到master分支，有冲突如何解决

在将本地的 dev 分支合并到 master 分支时，如果遇到冲突，可以按照以下步骤解决冲突：

操作步骤

## 切换到 master 分支：

```bash
git checkout master
```

## 合并 dev 分支：

```bash
git merge dev
```

如果有冲突，Git 会提示你哪些文件存在冲突。

## 查看冲突文件： 使用以下命令查看哪些文件存在冲突：

```bash
git status
```

## 解决冲突： 打开有冲突的文件，查找冲突标记（&lt;&lt;&lt;&lt;&lt;&lt;&lt;, =======, &gt;&gt;&gt;&gt;&gt;&gt;&gt;)

例如：

```text
<<<<<<< HEAD  
// master 分支的内容  
=======  
// dev 分支的内容  
>>>>>>> dev
```

你需要手动编辑这些文件，选择保留的内容，删除冲突标记。可以选择保留 master 的内容、dev 的内容，或者两者的组合。

## 标记冲突已解决： 在解决完所有冲突后，使用以下命令将已解决的文件标记为已解决：

```text
git add <conflicted-file>
```

如果有多个文件，可以使用：

```text
git add .
```

## 完成合并： 

一旦所有冲突都解决并标记为已解决，使用以下命令完成合并：

```text
git commit -m "Merge dev into master, resolved conflicts"
```

总结：

通过以上步骤，你可以成功解决合并冲突并将 dev 分支的更改合并到 master 分支。确保在解决冲突时仔细检查每个文件，以避免丢失重要的更改。

