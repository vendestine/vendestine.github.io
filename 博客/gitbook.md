---
title: GitBook
slug: gitbook
sidebar_position: 2
hide: false
---


# GitBook

# gitbook node使用

## gitbook和github之间的同步

(1) 实验结果

gitbook和github之间的同步分为两种，gitbook -&gt; github 和 github -&gt; gitbook，结果测试后我发现，对于这两种方式都是如下的工作模式：

gitbook web端上，edit page后，merge，commit自动push到github仓库上去； github仓库，自己手动编辑后，gitbook web端的page会自动pull仓库的内容，进行更新；

 

(2) 结论

通过上述的实验，我们清楚了gitbook和github同步的本质

无论是在gitbook编辑，还是在github仓库编辑，实际都是把更新的内容add到索引里，然后再提交到commit，最后push到github仓库中。github仓库中，肯定是最新的commit，而gitbook web端会自动检测是否有新的commit，如果有就进行update，同步成最新的commit。所以同步源其实就是github仓库

 

那既然如此，为什么有给出了两种同步方式，这里的同步其实是说gitbook和github建立connection后，第一次同步的方式，因为建立connection的时候，要么是gitbook为空，github仓库有内容；要么是gitbook有内容，github仓库为空。

按照上述机制，如果初始情况是 gitbook有内容，github仓库为空，这个时候作为同步源的github仓库是空的，所以此时必须选择gitbook -&gt; github，将gitbook的内容同步到github仓库中。之后可以随意切换同步模式，因为github仓库不为空了，它可以作为同步源，gitbook和github仓库都是自动同步。

 

 

