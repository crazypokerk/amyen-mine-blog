# Vue 入门

[Vue 官网地址](https://vuejs.org/)<br/>
1、想让 vue 工作，就必须创建一个 vue 实例，且要传入一个配置对象；<br/>
2、root 容器里的代码依然符合 html 规范，只不过混入了一些特殊的 vue 语法；<br/>
3、root 容器里的代码被称为【vue 模板】；<br/>
4、vue 实例和容器是一一对应的；<br/>
5、真实开发中只有一个 vue 实例，并且会配合着组件一起使用；<br/>
6、{{xxx}}中的 xxx 要写 js 表达式，且 xxx 可以自动读取到 data 中的所有属性；<br/>
7、一旦 data 中的数据发生改变，那么页面中用到该数据的地方也会自动更新；<br/>

## 虚拟`DOM`

![instance-virtualdom-browserdom](./../../.vuepress/public/images/vue-img/instance-virtualdom-browserdom.svg)

## 两大 API 风格

1. 选项式 API

   `main.js`

   ```javascript
   import createApp from 'vue'
   import App from './App.vue'
   
   const app = createApp(App)
   app.mount('#app')
   ```

   `xxx.vue`

   ```vue
   <script>
   export default {
     data() {
       return {}
     },
     methods: {},
     computed: {},
     watch: {},
     components: {},
     props: [],
     inject: [],
     provide() {
       return {}
     },
   }
   </script>
   ```

2. 组合式 API & 选项式API [组合式 API 常见问答 | Vue.js (vuejs.org)](https://cn.vuejs.org/guide/extras/composition-api-faq.html)

   ![OptionsAPI&CompositionAPI](../../.vuepress/public/images/vue-img/OptionsAPI&CompositionAPI.svg)

3. 组合式钩子 & 选项式钩子

   [组合式 API 常见问答 | Vue.js (vuejs.org)](https://cn.vuejs.org/guide/extras/composition-api-faq.html)

   ![Options&CompositionHooks](../../.vuepress/public/images/vue-img/Options&CompositionHooks.svg)

## 两大类模板语法

### 插值语法

#### 功能

用于解析标签体内容

#### 写法

`{{xxx}}`，`xxx`可以为变量，还可以是简单 js 表达式，且可以直接读取到`data`中的所有属性 ；

### 指令语法

#### 功能

用于解析标签（包括：标签属性、标签体内容、绑定事件等等）

#### 写法

`v-bind:href="xxx"`或 简写为：`href="xxx"`，`xxx`同样要写 js 表达式，且可以直接读取到 data 中的所有属性 ；

#### 备注

vue 中有很多的指令，且形式都是`v-???`，此处只是拿 `v-bind` 举例

## 两种数据绑定方式

1、单向绑定(`v-bind`)：数据只能从 data 流向页面 **Use v-model when you can.**
2、双向绑定(`v-model`)：数据不仅能从 data 流向页面，也可以从页面流向 data **Use v-bind/v-on when you must.**

其实`v-model` 像是` v-on` 和 `v-bind` 的结合实现。

简写：

`v-on:click` 等同于 `@click`

`v-bind:value` 等同于 `:value`

备注：

1. 双向绑定一般都应用在表单类元素上（如：input、select 等）
2. `v-model`：value 可以简写为 `v-model`，因为 v-`model` 默认收集的就是 value 值
   `v-bind` 可以简写为 :

```html
<div id="root">
    <!-- 普通写法 -->
    <input type="text" v-bind:value="name"></input><br/>
    <input type="text" v-model:value="name"></input>
    <!-- 简写 -->
    <input type="text" :value="name"></input><br/>
    <input type="text" v-model="name"></input>
</div>
```

## el 和 data 的两种写法

### `el` 两种写法

1. `new Vue` 时配置 `el` 属性
2. `new Vue().#mount('#xxx')`指定 `el` 的值

### `data` 两种写法

#### 对象式

```javascript
new Vue({
  el: '#root',
  data: {
    name: 'vvv',
  },
})
```

#### 函数式

```javascript
new Vue({
  el: '#root',
  data() {
    return {
      name: 'vvv',
    }
  },
})
```

如何选择：目前哪种写法都可，以后学习到组件时，data 必须使用函数式，否则会报错

### 一个重要的原则

由 Vue 管理的函数，一定不要写箭头函数，因为箭头函数没有 this。

## 理解 MVVM

- M 模型(`model`)：对应 data 中的数据
- V 视图(`view`)：模板
- VM 视图模型(`view model`)：Vue 实例对象

## 数据代理

vue 中的数据代理：

1. 通过 vm vue 实例对象名，`const vm = new Vue();`对象来代理 data 对象中属性的操作（读/写）；

2. vue 中数据代理的好处：更加方便的操作 data 中的数据 ；

3. 基本原理：通过 `Object.defineProperty()` 把 data 对象中所有属性添加到 vm 上；为每一个添加到 vm 上的属性，都指定一个 `getter/setter`；在 `getter/setter` 内部去操作（读/写）data 中对应的属性。

   **Object.defineProperty();**

   ```javascript
   Object.defineProperty(objName, 'attrName', {
     value: xxx,
     enumerable: true,
     writable: true,
     configurable: true,
     get: function () {
       return xxx
     },
     set: function (val) {},
   }
   ```

## 事件处理

事件的基本使用：

- 使用 `v-on:xxx` 或 `@xxx` 绑定事件，其中 `xxx` 是事件名；

- 事件的回调需要配置在 `methods` 属性中，最终会体现在 vm 中；

- `methods` 中配置的函数，不要用箭头函数，否则 this 就不是 vm 对象；

- `methods` 中配置的函数，都是被 vue 所管理的函数，this 的指向是**vm**或**组件实例对象**；

- `@click="funcName"` 和 `@click="funcName($event)"` 效果一致，但后者可以传参，$event 为事件参数占位；

- `event.target.value`可以参考[EventTarget.addEventListener()]([EventTarget.addEventListener() - Web APIs | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#the_event_listener_callback))。

  ```javascript
  // script is loading before body, keep script after body
  window.onload = function () {
    const btn = document.getElementById('btn')
    console.log(btn)
    if (btn) {
      btn.addEventListener('click', (event) => {
        console.log(event)
      })
    }
  }
  ```

## 事件修饰符

vue 中的事件修饰符（`event.preventDefault()`）：

1. `preven`：阻止默认事件（常用）；
2. `stop`：阻止事件冒泡（常用）；
3. `once`：事件只能触发一次（常用）；
4. `capture`：使用事件的捕获模式；
5. `self`：只有 event.target 是当前操作的元素时才触发事件；
6. `passive`：事件的默认行为立即执行，无须等待事件回调执行完毕。

## 键盘事件

### vue 中常用的按键别名

- 回车 => `enter`
- 删除 => `delete`（捕获“删除”和“退格”建）
- 退出 => `esc`
- 空格 => `space`
- 换行 => `tab`（特殊，必须配合 keydown 去使用）
- 上 => `up`
- 下 => `down`
- 左 => `left`
- 右 => `right`

vue 未提供别名的按键，可以使用按键原始的 key 值去绑定，但注意要转为`xxx-xxx`（短横线命名），如 `CapsLock => caps-lock`；
系统修饰键（用法特殊）：`ctrl`、`alt`、`shift`、`meta`；

- 配合 `keyup` 使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发；
- 配合 `keydown` 使用：正常触发事件。

也可以使用 `keyCode` 去指定具体的按键（不推荐）；
`Vue.config.keyCodes.自定义键名 = 键码`，可以去定制按键别名。

## 计算属性

1、定义：要用的属性不存在，要通过已有属性计算得来。
2、原理：底层借助了 `Object.definieproperty` 方法提供的 `getter` 和 `setter`。
3、get 函数什么时候执行？

- 初次读取时会执行一次；
- 当依赖的数据发生改变时会被再次调用。

4、优势：与 `methods` 实现相比，内部有缓存机制（复用），效率更高，调试方便。
5、备注：

- 计算属性最终会出现在 vm 上，直接读取使用即可；
- 如果计算属性要被修改，那必须写 set 函数去响应修改，且 set 中要引起计算时依赖的数据发生改变。

```javascript
const vm = new Vue({
	data:{},
	methods:{},
	computed:{
		// 完整写法
		fullName:{
			// get有什么用？当有人读取fullName时，get就会被调用，且返回值就作为fullName的值
			// get什么时候调用？1.初次读取fullName时；2.所依赖的数据发生变化时。
			get(){
				// get中的this是vm
				return '';
			},
			//set 什么时候调用？当fullName被修改时。
			set(value){
			}
		}
		// 简单写法 ---> 只能在不需要set时可以这样写
		fullName:function(){}
	}
}).mount('#root');
```

## 监视属性

绑定事件的时候 `@xxx="yyy" yyy` 表示可以写一些简单的语句

```javascript
// 监视方式一：
const vm = new Vue({
  el:'#root',
  data:{
    isHot:true,
  },
  computed:{},
  methods:{
    watch:{
      isHot:{
        immediate:true, // 初始化时让handler调用一下
        // 当监视的值发生改变时调用handler
        handler(newValue, oldValue){
          //
        }
      }
    }
  }
});
// 监视方式二：
vm.$watch({'isHot',{
  immediate:true, // 初始化时让handler调用一下
  // 当监视的值发生改变时调用handler
  handler(newValue, oldValue){
  //
  }
}})
```

### watch

1. 当被监视的属性发生变化时，回调函数自动调用，进行相关操作；

2. 监视的属性必须存在，才能进行监视！

3. 监视的两种写法：

   - `new Vue` 时传入 `watch` 属性

   - 通过 `vm.$watch` 监视

### 深度监视

- Vue 中的 `watch` 默认不监测对象内部值的改变（一层）；
- 配置 `deep:true` 可以监视对象内部值的改变（多层）。

#### 备注

1. Vue 自身可以监测对象内部值的改变，但 Vue 提供的 `watch` 默认不可以！
2. 使用 `watch` 时根据数据的具体结构，决定是否采用深度监视。

### `comuted` 和 `watch` 的区别

1. `computed` 能完成的功能，`watch` 也都可以完成；
2. `watch` 能完成的功能，`computed` 不一定能完成，例如，`watch` 可以进行异步操作。

### 两个重要的小原则

1. 所被 Vue 管理的函数，最好写成**普通函数**，这样 `this` 的指向才是 `vm` 或 组件实例对象；

2. 所有不被 Vue 所管理的函数（定时器的回调函数、ajax 的回调函数等），最好写成箭头函数，这样 this 的指向才是 vm 或 组件实例对象。

   ```javascript
   const that = this
   setTimeout(function () {
     that.xxx = 0
   }, 2000)
   ```

## 条件渲染

### `v-if`

#### 写法

1. `v-if="表达式"`
2. `v-else-if="表达式"`
3. `v-else="表达式"`

#### 适用场景

切换频率较低的场景

#### 特点

不展示的 DOM 元素直接被移除

#### 注意

`v-if` 可以和 `v-else-if`、`v-else` 一起使用，但要求结构不能被“打断”，

### `v-show`

#### 写法

`v-show="表达式"`

#### 适用场景

切换频率较高的场景

#### 特点

不展示的 DOM 元素未被移除，仅仅是 display=none 隐藏

#### 备注

使用 v-if 时，元素可能无法获取到，而使用 v-show 一定可以获取到

### `v-for`

#### 写法

`v-for="(item, index) in xxx" :key="yyy"`

#### 适用场景

用于展示列表数据

#### 特点

可遍历：数组、对象、字符串（用的很少）、指定次数（用的很少）

## Form表单数据

1、若`\<input type="text"/>`，则`v-model`收集的是`value`值，用户输入的就是`value`值；

2、若`\<input type="radio"/>`，则`v-model`收集的是`value`值，用户输入的就是`value`值；

3、若`\<input type="checkbox"/>`，如果没有配置`input`的`value`属性，那么收集的就是`checked`（勾选 or 未勾选，是布尔值）；如果配置了`input`的`value`属性：`v-model`的初始值是非数组，收集的就是`checked`；若`v-model`的初始值是数组，那么收集的就是`value`组成的数组。初始值要给一般给数组，并且保证每个选择项都不同的`value`值。

4、`v-model`的三个修饰符：

- `lazy`：失去焦点再收集数据；
- `number`：输入字符串为有效的数字；
- `trim`：输入首尾空格过滤。

5、自定义控制组件

ps：在表单form中的button如果不设置类型为button，每次点击都会触发表单提交。

如果在自定义组件上使用`v-model`，那么vue将会在组件中设置一个非常具体的属性以及侦听一个特定的事件，并且可以在该组件中发出该事件。

自定义组件：

```vue
<template>
	<ul>
		<li :class="{ active: modelValue === '差' }">
			<button type="button" @click="activate('差')">差</button>
		</li>
		<li :class="{ active: modelValue === '一般' }">
			<button type="button" @click="activate('一般')">一般</button>
		</li>
		<li :class="{ active: modelValue === '优秀' }">
			<button type="button" @click="activate('优秀')">优秀</button>
		</li>
	</ul>
</template>

<script>
	export default {
		props: ['modelValue'],
		emits: ['update:modelValue'],
		methods: {
			activate(option) {
				console.log(this.modelValue)
				this.$emit('update:modelValue', option)
			}
		}
	}
</script>

<style>
	.active {
		border-color: limegreen;
	}

	.active button {
		border-color: limegreen;
	}

	ul {
		list-style: none;
		margin: 00.5rem 0;
		padding: 0;
		display: flex;
	}

	li {
		margin: 0;
		border: 1px solid #ddd;
		padding: 1em;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	button {
		font: inherit;
		border: none;
		background-color: darkorange;
		cursor: pointer;
	}
</style>
```

配合`v-model`使用时，`v-mode=xxx`相当于`:modelValue="xxx" @update:modelValue="newValue => xxx = newValue"`。

## 其他指令

### `v-text/v-html`

#### 作用

向指定节点中渲染包含 html 结构的内容；

#### 与插值语法的区别

1. `v-html` 会替换掉节点中所有的内容，`{{xxx}}` 则不会；
2. `v-html` 可以识别 html 结构。

#### 注意！！！v-html 有安全性问题！

1. 在网站上动态渲染任意 HTML 是非常危险的，容易导致 XSS 攻击。
2. 一定要在可信的内容上使用 `v-html`，永远不要在用户提交的内容上使用。

### `v-cloak` 指令（没有值）

1. 本质是一个特殊属性，Vue 实例创建完毕并接管容器后，会删掉 `v-cloak` 属性。

2. 使用 css 配合 `v-cloak` 可以解决网速慢时页面展示出 `{{xxx}}` 的问题。

### `v-once` 指令

1. `v-once` 所在节点在初次动态渲染后，就视为静态内容了。
2. 以后数据的改变不会引起 `v-once` 所在结构的更新，可以用于优化性能。

### `v-pre` 指令

1. 跳过其所在节点的编译过程。
2. 可利用它跳过，没有使用指令语法、没有使用插值语法的节点，会加快编译。

### 自定义指令总结

#### 定义语法

##### 局部指令

```javascript
new Vue({
  directives: { 指令名: 配置对象 },
})

new Vue({
  directives() {},
})
```

##### 全局指令

```javascript
Vue.directive(指令名, 配置对象)
Vue.directive(指令名, 回调函数)
```

#### 配置对象中常用的 3 个回调

1. bind：指令与元素成功绑定时调用。
2. inserted：指令所在元素被插入页面时调用。
3. update：指令所在模板结构被重新解析时调用。

#### 备注

1. 指令定义时不加 `v-`，但是使用时要加 `v-`；
2. 指令名如果是多个单词，要使用 kebab-case 命名方式，不要使用 camelCase 命名。

## 生命周期

1. 又名：生命周期回调函数、生命周期函数、生命周期钩子；

2. 是什么：Vue 在关键时刻帮我们调用的一些特殊名称的函数；

3. 生命周期函数的名字不可更改，但函数的具体内容是程序员根据需求编写的；

4. 生命周期函数中的 this 指向是 vm 或 组件实例对象。

   ![vue-lifecycle](./../../.vuepress/public/images/vue-img/vue-lifecycle.png)

## 组件化

### Vue 中使用组件的三大步骤

#### 定义组件（创建组件）

如何定义一个组件？
使用 `Vue.extend(options)` 创建，其中 `options` 和 `new Vue(options)`时传入的那个 `options` 几乎一样，但区别如下：

1. `el` 不要写，为什么？——最终所以的组件都要经过一个 vm 的管理，由 vm 中 `el` 决定服务哪个容器。
2. data 必须写成函数，为什么？——避免组件被复用时，数据存在引用关系。

备注：使用 template 可以配置组件结构。

#### 注册组件

1. 局部注册：靠 `new Vue` 的时候传入 `components` 选项
2. 全局注册：靠 `Vue.component('组件名', 组件)`

#### 使用组件（写组件标签）

\<组件名>\</组件名>

##### 组件几个注意点

###### 关于组件名

一个单词组成：

- 第一种写法（首字母小写）：`school`
- 第二种写法（首字母大写）：`School`

多个单词组成：

- 第一种写法（kebab-case 命名）：`my-school`
- 第二种写法（CamelCase 命名）：`MySchool`（需要 Vue 脚手架支持）

备注：

1. 组件名尽可能回避 HTML 中已有的元素名称。例如：h2、H2 都不行；
2. 可以使用 name 配置项指定组件在开发者工具中呈现的名字。

###### 关于组件标签

第一种写法：\<school>\</school>
第二种写法：\<school/>
备注：不用使用脚手架时，\<school/>会导致后续组件不能渲染。

###### 一个简写方式

```javascript
const comp = Vue.extend({ options })
// 可简写为：
const comp = { options }
```

## 脚手架

### 脚手架文件结构

```
├── node_modules
├── public
│   ├── favicon.ico: 页签图标
│   └── index.html: 主页面
├── src
│   ├── assets: 存放静态资源
│   │   └── logo.png
│   │── component: 存放组件
│   │   └── HelloWorld.vue
│   │── App.vue: 汇总所有组件
│   │── main.js: 入口文件
├── .gitignore: git版本管制忽略的配置
├── babel.config.js: babel的配置文件
├── package.json: 应用包配置文件
├── README.md: 应用描述文件
├── package-lock.json：包版本控制文件
```

### 关于不同版本的 Vue

1. vue.js 与 vue.runtime.xxx.js 的区别：
   - vue.js 是完整版的 Vue，包含：核心功能 + 模板解析器。
   - vue.runtime.xxx.js 是运行版的 Vue，只包含：核心功能；没有模板解析器。
2. 因为 vue.runtime.xxx.js 没有模板解析器，所以不能使用 template 这个配置项，需要使用 render 函数接收到的 createElement 函数去指定具体内容。

### vue.config.js 配置文件

1. 使用 vue inspect > output.js 可以查看到 Vue 脚手架的默认配置。
1. 使用 vue.config.js 可以对脚手架进行个性化定制，详情见：[https://cli.vuejs.org/zh](https://cli.vuejs.org/zh)

### ref 属性

1. 被用来给元素或子组件注册引用信息（id 的替代者）
1. 应用在 html 标签上获取的是真实 DOM 元素，应用在组件标签上是组件实例对象（vc）
1. 使用方式：
   1. 打标识：\<h1 ref="xxx">.....\</h1> 或 \<School ref="xxx">\</School>
   1. 获取：`this.$refs.xxx`

### props 配置项

##### 功能

让组件接收外部传过来的数据

##### 传递数据

\<Demo name="xxx"/>

##### 接收数据

1.  第一种方式（只接收）：`props:['name']`
1.  第二种方式（限制类型）：`props:{name:String}`
1.  第三种方式（限制类型、限制必要性、指定默认值）：

```javascript
props:{
	name:{
        type:String, //类型
        required:true, //必要性
        default:'老王' //默认值
	}
}
```

> 备注：props 是只读的，Vue 底层会监测你对 props 的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制 props 的内容到 data 中一份，然后去修改 data 中的数据。

### mixin(混入)

##### 功能

可以把多个组件共用的配置提取成一个混入对象

##### 使用方式

第一步定义混合：

```
{
    data(){....},
    methods:{....}
    ....
}
```

第二步使用混入：
全局混入：`Vue.mixin(xxx)`
局部混入：`mixins:['xxx']`

### 插件

#### 功能

用于增强 Vue

#### 本质

包含 install 方法的一个对象，install 的第一个参数是 Vue，第二个以后的参数是插件使用者传递的数据。

#### 定义插件

```javascript
对象.install = function (Vue, options) {
    // 1. 添加全局过滤器
    Vue.filter(....)

    // 2. 添加全局指令
    Vue.directive(....)

    // 3. 配置全局混入(合)
    Vue.mixin(....)

    // 4. 添加实例方法
    Vue.prototype.$myMethod = function () {...}
    Vue.prototype.$myProperty = xxxx
}
```

#### 使用插件

`Vue.use()`

### scoped 样式

#### 作用

让样式在局部生效，防止冲突。

#### 写法

\<style scoped>

### webStorage

1. 存储内容大小一般支持 5MB 左右（不同浏览器可能还不一样）

1. 浏览器端通过 `Window.sessionStorage` 和 `Window.localStorage` 属性来实现本地存储机制。

1. 相关 API：

   `xxxxxStorage.setItem('key', 'value');`
   该方法接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值。

   `xxxxxStorage.getItem('person');`
   该方法接受一个键名作为参数，返回键名对应的值。

   `xxxxxStorage.removeItem('key');`
   该方法接受一个键名作为参数，并把该键名从存储中删除。

   `xxxxxStorage.clear()`
   该方法会清空存储中的所有数据。

1. 备注：

   `SessionStorage` 存储的内容会随着浏览器窗口关闭而消失。

   `LocalStorage` 存储的内容，需要手动清除才会消失。

   `xxxxxStorage.getItem(xxx)`如果 xxx 对应的 value 获取不到，那么 `getItem` 的返回值是 `null`。

   `JSON.parse(null)`的结果依然是 `null`。

### 自定义事件

1. 一种组件间通信的方式，适用于：**子组件 ----> 父组件**

1. 使用场景：A 是父组件，B 是子组件，B 想给 A 传数据，那么就要在 A 中给 B 绑定自定义事件（事件的回调在 A 中）。

1. 绑定自定义事件：


```vue
// 接收数据的父组件中
<receive-comp @some-event="setSomething"/>
......
method:{
    // 如果子组件有传入数据，那么下面方法中的参数即可接收该参数
	setSomething(data){
		...
	}
}

// 发送数据的子组件中
<button @click="triggerMethod">click</button>
method:{
  triggerMethod(){
    this.$emit('some-event', data);
  }
}
```

3.  若想让自定义事件只能触发一次，可以使用`once`修饰符，或`$once`方法。
4.  触发自定义事件：`this.$emit('xxx',数据)`
5.  解绑自定义事件`this.$off('xxx')`
6.  组件上也可以绑定原生 DOM 事件，需要使用`native`修饰符。
7.  注意：通过`this.$refs.xxx.$on('xxx',回调)`绑定自定义事件时，回调要么配置在 methods 中，要么用箭头函数，否则 this 指向会出问题！

### 全局事件总线（GlobalEventBus）

1.  一种组件间通信的方式，适用于任意组件间通信。
1.  安装全局事件总线：

```javascript
new Vue({
	......
	beforeCreate() {
		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
	},
    ......
})
```

3. 使用事件总线：

   接收数据：A 组件想接收数据，则在 A 组件中给 `$bus` 绑定自定义事件，事件的回调留在 A 组件自身。

```javascript
methods(){
  demo(data){......}
}
......
mounted() {
  this.$bus.$on('xxxx',this.demo)
}
```

 提供数据：`this.$bus.$emit('xxxx',数据)`

最好在 `beforeDestroy` 钩子中，用 `$off` 去解绑当前组件所用到的事件。

### 消息订阅与发布（pub/sub）

1. 一种组件间通信的方式，适用于任意组件间通信。

1. 使用步骤：

   安装 pubsub：`npm i pubsub-js`

   引入: `import pubsub from 'pubsub-js'`

   接收数据：A 组件想接收数据，则在 A 组件中订阅消息，订阅的回调留在 A 组件自身。

```javascript
methods(){
  demo(data){......}
}
......
mounted() {
  this.pid = pubsub.subscribe('xxx',this.demo) //订阅消息
}
```

提供数据：`pubsub.publish('xxx',数据)`

最好在 `beforeDestroy` 钩子中，用`PubSub.unsubscribe(pid)`去取消订阅。

### nextTick

#### 语法

this.$nextTick(回调函数)`

#### 作用

在下一次 DOM 更新结束后执行其指定的回调。

#### 适用场景

当改变数据后，要基于更新后的新 DOM 进行某些操作时，要在 nextTick 所指定的回调函数中执行。

## `Vue`封装的过度与动画

### Transition & Animation

CSS3 中有两个用来做动画的属性，一个是`Transition`，另一个是`Animation`。

差异比较

| CSS3       | 差异                                                         |
| ---------- | ------------------------------------------------------------ |
| Transition | 在给定的持续时间内平滑地更改属性值（从一个值到另一个值），<br />也就是只需指定开始结束的参数，参数改变时就触发动画。 |
|            | 常用于鼠标事件(`:hover` `:active` `:focus` `click`)或键盘输入时触发。 |
|            | 需要事件触发，无法在网页加载时自动发生，是一次性的，不可重发发生，除非一再触发。 |
|            | 只能定义开始状态和结束状态，不能定义中间状态。               |
| Animation  | 可以自行编写动画，开始、进行中、结束时各阶段的变化，<br />适合用来做比较细微的动画表现，需要明确的指定关键帧(`@keyframes`)参数。 |
|            | 网页加载时会直接执行，可以自行控制各阶段动画的变化。         |

> `animations`和`transtitions`最大的不同在于，`transitions`是当参数发生改变时触发，而`animations`则是直接执行，所以动画效果需要明确指定关键帧的参数。

### `Transition`写法

```css
.box {
  width: 100px;
  height: 100px;
  background: purple;
  transition: width 2s ease-out 2s;
}

.box:hover {
  width: 200px;
  height: 200px;
  background: red;

}
```

`Transition`写法相对`Animation`是比较简单的

### `Animation`写法

```css
div{ 
    animation: change 5s; // 8个属性中至少要有名称、时间
}

//设定开始与结束状态
@keyframes change{
    from{ background: #4BC0C8;}
    to{ background: #C779D0;}
}
// from 就是0%，to 为100%。
```

```css
div{ 
    animation: change 5s ;
}

//设定多个状态，可以非常详细
@keyframes change{
    0%{ background: #4BC0C8;}
    20%{ background: #C779D0;}
    60%{ background: #FEAC5E;}
    80%{ background: #185a9d;}
    100%{ background: #4BC0C8;}
}
```

1.  作用：在插入、更新或移除 DOM 元素时，在合适的时候给元素添加样式类名。
1.  写法：
1.  属性：
    - name属性
    - mode属性——`in-out` / `out-in`
    - 过渡事件，`@before-enter=""` --  `@enter=""` -- `@after-enter=""` -- `@before-leave=""` -- `@leave=""` -- `@after-leave=""` -- `@enter-cancelled=""` -- `@leave-cancelled=""`
    - :css属性——`false` / `true`
1.  准备好样式：

    - 元素进入的样式：
      1.  `v-enter`：进入的起点
      1.  `v-enter-active`：进入过程中
      1.  `v-enter-to`：进入的终点
    - 元素离开的样式：
      1.  `v-leave`：离开的起点
      1.  `v-leave-active`：离开过程中
      1.  `v-leave-to`：离开的终点
1.  使用\<transition>包裹要过度的元素，并配置 name 属性：
    - name属性
    - tag属性

```vue
<transition name="hello">
	<h1 v-show="isShow">你好啊！</h1>
</transition>
```

备注：

- `transition`标签必须只能有一个直接子元素标签；

- 若有多个元素需要过度，则需要使用：\<transition-group>，且每个元素都要指定`key`值。

- `.xxx-move{}`样式配置用于解决多个元素平滑的进行移动移位。

- `transition`标签也可以用于包装路由标签`router-view`，但仅在vue2中使用，如下：

  ```vue
  <transition>
  	<router-view></router-view>
  </transition>
  ```

## vue 脚手架配置代理

### 方法一

    在vue.config.js中添加如下配置：

```javascript
devServer: {
  proxy: 'http://localhost:5000'
}
```

#### 优点

配置简单，请求资源时直接发给前端（8080）即可。

#### 缺点

不能配置多个代理，不能灵活的控制请求是否走代理。

#### 工作方式

若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器 （优先匹配前端资源）

### 方法二

```javascript
// 编写vue.config.js配置具体代理规则：
module.exports = {
  devServer: {
    proxy: {
      '/api1': {
        // 匹配所有以 '/api1'开头的请求路径
        target: 'http://localhost:5000', // 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: { '^/api1': '' },
      },
      '/api2': {
        // 匹配所有以 '/api2'开头的请求路径
        target: 'http://localhost:5001', // 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: { '^/api2': '' },
      },
    },
  },
}
/*
   changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
   changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
   changeOrigin默认值为true
*/
```

#### 优点

可以配置多个代理，且可以灵活的控制请求是否走代理。

#### 缺点

配置略微繁琐，请求资源时必须加前缀。

## 插槽

### 作用

让父组件可以向子组件指定位置插入 html 结构，也是一种组件间通信的方式，适用于 **父组件 ===> 子组件** 。

### 分类

默认插槽、具名插槽、作用域插槽

### 使用方式

#### 默认插槽

```vue
父组件中：
<Category>
           <div>html结构1</div>
        </Category>
子组件中：
<template>
  <div>
    <!-- 定义插槽 -->
    <slot>插槽默认内容...</slot>
  </div>
</template>
```

#### 具名插槽

```vue
父组件中：
<Category>
            <template slot="center">
              <div>html结构1</div>
            </template>

            <template v-slot:footer>
               <div>html结构2</div>
            </template>
        </Category>
子组件中：
<template>
  <div>
    <!-- 定义插槽 -->
    <slot name="center">插槽默认内容...</slot>
    <slot name="footer">插槽默认内容...</slot>
  </div>
</template>
```

#### 作用域插槽

理解：数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定。（games 数据在 Category 组件中，但使用数据所遍历出来的结构由 App 组件决定）

具体编码：

```vue
父组件中：
<Category>
			<template scope="scopeData">
				<!-- 生成的是ul列表 -->
				<ul>
					<li v-for="g in scopeData.games" :key="g">{{g}}</li>
				</ul>
			</template>
		</Category>

<Category>
			<template slot-scope="scopeData">
				<!-- 生成的是h4标题 -->
				<h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
			</template>
		</Category>
子组件中：
<template>
  <div>
    <slot :games="games"></slot>
  </div>
</template>

<script>
export default {
  name: 'Category',
  props: ['title'],
  //数据在子组件自身
  data() {
    return {
      games: ['红色警戒', '穿越火线', '劲舞团', '超级玛丽'],
    }
  },
}
</script>
```

## `Vuex`

### 为什么要使用`Vuex`

![wyn-use-vuex](./../../.vuepress/public/images/vue-img/wyn-use-vuex.svg)

### `Vuex`工作原理

![how-vuex-works](./../../.vuepress/public/images/vue-img/how-vuex-works.svg)

### 概念

在 Vue 中实现集中式状态（数据）管理的一个 Vue 插件，对 Vue 应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。

### 何时使用？

多个组件需要共享数据时

### 搭建 `vuex` 环境

创建文件：`src/store/index.js`

```javascript
//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

//准备actions对象——响应组件中用户的动作
const actions = {}
//准备mutations对象——修改state中的数据
const mutations = {}
//准备state对象——保存具体的数据
const state = {}

//创建并暴露store
export default new Vuex.Store({
  actions,
  mutations,
  state,
})
```

在`main.js`中创建 vm 时传入`store`配置项

```javascript
......
//引入store
import store from './store'
......

//创建vm
new Vue({
	el:'#app',
	render: h => h(App),
	store
})
```

### 基本使用

1.  初始化数据、配置`actions`、配置`mutations`，操作文件`store.js`

```javascript
//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//引用Vuex
Vue.use(Vuex)

const actions = {
  //响应组件中加的动作
  plus(context, value) {
    // console.log('actions中的plus被调用了',miniStore,value)
    context.commit('PLUSONE', value)
  },
}

const mutations = {
  //执行加
  PLUSONE(state, value) {
    // console.log('mutations中的JIA被调用了',state,value)
    state.sum += value
  },
}

//初始化数据
const state = {
  sum: 0,
}

//创建并暴露store
export default new Vuex.Store({
  actions,
  mutations,
  state,
})
```

2.  组件中读取 vuex 中的数据：`$store.state.sum`
3.  组件中修改 vuex 中的数据：`$store.dispatch('action中的方法名',数据)` 或 `$store.commit('mutations中的方法名',数据)`
    > 备注：若没有网络请求或其他业务逻辑，组件中也可以越过 actions，即不写`dispatch`，直接编写`commit`

### `getters` 的使用

1.  概念：当 `state` 中的数据需要经过加工后再使用时，可以使用 `getters` 加工。
1.  在`store.js`中追加`getters`配置

```javascript
......

const getters = {
	bigSum(state){
		return state.sum * 10
	}
}

//创建并暴露store
export default new Vuex.Store({
	......
	getters
})
```

3.  组件中读取数据：`$store.getters.bigSum`

### 四个 map 方法的使用

使用需要引入：`import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';`

1.  **mapState 方法：**用于帮助我们映射`state`中的数据为计算属性

```javascript
computed: {
    // 借助mapState生成计算属性：sum、school、subject（对象写法）
     ...mapState({sum:'sum',school:'school',subject:'subject'}),

    // 借助mapState生成计算属性：sum、school、subject（数组写法）
    ...mapState(['sum','school','subject']),
},
```

2.  **mapGetters 方法：**用于帮助我们映射`getters`中的数据为计算属性

```javascript
computed: {
    // 借助mapGetters生成计算属性：bigSum（对象写法）
    ...mapGetters({bigSum:'bigSum'}),

    // 借助mapGetters生成计算属性：bigSum（数组写法）
    ...mapGetters(['bigSum'])
},
```

3.  **mapActions 方法：**用于帮助我们生成与`actions`对话的方法，即：包含`$store.dispatch(xxx)`的函数

```javascript
methods:{
    // 靠mapActions生成：incrementOdd、incrementWait（对象形式）
    ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})

    // 靠mapActions生成：incrementOdd、incrementWait（数组形式）
    ...mapActions(['jiaOdd','jiaWait'])

    // 如果想给action传入payload
    // 第一个参数是 namespaced 名，第二个参数是 action 方法名
	...mapActions('carts', ['removeProduct']),
	remove() {
		this.removeProduct(yourPayload)
	}
    // 等同于
    this.$store.dispatch('carts/removeProduct', yourPayload)
}
```

4.  **mapMutations 方法：**用于帮助我们生成与`mutations`对话的方法，即：包含`$store.commit(xxx)`的函数

```javascript
methods:{
    // 靠mapActions生成：increment、decrement（对象形式）
    ...mapMutations({increment:'JIA',decrement:'JIAN'}),

    // 靠mapMutations生成：JIA、JIAN（对象形式）
    ...mapMutations(['JIA','JIAN']),
}
```

> 备注：mapActions 与 mapMutations 使用时，若需要传递参数需要：在模板中绑定事件时传递好参数，否则参数是事件对象。

### 模块化+命名空间

1.  目的：让代码更好维护，让多种数据分类更加明确。
1.  修改`store.js`

```javascript
const countAbout = {
  namespaced: true,//开启命名空间
  state:{x:1},
  mutations: { ... },
  actions: { ... },
  getters: {
    bigSum(state){
       return state.sum * 10
    }
  }
}

const personAbout = {
  namespaced:true,//开启命名空间
  state:{ ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    countAbout,
    personAbout
  }
})
```

3.  开启命名空间后，组件中读取 state 数据：

```javascript
//方式一：自己直接读取
this.$store.state.personAbout.list
//方式二：借助mapState读取：
...mapState('countAbout',['sum','school','subject']),
```

4.  开启命名空间后，组件中读取 getters 数据：

```javascript
//方式一：自己直接读取
this.$store.getters['personAbout/firstPersonName']
//方式二：借助mapGetters读取：
...mapGetters('countAbout',['bigSum'])
```

5.  开启命名空间后，组件中调用 dispatch

```javascript
//方式一：自己直接dispatch
this.$store.dispatch('personAbout/addPersonWang',person)
//方式二：借助mapActions：
...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
```

6.  开启命名空间后，组件中调用 commit

```javascript
//方式一：自己直接commit
this.$store.commit('personAbout/ADD_PERSON',person)
//方式二：借助mapMutations：
...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
```

## 路由

### 理解

一个路由（route）就是一组映射关系（key - value），多个路由需要路由器（router）进行管理。

前端路由：key 是路径，value 是组件。

### 基本使用

1. 安装 vue-router，命令：`npm i vue-router`

   `npm install --save vue-router@next`可以安装最新版本的路由包

1. 应用插件：`Vue.use(VueRouter)`

1. 路由历史记录：`history: createWebHistory()`

1. 编写 router 配置项：

```javascript
import { createApp } from 'vue';

import App from './App.vue';

import { createRouter, createWebHistory } from 'vue-router'
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers'
import NotFoundPage from './components/NotFoundPage.vue'

import TeamFooter from '@/components/teams/TeamFooter'
import UsersFooter from '@/components/users/UsersFooter'

const app = createApp(App
                      
//创建router实例对象，去管理一组一组的路由规则
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/teams' },
        {
            // alias
            // 路由配合 <router-link></router-link> 使用
            name: 'teams',
            // 使用 name 属性可以有更好的维护性，想要更改 name 对应的路由路径只需改 path 即可
            path: '/teams',
            // meta: {}
            components: {
                default: TeamsList,
                footer: TeamFooter
            },
            children: [
                // 嵌套子路由配合 <router-view></router-view> 使用
                { name: 'team-members', path: ':teamId', component: TeamMembers, props: true }
            ]
        },
        {
            path: '/users', components: {
                default: UsersList, footer: UsersFooter
            },
            beforeEnter() {
                console.log(2)
            }
        },
        // 正则表达式，匹配所有未知页面
        { path: '/:notFound(.*)*', component: NotFoundPage }
    ],
    linkActiveClass: 'active',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }

        return { left: 0, top: 0 }
    }
})

router.beforeEach(function (to, from, next) {
    console.log(1)
    console.log(to, from)
    next()
})

// 路由守卫加载顺序：
//  router.beforeEach --> routes: beforeEnter --> components: beforeRouteEnter
// 当前页面更新组件可以使用: beforeRouteUpdate

// router.afterEach(function (to, from) {

// })

// route leave guards
// 应用场景：比如有一个表单，希望确保在保存表单之前，至少警告下用户存在未保存更改的内容，如果离开页面，这些更改将丢失。
// beforeRouteLeave() {}

app.use(router)

app.mount('#app');
```

4.  实现切换（active-class 可配置高亮样式）

```vue
<router-link active-class="active" to="/about">About</router-link>
```

5.  指定展示位置

```vue
<router-view></router-view>
```

### 坑的地方

如果使用的是 vue2 的 脚手架，那么下载 vue-router 的版本应该是 3，也就是安装时执行以下脚本：

```bash
npm install vue-router@3

/* 卸载 vue-router*/
npm uninstall vue-router --save
```

### 几个注意点

1. 路由组件通常存放在`pages`文件夹，一般组件通常存放在`components`文件夹。
1. 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载。
1. 每个组件都有自己的`$route`属性，里面存储着自己的路由信息。
1. 整个应用只有一个`router`，可以通过组件的`$router`属性获取到。

### 多级路由（多级路由）

1.  配置路由规则，使用 `children` 配置项：

```javascript
routes: [
  {
    path: '/about',
    component: About,
  },
  {
    path: '/home',
    component: Home,
    children: [
      //通过children配置子级路由
      {
        path: 'news', //此处一定不要写：/news
        component: News,
      },
      {
        path: 'message', //此处一定不要写：/message
        component: Message,
      },
    ],
  },
]
```

2.  跳转（要写完整路径）：

```vue
<router-link to="/home/news">News</router-link>
```

### 路由的 query 参数

1.  传递参数

```vue
<!-- 跳转并携带query参数，to的字符串写法 -->
<router-link :to="/home/message/detail?id=666&title=你好">跳转</router-link>

<!-- 跳转并携带query参数，to的对象写法 -->
<router-link
  :to="{
    path: '/home/message/detail',
    query: {
      id: 666,
      title: '你好',
    },
  }"
>跳转</router-link>
```

2.  接收参数：

```javascript
$route.query.id
$route.query.title
```

### 命名路由

#### 作用

可以简化路由的跳转。

#### 如何使用

1.  给路由命名：

```javascript
{
	path:'/demo',
	component:Demo,
	children:[
		{
			path:'test',
			component:Test,
			children:[
				{
          name:'hello' //给路由命名
					path:'welcome',
					component:Hello,
				}
			]
		}
	]
}
```

2.  简化跳转：

```vue
<!--简化前，需要写完整的路径 -->
<router-link to="/demo/test/welcome">跳转</router-link>

<!--简化后，直接通过名字跳转 -->
<router-link :to="{ name: 'hello' }">跳转</router-link>

<!--简化写法配合传递参数 -->
<router-link
  :to="{
    name: 'hello',
    query: {
      id: 666,
      title: '你好',
    },
  }"
>跳转</router-link>
```

### 路由的 params 参数

1.  配置路由，声明接收 params 参数

```javascript
{
	path:'/home',
	component:Home,
	children:[
		{
			path:'news',
			component:News
		},
		{
			component:Message,
			children:[
				{
					name:'dir_detail',
					path:'detail/:id/:title', //使用占位符声明接收params参数
					component:Detail
				}
			]
		}
	]
}
```

2.  传递参数

```vue
<!-- 跳转并携带params参数，to的字符串写法 -->
<router-link :to="/home/message/detail/666/你好">跳转</router-link>

<!-- 跳转并携带params参数，to的对象写法 -->
<router-link
  :to="{
    name: 'dir_detail',
    params: {
      id: 666,
      title: '你好',
    },
  }"
>跳转</router-link>
```

3.  接收参数：

```javascript
$route.params.id
$route.params.title
```

### 路由的 props 配置

#### 作用

让路由组件更方便的收到参数

**父级组件中：**

```html
<template>
  <div>
    <ul>
      <li v-for="n in news" :key="n.id">
        <!-- 这里一定要用 query 不能使用 params -->
        <router-link
          :to="{
                name: 'dir_detail',
                query: {
                      id: n.id,
                      title: n.title,
                       },
                }"
          >{{ n.title }}</router-link
        >
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
```

**路由配置：**

```javascript
{
	name:'dir_detail',
	path:'detail/:id',
	component:Detail,

	//第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
	// props:{a:900}

	//第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
	// props:true

	//第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
	props($route){
		return {
			id:$route.query.id,
			title:$route.query.title
		}
	}
}
```

**接收的组件：**

```javascript
{
  name : 'Detail',
  props : ['id', 'title'],
}
```

`params` 和 `query` 的区别：

- query 方式生成的 url 为 xxx?id=\*\*\*，params 方式生成的 url 为 xxx/id
- path 只能使用 query 方式
- params 方式需要注意的是需要定义路由信息如：path: '/xx/:id',这样才能进行携带参数跳转，否则 url 不会进行变化，并且再次刷新页面后参数会读取不到

### \<router-link>的 replace 属性

#### 作用

控制路由跳转时操作浏览器历史记录的模式

1. 浏览器的历史记录有两种写入方式：分别为`push`和`replace`，`push`是追加历史记录，`replace`是替换当前记录。路由跳转时候默认为`push`
1. 如何开启`replace`模式：\<router-link replace .......>News\</router-link>

### 编程式路由导航

#### 作用

不借助\<router-link>实现路由跳转，让路由跳转更加灵活

具体编码：

```javascript
//$router的两个API
this.$router.push({
  name: 'xxx',
  params: {
    id: xxx,
    title: xxx,
  },
})

this.$router.replace({
  name: 'xxx',
  params: {
    id: xxx,
    title: xxx,
  },
})
this.$router.forward() //前进
this.$router.back() //后退
this.$router.go() //可前进也可后退
```

### 缓存路由组件

#### 作用

让不展示的路由组件保持挂载，不被销毁。

具体编码：

```vue
<keep-alive include="News"> 
    <router-view></router-view>
</keep-alive>
```

### 两个新的生命周期钩子

#### 作用

路由组件所独有的两个钩子，用于捕获路由组件的激活状态。

#### 具体名字

1. `activated`路由组件被激活时触发。
1. `deactivated`路由组件失活时触发。
1. 要配合\<keep-alive\>标签使用，保证路由组件不销毁。

### 路由守卫

#### 作用

对路由进行权限控制

#### 分类

全局守卫、独享守卫、组件内守卫

##### 全局守卫

```javascript
//全局前置守卫：初始化时执行、每次路由切换前执行
router.beforeEach((to, from, next) => {
  console.log('beforeEach', to, from)
  if (to.meta.isAuth) {
    //判断当前路由是否需要进行权限控制
    if (localStorage.getItem('school') === 'atguigu') {
      //权限控制的具体规则
      next() //放行
    } else {
      alert('暂无权限查看')
      // next({name:'guanyu'})
    }
  } else {
    next() //放行
  }
})

//全局后置守卫：初始化时执行、每次路由切换后执行
router.afterEach((to, from) => {
  console.log('afterEach', to, from)
  if (to.meta.title) {
    document.title = to.meta.title //修改网页的title
  } else {
    document.title = 'vue_test'
  }
})
```

##### 独享守卫

```javascript
beforeEnter(to,from,next){
	console.log('beforeEnter',to,from)
	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
		if(localStorage.getItem('school') === 'atguigu'){
			next()
		}else{
			alert('暂无权限查看')
			// next({name:'guanyu'})
		}
	}else{
		next()
	}
}
```

##### 组件内守卫

```javascript
//进入守卫：通过路由规则，进入该组件时被调用
beforeRouteEnter (to, from, next) {
},
//离开守卫：通过路由规则，离开该组件时被调用
beforeRouteLeave (to, from, next) {
}
```

### 路由器的两种工作模式

1. 对于一个 url 来说，什么是 hash 值？—— #及其后面的内容就是 hash 值。
1. hash 值不会包含在 HTTP 请求中，即：hash 值不会带给服务器。
1. hash 模式：
   1. 地址中永远带着#号，不美观 。
   1. 若以后将地址通过第三方手机 app 分享，若 app 校验严格，则地址会被标记为不合法。
   1. 兼容性较好。
1. history 模式：
   1. 地址干净，美观 。
   1. 兼容性和 hash 模式相比略差。
   1. 应用部署上线时需要后端人员支持，解决刷新页面服务端 404 的问题。
