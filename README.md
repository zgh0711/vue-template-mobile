# VueProjectTemplate
Vue 新项目模板，只在 vue-cli3 的默认模板上加了微信网页授权和分享功能，其他没有任何业务代码。

### 加入的依赖
axios，vant，weixin-js-sdk
其中 vant 为 UI 组件库，可以换成其他的组件库。

**考虑到 vue 及各种插件的版本问题，如果想使用各种最新版本的插件，可以先用 vue-cli 创建一个全新的项目，
然后将这个项目里面的 public 和 src 文件夹复制到新项目目录下替换掉。各种配置文件里面我只修改过二个，

1. babel.config.js，这是为了按需加载 vant 组件库配置的，如果不用 vant，这个不用修改
2.  vue.config.js，这里就是修改了 publicPath，如果新项目中不需要修改路径，这个也不用修改。

然后就是按需安装各种插件了，需要用的插件装完后，按下面的几点做相应的修改就可以愉快的开发了**

### 使用该项目时需要修改的东西
1. router.js 中 beforeEach 钩子函数中请求微信授权的代码，需要根据项目需要替换掉 appId，redirectUrl 等内容
2. utils 文件夹下 wxShare 文件，这里是对微信分享的封装代码，需要根据项目将里面的 url 等一些参数和处理逻辑改掉
3. apis 文件夹下 apiHelper 文件，根据项目需要换掉 BASE_URL 和拦截器里面相关配置
4. public 文件夹下 index.html 文件中的 title 内容根据不同项目改掉
5. public 文件夹下 favicon.ico 文件，根据项目需要换掉，（显示在浏览器标签上的网站 logo）
6. package.json 文件中 name 字段的值换掉
7. vue.config.js 文件中 publicPath 需要根据服务器目录做适当更改
8. 最后，记得修改项目根目录文件夹名字


以上内容改完，整个项目框架基本就成型了，就可以专注于业务开发了
