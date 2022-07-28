# 建立一个 web 框架

## Build a Web Framework!

### 环境准备

安装 parcel

```bash
npm install -g parcel-bundler
```

启动 parcel

```bash
parcel [filename.html]
```

### 基础类

Mode Classes: Handle data, used to represent Users, Blog Posts, Images, ect.
View Classes: Handle HTML and events caused by the user(like clicks)

### 安装 JSON server

1、添加 npm 包

```bash
npm install -g json-server
```

2、创建 db.json 文件

```json
{
  "users": []
}
```

3、启动 JSON server

```bash
json-server -w db.json
```

4、安装 axios

```bash
npm install axios
```

5、命令简写配置

因为以上为了启动 json server，又要使用 parcel，那么就不得不打开两个命令行窗口，分别启动对应的服务，并且这两个命令的长度也很长，不容易记忆。为了解决此问题，可以在 package.json 中配置启动脚本。

```json
{
  "devDependencies": {
    "typescript": "^4.7.4"
  },
  "dependencies": {
    "axios": "^0.27.2"
  },
  "scripts": {
    // "自定义脚本": "原脚本"
    "start:db": "json-server -w db.json",
    "start:parcel": "parcel index.html"
  }
}
```
