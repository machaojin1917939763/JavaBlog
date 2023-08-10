---
title: AQS实现类基本原理
order: 2
category:
  - Java面经
tag:
  - JUC
---



## 介绍 CountDownLatch 的底层原理及其适用场景

CountDownLatch 是一个同步工具类，它可以让一个或多个线程等待，直到一组操作在其他线程中完成。它的底层原理和适用场景如下：

- 底层原理：CountDownLatch 是基于 AQS（AbstractQueuedSynchronizer）实现的。它内部维护了一个共享的同步状态（state），该状态表示需要等待的线程数量。当创建 CountDownLatch 时，可以指定初始的 state 值，表示需要等待的线程数量。当一个线程调用 countDown() 方法时，它会将 state 值减一，如果 state 值变为零，表示所有需要等待的线程都已经完成了操作，那么它会唤醒所有在 await() 方法上阻塞的线程，让它们继续执行。如果 state 值不为零，表示还有未完成的线程，那么它会将自己加入到 AQS 的同步队列中，并进入阻塞状态，直到被唤醒或者被中断。CountDownLatch 的 state 值只能被设置一次，而且不能被重置，这意味着 CountDownLatch 只能使用一次。
- 适用场景：CountDownLatch 可以用于以下两种场景：
  - 让多个线程等待：例如，模拟高并发场景，让一组线程在指定时刻同时执行某个操作。这时可以创建一个初始值为 1 的 CountDownLatch，并让所有线程在执行前调用 await() 方法进行等待。然后在主线程中调用 countDown() 方法将 state 值减为零，这样所有线程就会同时开始执行。这相当于 CountDownLatch 充当了一个发令枪的角色。
  - 让单个线程等待：例如，主线程需要等待多个子线程完成各自的任务后，再进行汇总或者后续操作。这时可以创建一个初始值为子线程数量的 CountDownLatch，并让每个子线程在完成任务后调用 countDown() 方法进行递减。然后在主线程中调用 await() 方法进行阻塞，直到 state 值变为零，表示所有子线程都已经完成任务，那么主线程就可以继续执行。

## 介绍 CyclicBarrier 的底层原理及其适用场景，和 CountDownLatch 有什么不同

CyclicBarrier 是一个同步工具类，它可以让一组线程在达到一个共同的屏障点时互相等待，然后同时继续执行后续的操作。它的底层原理和适用场景如下：

- 底层原理：CyclicBarrier 是基于 AQS（AbstractQueuedSynchronizer）实现的。它内部维护了一个共享的同步状态（state），该状态表示需要等待的线程数量。当创建 CyclicBarrier 时，可以指定初始的 state 值，表示需要等待的线程数量。也可以指定一个 Runnable 参数，表示当所有线程都到达屏障点后要执行的任务。当一个线程调用 await() 方法时，它会将 state 值减一，如果 state 值变为零，表示所有需要等待的线程都已经到达屏障点，那么它会唤醒所有在 await() 方法上阻塞的线程，并执行 Runnable 任务（如果有的话）。如果 state 值不为零，表示还有未到达的线程，那么它会将自己加入到 AQS 的同步队列中，并进入阻塞状态，直到被唤醒或者被中断。CyclicBarrier 的 state 值可以被重置，这意味着 CyclicBarrier 可以重复使用。
- 适用场景：CyclicBarrier 可以用于以下两种场景：
  - 让多个线程同时开始：例如，模拟高并发场景，让一组线程在指定时刻同时执行某个操作。这时可以创建一个初始值为线程数量的 CyclicBarrier，并让所有线程在执行前调用 await() 方法进行等待。然后在主线程中调用 await() 方法将 state 值减为零，这样所有线程就会同时开始执行。这相当于 CyclicBarrier 充当了一个发令枪的角色。
  - 让多个线程同时结束：例如，主线程需要等待多个子线程完成各自的任务后，再进行汇总或者后续操作。这时可以创建一个初始值为子线程数量的 CyclicBarrier，并让每个子线程在完成任务后调用 await() 方法进行递减。然后在主线程中调用 await() 方法进行阻塞，直到 state 值变为零，表示所有子线程都已经完成任务，那么主线程就可以继续执行。

CyclicBarrier 和 CountDownLatch 的区别主要有以下几点：

- CountDownLatch 的计数器只能使用一次，而 CyclicBarrier 的计数器可以使用 reset() 方法重置。
- CountDownLatch 的基本操作组合是 countDown()/await()。调用 await() 的线程阻塞等待 countDown() 足够多的次数，不管你是在一个线程还是多个线程里 countDown()，只要次数足够即可。
- CyclicBarrier 的基本操作组合则是 await()/await()。当所有伙伴（parties）都调用了 await()，才会继续进行任务，并自动进行重置。
- CountDownLatch 操作的是事件，阻塞足够多的次数即可，不管几个线程；而 CyclicBarrier 侧重点是线程，强调多个线程间互相等待，同时结束。

## 介绍 Semaphore 的底层原理及其适用场景

Semaphore 是一种同步工具类，它可以用来控制同时访问特定资源的线程数量，通过协调各个线程，以保证合理的使用资源。它的底层原理和适用场景如下：

- 底层原理：Semaphore 是基于 AQS（AbstractQueuedSynchronizer）实现的。它内部维护了一个共享的同步状态（state），该状态表示剩余的许可数量。当创建 Semaphore 时，可以指定初始的 state 值，表示最大的许可数量。也可以指定一个公平参数，表示是否使用公平的策略分配许可。当一个线程调用 acquire() 方法时，它会尝试从 state 中减去一个许可，如果 state 大于等于 0，表示获取许可成功，如果 state 小于 0，表示获取许可失败，线程将被加入到 AQS 的同步队列中，并进入阻塞状态，直到被唤醒或者被中断。当一个线程调用 release() 方法时，它会将 state 增加一个许可，并尝试唤醒同步队列中的一个等待线程。
- 适用场景：Semaphore 可以用于以下两种场景：
  - 限流：例如，数据库连接池，同时进行连接的线程有数量限制，连接不能超过一定的数量，当连接达到了限制数量后，后面的线程只能排队等前面的线程释放了数据库连接才能获得数据库连接。
  - 资源分配：例如，停车场场景，车位数量有限，同时只能容纳多少台车，车位满了之后只有等里面的车离开停车场外面的车才可以进入。

Semaphore 和 CountDownLatch、CyclicBarrier 的区别主要有以下几点：

- Semaphore 的计数器可以被任意线程增加或减少，而 CountDownLatch 的计数器只能被减少，CyclicBarrier 的计数器只能在所有线程都到达屏障点后被重置。
- Semaphore 可以用于实现互斥锁或者共享锁，而 CountDownLatch 和 CyclicBarrier 只能用于实现共享锁。