---
title: .gitignore使用
slug: gitignore使用
sidebar_position: 5
hide: false
---


# .gitignore使用

# gitignore重新生效

把某些目录或文件加入.gitignore后，按照上述方法定义后发现并未生效。

原因是.gitignore只能忽略那些原来没有被追踪的文件，如果某些文件已经被纳入了版本管理中，则修改.gitignore是无效的。那么解决方法就是先把本地缓存删除（改变成未被追踪状态），然后再提交：

```bash
git rm -r --cached .
git add .
```

参考：

[1] [https://cloud.tencent.com/developer/article/2220223](https://cloud.tencent.com/developer/article/2220223) 

[2] [https://blog.csdn.net/mingjie1212/article/details/51689606](https://blog.csdn.net/mingjie1212/article/details/51689606)

