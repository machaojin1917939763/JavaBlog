---
title: ThreadLocal基本原理
order: 2
category:
  - Java面经
tag:
  - JVM
---



## 介绍 Exchanger 的底层原理及其适用场景

Exchanger 是一个用于两个线程之间交换数据的工具类，它提供了一个同步点，让两个线程在交换数据之前都达到这个点，然后进行数据的交换。Exchanger 的底层原理是基于 CAS 操作和自旋锁实现的，它维护了一个内部类 Node，用来封装线程和数据。Exchanger 有两个槽位，分别对应两个线程，当一个线程调用 exchange 方法时，会将自己的 Node 放入一个空闲的槽位，并检查另一个槽位是否有 Node，如果有，则进行数据交换，并唤醒另一个线程，如果没有，则自旋等待。如果等待超时或者线程被中断，则会抛出异常。

Exchanger 的适用场景是当两个线程需要在某个时刻互相交换数据时，比如遗传算法中的交叉操作，或者管道设计中的缓冲区交换。Exchanger 可以避免创建额外的对象，提高并发效率。

## 说一下Entry和ThreadLocal和ThreadLocalMap的关系？尽量详细一点

ThreadLocal 是一个 Java 工具类，它可以为每个线程提供一个独立的变量副本，从而实现线程的隔离，避免了多线程访问共享变量时的同步问题。ThreadLocal 的原理是通过一个 ThreadLocalMap 来存储每个线程的变量副本，ThreadLocalMap 是一个类似于 HashMap 的结构，它以 ThreadLocal 作为 key，以变量副本作为 value。

ThreadLocalMap 是 ThreadLocal 的一个静态内部类，它是一个定制化的哈希映射表，它只能被 ThreadLocal 使用。ThreadLocalMap 有一个 Entry 类型的数组 table，用来存储键值对。Entry 是 ThreadLocalMap 的另一个静态内部类，它继承了 WeakReference 类，说明 Entry 是一个弱引用。Entry 的 key 是 ThreadLocal 对象的弱引用，value 是线程本地变量的强引用。

每个线程都有一个 Thread 对象，每个 Thread 对象都有一个 threadLocals 属性，这个属性是一个 ThreadLocalMap 对象。每个 ThreadLocalMap 对象都有一个 table 属性，这个属性是一个 Entry 数组。每个 Entry 对象都有一个 key 和一个 value 属性，key 是 ThreadLocal 对象的弱引用，value 是线程本地变量的强引用。

## 那是不是ThreadLocal不能像HashMap那样存储多个值，而是只能存储一个值？

不完全是这样的，ThreadLocal 可以存储多个值，但是需要使用不同的 ThreadLocal 对象作为 key。

ThreadLocal 的 get () 和 set () 方法都是根据当前线程和 ThreadLocal 对象本身来定位 value 的，所以如果想要存储多个值，就需要创建多个 ThreadLocal 对象，每个对象对应一个 value。

例如，如果想要在一个线程中存储用户名和密码，就可以这样做：

```java
// 创建两个 ThreadLocal 对象
ThreadLocal<String> username = new ThreadLocal<>();
ThreadLocal<String> password = new ThreadLocal<>();

// 在当前线程中设置用户名和密码
username.set("Alice");
password.set("123456");

// 在当前线程中获取用户名和密码
System.out.println(username.get()); // Alice
System.out.println(password.get()); // 123456
```

这样就可以实现在一个线程中存储多个值的功能。但是这也会增加内存的开销，因为每个 ThreadLocal 对象都会占用一个 Entry 的空间。而且，如果不及时清理 ThreadLocal 对象，也会造成内存泄漏的风险。

所以，使用 ThreadLocal 时，应该根据实际的需求和场景来决定是否需要存储多个值，以及如何合理地管理 ThreadLocal 对象的生命周期。

## ThreadLocal每次在访问的时候都会清理一下key被垃圾回收回收调的value，我这样说对吗？

你这样说不完全对，ThreadLocal 在访问的时候并不会清理所有的 key 被垃圾回收回收掉的 value，而是只会清理一个。

ThreadLocalMap 的 get () 和 set () 方法都会调用一个私有的方法 expungeStaleEntry (int i)，这个方法的作用是清理 table 数组中指定索引位置的 Entry 对象，如果这个 Entry 对象的 key 已经被垃圾回收器回收了。

expungeStaleEntry (int i) 方法的具体逻辑是：

- 首先，获取 table 数组中索引为 i 的 Entry 对象 e，并将其设为 null。
- 然后，判断 e 的 value 是否为 null，如果不为 null，就将其设为 null，并将 size 属性减一。
- 接着，从 i + 1 的位置开始向后遍历 table 数组，寻找 key 为 null 的 Entry 对象，并将其移动到合适的位置，以保持哈希表的平衡。
- 最后，返回遍历到的最后一个非空 Entry 对象的索引值。

可以看出，expungeStaleEntry (int i) 方法只会清理一个 key 为 null 的 Entry 对象，并不会遍历整个 table 数组。这是为了提高效率，避免每次访问 ThreadLocal 变量时都要做大量的清理工作。

但是这样也有一个问题，就是如果 ThreadLocalMap 中存在多个 key 为 null 的 Entry 对象，而且恰好没有被访问到，那么它们就不会被清理，而其 value 还持有强引用，无法被回收。这就可能造成内存泄漏的问题。

为了避免这种情况，ThreadLocalMap 还提供了一个公共的方法 cleanSomeSlots (int i, int n)，这个方法的作用是随机地清理 table 数组中 n 个位置的 Entry 对象，如果这些 Entry 对象的 key 已经被垃圾回收器回收了。

cleanSomeSlots (int i, int n) 方法的具体逻辑是：

- 首先，获取 table 数组的长度 len，并计算一个随机数 j。
- 然后，从 j 的位置开始向后遍历 table 数组，每次跳过 len / n 个位置，直到遍历了 n 个位置或者遇到了 null。
- 接着，对于每个遍历到的位置 k，调用 expungeStaleEntry (k) 方法清理该位置的 Entry 对象。
- 最后，返回是否清理了任何 Entry 对象。

可以看出，cleanSomeSlots (int i, int n) 方法会以一定的概率清理 table 数组中多个 key 为 null 的 Entry 对象，并不会遍历整个 table 数组。这是为了平衡效率和内存占用，避免每次访问 ThreadLocal 变量时都要做大量的清理工作，也避免让 key 为 null 的 Entry 对象长时间占用内存空间。

但是这样也有一个问题，就是如果 ThreadLocalMap 中存在多个 key 为 null 的 Entry 对象，而且恰好没有被 cleanSomeSlots (int i, int n) 方法选中，那么它们就不会被清理，而其 value 还持有强引用，无法被回收。这就可能造成内存泄漏的问题。

因此，在使用 ThreadLocal 时，应该在不需要使用 ThreadLocal 变量时，调用其 remove () 方法，显式地清除 value 引用。这样可以保证 ThreadLocalMap 中不存在 key 为 null 的 Entry 对象，从而避免内存泄漏的风险。

## ThreadLocal 父子线程之间如何传递数据

ThreadLocal 是一种 Java 工具类，它可以为每个线程提供一个独立的变量副本，从而实现线程的隔离，避免了多线程访问共享变量时的同步问题。但是，有时候我们也需要在父子线程之间传递一些数据，比如用户的身份信息，请求的上下文等。这时候，我们可以使用 ThreadLocal 的一个子类，叫做 InheritableThreadLocal。

InheritableThreadLocal 的作用是让子线程能够继承父线程的 ThreadLocal 变量。它的原理是在创建子线程时，把父线程的 ThreadLocalMap 复制一份给子线程，这样子线程就可以访问到父线程的 ThreadLocal 变量。当然，这个复制过程是浅拷贝，也就是说只复制了引用，而不是值。所以，如果父子线程中的 ThreadLocal 变量指向的是同一个对象，那么它们对这个对象的修改会相互影响。

使用 InheritableThreadLocal 的方法很简单，只需要把 ThreadLocal 对象替换为 InheritableThreadLocal 对象即可。例如：

```java
// 创建一个 InheritableThreadLocal 对象
InheritableThreadLocal<String> itl = new InheritableThreadLocal<>();

// 在父线程中设置值
itl.set("Hello");

// 在子线程中获取值
new Thread(new Runnable() {
    @Override
    public void run() {
        System.out.println(itl.get()); // Hello
    }
}).start();
```

这样就可以实现父子线程之间的数据传递了。但是，使用 InheritableThreadLocal 也有一些注意事项：

- InheritableThreadLocal 只能在创建子线程时继承一次，如果父线程在创建子线程后又修改了 ThreadLocal 变量，那么子线程是无法感知到的。
- InheritableThreadLocal 不能解决孙子线程或更深层次的数据传递问题，因为它只能从直接的父线程继承数据。
- InheritableThreadLocal 会增加内存开销和垃圾回收压力，因为它会复制父线程的 ThreadLocalMap 给子线程，而且如果不及时清理 ThreadLocal 变量，可能会造成内存泄漏。