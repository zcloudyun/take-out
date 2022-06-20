#笔记
##脚手架文件结构
|—— node_modules
|—— public
|    |——favicon.ico:页面标签
|    |——index.html:主页面
|——src
|    |——assets:存放静态资源
|       |——logo.png
|    |——component:存放组件
|       |——helloworls.vue
|    |——App.vue：汇总所有组件
|    |——main.js:入口文件
|——.gitignore:git版本管制忽略的配置
|——babel.config.js:babel的配置文件
|——package.json:应用包配置文件
|——README.md：应用描述文件
|——package-lock.json:包版本控制文件

##关于不同版本的vue
  1、vue.js与vue.runtime.xxx.js的区别
    （1）Vue.js是完整版的vue, 包含：核心功能 + 模板解析器
    （2）vue.runtime.xxx.js是运行版的vue,只包含：核心功能：没有模板解析器
  2、因为vue.runtime.xxx.js没有模板解析器，所以不能使用template配置项，需要使用render函数接收到的createElement函数去指定集体内容

##vue.config.js配置文件
使用vue inspect > output.js可以查看到vue脚手架的默认配置
使用vue.config.js可以对脚手架进行个性化定制



#配置项props
  功能：让组件接收外部传过来的数据
  (1)传递数据：
      <Demo name="xxx"/>
  (2)接收数据
      第一种方式（只接收）：
         props:['name']
      第二种方法（限制类型）：
         props:{
           name:String,
           age:Number
         }
      第三种方法（限制类型、限制必要性、指定默认值）
         props:{
           name:{
             type:String,   //类型
             required:true, //必要性
             default:'老王' //默认值
           }
         }

    注意:props是只读，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，
    那么请复制props的内容到data中一份，然后去修改data中的数据
    <h2>{{myage}}<h2>
    data(){
      return {
        myage:this.age
      }
    }
    props:["age"]

    如果字符串需要进行计算在前面加上:(v-bind)  例如： age+1    :age="19"



## mixin(混入)
   功能：可以把多个组件共用的配置提取成一个混入对象
   使用方式：
       第一步 定义混合，例如：
          export const hunhe= {
             data(){....},
             methods:{....}
             ....
           }
      第二步 使用混入，例如：
          （1）全局混入：vue.mixin(xxx)
          （2）局部混入：mixins:['xxx']

## export default向外暴露成员  使用时 import xxx from "./yyy"   例如组件   import Student from "./component/Student"
## export const    使用时 import {xxx} from "./yyy"    例如混入  import {mixin} from "./mixin.js"


##插件

   功能：用于增强Vue
   本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据
   定义插件：
     对象.install=function(Vue,options){
       <!-- 1、添加全局过滤器 -->
       Vue.filter(...)
       <!-- 2、添加全局指令 -->
       Vue.directive(...)
       <!-- 3、配置全局混入（合） -->
       Vue.mixin(...)
       <!-- 4、添加实例方法 -->
       Vue.prototype.$myMethod=function()(...)
       Vue.prototype.$myProperty=xxx
     }
     使用插件:Vue.use()



## scoped样式
   作用:让样式在局部生效，防止冲突
   写法<stype scoped>

## 总结todolist案例
1、组件编程流程：
  （1）拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突
  （2）实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用
      1）一个组件在用：放在组件自身即可
      2）一些组件在用：放在他们共同的父组件上（状态提升）
  （3）实现交互：从绑定事件开始
2、props适用下：
   （1）父组件==>子组件通信
   （2）子组件==>父组件通信（要求父先给子一个函数）
3、使用v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可以修改的
4、props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做


##组件的自定义事件
1、一种组件间通信的方式，适用于  子组件===>父组件
2、使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（事件的回调在A中）
3、绑定自定义事件：    
        1、第一种方式，在父组件中：<Demo @atguigu="test"/>或<Demo v-on:aiguigu="test"/>
        2、第二种方式，在父组件中：
        <Demo ref="demo"/>
        ...
        mounted(){
          this.$refs.xxx.$on('atguigu',this.test)
        }
        3、若想让自定义事件只能触发一次，可以使用once修饰符，或$once方法
4、触发自定义事件：this.$emit('atguigu',数据)
5、解绑自定义事件:this.$off('atguigu')
6、组件上也可以绑定原生DOM事件，需要使用native修饰符
7、注意：通过this.$refs.xxx.$on("atguigu",回调)绑定自定是事件，回调要么配置在methods中，要么用箭头函数，否则this指向会出问题 


##全局事件总线
1、一种组件间通信的方式，适用于任意组件间通信
2、安装全局事件总线：
   new Vue({
     ...
     beforeCreate（）{
       Vue.prototype.$bus=this  //安装全局事件总线，$bus就是当前运用的vm
     },
     ....
   })

3、使用事件总线
   1、接收数据：A组件想接收数据，则A组件中给$bus绑定自定义事件，事件的回调留在A组件自身
   methosd:{
     demo(data){
     }
     ...
     mounted(){
       this.$bus.$on('xxx',this.demo)
     }
   }
    2、提供数据  this.$bus.$emit('xxx',数据)
4、最好在beforeDestory钩子中，用$off去解绑当前组件所用到的事件


##消息订阅与发布(pubsub)
1、一种组件间通信的方式，适用于任意组件间通信
2、使用步骤：
  1、安装pubsub: npm i pubsub-js
  2、引入: import pubsub from 'pubsub-js'
  3、接收数据：A组件想接收数据，则在A组件中订阅信息，订阅的回调留在A组件自身
    methods(){
      demo(subname,data)
      {
        console.log("接收到的数据为",subname,data)
      
      }
      }
      ...
      mountend(){
        this.pubid=pubsub.subscribe('xxx',this.demo)//订阅消息
      }或者
      mounted(){
        thi.pubid=pubsub.subscribe('xxx',(a,b)=>{
          console.log("接收到的数据",a,b)
        })
      }
  4、提供数据: pubsub.publish('xxx',数据)
  5、最好在deforeDestroy钩子中，用pubsub.unsubscribe(pubid)//取消订阅


  ## nextTick
  1、语法：this.$nextTick(回调函数)
  2、作用：在下一次DOM更新结束后执行其指定的回调
  3、什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行



  ## Vue 封装的过渡与动画
1、作用：在插入、更新或移除DOM元素时，在合适的时候给元素添加样式类名
2、图示：
        enter                          leave
       /   \                          /   \
v-enter   v-enter-to           v-leave    v-leave-to
     ——————                           ——————
       |                                |
   v-enter-active                v-leave-active


3、写法
  1、准备好样式：
      元素进入的样式：
         1、v-enter：进入的起点
         2、v-enter-active:进入过程中
         3、v-enter-to:进入的终点
      元素离开的样式
         1、v-leave：离开的起点
         2、v-leave-active:离开的过程中
         3、v-leave-to:离开的终点
  2、使用<transition>包裹要过度的元素，并配置name属性：
  <transition name="hello">
     <h1 v-show="isshow">你好</h1>
  </transition>
  3、注意：
  若要多个元素需要过度，则需要使用:<transition-group>,且每个元素都要指定key值