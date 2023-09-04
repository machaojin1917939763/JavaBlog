---
title: LUA脚本
order: 2
category:
  - 12306
tag:
  - 12306
---

## 1. 前言

Redis是高性能的KV内存数据库，除了做缓存中间件的基本作用外还有很多用途。Redis提供了丰富的命令来供我们使用以实现一些计算。Redis的单个命令都是原子性的，有时候我们希望能够组合多个Redis命令，并让这个组合也能够原子性的执行，甚至可以重复使用，在软件热更新中也有一席之地。Redis开发者意识到这种场景还是很普遍的，就在2.6版本中引入了一个特性来解决这个问题，这就是Redis执行Lua脚本。

## 2. Lua

Lua也算一门古老的语言了，玩魔兽世界的玩家应该对它不陌生，WOW的插件就是用Lua脚本编写的。在高并发的网络游戏中Lua大放异彩被广泛使用。

Lua广泛作为其它语言的嵌入脚本，尤其是C/C++，语法简单，小巧，源码一共才200多K，这可能也是Redis官方选择它的原因。

> 另一款明星软件Nginx也支持Lua，利用Lua也可以实现很多有用的功能。

## 3. Lua并不难

> Redis 官方指南也指出不要在Lua脚本中编写过于复杂的逻辑。

为了实现一个功能就要学习一门语言，这看起来就让人有打退堂鼓的感觉。其实Lua并不难学，而且作为本文的场景来说我们不需要去学习Lua的完全特性，**要在Redis中轻量级使用Lua语言**。这对掌握了Java这种重量级语言的你来说根本不算难事。这里胖哥只对Redis中的涉及到的基本语法说一说。

### Lua 的简单语法

Lua在Redis脚本中我个人建议只需要使用下面这几种类型：

1. `nil` 空
2. `boolean` 布尔值
3. `number` 数字
4. `string` 字符串
5. `table` 表

#### 声明类型

声明类型非常简单，不用携带类型。

```lua
--- 全局变量 
name = 'felord.cn'
--- 局部变量
local age = 18
```

> Redis脚本在实践中不要使用全局变量，局部变量效率更高。

#### table 类型

前面四种非常好理解，第五种`table`需要简单说一下，它既是数组又类似Java中的`HashMap`（字典），它是Lua中仅有的数据结构。

数组不分具体类型，演示如下

```bash
Lua 5.1.5  Copyright (C) 1994-2012 Lua.org, PUC-Rio
> arr_table = {'felord.cn','Felordcn',1}
> print(arr_table[1])
felord.cn
> print(arr_table[3])
1
> print(#arr_table)
3
```

作为字典：

```bash
Lua 5.1.5  Copyright (C) 1994-2012 Lua.org, PUC-Rio
> arr_table = {name = 'felord.cn', age = 18}
> print(arr_table['name'])
felord.cn
> print(arr_table.name)
felord.cn
> print(arr_table[1])
nil
> print(arr_table['age'])
18
> print(#arr_table)
0
```

混合模式：

```bash
Lua 5.1.5  Copyright (C) 1994-2012 Lua.org, PUC-Rio
> arr_table = {'felord.cn','Felordcn',1,age = 18,nil}
> print(arr_table[1])
felord.cn
> print(arr_table[4])
nil
> print(arr_table['age'])
18
> print(#arr_table)
3
```

> ❗ `#` 取table的长度不一定精准，慎用。同时在Redis脚本中避免使用混合模式的table，同时元素应该避免包含空值`nil`。在不确定元素的情况下应该使用循环来计算真实的长度。

#### 判断

判断非常简单，格式为：

```lua
local a = 10
if a < 10  then
    print('a小于10')
elseif a < 20 then
    print('a小于20，大于等于10')
else
    print('a大于等于20')
end
```

#### 数组循环

```lua
local arr = {1,2,name='felord.cn'}

for i, v in ipairs(arr) do
    print('i = '..i)
    print('v = '.. v)
end

print('-------------------')

for i, v in pairs(arr) do
    print('p i = '..i)
    print('p v = '.. v)
end
```

打印结果：

```abnf
i = 1
v = 1
i = 2
v = 2
-----------------------
p i = 1
p v = 1
p i = 2
p v = 2
p i = name
p v = felord.cn
```

#### 返回值

像Python一样，Lua也可以返回多个返回值。不过在Redis的Lua脚本中不建议使用此特性，如果有此需求请封装为数组结构。在Spring Data Redis中支持脚本的返回值规则可以从这里分析：

```java
public static ReturnType fromJavaType(@Nullable Class<?> javaType) {

   if (javaType == null) {
      return ReturnType.STATUS;
   }
   if (javaType.isAssignableFrom(List.class)) {
      return ReturnType.MULTI;
   }
   if (javaType.isAssignableFrom(Boolean.class)) {
      return ReturnType.BOOLEAN;
   }
   if (javaType.isAssignableFrom(Long.class)) {
      return ReturnType.INTEGER;
   }
   return ReturnType.VALUE;
}
```

到此为止Redis Lua脚本所需要知识点就完了，其它的函数、协程等特性也不应该在Redis Lua脚本中出现，用到内置函数的话搜索查询一下就行了。

> 在接触一门新的技术时先要中规中矩的使用，如果你想玩花活就意味着更高的学习成本。

## 4. Redis中的Lua

接下来就是Redis Lua脚本的实际操作了。

### EVAL命令

Redis中使用`EVAL`命令来直接执行指定的Lua脚本。

```bash
EVAL luascript numkeys key [key ...] arg [arg ...]
```

- `EVAL` 命令的关键字。
- `luascript` Lua 脚本。
- `numkeys` 指定的Lua脚本需要处理键的数量，其实就是 `key`数组的长度。
- `key` 传递给Lua脚本零到多个键，空格隔开，在Lua 脚本中通过 `KEYS[INDEX]`来获取对应的值，其中`1 <= INDEX <= numkeys`。
- `arg`是传递给脚本的零到多个附加参数，空格隔开，在Lua脚本中通过`ARGV[INDEX]`来获取对应的值，其中`1 <= INDEX <= numkeys`。

接下来我简单来演示获取键`hello`的值得简单脚本：

```bash
127.0.0.1:6379> set hello world
OK
127.0.0.1:6379> get hello
"world"
127.0.0.1:6379> EVAL "return redis.call('GET',KEYS[1])" 1 hello
"world"
127.0.0.1:6379> EVAL "return redis.call('GET','hello')"
(error) ERR wrong number of arguments for 'eval' command
127.0.0.1:6379> EVAL "return redis.call('GET','hello')" 0
"world"
```

从上面的演示代码中发现，`KEYS[1]`可以直接替换为`hello`,**但是Redis官方文档指出这种是不建议的，目的是在命令执行前会对命令进行分析，以确保Redis Cluster可以将命令转发到适当的集群节点**。

> `numkeys`无论什么情况下都是必须的命令参数。

### call函数和pcall函数

在上面的例子中我们通过`redis.call()`来执行了一个`SET`命令，其实我们也可以替换为`redis.pcall()`。它们唯一的区别就在于处理错误的方式，前者执行命令错误时会向调用者直接返回一个错误；而后者则会将错误包装为一个我们上面讲的`table`表格：

```bash
127.0.0.1:6379> EVAL "return redis.call('no_command')" 0
(error) ERR Error running script (call to f_1e6efd00ab50dd564a9f13e5775e27b966c2141e): @user_script:1: @user_script: 1: Unknown Redis command called from Lua script
127.0.0.1:6379> EVAL "return redis.pcall('no_command')" 0
(error) @user_script: 1: Unknown Redis command called from Lua script
```

这就像Java遇到一个异常，前者会直接抛出一个异常；后者会把异常处理成JSON返回。

### 值转换

由于在Redis中存在Redis和Lua两种不同的运行环境，在Redis和Lua互相传递数据时必然发生对应的转换操作，这种转换操作是我们在实践中不能忽略的。例如如果Lua脚本向Redis返回小数，那么会损失小数精度；如果转换为字符串则是安全的。

```bash
127.0.0.1:6379> EVAL "return 3.14" 0
(integer) 3
127.0.0.1:6379> EVAL "return tostring(3.14)" 0
"3.14"
```

> 传递字符串、整数是安全的，**其它需要你去仔细查看官方文档并进行实际验证**。

### 原子执行

Lua脚本在Redis中是以原子方式执行的，在Redis服务器执行`EVAL`命令时，**在命令执行完毕并向调用者返回结果之前，只会执行当前命令指定的Lua脚本包含的所有逻辑，其它客户端发送的命令将被阻塞**，直到`EVAL`命令执行完毕为止。因此LUA脚本不宜编写一些过于复杂了逻辑，必须尽量保证Lua脚本的效率，否则会影响其它客户端。

### 脚本管理

#### SCRIPT LOAD

加载脚本到缓存以达到重复使用，避免多次加载浪费带宽，每一个脚本都会通过SHA校验返回唯一字符串标识。需要配合`EVALSHA`命令来执行缓存后的脚本。

```bash
127.0.0.1:6379> SCRIPT LOAD "return 'hello'"
"1b936e3fe509bcbc9cd0664897bbe8fd0cac101b"
127.0.0.1:6379> EVALSHA 1b936e3fe509bcbc9cd0664897bbe8fd0cac101b 0
"hello"
```

#### SCRIPT FLUSH

既然有缓存就有清除缓存，但是遗憾的是并没有根据SHA来删除脚本缓存，而是清除所有的脚本缓存，所以在生产中一般不会再生产过程中使用该命令。

#### SCRIPT EXISTS

以SHA标识为参数检查一个或者多个缓存是否存在。

```bash
127.0.0.1:6379> SCRIPT EXISTS 1b936e3fe509bcbc9cd0664897bbe8fd0cac101b  1b936e3fe509bcbc9cd0664897bbe8fd0cac1012
1) (integer) 1
2) (integer) 0
```

#### SCRIPT KILL

终止正在执行的脚本。**但是为了数据的完整性此命令并不能保证一定能终止成功**。如果当一个脚本执行了一部分写的逻辑而需要被终止时，该命令是不凑效的。需要执行`SHUTDOWN nosave`在不对数据执行持久化的情况下终止服务器来完成终止脚本。

### 其它一些要点

了解了上面这些知识基本上可以满足开发一些简单的Lua脚本了。但是实际开发中还是有一些要点的。

- 务必对Lua脚本进行全面测试以保证其逻辑的健壮性，当Lua脚本遇到异常时，已经执行过的逻辑是不会回滚的。
- 尽量不使用Lua提供的具有随机性的函数，参见相关官方文档。
- 在Lua脚本中不要编写`function`函数,整个脚本作为一个函数的函数体。
- 在脚本编写中声明的变量全部使用`local`关键字。
- 在集群中使用Lua脚本要确保逻辑中所有的`key`分到相同机器，也就是同一个插槽(slot)中，可采用**Redis Hash Tag**技术。
- 再次重申Lua脚本一定不要包含过于耗时、过于复杂的逻辑。