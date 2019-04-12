# VueProjectTemplate
Vue 新项目模板，只在 vue-cli3 的默认模板上加了微信网页授权和分享功能，其他没有任何业务代码。

### 加入的依赖
axios，vant，weixin-js-sdk
其中 vant 为 UI 组件库，可以换成其他的组件库。

### 使用该项目时需要修改的东西
1. router.js 中 beforeEach 钩子函数中请求微信授权的代码，需要根据项目需要替换掉 appId，redirectUrl 等内容
2. utils 文件夹下 wxShare 文件，这里是对微信分享的封装代码，需要根据项目将里面的 url 等一些参数和处理逻辑改掉
3. apis 文件夹下 apiHelper 文件，根据项目需要换掉 BASE_URL 和拦截器里面相关配置
4. public 文件夹下 index.html 文件中的 title 内容根据不同项目改掉
5. public 文件夹下 favicon.ico 文件，根据项目需要换掉，（显示在浏览器标签上的网站 logo）
6. package.json 文件中 name 字段的值换掉
7. 最后，记得修改项目根目录文件夹名字


以上内容改完，整个项目框架基本就成型了，就可以专注于业务开发了
