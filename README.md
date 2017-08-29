## Vue搭建的cnode app
-----
###项目简介
>本项目是基于vue2的实战项目,在空闲的时间用来练练手,利用了vue-router做了一些权限控制,API接口就是cnode官方的,详细看下面(ui做得比较丑,请忽略)

****

- GITHUB源码地址:  [GITHUB](https://github.com/oxgos/cnode)
- 线上预览地址: [Demo](https://oxgos.github.io/cnode/dist/#/) （请用chrome的手机模式预览
- 有喜欢的或者对你有帮助的,点一下star,关注,请支持一下萌新,你的支持是我坚持的动力,谢谢
- cnode API接口: [API](https://cnodejs.org/api)

****
###预览图
![1](https://github.com/oxgos/cnode/blob/master/screenshot/screen1.jpg?raw=true)

![2](https://github.com/oxgos/cnode/blob/master/screenshot/screen2.jpg?raw=true)

![3](https://github.com/oxgos/cnode/blob/master/screenshot/screen3.jpg?raw=true)

![4](https://github.com/oxgos/cnode/blob/master/screenshot/screen4.jpg?raw=true)
****
###技术架构
```
Vue2.0 //项目构建
Vue-cli //vue官方快速的项目构建工具
vue-router //用于处理项目中的路由跳转
axios //官方推荐的http请求模块
vuex //官方提供的状态管理模式
vue-quill-editor //富文本编辑器
better-scroll //页面滚动效果
stylus //Css预编译器
webpack //打包工具
```
****

### 项目运行

``` bash
# 项目clone
git clone https://github.com/oxgos/cnode.git

# 通过npm安装本地服务第三方依赖模块(需要已安装Node.js)
npm install

# 启动服务(http://localhost:8080)
npm run dev

# 发布代码
npm run build

```
****

###目录结构
```
├── build              // 构建服务和webpack配置
├── config             // 项目不同环境的配置
├── dist               // 项目build目录
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├── src                // 生产目录
│   ├── assets         // 图片资源
│   ├── common          // 公共的css js 资源
│   ├── components     // 各种组件
│   ├── App.vue         // 主页面 
│   └── main.js        // Webpack 预编译入口
```
****
###实现功能
- 根据tab切换功能
- 下拉刷新与加载更多功能
- 请求返回数据图片预加载处理
- 用户登陆,注销(我的收藏,最近回复,最近发布)
- 用户权限控制(登陆后,收藏话题,点赞,评论,新建话题)
- 新建话题,富文本编辑

****
###TODO
- 优化性能
- 修复某些不明Bug
-  对自己的文章可以进行编辑更新
- 评论页懒加载处理
