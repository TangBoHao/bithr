# 比特工场2016秋招表单

这是比特工场招新表单的仓库。

## 运行环境

* php-fpm 7.0.10
* nginx 1.10
* mysql 5.7

使用Docker部署。

## 目录结构

```
|- src/ 存放源代码
|   |
|   |- submit/ 存放后端逻辑代码
|   .
|   
|- docker/ 存放Docker配置文件
```

## 使用方法

```shell
cd zhaoxin
docker-compose up -d
```

## 预定义环境变量

|环境变量|说明|
|:--:|:--:|
|ISCUECER_MYSQL_USER|数据库账户名|
|ISCUECER_MYSQL_PASSWORD|数据库密码|
|ISCUECER_MYSQL_DATABASE|数据库名称|

MySQL数据库的账户与密码存于环境变量中。

将数据库账号密码存于环境变量中，而非硬编码于代码中，有利于代码的迁移、提高安全性。

在PHP中，只要使用`getenv()`即可获取环境变量：
```php
$username = getenv('ISCUECER_MYSQL_USER');

// Username: bitworkshop
echo "Username: $username";
<<<<<<< HEAD
```
## 关于

开发者：赵映辉（前端），汤博皓（后端），施韬（后端）

项目创建时间：2016年09月上旬

# bithr
