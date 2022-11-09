# Web Performance--性能影响因素 DOM（三）

<img src="../.vuepress/public/images/WebPerformance/performance3.jpg" alt="performance2" style="zoom:80%;" />

众所周知，页面的基本骨架是由 DOM 元素组成的。当从服务器上获取到 HTML 文件后，浏览器会解析 HTML 为 DOM，那么 DOM 到底是什么呢？

## 什么是 DOM？

从网络传给渲染引擎的 HTML 文件字节流是无法直接被渲染引擎理解的，所以要将 HTML 文件转化为渲染引擎可以理解的内部结构，而这个结构就是 DOM。DOM 提供了对 HTML 文档结构化的表。在渲染引擎中，DOM 有三个层面的作用。

- 从页面的视角来看，DOM 是生成页面的基础数据结构。
- 从 JavaScript 脚本视角来看，DOM 提供给 JavaScript 脚本操作的接口，通过这套接口，JavaScript 可以对 DOM 结构进行访问，从而改变文档的结构、样式和内容。
- 从安全视角来看，DOM 是一道安全防护线，一些不安全的内容在 DOM 解析阶段就被拒之门外了。

总而言之，DOM 是表述 HTML 的内部数据结构，它会将 Web 页面和 JavaScript 脚本连接起来，并过滤一些不安全的内容。

## DOM 树如何生成

在渲染引起内部，有一个叫**HTML 解析器**的模板，它的职责就是负责将 HTML 字节流转换为 DOM 结构。

首先，我们先搞清楚一个问题：<u>HTML 解析器是等整个 TML 文档加载完成之后开始的，还是随着 HTML 文档边加载边解析的？</u>

> 答案是：HTML 解析器并不是等到整个文档加载完成之后再解析的，而是网络进程加载了多少数据，HTML 解析器就解析多少数据。

当网络进程接收到响应头之后，会根据响应头中的 `content-type` 字段来判断文件的类型，比如`content-type` 的值是`"text/html"`，那么浏览器就会判断这是一个 HTML 类型的文件，然后为该请求选择或者创建一个渲染进程。渲染进程准备好之后，网络进程和渲染进程之间会建立一个共享数据的管道，网络进程接收到数据后就往这个管道里输入，而渲染进程则从管道的另一边不断地读取数据，并同时将读取的数据“输送”给 HTML 解析器。这样一来，网络进程一边输入，渲染进程一边接收，动态地接收字节流，并将其解析为 DOM。

那么接收到的字节流是怎么转换为 DOM 的呢？

![bytesConvertDom](../.vuepress/public/images/WebPerformance/bytesConvertDom.svg)

如上图所示，字节流转换为 DOM 需要三个阶段。

### 阶段一，通过分词器将字节流转换为 Token

浏览器的 V8 引擎在编译 JavaScript 过程中的第一步是做词法分析，将 JavaScript 先分解为一个个的 Token，解析 HTML 也是如此，需要先通过分词器先将字节流转换为一个个 Token，分为`Tag Token`和`文本Token`。

![createToken](../.vuepress/public/images/WebPerformance/createToken.svg)

由上图可以看出，Tag Token 又分为 StartTag 和 EndTag，比如`<body>`就是 StartTag，`</body>`就是 EndTag，分别对应图中的蓝色和粉红色块，文本 Token 对应的绿色块。

至于后续的第二个和第三个阶段是同步进行的，需要将 Token 解析为 DOM 节点，并将 DOM 节点添加到 DOM 树中。

HTML 解析器维护了一个 Token 栈结构，该 Token 栈主要用来计算节点之间的父子关系，在第一个阶段中生成的 Token 会被按照顺序压到栈中。

具体的处理规则：

- 如果压入栈中的是`StartTag Token`，HTML 解析器会为该 Token 创建一个 DOM 节点，然后将该节点加入到 DOM 树中，它的父节点就是栈中相邻的那个元素生成的节点。
- 如果分词器解析出来的是`文本Token`，那么会生成一个文本节点，然后将该节点加入到 DOM 树中，文本 Token 是不需要压入到栈中，它的节点就是当前栈顶 Token 所对应的 DOM 节点。
- 如果分词器解析出来的是`EndTag标签`，比如是`EndTag div`，HTML 解析器会查看 Token 栈顶的元素是否是`StarTag div`，如果是，就将`StartTag div`从栈中弹出，表示该 div 元素解析完成。

然后分词器产生的心 Token 就这样不停地压栈和出栈，整个解析过程就这样一直持续下去，直到分词器将所有字节流分词完成。

说了这么多，不如直接用例子来说明，如下示例 HTML：

```html
<html>
  <body>
    <div>1</div>
    <div>2</div>
  </body>
</html>
```

> 补充说明，HTML 解析器开始工作时，会默认创建一个根为`document`的空 DOM 结构，同时会将一个`StartTag document`的 Token 压入栈底。然后经过分词器解析出来的第一个`StartTag html Token`会被压入到栈中，并创建一个 html 的 DOM 节点，添加到`document`上，如下图。

![parseDOM1](../.vuepress/public/images/WebPerformance/parseDOM1.svg)

然后，按照同样的流程解析出`StartTag body`和`StartTag div`，其 Token 栈和 DOM 的状态如下图所示：

![parseDOM2](../.vuepress/public/images/WebPerformance/parseDOM2.svg)

接下来解析出来的是第一个 div 的`文本Token`，渲染引擎会为该 Token 创建一个文本节点，并将该 Token 添加到 DOM 中，它的父节点就是当前 Token 栈顶元素对应的节点，如下图所示：

![parseDOM3](../.vuepress/public/images/WebPerformance/parseDOM3.svg)

继续，分词器解析出来第一个`EndTag div`，这时候 HTML 解析器会去判断当前栈顶的元素是否是`StartTag div`，如果是则从栈顶弹出 StartTag div，如下图所示：

![parseDOM4](../.vuepress/public/images/WebPerformance/parseDOM4.svg)

反复循环解析，最终的结果如下图：

![parseDOM5](../.vuepress/public/images/WebPerformance/parseDOM5.svg)

以上的一些列过程就是 DOM 生成的过程。不过在实际生产环境中，HTML 源文件中既包含 CSS 和 JavaScript，又包含图片、音频、视频等文件，所以处理过程也远远比上面的实例复杂。

### JavaScript 如何影响 DOM 生成

来一段稍微复杂点的 HTML：

```html
<html>
  <body>
    <div>1</div>
    <script>
      let div1 = document.getElementsByTagName('div')[0]
      div1.innerText = '123'
    </script>
    <div>2</div>
  </body>
</html>
```

上面的这段 HTML 在 div 中间插入了一段 JavaScript 脚本。`<script>`标签之前，所有的解析流程还是和之前的一样，但是解析到`<script>`标签时，渲染引擎判断这是一段脚本，此时 HTML 解析器就会暂停 DOM 解析，因为接下来的 JavaScript 可能要修改当前已经生成的 DOM 结构。

当解析到 script 脚本标签时，其 DOM 树结构如下：

![parseDOM6](../.vuepress/public/images/WebPerformance/parseDOM6.svg)

这时候 HTML 解析器就会暂停工作，JavaScript 引擎介入，并执行 script 标签中的这段脚本，因为这段 JavaScript 脚本修改了 DOM 中第一个 div 中的内容，所以执行这段脚本后，div 节点内容已经修改为 123。脚本执行完成之后，HTML 解析器恢复解析过程，继续解析后续的内容，直至生成最终的 DOM。

除了在 HTML 中内嵌 JavaScript 脚本以外，我们常常会在页面中引入 JavaScript 文件，那么这个解析过程就稍微复杂了些，如下代码：

```javascript
// test.js
let div1 = document.getElementsByTagName('div')[0]
div1.innerText = '123'
```

```html
<html>
  <body>
    <div>1</div>
    <script type="text/javascript" src="test.js"></script>
    <div>2</div>
  </body>
</html>
```

以上的代码功能和内嵌代码是一致的，不过这里是用了 JavaScript 文件加载。其整个执行流程还是一样的，执行到 JavaScript 标签时，暂停整个 DOM 的解析，执行 JavaScript 代码，不过这里执行 JavaScript 时，需要先下载这段 JavaScript 代码。这里需要重点关注下载环境，因为 JavaScript 文件的下载过程会阻塞 DOM 解析，而通常下载又是非常耗时的，**会受到网络环境、JavaScript 文件大小等因素的影响**。

不过 Chorme 浏览器做了很多的优化，其中一个主要的优化是**预解析操作**。当渲染引擎收到字节流之后，会开启一个预解析线程，用来分析 HTML 文件中包含的 JavaScript、CSS 等相关文件，解析到相关文件之后，预解析线程会提前下载这些文件。

再回到 DOM 解析上，我们知道引入 JavaScript，线程会阻塞解析 DOM，不过也有一些相关的策略来规避：

- CDN 加速 JavaScript 文件加载，压缩 JJavaScript 文件的体积。
- 如果 JavaScript 文件中没有操作 DOM 相关代码，可以 JavaScript 脚本设置为异步加载。
- `async`：脚本并行加载，加载完成之后立即执行，执行时机不确定，仍有可能阻塞 HTML 解析，执行时机在`load`事件派发之前。
- `defer`：脚本并行加载，等待 HTML 解析完成之后，按照加载顺序执行脚本，执行时机在`DOMContentLoaded`事件派发之前。

## 总结

以上就是 DOM 解析时，JavaScript 脚本的影响。额外说明，渲染引擎还有一个安全检查模块叫`XSSAuditor`，用于检查词法安全。在分词器解析出来 Token 之后，它会检测这些模块是否安全，比如是否引用了外部脚本，是否符合 CSP 规范，是否存在跨站点请求等。如果出现不符合规范的内容，`XSSAuditor`会对该脚本或者下载任务进行拦截。
