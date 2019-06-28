# dinnerroom-vue
a vue project


## 介绍
这个是一个展示饭堂菜单用的 vue+node+mongodb 的项目

## 用法
在项目的“系统说明”页有写详细的用法

## 使用
### 开发
```
npm i / cnpm i  #最好用淘宝的镜像，这样会快点
cd server       
node index.js   #启动后端
cd .. 
cd dinnerroom
npm i / cnpm i  
npm run serve   #启动前端
```
### 部署
部署到生产环境
```
cd server
npm run build
```
打包后的文件存放在 server/public文件夹中
将server文件夹中的


## 文件说明
### server/routes/api/db.js
这个文件负责系统所用数据库的配置，如果数据库需要迁移则需修改
```javascript
mongoose.connect('mongodb://localhost:27017/dinnerroom', {useNewUrlParser:true})
```
中的链接地址

### server/routes/api/router.js
存放的是api，数据库增删查改

### server/routes/dinnerroomback.js
这个是部署用的配置文件，在放到服务器后运行该文件启动项目
修改访问的端口可以通过修改21行
```javascript
const port = 8082;
```
进行修改

### server/routes/index.js
这是开发用的配置文件，负责开发环境的设置
