---
title: MySQL安装
order: 2
category:
  - MySQL
tag:
  - MySQL
---

# MySQL数据库管理系统安装部署

## MySQL 5.7版本安装

**注意：安装操作需要root权限**

#### 配置yum仓库

更新密钥

rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022

安装Mysql yum库

rpm -Uvh http://repo.mysql.com//mysql57-community-release-el7-7.noarch.rpm

由于MySQL并不在CentOS的官方仓库中，所以我们通过上述rpm命令：
	导入MySQL仓库的密钥

​	配置MySQLQ的yum仓库

#### 使用yum安装MySQL

#### yum安装Mysql

yum -y install mysql-community-server

#### 启动MySQL并配置开机自启动

systemctl start mysqld      启动
systemctl enable mysqld     开机自启

> MySQL安装完成后，会自动配置为名称叫做：`mysqld`的服务，可以被systemctl所管理

#### 检查MySQL的运行状态

systemctl status mysqld

### 配置

主要配置管理员用户root的密码以及配置允许远程登录的权限。



1. 获取MySQL的初始密码

   ```shell
   # 通过grep命令，在/var/log/mysqld.log文件中，过滤temporary password关键字，得到初始密码
   grep 'temporary password' /var/log/mysqld.log
   ```

   ![image-20221012182744115](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/12/20221012182744.png)

2. 登陆MySQL数据库系统

   ```shell
   # 执行
   mysql -uroot -p
   # 解释
   # -u，登陆的用户，MySQL数据库的管理员用户同Linux一样，是root
   # -p，表示使用密码登陆
   
   # 执行完毕后输入刚刚得到的初始密码，即可进入MySQL数据库
   ```

   ![image-20221012182805966](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/12/20221012182806.png)

3. 修改root用户密码

   ```sql
   # 在MySQL控制台内执行
   ALTER USER 'root'@'localhost' IDENTIFIED BY '密码';	-- sql语句中单引号和双引号都行，密码需要符合：大于8位，有大写字母，有特殊符号，不能是连续的简单语句如123，abc,
   ```

4. [扩展]，配置root的简单密码

   > 我们可以给root设置简单密码，如123456.
   >
   > 请注意，此配置仅仅是用于测试环境或学习环境的MySQL，如果是正式使用，请勿设置简单密码

   ```sql
   # 如果你想设置简单密码，需要降低Mysql的密码安全级别
   set global validate_password_policy=LOW; # 密码安全级别低
   set global validate_password_length=4;	 # 密码长度最低4位即可
   
   # 然后就可以用简单密码了（课程中使用简单密码，为了方便，生产中不要这样）
   ALTER USER 'root'@'localhost' IDENTIFIED BY '简单密码';
   ```

5. [扩展]，配置root运行远程登录

   > 默认情况下，root用户是不运行远程登录的，只允许在MySQL所在的Linux服务器登陆MySQL系统
   >
   > 请注意，允许root远程登录会带来安全风险

   ```sql
   # 授权root远程登录
   grant all privileges on *.* to root@"IP地址" identified by '密码' with grant option;  
   # IP地址即允许登陆的IP地址，也可以填写%，表示允许任何地址
   # 密码表示给远程登录独立设置密码，和本地登陆的密码可以不同
   
   # 刷新权限，生效
   flush privileges;
   ```

6. 退出MySQL控制台页面

   ```sql
   # 退出命令
   exit
   
   # 或者通过快捷键退出：ctrl + d
   ```

7. 检查端口

   MySQL默认绑定了3306端口，可以通过端口占用检查MySQL的网络状态

   ```shell
   netstat -anp | grep 3306
   ```

   ![image-20221012183746802](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/12/20221012183746.png)



至此，MySQL就安装完成并可用了，请妥善保存好MySQL的root密码。





## MySQL8.0版本在CentOS系统安装

> 注意：安装操作需要root权限



### 安装



1. 配置yum仓库

   ```shell
   # 更新密钥
   rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022
   
   # 安装Mysql8.x版本 yum库
   rpm -Uvh https://dev.mysql.com/get/mysql80-community-release-el7-2.noarch.rpm
   ```

2. 使用yum安装MySQL

   ```shell
   # yum安装Mysql
   yum -y install mysql-community-server
   ```

3. 安装完成后，启动MySQL并配置开机自启动

   ```shell
   systemctl start mysqld		# 启动
   systemctl enable mysqld		# 开机自启
   ```

   > MySQL安装完成后，会自动配置为名称叫做：`mysqld`的服务，可以被systemctl所管理

4. 检查MySQL的运行状态

   ```shell
   systemctl status mysqld
   ```



### 配置

主要修改root密码和允许root远程登录



1. 获取MySQL的初始密码

   ```shell
   # 通过grep命令，在/var/log/mysqld.log文件中，过滤temporary password关键字，得到初始密码
   grep 'temporary password' /var/log/mysqld.log
   ```

2. 登录MySQL数据库系统

   ```shell
   # 执行
   mysql -uroot -p
   # 解释
   # -u，登陆的用户，MySQL数据库的管理员用户同Linux一样，是root
   # -p，表示使用密码登陆
   
   # 执行完毕后输入刚刚得到的初始密码，即可进入MySQL数据库
   ```

3. 修改root密码

   ```sql
   ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '密码';	-- sql语句中单引号和双引号都行，密码需要符合：大于8位，有大写字母，有特殊符号，不能是连续的简单语句如123，abc	
   ```

4. [扩展]，配置root的简单密码

   > 我们可以给root设置简单密码，如123456.
   >
   > 请注意，此配置仅仅是用于测试环境或学习环境的MySQL，如果是正式使用，请勿设置简单密码

   ```sql
   set global validate_password.policy=0;		# 密码安全级别低
   set global validate_password.length=4;		# 密码长度最低4位即可
   ```

   

5. 允许root远程登录，并设置远程登录密码

   > 默认情况下，root用户是不运行远程登录的，只允许在MySQL所在的Linux服务器登陆MySQL系统
   >
   > 请注意，允许root远程登录会带来安全风险

   ```sql
   # 第一次设置root远程登录，并配置远程密码使用如下SQL命令
   create user 'root'@'%' IDENTIFIED WITH mysql_native_password BY '密码!';	-- 密码需要符合：大于8位，有大写字母，有特殊符号，不能是连续的简单语句如123，abc
   
   # 后续修改密码使用如下SQL命令
   ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '密码';
   ```

6. 退出MySQL控制台页面

   ```sql
   # 退出命令
   exit
   
   # 或者通过快捷键退出：ctrl + d
   ```

7. 检查端口

   MySQL默认绑定了3306端口，可以通过端口占用检查MySQL的网络状态

   ```shell
   netstat -anp | grep 3306
   ```

   ![image-20221012192303607](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/12/20221012192303.png)





至此，MySQL就安装完成并可用了，请妥善保存好MySQL的root密码。





## MySQL5.7版本在Ubuntu（WSL环境）系统安装

> 课程中配置的WSL环境是最新的Ubuntu22.04版本，这个版本的软件商店内置的MySQL是8.0版本
>
> 所以我们需要额外的步骤才可以安装5.7版本的MySQL



安装操作需root权限，你可以：

1. 通过 sudo su -，切换到root用户

   > 课程中选择这种方式操作

2. 或在每一个命令前，加上sudo，用来临时提升权限





### 安装

1. 下载apt仓库文件

   ```shell
   # 下载apt仓库的安装包，Ubuntu的安装包是.deb文件
   wget https://dev.mysql.com/get/mysql-apt-config_0.8.12-1_all.deb
   ```

   ![image-20221016094103315](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/16/20221016094103.png)

2. 配置apt仓库

   ```shell
   # 使用dpkg命令安装仓库
   dpkg -i mysql-apt-config_0.8.12-1_all.deb
   ```

   弹出框中选择：`ubuntu bionic` （Ubuntu18.04系统的代号是bionic，选择18.04的版本库用来安装）

   ![image-20221016094142343](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/16/20221016094142.png)

   弹出框中选择：`MySQL Server & Cluster`

   ![image-20221016094216377](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/16/20221016094216.png)

   弹出框中选择：`mysql-5.7`

   ![image-20221016094254397](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/16/20221016094254.png)

   最后选择：`ok`

   ![image-20221016094306917](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/16/20221016094306.png)

3. 更新apt仓库的信息

   ```shell
   # 首先导入仓库的密钥信息
   apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 467B942D3A79BD29
   # 更新仓库信息
   apt update
   ```

4. 检查是否成功配置MySQL5.7的仓库

   ```shell
   apt-cache policy mysql-server
   ```

   ![image-20221016094546943](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/16/20221016094546.png)

   看到如图所示字样，即成功

5. 安装MySQL5.7

   ```shell
   # 使用apt安装mysql客户端和mysql服务端
   apt install -f -y mysql-client=5.7* mysql-community-server=5.7*
   ```

   弹出框中输入root密码并选择ok，密码任意，课程中以123456代替

   ![image-20221016094941439](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/16/20221016094941.png)

   再次输入root密码确认

   ![image-20221016094954505](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/16/20221016094954.png)

6. 启动MySQL

   ```shell
   /etc/init.d/mysql start			# 启动
   /etc/init.d/mysql stop			# 停止
   /etc/init.d/mysql status		# 查看状态
   ```

   ![image-20221016095259172](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/16/20221016095259.png)

7. 对MySQL进行初始化

   ```shell
   # 执行如下命令，此命令是MySQL安装后自带的配置程序
   mysql_secure_installation
   # 可以通过which命令查看到这个自带程序所在的位置
   root@DESKTOP-Q89USRE:~# which mysql_secure_installation
   /usr/bin/mysql_secure_installation
   ```

   1. 输入密码：

      ![image-20221016095458755](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/16/20221016095458.png)

   2. 是否开启密码验证插件，如果需要增强密码安全性，输入`y`并回车，不需要直接回车（课程中选择直接回车）

      ![image-20221016095537716](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/16/20221016095537.png)

   3. 是否更改root密码，需要输入`y`回车，不需要直接回车（课程不更改）

      ![image-20221016095621386](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/16/20221016095621.png)

   4. 是否移除匿名用户，移除输入`y`回车，不移除直接回车（课程选择移除）

      ![image-20221016101232827](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/16/20221016101232.png)

   5. 是否进制root用户远程登录，禁止输入`y`回车，不禁止直接回车（课程选择不禁止）

      ![image-20221016101324577](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/16/20221016101324.png)

   6. 是否移除自带的测试数据库，移除输入`y`回车，不移除直接回车（课程选择不移除）

      ![image-20221016101404392](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/16/20221016101404.png)

   7. 是否刷新权限，刷新输入`y`回车，不刷新直接回车（课程选择刷新）

      ![image-20221016101442459](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/16/20221016101442.png)

8. 登陆MySQL

   ```shell
   mysql -uroot -p
   # 输入密码即可登陆成功
   ```

   ![image-20221016101524498](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/16/20221016101524.png)



至此，在Ubuntu上安装MySQL5.7版本成功。





## MySQL8.0版本在Ubuntu（WSL环境）系统安装

> 课程中配置的WSL环境是最新的Ubuntu22.04版本，这个版本的软件商店内置的MySQL是8.0版本
>
> 所以直接可以通过apt安装即可

> 注意，课程是以WSL获得的Ubuntu操作系统环境。
>
> 如果你通过VMware虚拟机的方式获得了Ubuntu操作系统环境，操作步骤不用担心，和课程中使用WSL环境是==完全一致的==



安装操作需root权限，你可以：

1. 通过 sudo su -，切换到root用户

   > 课程中选择这种方式操作

2. 或在每一个命令前，加上sudo，用来临时提升权限



### 安装

1. 如果已经安装过MySQL5.7版本，需要卸载仓库信息哦

   ```shell
   # 卸载MySQL5.7版本
   apt remove -y mysql-client=5.7* mysql-community-server=5.7*
   
   # 卸载5.7的仓库信息
   dpkg -l | grep mysql | awk '{print $2}' | xargs dpkg -P
   ```

2. 更新apt仓库信息

   ```shell
   apt update
   ```

3. 安装mysql

   ```shell
   apt install -y mysql-server
   ```

4. 启动MySQL

   ```shell
   /etc/init.d/mysql start			# 启动
   /etc/init.d/mysql stop			# 停止
   /etc/init.d/mysql status		# 查看状态
   ```

5. 登陆MySQL设置密码

   ```shell
   # 直接执行：mysql
   mysql
   ```

6. 设置密码

   ```sql
   ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
   ```

7. 退出MySQL控制台

   ```shell
   exit
   ```

8. 对MySQL进行初始化

   ```shell
   # 执行如下命令，此命令是MySQL安装后自带的配置程序
   mysql_secure_installation
   # 可以通过which命令查看到这个自带程序所在的位置
   root@DESKTOP-Q89USRE:~# which mysql_secure_installation
   /usr/bin/mysql_secure_installation
   ```

   1. 输入密码：

      ![image-20221016095458755](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/16/20221016095458.png)

   2. 是否开启密码验证插件，如果需要增强密码安全性，输入`y`并回车，不需要直接回车（课程中选择直接回车）

      ![image-20221016095537716](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/16/20221016095537.png)

   3. 是否更改root密码，需要输入`y`回车，不需要直接回车（课程不更改）

      ![image-20221016095621386](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/16/20221016095621.png)

   4. 是否移除匿名用户，移除输入`y`回车，不移除直接回车（课程选择移除）

      ![image-20221016101232827](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/16/20221016101232.png)

   5. 是否进制root用户远程登录，禁止输入`y`回车，不禁止直接回车（课程选择不禁止）

      ![image-20221016101324577](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/16/20221016101324.png)

   6. 是否移除自带的测试数据库，移除输入`y`回车，不移除直接回车（课程选择不移除）

      ![image-20221016101404392](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/16/20221016101404.png)

   7. 是否刷新权限，刷新输入`y`回车，不刷新直接回车（课程选择刷新）

      ![image-20221016101442459](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/16/20221016101442.png)

9. 重新登陆MySQL（用更改后的密码）

   ```shell
   mysql -uroot -p
   ```

   ![image-20221016110414182](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/16/20221016110414.png)

   



至此，在Ubuntu上安装MySQL5.7版本成功。



# Tomcat安装部署【简单】

## 简介

Tomcat 是由 Apache 开发的一个 Servlet 容器，实现了对 Servlet 和 JSP 的支持，并提供了作为Web服务器的一些特有功能，如Tomcat管理和控制平台、安全域管理和Tomcat阀等。



简单来说，Tomcat是一个WEB应用程序的托管平台，可以让用户编写的WEB应用程序，被Tomcat所托管，并提供网站服务。

> 即让用户开发的WEB应用程序，变成可以被访问的网页。



## 安装

Tomcat的安装非常简单，主要分为2部分：

1. 安装JDK环境
2. 解压并安装Tomcat



> 本次安装使用Tomcat版本是：10.0.27版本，需要Java（JDK）版本最低为JDK8或更高版本
>
> 课程中使用的JDK版本是：JDK8u351版本



### 安装JDK环境

1. 下载JDK软件

   https://www.oracle.com/java/technologies/downloads

   在页面下方找到：

   <img src="https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/17/20221017163411.png" alt="image-20221017163411651" style="zoom: 67%;" />

   下载`jdk-8u351-linux-x64.tar.gz`

   ![image-20221017163440491](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/17/20221017163440.png)

   ==在弹出的页面中输入Oracle的账户密码即可下载（如无账户，请自行注册，注册是免费的）==

2. 登陆Linux系统，切换到root用户

   ![](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/17/20221017163607.png)

3. 通过FinalShell，上传下载好的JDK安装包

   ![image-20221017163706026](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/17/20221017163706.png)

4. 创建文件夹，用来部署JDK，将JDK和Tomcat都安装部署到：/export/server 内

   ```shell
   mkdir -p /export/server
   ```

5. 解压缩JDK安装文件

   ```shell
   tar -zxvf jdk-8u351-linux-x64.tar.gz -C /export/server
   ```

6. 配置JDK的软链接

   ```shell
   ln -s /export/server/jdk1.8.0_351 /export/server/jdk
   ```

7. 配置JAVA_HOME环境变量，以及将$JAVA_HOME/bin文件夹加入PATH环境变量中

   ```shell
   # 编辑/etc/profile文件
   export JAVA_HOME=/export/server/jdk
   export PATH=$PATH:$JAVA_HOME/bin
   ```

8. 生效环境变量

   ```shell
   source /etc/profile
   ```

9. 配置java执行程序的软链接

   ```shell
   # 删除系统自带的java程序
   rm -f /usr/bin/java
   # 软链接我们自己安装的java程序
   ln -s /export/server/jdk/bin/java /usr/bin/java
   ```

10. 执行验证：

    ```shell
    java -version
    javac -version
    ```



### 解压并部署Tomcat

> Tomcat建议使用非Root用户安装并启动
>
> 可以创建一个用户：tomcat用以部署



1. 首先，放行tomcat需要使用的8080端口的外部访问权限

   > CentOS系统默认开启了防火墙，阻止外部网络流量访问系统内部
   >
   > 所以，如果想要Tomcat可以正常使用，需要对Tomcat默认使用的8080端口进行放行
   >
   > 放行有2种操作方式：
   >
   > 1. 关闭防火墙
   > 2. 配置防火墙规则，放行端口

   ```shell
   # 以下操作2选一即可
   # 方式1：关闭防火墙
   systemctl stop firewalld		# 关闭防火墙
   systemctl disable firewalld		# 停止防火墙开机自启
   
   # 方式2：放行8080端口的外部访问
   firewall-cmd --add-port=8080/tcp --permanent		# --add-port=8080/tcp表示放行8080端口的tcp访问，--permanent表示永久生效
   firewall-cmd --reload								# 重新载入防火墙规则使其生效
   ```

   > 方便起见，建议同学们选择方式1，直接关闭防火墙一劳永逸
   >
   > 防火墙的配置非常复杂，后面会视情况独立出一集防火墙配置规则的章节。

2. 以root用户操作，创建tomcat用户

   ```shell
   # 使用root用户操作
   useradd tomcat
   # 可选，为tomcat用户配置密码
   passwd tomcat
   ```

3. 下载Tomcat安装包

   ```shell
   # 使用root用户操作
   wget https://dlcdn.apache.org/tomcat/tomcat-10/v10.0.27/bin/apache-tomcat-10.0.27.tar.gz
   # 如果出现https相关错误，可以使用--no-check-certificate选项
   wget --no-check-certificate https://dlcdn.apache.org/tomcat/tomcat-10/v10.0.27/bin/apache-tomcat-10.0.27.tar.gz
   ```

   > 如果Linux内下载过慢，可以复制下载链接在Windows系统中使用迅雷等软件加速下载然后上传到Linux内即可
   >
   > https://dlcdn.apache.org/tomcat/tomcat-10/v10.1.7/bin/apache-tomcat-10.1.7.tar.gz
   >
   > 或者使用课程资料中提供的安装包

4. 解压Tomcat安装包

   ```shell
   # 使用root用户操作，否则无权限解压到/export/server内，除非修改此文件夹权限
   tar -zxvf apache-tomcat-10.0.27.tar.gz -C /export/server
   ```

5. 创建Tomcat软链接

   ```shell
   # 使用root用户操作
   ln -s /export/server/apache-tomcat-10.0.27 /export/server/tomcat
   ```

6. 修改tomcat安装目录权限

   ```shell
   # 使用root用户操作，同时对软链接和tomcat安装文件夹进行修改，使用通配符*进行匹配
   chown -R tomcat:tomcat /export/server/*tomcat*
   ```

7. 切换到tomcat用户

   ```shell
   su - tomcat
   ```

8. 启动tomcat

   ```shell
   /export/server/tomcat/bin/startup.sh
   ```

9. tomcat启动在8080端口，可以检查是否正常启动成功

   ```shell
   netstat -anp | grep 8080
   ```

   ![image-20221017223814737](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/17/20221017223814.png)

10. 打开浏览器，输入：

    http://centos:8080或http://192.168.88.130:8080

    使用主机名（需配置好本地的主机名映射）或IP地址访问Tomcat的WEB页面

    ![image-20221017223915498](https://image-set.oss-cn-zhangjiakou.aliyuncs.com/img-out/2022/10/17/20221017223915.png)



至此，Tomcat安装配置完成。

## 
