---
title: RocketMQ
order: 2
category:
  - RocketMQ
tag:
  - RocketMQ
---



## 现在请介绍一下RacketMQ

RocketMQ 是由阿里巴巴开发的一个开源的分布式消息传递和队列模型中间件。它旨在为大规模消息和交易处理提供低延迟、高可用、高吞吐量的解决方案。

以下是 RocketMQ 的主要特点和组件：

1. **高性能和可伸缩性**：RocketMQ 可以处理大量的消息，提供毫秒级的延迟和高吞吐量。
2. **容错和高可用性**：RocketMQ 支持分布式部署，允许在**节点失败的情况下继续提供服务**。
3. **顺序消息**：RocketMQ 支持严格的消息顺序，并能确保消息按照其发送的顺序进行消费。
4. **事务消息**：RocketMQ 支持发布/订阅事务消息，从而确保消息的可靠传输。
5. **消息延迟和定时**：RocketMQ 支持发送延迟消息和定时消息。
6. **消息过滤**：RocketMQ 支持基于多种属性的消息过滤。

主要组件：

1. **Name Server**：作为元数据的轻量级角色，它维护了生产者和消费者的路由信息。RocketMQ 客户端通过查询 Name Server 来找到对应的 Broker。
2. **Broker**：真正存储消息的组件，处理消息的发送和消费。它可以水平扩展。
3. **Producer**：消息生产者，它发送消息到 RocketMQ 的 Broker。
4. **Consumer**：消息消费者，它从 Broker 拉取消息并处理。

RocketMQ 在大规模分布式系统、实时数据处理和日志收集等多种场景中都已经得到广泛应用。

## 什么是nameServer？

NameServer 在 RocketMQ 中扮演了非常关键的角色。它是 RocketMQ 的元数据服务提供者，但与其他的消息中间件的元数据组件不同，RocketMQ 的 NameServer 不存储消息，只提供轻量级的元数据服务。

以下是 NameServer 的主要功能和特点：

1. **路由注册**：Broker 启动后，会向所有的 NameServer 注册其路由信息。同样，Producer 和 Consumer 在启动时也会从 NameServer 获取 Broker 的路由信息。

2. **无状态和相互独立**：每个 NameServer 是相互独立的，不会相互通信。它们存储相同的路由信息，但不会进行信息同步。这意味着，如果某个 NameServer 失败，其他的 NameServer 仍然可以继续提供服务。

3. **负载均衡**：虽然 NameServer 不直接涉及消息路由，但它为 Producer 和 Consumer 提供了关于 Broker 的信息，使得客户端能够实现负载均衡。

4. **快速故障转移**：当某个 Broker 失效或者宕机，Producer 和 Consumer 可以迅速地从 NameServer 获取其他可用的 Broker 的信息。

5. **简单和高效**：由于 NameServer 只处理轻量级的元数据，它的设计和实现都相对简单，可以确保高效的运行和快速的响应。

NameServer 在 RocketMQ 的体系结构中起到了关键的路由服务角色，确保了 Producer 和 Consumer 可以找到合适的 Broker 进行消息的发送和接收。

## 什么是broker？

在 RocketMQ 中，Broker 扮演的是核心角色，是真正进行消息存储、读写的组件。以下是关于 Broker 的详细描述：

1. **消息存储与读写**：Broker 负责消息的存储、管理和分发。当生产者（Producer）发送消息时，这些消息被存储在 Broker 上。当消费者（Consumer）需要读取消息时，它从 Broker 获取。
2. **高可用性**：为了提供高可用性和故障转移能力，Broker 可以配置成集群模式。在这种模式下，一个主 Broker（Master）和一个或多个从 Broker（Slave）运行。主 Broker 用于读写，而从 Broker 主要用于备份和故障转移。
3. **消息过滤**：Broker 支持基于标签的消息过滤，这允许消费者只订阅其感兴趣的消息。
4. **顺序消息和事务消息**：Broker 能够支持严格的消息顺序以及处理事务消息。
5. **消息积压和清理**：Broker 会对旧的消息进行清理，确保存储不被填满。同时，它还提供了延迟消息和定时消息的功能。
6. **与 NameServer 交互**：Broker 定期向 NameServer 注册或更新其路由信息。这确保了生产者和消费者能够知道哪个 Broker 是活动的或者可用的。
7. **负载均衡**：Broker 支持多种负载均衡策略，确保消息的分发均匀且高效。

总的来说，Broker 是 RocketMQ 的核心组件，承担了消息的存储和分发工作。通过与其他组件（如 NameServer、Producer 和 Consumer）的协同工作，它确保了消息的高效、可靠和有序的传输。

## 我能在docker中同时启动多个broker吗？这样能不能实现高可用，如果实现高可用，需要怎么操作？

是的，你可以在 Docker 中同时启动多个 Broker，而这正是实现 RocketMQ 高可用性（HA）的方法之一。

高可用性在 RocketMQ 中通常通过主/从（Master/Slave）复制来实现。简单来说，当你启动一个主（Master）Broker 后，你可以启动一个或多个从（Slave）Broker，这些从 Broker 将复制主 Broker 的数据。当主 Broker 失效时，从 Broker 可以接管并继续服务。

为了在 Docker 中实现 RocketMQ 的 HA，你可以采取以下步骤：

1. **启动 NameServer**：首先，确保你的 NameServer 在运行。如前面所述，NameServer 存储 Broker 的路由信息。

2. **启动 Master Broker**：启动主 Broker 实例。

3. **启动 Slave Broker**：启动一个或多个从 Broker 实例。这些实例需要与主 Broker 有相同的 Broker 名称，但具有不同的 `brokerId`。通常，主 Broker 的 `brokerId` 是 0，而从 Broker 的 `brokerId` 开始于 1。

4. **配置**：确保你的 Broker 的配置中启用了同步复制（Synchronous replication）或异步复制（Asynchronous replication）。这是通过 `brokerRole` 配置项完成的，它可以设置为 `SYNC_MASTER`、`ASYNC_MASTER`、`SLAVE` 等。

5. **网络**：确保 Docker 网络配置允许 Broker 实例之间的通信。使用 Docker 的 bridge 网络或其他网络解决方案，确保所有 Broker 容器都在同一个网络中。

6. **生产者和消费者配置**：当配置生产者和消费者时，确保它们知道所有的 NameServer 地址，并设置为使用自动故障转移。

通过上述步骤，你可以在 Docker 中实现 RocketMQ 的高可用性。但请注意，实际生产环境中的设置可能需要进一步的优化和调整，以确保最佳的性能和可靠性。

## 那如何通过命令启动多个broker呢？

要在 Docker 中启动多个 RocketMQ Broker（例如主 Broker 和从 Broker），你需要遵循以下步骤：

1. **启动 NameServer**（如果还没启动）：
   ```bash
   docker run -d -p 9876:9876 --name rmqnamesrv rocketmqinc/rocketmq namesrv
   ```

2. **启动 Master Broker**：
   ```bash
   docker run -d -p 10909:10909 -p 10911:10911 --name rmqmaster --link rmqnamesrv:namesrv rocketmqinc/rocketmq sh mqbroker -n namesrv:9876 -c /path/to/master/broker.properties
   ```

   在此命令中，我们使用 `-c` 指定 Master Broker 的配置文件。`/path/to/master/broker.properties` 应替换为实际配置文件的路径。

3. **启动 Slave Broker**：
   
   ```bash
   docker run -d -p 11909:11909 -p 11911:11911 --name rmqslave --link rmqnamesrv:namesrv rocketmqinc/rocketmq sh mqbroker -n namesrv:9876 -c /path/to/slave/broker.properties
   ```
   
   注意我们为从 Broker 分配了不同的端口（例如，11909 和 11911）。此外，`/path/to/slave/broker.properties` 应替换为 Slave Broker 的配置文件路径。
   
   在 `broker.properties` 文件中，确保以下内容正确设置：
   
   - 对于 Master Broker：
     ```properties
     brokerId=0
     brokerName=SomeBrokerName
     brokerRole=ASYNC_MASTER
     ```
   
   - 对于 Slave Broker：
     ```properties
     brokerId=1
     brokerName=SomeBrokerName
     brokerRole=SLAVE
     ```
   
   其中，`SomeBrokerName` 应该是两个 Broker 共享的同一名称。

通过这些步骤，你应该可以在 Docker 中成功启动一个主 Broker 和一个从 Broker，实现 RocketMQ 的高可用性配置。如果你想启动更多的从 Broker，只需根据需要进行适当的端口映射和配置调整。

## 那如何通过命令启动多个broker呢？

要在 Docker 中启动多个 RocketMQ Broker（例如主 Broker 和从 Broker），你需要遵循以下步骤：

1. **启动 NameServer**（如果还没启动）：
   ```bash
   docker run -d -p 9876:9876 --name rmqnamesrv rocketmqinc/rocketmq namesrv
   ```

2. **启动 Master Broker**：
   ```bash
   docker run -d -p 10909:10909 -p 10911:10911 --name rmqmaster --link rmqnamesrv:namesrv rocketmqinc/rocketmq sh mqbroker -n namesrv:9876 -c /path/to/master/broker.properties
   ```

   在此命令中，我们使用 `-c` 指定 Master Broker 的配置文件。`/path/to/master/broker.properties` 应替换为实际配置文件的路径。

3. **启动 Slave Broker**：
   ```bash
   docker run -d -p 11909:11909 -p 11911:11911 --name rmqslave --link rmqnamesrv:namesrv rocketmqinc/rocketmq sh mqbroker -n namesrv:9876 -c /path/to/slave/broker.properties
   ```

   注意我们为从 Broker 分配了不同的端口（例如，11909 和 11911）。此外，`/path/to/slave/broker.properties` 应替换为 Slave Broker 的配置文件路径。

   在 `broker.properties` 文件中，确保以下内容正确设置：

   - 对于 Master Broker：
     ```properties
     brokerId=0
     brokerName=SomeBrokerName
     brokerRole=ASYNC_MASTER
     ```

   - 对于 Slave Broker：
     ```properties
     brokerId=1
     brokerName=SomeBrokerName
     brokerRole=SLAVE
     ```

   其中，`SomeBrokerName` 应该是两个 Broker 共享的同一名称。

通过这些步骤，你应该可以在 Docker 中成功启动一个主 Broker 和一个从 Broker，实现 RocketMQ 的高可用性配置。如果你想启动更多的从 Broker，只需根据需要进行适当的端口映射和配置调整。

## 我现在已经有一个broker了，还需要继续运行第二步吗？

不，如果你已经有一个运行中的 Master Broker，那么不需要再次运行第二步。为了增加从 Broker，你只需要执行第三步来启动一个或多个 Slave Broker。

为了添加一个 Slave Broker，可以这样做：

1. **启动 Slave Broker**：

```bash
docker run -d -p 11909:11909 -p 11911:11911 --name rmqslave1 --link rmqnamesrv:namesrv rocketmqinc/rocketmq sh mqbroker -n namesrv:9876 -c /path/to/slave/broker.properties
```

确保你的 `broker.properties` 为从 Broker 配置：

```properties
brokerId=1
brokerName=YourBrokerName
brokerRole=SLAVE
```

其中，`YourBrokerName` 是 Master Broker 和 Slave Broker 共享的名称。

如果你想添加更多的从 Broker，只需根据需要进行适当的端口映射和配置调整，然后相应地增加 `brokerId`（例如，2、3等）。

## broker.properties文件在哪？

在 RocketMQ 的默认配置中，`broker.properties` 文件并不直接存在。但是，RocketMQ 提供了示例配置文件，您可以基于这些示例创建您自己的 `broker.properties` 文件。

如果您使用的是官方的 RocketMQ Docker 镜像，这些示例配置文件可能位于容器的 `/opt/rocketmq-${version}/conf/` 目录下（其中 `${version}` 是您的 RocketMQ 版本）。

要查看和编辑这些配置文件，你可以如下操作：

1. **进入 Broker 容器**：
   ```bash
   docker exec -it rmqbroker /bin/sh
   ```

2. **导航到配置目录并列出所有文件**：
   ```bash
   cd /opt/rocketmq-${version}/conf/
   ls
   ```

3. **使用 vi 或其他文本编辑器查看或编辑配置文件**：
   ```bash
   vi 2m-2s-async/broker-a.properties
   ```

但是，如果你打算在 Docker 中持久化配置或分享配置，你可能需要将配置文件从容器复制到宿主机上，然后在运行容器时将其挂载回容器。这样，即使容器被删除，你的配置也会保持不变。

例如，为了从容器复制配置到宿主机并再次挂载它，你可以：

1. **从容器复制到宿主机**：
   
   ```bash
   docker cp rmqbroker:/opt/rocketmq-${version}/conf/2m-2s-async/broker-a.properties /path/on/host/
   ```
   
2. 当你启动一个新的 Broker 容器时，将配置从宿主机挂载回容器：
   ```bash
   docker run ... -v /path/on/host/broker-a.properties:/opt/rocketmq-${version}/conf/2m-2s-async/broker-a.properties ...
   ```

记住替换上述命令中的占位符，如 `${version}` 和 `/path/on/host/`。

## 主从复制

运行一个Master和两个Slaves，我为你准备了配置和相应的Docker启动命令。

**1. 配置**:
你需要为每个Broker实例维护一个单独的配置文件。

**broker-a-master.properties**:
```properties
brokerClusterName=DefaultCluster
brokerName=broker-a
brokerId=0
deleteWhen=04
fileReservedTime=48
brokerRole=ASYNC_MASTER
flushDiskType=ASYNC_FLUSH
```

**broker-a-slave1.properties**:
```properties
brokerClusterName=DefaultCluster
brokerName=broker-a
brokerId=1
brokerRole=SLAVE
```

**broker-a-slave2.properties**:
```properties
brokerClusterName=DefaultCluster
brokerName=broker-a
brokerId=2
brokerRole=SLAVE
```

**2. Docker启动命令**:

启动Master:
```bash
docker run -d -p 10909:10909 -p 10911:10911 -v D:/MyEnvironment/rocketmq/rocaketmq/conf/2m-2s-async:/opt/rocketmq-4.4.0/conf/2m-2s-async --name rmqmaster --link rmqnamesrv:namesrv rocketmqinc/rocketmq sh mqbroker -n namesrv:9876 -c /opt/rocketmq-4.4.0/conf/2m-2s-async/broker-a-master.properties
```

启动Slave1:
```bash
docker run -d -p 11909:11909 -p 11911:11911 -v D:/MyEnvironment/rocketmq/rocaketmq/conf/2m-2s-async:/opt/rocketmq-4.4.0/conf/2m-2s-async --name rmqslave1 --link rmqnamesrv:namesrv rocketmqinc/rocketmq sh mqbroker -n namesrv:9876 -c /opt/rocketmq-4.4.0/conf/2m-2s-async/broker-a-slave1.properties
```

启动Slave2:
```bash
docker run -d -p 12909:12909 -p 12911:12911 -v D:/MyEnvironment/rocketmq/rocaketmq/conf/2m-2s-async:/opt/rocketmq-4.4.0/conf/2m-2s-async --name rmqslave2 --link rmqnamesrv:namesrv rocketmqinc/rocketmq sh mqbroker -n namesrv:9876 -c /opt/rocketmq-4.4.0/conf/2m-2s-async/broker-a-slave2.properties
```

注意：确保你的配置文件路径正确，并且在启动命令中提到的这些端口在宿主机上都是可用的。如果你的RocketMQ Docker镜像版本或文件路径与示例不符，可能需要进行相应的调整。

`D:/MyEnvironment/rocketmq/rocaketmq/conf/2m-2s-async:/opt/rocketmq-4.4.0/conf/2m-2s-async`与`/opt/rocketmq-4.4.0/conf/2m-2s-async/broker-a-slave2.properties`需要与实际的路径进行替换

一旦你按照上述命令启动了Brokers，你应该能在RocketMQ控制台上看到一个Master和两个Slaves。

```

C:\Users\machaojin>docker network connect rmqnetwork rmqnamesrv

C:\Users\machaojin>docker network connect rmqnetwork rmqbmaster

C:\Users\machaojin>docker network connect rmqnetwork rmqconsole

C:\Users\machaojin>docker exec -it rmqconsole ping rmqnamesrv
PING rmqnamesrv (172.19.0.2): 56 data bytes
64 bytes from 172.19.0.2: icmp_seq=0 ttl=64 time=0.389 ms
64 bytes from 172.19.0.2: icmp_seq=1 ttl=64 time=0.059 ms
64 bytes from 172.19.0.2: icmp_seq=2 ttl=64 time=0.097 ms
64 bytes from 172.19.0.2: icmp_seq=3 ttl=64 time=0.128 ms
```

```
docker network connect rmqnetwork rmqslave1
docker network connect rmqnetwork rmqslave2
docker network connect rmqnetwork rmqmaster
docker network connect rmqnetwork rmqconsole
docker network connect rmqnetwork rmqnamesrv
```

```
docker run -d -p 9876:9876 --name rmqnamesrv rocketmqinc/rocketmq /opt/rocketmq-4.4.0/bin/mqnamesrv
```

```
docker run -d -p 8181:8080 -e "JAVA_OPTS=-Drocketmq.namesrv.addr=rmqnamesrv:9876 -Dcom.rocketmq.sendMessageWithVIPChannel=false" --name rmqconsole styletang/rocketmq-console-ng
```

```shell
docker run -d --restart=always -p 9876:9876  --name rmqnamesrv rocketmqinc/rocketmq /opt/rocketmq-4.4.0/bin/mqnamesrv

docker run -d --restart=always -p 8181:8080 -e "JAVA_OPTS=-Drocketmq.namesrv.addr=rmqnamesrv:9876 -Dcom.rocketmq.sendMessageWithVIPChannel=false" --name rmqconsole styletang/rocketmq-console-ng

docker run -d --restart=always -p 10909:10909 -p 10911:10911  -v D:/MyEnvironment/rocketmq/rocaketmq/conf/2m-2s-async:/opt/rocketmq-4.4.0/conf/2m-2s-async --name rmqmaster1 --link rmqnamesrv:namesrv rocketmqinc/rocketmq sh mqbroker -n namesrv:9876 -c /opt/rocketmq-4.4.0/conf/2m-2s-async/broker-a-master.properties

docker run -d --restart=always -p 13909:13909 -p 13911:13911  -v D:/MyEnvironment/rocketmq/rocaketmq/conf/2m-2s-async:/opt/rocketmq-4.4.0/conf/2m-2s-async --name rmqmaster2 --link rmqnamesrv:namesrv rocketmqinc/rocketmq sh mqbroker -n namesrv:9876 -c /opt/rocketmq-4.4.0/conf/2m-2s-async/broker-a-s.properties

docker run -d --restart=always -p 11909:11909 -p 11911:11911  -v D:/MyEnvironment/rocketmq/rocaketmq/conf/2m-2s-async:/opt/rocketmq-4.4.0/conf/2m-2s-async --name  rmqslave1 --link rmqnamesrv:namesrv rocketmqinc/rocketmq sh mqbroker -n namesrv:9876 -c /opt/rocketmq-4.4.0/conf/2m-2s-async/broker-b.properties

docker run -d --restart=always -p 12909:12909 -p 12911:12911  -v D:/MyEnvironment/rocketmq/rocaketmq/conf/2m-2s-async:/opt/rocketmq-4.4.0/conf/2m-2s-async --name  rmqslave2 --link rmqnamesrv:namesrv rocketmqinc/rocketmq sh mqbroker -n namesrv:9876 -c /opt/rocketmq-4.4.0/conf/2m-2s-async/broker-b-s.properties

docker network connect rmqnetwork rmqslave1
docker network connect rmqnetwork rmqslave2
docker network connect rmqnetwork rmqmaster1
docker network connect rmqnetwork rmqmaster2
docker network connect rmqnetwork rmqconsole
docker network connect rmqnetwork rmqnamesrv

docker stop rmqconsole rmqnamesrv rmqmaster1 rmqmaster2 rmqmaster1 rmqslave1 rmqslave2 

docker rm rmqconsole rmqnamesrv rmqmaster1 rmqmaster2 rmqmaster1 rmqslave1 rmqslave2 

docker restart rmqconsole rmqnamesrv rmqmaster1 rmqmaster2 rmqmaster1 rmqslave1 rmqslave2  
```

```
docker run -d -p 9876:9876 --name apache-rmqnamesrv apache/rocketmq mqnamesrv
docker run -d -p 8181:8080 -e "JAVA_OPTS=-Drocketmq.namesrv.addr=apache-rmqnamesrv:9876 -Dcom.rocketmq.sendMessageWithVIPChannel=false" --name apache-rmqconsole styletang/rocketmq-console-ng
```

