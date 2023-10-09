---
# 当前页面内容标题
title: CVTE一面
# 当前页面图标
icon: write
# 分类
category:
  - 面试真题
# 标签
tag:
  - Java
---

## 自我介绍

## 问实习（具体场景，针对自己负责的模块进行解释，为什么要那么做，还问到设计模式）

## hashmap结构以及put流程

## ConcurrentHashMap的结构

## 为什么ConcurrentHashMap要把锁从ReentrantLock换成Synchronized+CAS锁

在Java 8之前的版本中，ConcurrentHashMap使用了一种基于分段锁（Segment）的设计，每个段都由一个ReentrantLock来保护。这种设计在提供一定的并发性能的同时，也引入了一些开销，比如每个段都需要维护一个独立的锁。

Java 8引入了一种新的并发编程方式，即使用CAS（Compare and Swap）操作和synchronized关键字的组合，来替代ReentrantLock的使用。CAS是一种无锁算法，它使用原子性的操作来实现并发控制，而不需要显式地使用锁。

通过将ReentrantLock替换为CAS+synchronized的组合，ConcurrentHashMap在Java 8中获得了更好的并发性能。这种改变的主要原因有以下几点：

1. 减少锁的粒度：使用分段锁的方式，每个段都需要维护一个独立的锁，这会增加锁的粒度，可能导致较高的锁竞争。而CAS+synchronized的组合方式可以减少锁的粒度，提高并发性能。

2. 无锁算法的优势：CAS是一种无锁算法，它利用原子性的操作来实现并发控制，避免了传统锁机制中的锁竞争和上下文切换的开销。这使得ConcurrentHashMap在高并发场景下具有更好的性能和可伸缩性。

3. 简化设计和实现：使用CAS+synchronized的组合方式可以简化ConcurrentHashMap的设计和实现。相比于维护多个独立的锁，使用无锁算法可以减少复杂性和潜在的错误。

需要注意的是，CAS+synchronized的组合方式并不是适用于所有情况的最佳选择。具体的并发控制策略需要根据应用程序的需求和具体的并发访问模式来选择。在某些特定的场景中，使用其他的并发控制算法或数据结构可能更加适合。

## concurrentHashMap的put流程

## ConcurrentHashMap的锁加在哪里？

## 如果两个线程并发修改hash值相同，key不同的值，会加锁吗？

## 说一下ConcurrentHashMap是如何进行加锁的

## 说一下synchronized的锁升级过程

## 如果在ConcurrentHashMap进行CAS自旋获取不到锁，会怎么办？

## volatile有了解吗？

## volatile解决了什么问题？

## JVM有了解吗？说一下内存区域的划分

## 说一下垃圾回收器G1和其他垃圾回收器的区别

## 如果一个对象很大，新生代装不下了，会发生什么？

## 如果分配一个大对象，并且到达老年代内存的90%会发生什么？

## 说一下Spring

## SpringBoot的自动装配原理

## http状态码，针对503提出的问题

## 压测排查问题的流程

## 平时使用redis的场景是什么？

## redis的hash结构？

## Redis的string结构？

## 反问

```

 HSET movie:11002 title "Star Wars: Episode V - The Empire Strikes Back" plot "After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued by Darth Vader and a bounty hunter named Boba Fett all over the galaxy." release_year 1980 genre "Action" rating 8.7 votes 1127635 imdb_id tt0080684
 HSET movie:11003 title "The Godfather" plot "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son." release_year 1972 genre "Drama" rating 9.2 votes 1563839 imdb_id tt0068646

HSET movie:11004 title "Heat" plot "A group of professional bank robbers start to feel the heat from police when they unknowingly leave a clue at their latest heist." release_year 1995 genre "Thriller" rating 8.2 votes 559490 imdb_id tt0113277

HSET "movie:11005" title "Star Wars: Episode VI - Return of the Jedi" genre "Action" votes 906260 rating 8.3 release_year 1983  plot "The Rebels dispatch to Endor to destroy the second Empire's Death Star." ibmdb_id "tt0086190" 

```

