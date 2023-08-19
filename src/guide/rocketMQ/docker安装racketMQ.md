---
title:  docker安装racketMQ
order: 2
category:
  - 技术文档
tag:
  - 技术文档
---



## docker安装racketMQ

安装 RocketMQ 使用 Docker 是一个很好的选择，因为它简化了部署和管理过程。以下是使用 Docker 安装 RocketMQ 的步骤：

1. **确保 Docker 已安装**: 在开始前，确保你已经安装了 Docker。如果没有，你可以从 Docker 官方网站下载并安装。

2. **拉取 RocketMQ 镜像**: RocketMQ 提供了官方 Docker 镜像，你可以通过以下命令拉取：

   ```bash
   docker pull rocketmqinc/rocketmq
   ```

3. **启动 NameServer**: NameServer 是 RocketMQ 的命名服务，用于管理 Broker。使用以下命令启动 NameServer：

   ```
   docker run -d -p 9876:9876 --name rmqnamesrv rocketmqinc/rocketmq namesrv
   ```

4. **启动 Broker**: Broker 是存储和转发消息的服务器。使用以下命令启动 Broker：

   ```
   docker run -d -p 10911:10911 -p 10909:10909 --name rmqbroker --link rmqnamesrv:namesrv -e "NAMESRV_ADDR=namesrv:9876" rocketmqinc/rocketmq sh mqbroker
   ```

5. **验证 RocketMQ 安装**: 你可以登录到 Broker 容器内部，使用 RocketMQ 提供的工具验证安装是否成功：

   ```
   docker exec -it rmqbroker /bin/sh
   ```

以上步骤会启动一个简单的 RocketMQ 服务。在生产环境中，你可能需要配置更多的细节，例如数据存储、集群配置等。

如果你想使用 RocketMQ 的控制台进行管理和监控，你还需要另外安装 RocketMQ 控制台的 Docker 镜像。

## 如果发生错误

### C:\Users\machaojin>docker run -d -p 9876:9876 --name rmqnamesrv rocketmqinc/rocketmq namesrv dd1d3646292f4e331a49a40adfe84e2b2301b7d62a95b10ae15d5d19c94157ab docker: Error response from daemon: failed to create task for container: failed to create shim task: OCI runtime create failed: runc create failed: unable to start container process: exec: "namesrv": executable file not found in $PATH: unknown.

出现这个问题是因为 RocketMQ 的 Docker 镜像结构和启动命令可能已经发生了更改，导致 `namesrv` 命令无法直接在容器中运行。

为了解决这个问题，我建议以下几个步骤：

1. **进入 RocketMQ 的 Docker 容器**，查看可用的启动命令和目录结构：
   ```bash
   docker run -it rocketmqinc/rocketmq /bin/bash
   ```

   在容器内，你可以使用 `ls` 和 `cd` 命令来浏览目录，找到正确的 `namesrv` 可执行文件位置。

2. **检查 RocketMQ Docker 镜像的文档或 GitHub 仓库**。开发者可能已经更新了启动容器的指南或命令，你可以根据最新的指南进行操作。

3. **使用正确的路径来启动 NameServer**。如果你在第一步中找到了 `namesrv` 的正确路径，例如 `/path/to/namesrv`，那么启动 NameServer 的命令可能会类似于：
   ```bash
   docker run -d -p 9876:9876 --name rmqnamesrv rocketmqinc/rocketmq /path/to/namesrv
   ```

4. 如果你没有在容器中找到任何有关 `namesrv` 的信息，你可能需要考虑使用其他版本的 RocketMQ Docker 镜像或检查是否有其他更新的启动指南。

### Error response from daemon: Cannot restart container 90efd13e594d: Cannot link to a non running container: /rmqnamesrv AS /rmqbroker/namesrv

此错误表示你试图运行一个容器（在这种情况下是`rmqbroker`）并将其链接到另一个尚未运行的容器（`rmqnamesrv`）。你之前尝试启动的`rmqnamesrv`容器似乎并没有正确启动或已停止。

请按照以下步骤操作：

1. **检查 rmqnamesrv 的状态**:
   使用以下命令来查看所有的 Docker 容器和它们的状态：
   ```bash
   docker ps -a
   ```
   如果 `rmqnamesrv` 容器的状态不是 `Up`（运行中），那么它可能未正确启动或已经停止。

2. **重新启动 rmqnamesrv**:
   如果 `rmqnamesrv` 容器已停止，你可以尝试使用以下命令重新启动它：
   ```bash
   docker start rmqnamesrv
   ```

3. **检查日志**:
   如果 `rmqnamesrv` 容器无法启动，查看其日志可能会提供一些线索：
   ```bash
   docker logs rmqnamesrv
   ```

   根据日志输出，你可能能够诊断问题并找到解决方案。

4. **重新启动 rmqbroker**:
   一旦你确信 `rmqnamesrv` 容器正在运行，你可以尝试再次启动 `rmqbroker` 容器。

## 安装一个可视化控制台

为了获得更好的管理和监控体验，你可能想要使用RocketMQ Console，这是一个基于web的可视化工具/控制台，用于查看和管理RocketMQ集群。

以下是使用Docker安装RocketMQ Console的步骤：

1. **拉取RocketMQ Console镜像**:
   ```bash
   docker pull styletang/rocketmq-console-ng
   ```

2. **运行RocketMQ Console容器**:
   请确保`rmqnamesrv`容器正在运行并且可以从你运行Console的机器上访问。然后运行Console容器：
   ```bash
   docker run -d -p 8080:8080 -e "JAVA_OPTS=-Drocketmq.namesrv.addr=YOUR_NAME_SERVER_IP:9876 -Dcom.rocketmq.sendMessageWithVIPChannel=false" --name rmqconsole styletang/rocketmq-console-ng
   ```

   其中，`YOUR_NAME_SERVER_IP`应替换为运行`rmqnamesrv`的机器的IP地址。

3. **访问RocketMQ Console**:
   打开浏览器并访问 `http://YOUR_HOST_IP:8080`，其中`YOUR_HOST_IP`是运行RocketMQ Console容器的机器的IP地址。

这样你就可以看到RocketMQ的各种详细信息，包括生产者、消费者、主题、队列等。

## 我的所有的东西都安装在一台docker上面，我的ip应该写什么？

如果RocketMQ和RocketMQ Console都运行在同一台机器的Docker上，你可以使用Docker的内部网络功能来沟通。

在这种情况下，你应该使用Docker容器名称作为主机名。当在Docker内部网络中，容器可以使用其他容器的名称作为DNS来解析。因此，如果你的RocketMQ nameserver容器名为`rmqnamesrv`，你应该使用这个名称作为IP。

所以，运行RocketMQ Console容器的命令应该是：

```bash
docker run -d -p 8080:8080 -e "JAVA_OPTS=-Drocketmq.namesrv.addr=rmqnamesrv:9876 -Dcom.rocketmq.sendMessageWithVIPChannel=false" --name rmqconsole styletang/rocketmq-console-ng
```

只需确保`rmqnamesrv`容器在运行RocketMQ Console容器之前已经运行。

然后，你可以通过浏览器访问 `http://localhost:8080` 或 `http://YOUR_HOST_MACHINE_IP:8080` 来访问RocketMQ Console。

希望这能帮助你！如果还有其他问题，请告诉我。

### docker: Error response from daemon: Ports are not available: exposing port TCP 0.0.0.0:8080 -> 0.0.0.0:0: listen tcp 0.0.0.0:8080: bind: Only one usage of each socket address (protocol/network address/port) is normally permitted.

此错误表明端口`8080`已经被你的机器上的其他服务或容器占用。为了避免冲突，你可以选择使用一个不同的端口来映射到RocketMQ Console的`8080`端口。

例如，你可以选择`8181`（或其他未被使用的端口）作为主机的端口：

```bash
docker run -d -p 8181:8080 -e "JAVA_OPTS=-Drocketmq.namesrv.addr=rmqnamesrv:9876 -Dcom.rocketmq.sendMessageWithVIPChannel=false" --name rmqconsole styletang/rocketmq-console-ng
```

然后，你可以通过浏览器访问 `http://localhost:8181` 或 `http://YOUR_HOST_MACHINE_IP:8181` 来访问RocketMQ Console。

如果你不确定哪个端口是空闲的，你可以使用工具如`netstat`（在大多数操作系统上都可用）来查看当前正在使用的端口：

```bash
netstat -tuln | grep 8080
```

如果上述命令返回结果，这意味着`8080`端口已经被使用。你可以更改查询的端口号来检查其他端口的状态。

### 我在访问控制台的时候报错了， org.apache.rocketmq.remoting.exception.RemotingConnectException: connect to failed

`RemotingConnectException`是RocketMQ的一个常见异常，通常表示客户端（在这种情况下是RocketMQ Console）无法连接到RocketMQ的nameserver或broker。

让我们一步一步地进行故障排除：

1. **确保namesrv容器正在运行**:
   
   使用以下命令检查容器状态：
   ```bash
   docker ps | grep rmqnamesrv
   ```

   如果你看不到正在运行的`rmqnamesrv`容器，你需要启动它。

2. **Docker网络问题**:
   
   确保你的RocketMQ Console容器可以解析和访问`rmqnamesrv`。在Docker的默认桥接网络模式下，容器应该能够通过容器名解析其他容器的地址。但是，为了验证这一点，你可以执行以下操作：

   ```bash
   docker exec -it rmqconsole ping rmqnamesrv
   ```

   如果你得到一个正常的ping响应，那么网络连接是好的。如果不是，你可能需要考虑将这两个容器放在同一个Docker网络中。

3. **检查RocketMQ的日志**:
   
   检查`rmqnamesrv`容器的日志，看看是否有任何异常或错误：
   ```bash
   docker logs rmqnamesrv
   ```

4. **检查端口**:
   
   确保你的RocketMQ namesrv容器确实在监听9876端口。你可以使用`docker exec`命令与`netstat`工具结合，或者查看Docker的容器详情来验证。

5. **重新启动服务**:
   
   有时简单地重启服务容器可以解决连接问题。

6. **验证环境变量**:
   
   确保你在启动RocketMQ Console容器时正确设置了`JAVA_OPTS`环境变量，并指向了正确的namesrv地址。

### 运行第二步C:\Users\machaojin>docker exec -it rmqconsole ping rmqnamesrv ping: unknown host

这意味着从`rmqconsole`容器内部无法解析`rmqnamesrv`的容器名称。这可能是由于网络隔离或其他原因。

这里是一些可能的解决方案：

1. **使用Docker自定义网络**：
   
   使用Docker自定义网络可以确保容器之间的服务发现和通信。以下是创建和使用自定义网络的步骤：

   a. 创建一个新的Docker网络：

      ```bash
      docker network create rmqnetwork
      ```

   b. 将`rmqnamesrv`和`rmqbroker`容器连接到该网络：

      ```bash
      docker network connect rmqnetwork rmqnamesrv
      docker network connect rmqnetwork rmqbroker
      ```

   c. 将`rmqconsole`容器也连接到该网络：

      ```bash
      docker network connect rmqnetwork rmqconsole
      ```

   d. 重新尝试从`rmqconsole`容器内部ping`rmqnamesrv`：

      ```bash
      docker exec -it rmqconsole ping rmqnamesrv
      ```

   如果上述步骤可以成功ping到`rmqnamesrv`，则问题应该得到解决。

2. **手动更新/etc/hosts**：

   如果你不想创建一个新的Docker网络，还有一个临时的解决方案是在`rmqconsole`容器内部手动编辑`/etc/hosts`文件，并添加`rmqnamesrv`的IP地址。

   a. 获取`rmqnamesrv`的IP地址：

      ```bash
      docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' rmqnamesrv
      ```

   b. 使用该IP地址，手动在`rmqconsole`的`/etc/hosts`文件中添加一行：

      ```bash
      docker exec -it rmqconsole sh -c 'echo "<IP_ADDRESS_FROM_ABOVE> rmqnamesrv" >> /etc/hosts'
      ```

   c. 重新尝试从`rmqconsole`容器内部ping`rmqnamesrv`。

