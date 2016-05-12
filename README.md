##Express Demo 说明 node version v0.12.4

服务端使用技术：Node.js + Express + Mongodb + Mongoose

前段使用技术：自由选择

## 开发环境安装步骤

1. 安装Node，Npm
1. 获取代码，执行 `npm install`，安装Node.js模块
1. 通过 `node app.js` 启动站点，默认8000端口，访问 http://localhost:8000 即可访问

## 服务端结构说明

1. 目录结构如下：
    
    ```
     |-- backend
     |   |-- api
     |   |-- controller
     |   |-- core
     |   |   `-- config
     |   |-- data
     |   |-- model
     |   |--route.js
     |——app.js
     ```
     
1. app.js 是 web 启动文件，backend 文件夹下是说有的服务端代码
1. api 文件夹存放 web 使用的RESTfull api文件，按照模块划分
1. data 层是操作数据层，api 调用


## 前端结构说明

...
