---
title: MYSQL索引
order: 2
category:
  - MYSQL
tag:
  - MYSQL
---



## MySQL 索引底层结构（B/B+ 树原理与区别）

MySQL 索引底层结构是一个非常有趣的话题，它涉及到数据库的性能和优化。MySQL 支持多种索引类型，其中最常用的是 B-树索引和 B+树索引。这两种索引都是基于平衡多叉树的数据结构，但是有一些区别和特点。我将尝试用简单的语言来解释它们的原理和区别。

B-树索引是一种平衡的多叉树，它的每个节点可以存储多个关键字和指针。关键字按照升序排列，指针指向子节点或者数据记录。B-树索引的每个节点可以存储的关键字个数称为阶数，一般用 m 表示。B-树索引有以下特点：

- 根节点至少有两个子节点，除了根节点外，每个节点至少有 ⌈m/2⌉ 个关键字和 ⌈m/2⌉ 个指针。
- 每个节点至多有 m 个关键字和 m+1 个指针。
- 每个叶子节点都在同一层，并且包含指向数据记录的指针。
- 每个非叶子节点包含 n 个关键字和 n+1 个指针，其中 ⌈m/2⌉ - 1 <= n <= m - 1。
- 每个关键字不仅是索引，还是数据，可以直接访问。

B-树索引的优点是可以快速地在树中查找、插入和删除数据，时间复杂度为 O(logmN)，其中 N 是数据量，m 是阶数。B-树索引的缺点是因为每个节点都存储数据，所以节点的大小有限，不能存储太多的关键字，导致树的高度较高，增加了磁盘 I/O 的次数。另外，B-树索引不适合做范围查询，因为数据分散在各个节点中，没有顺序性。

B+树索引是 B-树索引的变种，也是一种平衡的多叉树，但是有一些不同之处。B+树索引的每个节点仍然可以存储多个关键字和指针，但是只有叶子节点存储指向数据记录的指针，非叶子节点只存储用于索引的关键字。另外，B+树索引的叶子节点之间通过指针相连，形成一个有序链表。B+树索引有以下特点：

- 根节点至少有两个子节点，除了根节点外，每个节点至少有 ⌈m/2⌉ 个关键字和 ⌈m/2⌉ 个指针。
- 每个节点至多有 m 个关键字和 m+1 个指针。
- 每个叶子节点都在同一层，并且包含指向数据记录的指针和指向相邻叶子节点的指针。
- 每个非叶子节点包含 n 个关键字和 n+1 个指针，其中 ⌈m/2⌉ - 1 <= n <= m - 1。
- 每个关键字只是索引，不是数据，只能通过叶子节点访问。

B+树索引的优点是因为只有叶子节点存储数据，所以每个节点可以存储更多的关键字，降低了树的高度和磁盘 I/O 的次数。而且，B+树索引非常适合做范围查询，因为数据有序地存储在叶子节点的链表中，只需要遍历链表即可。B+树索引的缺点是因为每次查询都要到叶子节点，所以单个数据的查询效率没有 B-树索引高。

B-树索引和 B+树索引都是 MySQL 索引底层结构的常见选择，它们各有优缺点，适用于不同的场景。一般来说，B+树索引更适合于大数据量和高并发的环境，因为它可以减少磁盘 I/O 的开销，提高查询效率。

## B树和b+树 的区别？B为什么比B+树高？

B树和B+树是两种常用的多路平衡查找树，它们都可以用于数据库和文件系统的索引。它们的区别主要有以下几点：

- B树的每个节点既存储了关键字，也存储了对应的数据，而B+树的非叶子节点只存储了关键字，用于索引，所有的数据都存储在叶子节点中。
- B树的每个节点的关键字个数等于其子节点的个数减一，而B+树的每个节点的关键字个数等于其子节点的个数。
- B树的每个关键字在整棵树中只出现一次，而B+树的每个关键字在非叶子节点和叶子节点都可能出现，且叶子节点中的关键字是有序的。
- B树的叶子节点没有任何特殊标识，而B+树的叶子节点之间用链表相连，便于范围查找和遍历。

由于这些区别，B树和B+树各有其优势和劣势。一般来说，B+树相比于B树有以下优点：

- B+树由于非叶子节点不存储数据，因此每个节点可以容纳更多的关键字，从而降低了树的高度，减少了磁盘IO次数。
- B+树由于所有数据都在叶子节点中，因此查询性能更稳定，不会出现在非叶子节点就命中的情况。
- B+树由于叶子节点之间用链表相连，因此更适合范围查找和顺序遍历。

当然，B树也有其优点，例如：

- B树由于每个节点都存储了数据，因此当查询命中非叶子节点时，可以直接返回结果，不需要再访问磁盘。
- B树由于每个关键字只出现一次，因此占用的空间更少。



## 你了解的数据库（除了 MySQL）还有哪些结构的索引

除了 MySQL，还有很多其他的数据库系统，它们也使用了不同类型的索引结构来提高查询效率和性能。以下是一些常见的数据库索引结构的例子：

- **Oracle**：Oracle 数据库主要使用 B+树索引，它是 B树索引的一种改进，可以减少树的高度，提高检索速度。Oracle 还支持 Bitmap 索引，它是一种特殊的索引，用于处理低基数（即重复值较多）的列，可以节省空间，提高并发性。
- **SQL Server**：SQL Server 数据库也主要使用 B+树索引，它分为聚集索引和非聚集索引。聚集索引是指数据行的物理顺序与键值的逻辑顺序相同，一个表只能有一个聚集索引。非聚集索引是指数据行的物理顺序与键值的逻辑顺序不同，一个表可以有多个非聚集索引。SQL Server 还支持全文索引，它是一种基于文本内容的索引，可以用于搜索包含特定单词或短语的文档。
- **MongoDB**：MongoDB 是一种非关系型数据库（NoSQL），它主要使用 B树索引，它是一种多路平衡查找树，可以动态地插入和删除数据，保持树的平衡。MongoDB 还支持 Hash 索引，它是一种基于哈希函数的索引，可以快速地进行等值查询。



## MySQL 索引为什么要用 B+ 树？为什么不用红黑树？为什么不用跳表？

简单来说，MySQL 选择 B+ 树作为索引的数据结构，主要是因为 B+ 树具有以下优点：

- B+ 树是一种基于磁盘的平衡多叉树，它可以有效地减少磁盘 I/O 的次数和时间，提高查询效率。B+ 树的高度通常很低（3~4 层），每个节点可以存储多个键值对，每次查询只需要访问少数几个节点即可定位到目标数据。
- B+ 树的非叶子节点只存储键值，不存储数据，这样可以增加每个节点的键值对数量，进一步降低树的高度。而 B 树的非叶子节点既存储键值又存储数据，导致每个节点的键值对数量较少，树的高度较高。
- B+ 树的叶子节点之间通过指针相连，形成一个有序链表，这样可以方便地进行范围查询和排序操作。而 B 树的叶子节点之间没有指针相连，需要通过中序遍历来进行范围查询和排序操作。
- B+ 树的所有键值都在叶子节点上，因此每次查询的时间复杂度都相同，比较稳定。而 B 树的键值分布在各个层次上，因此查询的时间复杂度会随着键值的位置而变化，比较不稳定。

红黑树是一种基于内存的平衡二叉树，它主要用于内部排序和内存对象管理，并不适合作为数据库系统的索引结构。红黑树与平衡二叉树有相同的缺点：

- 红黑树每个节点只存储一个键值对，导致存储空间被浪费。MySQL 在进行磁盘读取时，是以页为单位进行读取，每个页的大小为 16K。如果使用红黑树作为索引结构，那么每次读取一个页只能得到一个键值对，而如果使用 B+ 树作为索引结构，那么每次读取一个页可以得到多个键值对。
- 红黑树由于每个节点只存储一个键值对，导致存储相同数量的数据时，红黑树的深度比 B+ 树的深度更深。这样会增加 MySQL 的磁盘 I/O 次数和时间，降低查询效率。

跳表是一种基于链表的索引结构，它通过在原始链表上增加多级索引来提高查询效率。跳表与 B+ 树相比有以下缺点：

- 跳表需要维护多级索引，这样会增加插入和删除操作的复杂度和开销。而 B+ 树只需要维护一级索引，并且通过分裂和合并操作来保持树的平衡。
- 跳表由于是基于链表实现的，因此无法利用磁盘预读机制来提高磁盘 I/O 的效率。而 B+ 树由于是基于数组实现的，因此可以利用磁盘预读机制来提高磁盘 I/O 的效率。
- 跳表在进行范围查询和排序操作时，需要遍历多个节点，而 B+ 树只需要遍历叶子节点即可。

## B+ 树一般有多少层

B+ 树是一种常用于数据库系统和文件系统的索引结构，它可以有效地减少磁盘 I/O 的次数和时间，提高查询效率。B+ 树的层数取决于它的阶数（每个节点可以存储的键值对数量）和它的数据量（总共有多少个键值对）。一般来说，B+ 树的层数越低，查询效率越高，因为需要访问的节点越少。

在实际的生产环境中，B+ 树的层数通常不会超过 4 层，甚至只有 1-3 层。这是因为在一些常见的数据库系统中，例如 MySQL 的 InnoDB 存储引擎，B+ 树的每个节点（页）的大小默认是 16 KB，而每个键值对占用的空间大约是 14 字节（假设键是 bigint 类型，占用 8 字节，指针是 6 字节）。这样计算出来，每个节点可以存储大约 1170 个键值对。如果假设每个叶子节点存储 16 个键值对（因为叶子节点还要存储数据指针），那么一个高度为 3 的 B+ 树可以存储大约 1170 × 1170 × 16 = 21902400 个键值对，也就是两千多万条记录。这已经是一个很大的数据量了，对于大多数项目也就够用了。如果数据量再大，也应该考虑拆分或分区等方案。

当然，这只是一个粗略的估计，实际上 B+ 树的层数还会受到数据分布、插入删除操作、节点分裂合并等因素的影响。如果想要准确地得到 B+ 树的层数，需要根据具体的数据库系统和表结构进行分析。一种可能的方法是通过查看表空间文件中存储 B+ 树根节点的页，并读取其中记录的 page level 的值，这个值加一就是 B+ 树的高度。



## 索引的优点和缺点（为什么要用索引）

索引是数据库系统中一种用于提高查询效率的数据结构，它可以按照某种排序方式存储表中的一列或多列的值，并指向对应的数据记录。索引的作用类似于书籍的目录，可以帮助用户快速地找到所需的内容。

索引的优点主要有以下几个方面：

- 索引可以大大加快数据的检索速度，减少数据库的 I/O 成本，提高系统性能。这是创建索引的最主要的原因。
- 索引可以通过创建唯一性索引，保证数据库表中每一行数据的唯一性，避免数据冗余和错误。
- 索引可以加速表与表之间的连接，特别是在实现数据的参照完整性方面特别有意义。
- 索引可以在使用分组和排序子句进行数据检索时，显著减少查询中分组和排序的时间，降低 CPU 的消耗。

索引的缺点主要有以下几个方面：

- 索引需要占用额外的物理空间，每一个索引都需要存储一定量的数据，数据量越大，占用空间也越大。
- 索引需要维护额外的时间成本，每次对表中的数据进行增删改操作时，都需要对索引进行动态更新，导致时间变长。
- 索引可能会降低某些查询的效率，例如模糊查询、范围查询等，因为这些查询无法利用索引的有序性，反而增加了索引的搜索开销。

因此，在创建和使用索引时，需要根据具体的业务需求和数据特征进行权衡和优化。一般来说，以下几种情况适合创建索引：

- 表中数据量大且经常进行查询操作的字段。
- 用于排序、分组、联合操作的字段。
- 用于连接其他表的外键字段。
- 值具有唯一性或者分散性较高的字段。

## 建索引的时候有什么需要遵循什么原则？（哪些字段适合建立索引）

建立索引是数据库系统中一种用于提高查询效率的数据结构，它可以按照某种排序方式存储表中的一列或多列的值，并指向对应的数据记录。索引的作用类似于书籍的目录，可以帮助用户快速地找到所需的内容。

建立索引时，需要遵循以下一些原则：

- 选择唯一性索引。唯一性索引的值是唯一的，可以更快速地通过该索引来确定某条记录。例如，学生表中学号是具有唯一性的字段。为该字段建立唯一性索引可以很快地确定某个学生的信息。如果使用姓名的话，可能存在同名现象，从而降低查询速度。
- 为经常需要排序、分组和联合操作的字段建立索引。经常需要 ORDER BY、GROUP BY、DISTINCT 和 UNION 等操作的字段，排序操作会浪费很多时间。如果为其建立索引，可以有效地避免排序操作
- 为常作为查询条件的字段建立索引。如果某个字段经常用来做查询条件，那么该字段的查询速度会影响整个表的查询速度。因此，为这样的字段建立索引，可以提高整个表的查询速度。
- 限制索引的数目。索引的数目不是越多越好。每个索引都需要占用磁盘空间，索引越多，需要的磁盘空间就越大。修改表时，对索引的重构和更新很麻烦。越多的索引，会使更新表变得很浪费时间。
- 尽量使用数据量少的索引。如果索引的值很长，那么查询的速度会受到影响。例如，对一个 CHAR (100) 类型的字段进行全文检索需要的时间肯定要比对 CHAR (10) 类型的字段需要的时间要多。
- 尽量使用前缀来索引。如果索引字段的值很长，最好使用值的前缀来索引。例如，TEXT 和 BLOG 类型的字段，进行全文检索会很浪费时间。如果只检索字段的前面的若干个字符，这样可以提高检索速度。
- 删除不再使用或者很少使用的索引。表中的数据被大量更新，或者数据的使用方式被改变后，原有的一些索引可能不再需要。数据库管理员应当定期找出这些索引，将它们删除，从而减少索引对更新操作的影响。
- 遵循最左前缀匹配原则。在建立联合索引时，应该将选择性最高（不重复值最多）或者经常作为查询条件（WHERE 子句）或者排序条件（ORDER BY 子句）或者分组条件（GROUP BY 子句）或者联合条件（JOIN 子句）等等情况下出现次数最多且频率最高且重要性最高等等因素综合考虑后选择一个最优字段放在联合索引最左边。
- 选择合适的索引顺序。在联合索引中，可以根据查询需求选择升序或降序进行扫描，以满足精确符合列顺序的 ORDER BY、GROUP BY 和 DISTINCT 等子句的查询需求。

## 一张表最多可以创建多少个索引？

索引是数据库系统中一种用于提高查询效率的数据结构，它可以按照某种排序方式存储表中的一列或多列的值，并指向对应的数据记录。索引的作用类似于书籍的目录，可以帮助用户快速地找到所需的内容。

不同的数据库系统和存储引擎对索引的数量和长度有不同的限制。在 MySQL 中，根据存储引擎定义每个表的最大索引数和最大索引长度。

在 MySQL 5.7 中，最常用的两种存储引擎是 MyISAM 和 InnoDB。它们对索引的限制如下：

- MyISAM：每个表最多支持 64 个索引，每个索引最多支持 16 个列，每个列最大长度为 1000 字节。
- InnoDB：每个表最多支持 64 个二级索引（除了聚簇索引），每个索引最多支持 16 个列，每个列最大长度为 3072 字节。

因此，在 MySQL 中，一张表最多可以创建的索引数目取决于使用的存储引擎和表结构。一般来说，MyISAM 和 InnoDB 的表都可以创建最多 64 个索引，但不建议创建过多的索引，因为这会增加存储空间和维护成本，并可能降低写入性能。

## MySQL 都有哪些类型的索引

MySQL是一种流行的关系型数据库管理系统，它支持多种类型的索引，用于提高查询效率和性能。根据我从网络上搜索到的信息，MySQL目前主要有以下几种索引类型：

- **普通索引**：这是最基本的索引，它没有任何限制，可以加速查询，但不保证列值的唯一性或非空性。
- **唯一索引**：这种索引要求索引列的值必须唯一，但允许有空值。它可以加速查询，同时防止数据重复。
- **主键索引**：这种索引要求索引列的值必须唯一且非空。它可以加速查询，同时保证数据的完整性。一个表只能有一个主键索引。
- **组合索引**：这种索引包含多个列，用于组合搜索。它的效率大于单列索引的合并。创建组合索引时，需要注意列的顺序和选择性。
- **全文索引**：这种索引专门用于文本内容的搜索，它可以对文本进行分词，并支持模糊匹配。目前只有MyISAM和InnoDB存储引擎支持全文索引。

## 唯一索引和普通索引有什么区别，该如何选择？

唯一索引和普通索引是MySQL中两种常见的索引类型，它们的区别和选择主要取决于以下几个方面：

- **唯一性约束**：唯一索引要求索引列的值必须唯一，但可以有空值，而普通索引没有这个限制。如果索引列的值本身就具有唯一性，那么可以使用唯一索引来保证数据的完整性和一致性。如果索引列的值可能有重复，那么只能使用普通索引。
- **查询效率**：唯一索引和普通索引在查询能力上没有明显的差别，都可以通过B+树的搜索算法来加速查询。唯一索引在找到满足条件的记录后会停止继续检索，而普通索引会继续查找下一个记录，直到碰到不满足条件的记录。但是这个差别对于性能的影响可以忽略不计，因为存储引擎是按页读写的，当找到满足条件的记录时，它所在的数据页已经在内存中了，所以多做一次指针寻找和计算的开销很小。
- **更新性能**：唯一索引和普通索引对更新语句的性能影响是比较明显的，主要体现在是否可以使用change buffer这个机制。change buffer是InnoDB存储引擎用来缓存更新操作的一种数据结构，它可以减少随机磁盘访问，提高更新效率。但是change buffer只适用于普通索引，而不适用于唯一索引。因为对于唯一索引来说，所有的更新操作都要先判断是否违反唯一性约束，而这必须要将数据页读入内存才能判断。如果都已经读入内存了，那么直接更新内存会更快，就没必要使用change buffer了。因此，在选择索引类型时，要尽量选择普通索引来利用change buffer的优势。

唯一索引和普通索引的区别和选择主要取决于数据本身的特点和业务需求。如果数据具有唯一性，并且需要保证数据完整性和一致性，那么可以使用唯一索引。如果数据没有唯一性，并且需要提高更新性能，那么可以使用普通索引。如果数据既有唯一性又需要提高更新性能，那么可以考虑使用主键或者组合索引来达到平衡。

## MySQL 聚集索引 (主键索引) 和非聚集索引 (辅助索引/普通索引) 的区别

聚集索引和非聚集索引的区别主要在于表记录的排列顺序和与索引的排列顺序是否一致。索引是一种数据结构，可以帮助数据库快速地查找、排序、分组和聚合数据。索引的本质是一个有序的列表，每个列表项包含一个键值和一个指针。键值是用来排序和查找的字段，指针是指向表记录的地址。

聚集索引是指表记录的物理顺序和索引的键值顺序相同。也就是说，表记录按照索引的键值排序存储。因此，一个表只能有一个聚集索引，因为只能有一种物理顺序。通常，主键就是聚集索引，因为主键是唯一且不可变的，适合作为排序和查找的依据。

非聚集索引是指表记录的物理顺序和索引的键值顺序不同。也就是说，表记录按照任意顺序存储，而索引按照键值排序存储。因此，一个表可以有多个非聚集索引，因为可以有多种排序方式。非聚集索引也叫辅助索引或普通索引，它们不影响表记录的物理顺序，只是提供了一个额外的访问路径。

聚集索引和非聚集索引各有优缺点。聚集索引由于和表记录的物理顺序一致，所以查找速度很快，尤其是范围查询。但是，由于每次插入或删除数据都要调整物理顺序，所以维护成本很高。非聚集索引由于和表记录的物理顺序不同，所以查找速度相对较慢，需要两次查找：先在索引中查找指针，再在表中查找记录。但是，由于不需要调整物理顺序，所以维护成本较低。

## InnoDB 存储引擎的数据组织形式

InnoDB 是 MySQL 的默认存储引擎之一，它为实现事务安全（ACID兼容）的数据存储而设计。以下是 InnoDB 存储引擎的主要数据组织特点：

1. **聚簇索引**：InnoDB 使用聚簇索引方式组织表数据。这意味着表数据按主键的值存储。一个表只能有一个聚簇索引。如果没有明确定义主键，InnoDB 会为每行生成一个6字节的隐式主键。使用聚簇索引的好处是当根据主键查询时，查找速度非常快。但反之，如果经常进行大量非主键的查询，可能会稍微慢一些。
2. **二次索引**：除了聚簇索引，InnoDB 还支持多个二次索引。二次索引的叶节点不包含行的全部数据，而是包含相应行的主键值。
3. **多版本并发控制 (MVCC)**：InnoDB 使用 MVCC 来支持高并发，允许多个事务同时读取同一行数据，而不会互相阻塞。这有助于实现非锁定读取，从而提高并发性能。
4. **ACID事务**：InnoDB 支持完整的 ACID 事务模型，确保在系统崩溃或其他异常情况下数据的完整性和一致性。
5. **行级锁定**：InnoDB 支持行级锁定，而不是表级锁定，这有助于减少查询之间的锁竞争。
6. **外键约束**：InnoDB 支持外键和参照完整性约束。
7. **支持Crash Recovery**：InnoDB 使用日志文件和日志缓冲区来确保事务的持久性，并支持崩溃后的恢复。
9. **页为基本的存储单位**：InnoDB 中的数据被存储在固定大小为16KB的页中。这些页再被组织成段和区。

上述只是InnoDB的一些基本特点和数据组织方式。InnoDB的实际结构和工作方式相当复杂，但它为MySQL数据库提供了高性能、高可靠性和高并发支持。

## MySQL 是怎么存储 NULL 的？

MySQL 中如何存储 `NULL` 值取决于所使用的存储引擎以及字段的类型。但在大多数场景中，`NULL` 值不会像其他常规值那样占用完整的存储空间。以下是有关MySQL存储 `NULL` 的一些细节：

1. **固定长度字段**：对于像 `CHAR` 这样的固定长度字段，即使它们包含 `NULL`，它们也会占用固定的存储空间。但是，MySQL 会在记录的头信息中使用一个特殊的位来标记该字段为 `NULL`。

2. **可变长度字段**：如 `VARCHAR`、`TEXT` 和 `BLOB` 类型，当它们包含 `NULL` 值时，通常不会占用数据存储空间（除了记录头部的 `NULL` 位标记外）。

3. **NULL 标记位**：每条记录的开始部分都有一个 `NULL` 位图。对于每一个可以为 `NULL` 的列，这个位图都有一个位。如果该位设置为1，那么对应的列就是 `NULL`。因此，`NULL` 值本身并不需要存储空间（除了这个标记位），因为其值是从位图中推导出来的。

4. **InnoDB 存储引擎**：特别是对于 InnoDB，如果所有的列都是 `NOT NULL`，则不会为这个记录分配 `NULL` 位图。但是，一旦表中有一个可以为 `NULL` 的列，就会有一个 `NULL` 位图。

5. **存储优化**：存储 `NULL` 通常比存储一个实际的值要更加高效，因为 `NULL` 只需要一个标记位。这使得 `NULL` 在存储稀疏数据时特别有用，因为它不会占用太多的空间。

所以，在设计数据库时，考虑字段是否应该允许 `NULL` 是很重要的。如果一个字段总是有值，那么应该设置为 `NOT NULL`，这样可以节省存储和增加查询效率。但是，如果一个字段可能没有值，那么允许它为 `NULL` 可以节省存储空间。

## 可以说一下你所谓的位图吗？

在数据库中，特别是在存储记录的结构中，位图（或称为 bitmap）是一个常见的数据结构。位图使用连续的位（bit）来表示信息。每个位的值可以是0或1，用于表示某种信息状态，例如真/假、存在/不存在等。

在MySQL的InnoDB存储引擎中，用于标记`NULL`值的位图是一个很好的例子：

1. **NULL 位图**：当InnoDB存储记录时，它会首先有一个位图，其中每个可以为`NULL`的列都对应一个位。这个位图在记录的起始部分。
2. **如何工作**：对于每一个可能为`NULL`的列，位图中都会有一个对应的位。如果该位是1，那么表示相应的列是`NULL`；如果是0，则表示该列有一个非`NULL`的值。例如，考虑一个有3个列的表，其中所有列都可以是`NULL`。如果第一个和第三个列的值是`NULL`，而第二个列的值是非`NULL`，那么位图会是`101`。
3. **优势**：使用位图的好处是它非常紧凑。当处理大量的数据时，每个字节甚至每个位都很重要。例如，一个有8个可以为`NULL`的列的表只需要1个字节来存储其`NULL`位图。相比于为每个`NULL`列存储一个完整的字节或更多，这是很大的节省。

除了标记`NULL`值之外，位图在数据库中还有其他用途，例如在位图索引中。位图索引在某些查询操作中非常高效，特别是在处理大量数据时进行位操作（例如AND、OR和NOT操作）。

## MySQL 建表需要注意什么

在MySQL中建表时，有许多因素需要考虑以确保表的结构合理、性能优化、并避免可能出现的问题。以下是一些建表时需要注意的事项：

1. **明确需求**：在建表之前，确保你了解数据模型的需求、预计的数据量以及查询的种类。
2. **选择合适的存储引擎**：
   - 如InnoDB提供事务支持、外键约束以及行级锁定。
   - MyISAM适用于只读或大量插入的场景，但不支持事务。
3. **合理使用数据类型**：
   - 使用最小的、能满足需求的数据类型。
   - 避免使用过大的`VARCHAR`或`TEXT`，除非真的需要。
4. **主键选择**：
   - 每张表最好都有一个主键。
   - 主键应当是短小并快速增长的，通常使用`AUTO_INCREMENT`整数。
5. **考虑索引**：
   - 为常用于查询条件或排序的列建立索引。
   - 但不要过度索引，因为索引会占用空间并可能减慢写操作。
6. **规范命名**：使用有意义、一致的命名规范。
7. **避免使用保留字**：确保表名和列名不是MySQL的保留字。
8. **字符集和排序规则**：
   - 考虑使用`utf8mb4`字符集以支持更广泛的Unicode字符，特别是表情符号。
   - 选择正确的排序规则（collation）以满足语言和区域设置需求。
9. **默认值**：为列设定合理的默认值，尤其是那些不能为NULL的列。
10. **避免NULL**：尽量避免允许列为NULL，除非有明确的业务需求。处理NULL可能会增加复杂性，并影响性能。
11. **考虑分区**：对于非常大的表，考虑使用分区以提高查询性能。
12. **考虑安全性**：根据数据的敏感性，考虑加密某些列。
13. **使用合适的存储选项**：如`ROW_FORMAT`、`TABLESPACE`等，以优化存储和性能。
14. **外键约束**：如果使用InnoDB，可以使用外键约束来维护数据的引用完整性。但注意，外键可能会影响性能。
15. **使用注释**：为表和列添加注释，以描述它们的用途和其他重要信息。
16. **考虑扩展性**：在设计时考虑将来的需求和变化，使表结构尽可能灵活和可扩展。

## 唯一索引和普通索引有什么区别，该如何选择？

唯一索引和普通索引都是数据库中用于加速数据检索的结构。它们之间的主要区别在于唯一性约束。下面是它们之间的主要差异和各自的特点：

1. **唯一性**：
   - **唯一索引**：保证索引列中的所有值都是唯一的，不能有重复的值。如果尝试插入或更新重复的值，数据库将拒绝操作并引发错误。
   - **普通索引**：没有唯一性约束，允许在索引列中存在重复的值。

2. **应用场景**：
   - **唯一索引**：当你想确保某列（如email、username等）的值是唯一的时，使用唯一索引是有意义的。这也为数据的完整性提供了额外的保障。
   - **普通索引**：当你只想加速查询，但不担心列值的唯一性时，可以使用普通索引。

3. **性能**：
   - 由于唯一索引需要在每次插入或更新时检查唯一性，因此它可能比普通索引稍微慢一些。但在现代数据库系统中，这种差异通常是微不足道的。

4. **主键与唯一索引**：主键索引实际上就是一个特殊的唯一索引。每个表只能有一个主键，但可以有多个唯一索引。

5. **空值处理**：
   - **唯一索引**：允许多个NULL值，因为在数据库中，NULL被视为不确定的，因此两个NULL值不被视为相同。
   - **普通索引**：也允许多个NULL值。

 **该如何选择？**

- 如果你需要确保某列的数据唯一，例如用户ID、电子邮件地址或社会安全号码，那么应该使用唯一索引。
- 如果只是为了提高查询性能而不关心列值的唯一性，那么普通索引可能更为合适。
- 记住，任何额外的索引都会增加插入、更新和删除操作的开销，因为索引需要随数据更改而更新。因此，应根据实际需要谨慎创建索引，避免过度索引。

## 联合索引的最左匹配原则：为什么得最左匹配，不按照这个来为什么失效？

联合索引的最左匹配原则（也被称为最左前缀原则）是MySQL中B+树索引搜索算法的一部分。它描述了如何在联合索引中使用索引列来优化查询。为了理解这一原则，首先需要了解B+树索引的结构和工作方式。

联合索引中的列是按照指定的顺序存储的，例如：对于索引`KEY (col1, col2, col3)`，`col1`是最左边的列，`col3`是最右边的列。

**最左匹配原则的含义**:

当执行查询时，MySQL可以在联合索引中使用最左边的一列，最左边的两列，依此类推，但是它不能跳过任何列。这意味着，对于上述的索引，以下查询可以利用索引：

- `WHERE col1 = value1`
- `WHERE col1 = value1 AND col2 = value2`
- `WHERE col1 = value1 AND col2 = value2 AND col3 = value3`

但以下查询则不能完全利用联合索引：

- `WHERE col2 = value2` （没有使用最左边的`col1`）
- `WHERE col2 = value2 AND col3 = value3` （同样，没有使用最左边的`col1`）

**为什么需要最左匹配**:

联合索引的数据结构是为了按照特定的顺序（从最左列到最右列）快速查找数据而设计的。如果跳过了最左边的列，那么整个索引结构将无法正确进行数据查找，因为数据的排序和层级结构是基于从左到右的列顺序建立的。

**失效的原因**:

当你不遵循最左匹配原则时，查询可能不会使用索引（或者不会完全利用索引）。这导致查询性能下降，因为数据库可能需要进行全表扫描或者在索引中进行更多的查找操作。

**注意**：虽然最左匹配原则是理解和优化MySQL联合索引查询的基本工具，但还有其他因素可能会影响查询优化器的决策，如统计数据、列选择性等。所以，对于任何具体的查询，最佳的方式是查看查询的执行计划并进行相应的测试和调整。

## 说一下联合索引的数据结构，并且尝试从数据结构来解释

联合索引的基础数据结构是B+树，这也是大多数关系型数据库用于索引的数据结构。了解B+树是理解联合索引如何工作的关键。下面是B+树和联合索引的关系及其工作原理的概述：

### B+树数据结构：

1. **节点**：B+树由一系列的节点组成，这些节点可以是内部节点或叶节点。

2. **分裂和合并**：当一个节点中的项太多时，它会分裂成两个节点。相反，当一个节点的项太少时，它可能会与其兄弟节点合并。

3. **叶节点**：在B+树的底部，所有的叶节点通过一个链接按顺序连接。这意味着可以按顺序访问记录，这对于某些类型的查询非常有用。

### 联合索引与B+树：

当你在多个列上创建一个联合索引时，B+树的键是这些列值的组合。例如，对于一个`(col1, col2)`的联合索引，每个B+树节点中的项都是`(col1, col2)`值对的组合。

### 为什么最左匹配原则很重要？

考虑到联合索引的B+树结构和键的组合方式，可以更容易地理解最左匹配原则。

1. **键的排序**：在B+树中，键是按顺序存储的。对于`(col1, col2)`的联合索引，键首先按`col1`的值排序，然后在`col1`的每个值内部，键按`col2`的值排序。

2. **查找**：当数据库查找特定的`(col1, col2)`值对时，它首先根据`col1`的值在B+树中进行查找，然后在找到的`col1`值的范围内查找`col2`的值。

3. **最左匹配**：如果你的查询只涉及`col2`而没有涉及`col1`，那么B+树索引的整个结构和排序都无法帮助查找，因为`col1`是键的最左部分，并且在没有提供`col1`值的情况下，数据库无法有效地使用B+树的结构。

### 结论：

联合索引的B+树数据结构意味着键是按照特定的顺序存储和排序的。这是最左匹配原则的基础，因为在不提供最左边的列值的情况下，索引无法有效地帮助查询。

## 假如有(a,b,c) 联合索引，select * from table where c = x and b = x and a = x 这条语句能用到（a,b,c）联合索引吗，sql 执行之前是否会将 c b a 的查询顺序改为 a b c 吗？

当你有一个 `(a, b, c)` 联合索引并执行查询 `select * from table where c = x and b = x and a = x` 时，以下是相关的细节和行为：

1. **查询优化器**：MySQL的查询优化器是智能的，它会识别你的查询中的所有条件，并试图为它找到最优的执行策略，这包括选择哪个索引来执行查询。

2. **条件重排**：尽管你在查询中的条件是 `c = x and b = x and a = x` 的顺序，但查询优化器会重排这些条件以匹配索引的顺序，使其成为 `a = x and b = x and c = x`，这样它就可以有效地使用 `(a, b, c)` 联合索引。

3. **使用索引**：在条件被重排后，查询优化器会选择使用 `(a, b, c)` 联合索引进行查询，因为所有的键列都在WHERE子句中有条件。当所有索引列都在查询条件中时，索引是最有效的。

即使你的查询条件的顺序与联合索引的列的顺序不匹配，MySQL的查询优化器仍然会尝试重排条件以最大程度地利用索引。你可以通过使用 `EXPLAIN` 关键字来查看查询的执行计划，从而验证查询是否使用了预期的索引。

## 如何评价下述这样的联合索引的组织方式？将联合索引（A,B）设计成先分别以 A 和 B 构建两棵 B+ 树，然后将 A 字段的 B+ 树的叶子结点指向 B 字段的 B+ 树。

你提到的索引设计方式实际上与传统的联合索引在结构上有所不同。在标准的联合索引中，一棵B+树会对多个字段的组合进行索引。但在你描述的设计中，似乎有两棵独立的B+树，其中一棵的叶子节点指向另一棵的节点。

这种设计方式的评价如下：

**优点**:

1. **灵活性**：对A和B单独查询时，各自的B+树可能提供更快的查询速度。
2. **空间使用**：如果某个字段的值有很大的重复（例如，许多行具有相同的A值），那么这种结构可能会节省一些空间，因为你不需要为每个(A, B)对存储重复的A值。

**缺点**:

1. **复杂性**：这增加了查询处理的复杂性。当执行涉及两个字段的查询时，数据库需要在两棵B+树之间进行协调。
2. **查询性能**：在某些情况下，这种结构可能比单一的联合索引慢，特别是当涉及到范围查询或排序时。
3. **维护开销**：更新、删除和插入操作可能需要在两棵树之间进行更多的协调和同步，这可能会导致性能下降。
4. **数据一致性**：必须确保在所有操作中，两棵树之间的指针和数据始终保持同步。

总的来说，这种设计似乎为了某些特定的查询模式而进行了优化，可能在某些用例下非常有用。但是，由于其带来的额外复杂性，它可能不适合作为一种常规的索引策略。在实际应用这种设计之前，应该根据具体的查询模式和数据分布进行彻底的性能和可维护性测试。

## 讲讲回表查询和覆盖索引，为什么需要覆盖索引 ，可以使用覆盖索引优化的场景

### 1. 回表查询

在MySQL中使用InnoDB存储引擎时，数据实际存储在主键索引(聚簇索引)的叶子节点中。当我们基于非聚簇索引（也叫二级索引或辅助索引）查询数据时，索引的叶子节点中包含相应行的主键值。为了获得其他列的数据，数据库需要使用这个主键值再次查询聚簇索引来获取完整的行数据。这个再次查询主键索引的操作被称为“回表”。

### 2. 覆盖索引

覆盖索引是一种特殊的查询优化方法。如果一个查询只涉及索引的列，那么可以直接通过查询索引来获得所需的信息，而无需回到主表中查询数据。这样的索引称为“覆盖索引”。

**为什么需要覆盖索引?**

- **性能提升**：避免了回表查询，因此减少了IO操作，特别是当数据不在内存中时。
  
- **减少查询时间**：仅通过查询索引，就可以获取所需数据，这通常比读取完整的数据行要快。

### 可以使用覆盖索引优化的场景：

1. **查询只涉及少量的列**：例如，你只需要查询、筛选或排序索引中的列。

2. **聚合操作**：当你执行COUNT、SUM、AVG等聚合操作时，如果所需的列都在索引中，那么使用覆盖索引会更高效。

3. **大表操作**：对于非常大的表，回表查询的成本会变得非常高。在这种情况下，设计良好的覆盖索引可以显著提高性能。

4. **高I/O场景**：在高I/O负载的系统中，减少不必要的I/O尤为重要。覆盖索引可以帮助减少数据页的读取。

### 如何使用：

1. 使用 `EXPLAIN` 命令来分析查询。如果结果显示 `Extra` 列中有 `Using index`，那么表示MySQL使用了覆盖索引。

2. 当设计索引时，考虑将经常在查询中使用的列添加到索引中，这样可以提高查询的可能性使用覆盖索引。

覆盖索引是一个非常有用的工具，可以显著提高某些查询的性能。但在添加索引时，也需要权衡空间和维护成本，因为索引会增加存储空间的使用，并可能影响写操作的性能。

## 前缀索引了解吗，为什么要建前缀索引

是的，我了解前缀索引。前缀索引是指在创建索引时，不是对整个列进行索引，而是仅对列的前面部分字符进行索引。

### 为什么要建前缀索引？

1. **空间效率**：对于VARCHAR或TEXT类型的长字段，索引整列可能会消耗大量的磁盘空间。通过仅索引列值的前缀，可以显著减少索引的大小。

2. **查询效率**：尽管前缀索引不能提供完全索引的全部优势，但在很多情况下，它仍然能够有效地减少查询所需扫描的数据量。

3. **适应性**：有时，某些列的数据分布特点是前几个字符已经足够区分大部分值。在这种情况下，前缀索引可以提供与完全索引类似的性能。

### 注意事项：

1. **选择合适的前缀长度**：前缀的长度应根据数据的分布进行选择。如果前缀太短，很多值可能会显得相同，这将降低索引的效果；如果太长，则会浪费空间并降低插入操作的速度。

2. **不能用于尾部模式匹配**：像这样的查询 `WHERE column LIKE '%suffix'` 无法使用前缀索引。

3. **考虑字符集和排序规则**：某些字符集和排序规则可能会影响前缀索引的效果。

4. **可能无法用于某些操作**：例如，在某些数据库系统中，前缀索引可能不支持ORDER BY操作。

5. **使用EXPLAIN验证**：当创建前缀索引后，使用`EXPLAIN`语句来确保查询实际上正在使用索引。

总的来说，前缀索引是一种权衡。它可以节省空间并提供查询性能的提升，但与完整的列索引相比，其效率可能会略有降低，并且带来某些限制。在使用前缀索引之前，开发者应当仔细考虑这些利弊，并基于实际的数据和查询模式进行测试。

## select * from A join B on A.id = B.id;执行过程性能差，原因可能是？哪里需要建立索引?

当执行一个JOIN操作时，性能的瓶颈可能来自多个方面。以下列出了一些可能导致JOIN操作性能差的常见原因，以及如何解决它们：

1. **没有适当的索引**：
   - 如果`A.id`和`B.id`没有被索引，那么数据库可能需要进行全表扫描来查找匹配的行，这是非常低效的。
   - **解决方法**：确保在`A.id`和`B.id`上都有索引。这样，数据库可以使用索引来快速找到匹配的行，而不是扫描整个表。

2. **数据分布不均**：
   - 如果`A.id`或`B.id`中的某些值出现的频率特别高，可能导致JOIN操作不均匀地处理数据。
   - **解决方法**：在这种情况下，考虑重新设计数据模型或使用其他查询策略。

3. **硬件和I/O限制**：
   - 如果数据量大且不完全存储在内存中，那么I/O操作可能会成为性能瓶颈。
   - **解决方法**：考虑增加数据库服务器的内存，或使用SSD硬盘，这样可以提高数据访问速度。

4. **查询优化器的选择可能不是最佳的**：
   - 有时，数据库的查询优化器可能没有选择最佳的执行计划。
   - **解决方法**：使用`EXPLAIN`命令查看查询的执行计划，看是否有可以优化的地方。确保统计数据是最新的，因为查询优化器依赖于它来做决策。

5. **大量数据返回**：
   - 如果两个表都很大，它们之间的JOIN操作可能会返回大量的数据，这会消耗更多的时间。
   - **解决方法**：考虑限制返回的数据量，例如使用`LIMIT`子句或更具体的`WHERE`条件。

6. **JOIN类型**：
   - 默认情况下，MySQL可能会选择一种JOIN类型，但这可能不是最优的。
   - **解决方法**：使用`STRAIGHT_JOIN`来强制执行的顺序，或者重新调整查询来优化JOIN。

为了解决JOIN操作的性能问题，首先应确保在`A.id`和`B.id`上都建立索引。这通常是提高JOIN查询性能的最直接和最有效的方法。

## 什么情况下用 like 查询（模糊查询）效率会比较低？

使用`LIKE`进行模糊查询在以下情况下效率可能会比较低：

1. **前缀通配符**：当你使用前缀通配符，如 `LIKE '%abc'`，MySQL 无法有效地使用索引，因为它不知道搜索的起始点。这会导致全表扫描，从而降低查询效率。

2. **大数据集**：在大数据集上进行模糊查询，特别是当不能利用索引时，效率会很低。

3. **不使用索引**：即使是后缀模糊查询（如 `LIKE 'abc%'`），如果相关列没有索引，查询效率仍然可能很低，因为它会触发全表扫描。

4. **复杂的模糊模式**：例如使用多个通配符或混合通配符的模式，可能会使查询处理更为复杂，从而降低性能。

5. **字符集和排序规则**：某些字符集和排序规则可能使模糊匹配更为复杂，这可能会影响性能。

6. **BLOB 和 TEXT 字段**：在这些类型的字段上进行模糊查询可能会导致更大的性能开销，因为它们可能存储大量的数据。

7. **不恰当的查询设计**：如果`LIKE`查询与其他查询条件合并，并且查询条件没有正确地优化，那么即使`LIKE`查询本身可能是高效的，整体查询效率也可能会受到影响。

为了提高`LIKE`查询的效率：

- 尽可能为查询的列创建索引。
- 尽量避免使用前缀通配符。
- 对于经常进行模糊查询的场景，可以考虑使用全文搜索功能或第三方搜索引擎，如Elasticsearch。
- 仔细设计查询，确保其他部分的查询也是优化的。

## 全文索引和倒排索引

全文索引和倒排索引都与文本搜索有关，但从概念上说，全文索引是一种技术或功能，而倒排索引是实现这种功能的一种数据结构。下面详细解释两者：

### 全文索引 (Full-Text Indexing):

1. **定义**：全文索引是数据库管理系统提供的一种用于加速文本搜索的功能。它允许用户在大量文本数据中快速查找包含某些词汇或短语的记录。

2. **工作原理**：全文索引通常通过使用倒排索引的数据结构来实现。它先对文本进行分词，然后建立一个索引，这个索引允许数据库系统快速找到包含特定词汇的文档。

3. **特点**：
   - 支持词根搜索、通配符搜索、近似搜索等。
   - 可以为搜索结果分配权重或评分。
   - 通常能够理解或处理停用词、词干处理和同义词等。

4. **应用**：大多数现代的RDBMS，如MySQL、PostgreSQL和SQL Server，都支持全文索引和搜索。

### 倒排索引 (Inverted Index):

1. **定义**：倒排索引是一种数据结构，用于存储某个词汇出现在哪些文档或记录中。它是全文搜索的基石。

2. **结构**：倒排索引通常由两个主要部分组成：
   - **词汇表**：包含所有唯一词汇的列表。
   - **倒排文件**：对于词汇表中的每个词汇，列出该词汇出现的所有文档或记录的ID。

3. **工作原理**：当用户查询某个词汇时，系统首先在词汇表中查找该词汇，然后引用倒排文件来确定哪些文档包含该词汇。

4. **特点**：
   - 高效：能够快速找到包含特定词汇的所有文档。
   - 紧凑：通常占用的存储空间比原始文档小。
   - 可扩展：可以很容易地添加新文档而不需要重建整个索引。

5. **应用**：除了RDBMS，倒排索引也是许多专门的搜索引擎（如Elasticsearch、Solr和Lucene）背后的关键数据结构。

全文索引是帮助我们在文本中执行快速搜索的功能，而倒排索引是使这种搜索成为可能的数据结构。

## 索引在哪些情况下会失效

数据库的索引提供了快速查询数据的能力，但在某些情况下，查询优化器可能不会使用索引，从而导致查询性能下降。以下是一些索引可能失效的情况：

1. **使用函数或运算**：在索引列上使用函数或进行某种计算。例如：
   ```sql
   SELECT * FROM users WHERE YEAR(birthdate) = 1990;
   ```

2. **使用NOT或<>操作符**：这可能导致索引不被使用，因为这样的查询难以优化。

3. **前缀通配符**：在`LIKE`查询中使用前缀通配符（例如 `LIKE '%something'`）。

4. **隐式数据类型转换**：当比较的数据类型不匹配时，可能会导致索引不被使用。

5. **索引碎片化**：过度的碎片化可能导致查询优化器决定不使用索引。

6. **OR操作符**：特别是当涉及到不同的列时，索引可能不会被使用。例如：
   ```sql
   SELECT * FROM users WHERE id = 5 OR username = 'Alice';
   ```

7. **使用非最左前缀**：对于复合索引，如果查询条件没有从最左边的列开始，则可能不会使用索引。

8. **索引统计不准确**：查询优化器依赖于索引的统计信息来决定如何执行查询。如果这些统计信息过时或不准确，查询优化器可能会选择不使用索引。

9. **选择性太低**：如果索引的某一列的数据非常接近（例如，一个布尔字段，其中90%的值都是true），查询优化器可能会决定全表扫描更快。

10. **NULL值**：在某些数据库系统中，索引可能不包括NULL值。因此，使用IS NULL或IS NOT NULL的查询可能不会使用索引。

11. **强制使用全表扫描**：如果使用了某些查询提示或其他机制来强制执行全表扫描。

12. **数据库配置**：某些数据库设置或参数可能会影响索引的使用。

13. **太小的数据集**：对于非常小的表，全表扫描可能与使用索引一样快或更快。

要确保索引被正确地使用，可以利用查询执行计划工具来查看查询是如何被优化和执行的。如果发现索引没有被使用，可以根据上述情况进行检查和调整。