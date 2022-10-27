# 学就废的记录一：getElement\* API

<img src="../.vuepress/public/images/dailyArticleImg/getElementAPI-1.jpg" alt="getElementAPI-1" style="zoom:80%;" />

## 问题缘由

基础还是不能忘呀，突然有一个需求，需要更改附件插件中按钮的文本显示，就想着用原生 DOM 方法改一下，没想到又学习了一些“旧的知识”。

## 解决办法

如何更改附件插件中“添加"按钮的文本值：

```javascript
Forguncy.Page.bind('loaded', () => {
  let elem = document.getElementsByClassName('attackment')
  for (var i = 0; i < elem.length; ++i) {
    let el = elem[i]
    el.getElementsByTagName('button')[0].innerHTML = 'fuck'
  }
})
```

## `getElement*`系列方法

关于`getElementById`, `getElementsByClassName`, `getElementssByName`, `getElementsByTagName`, `getElementsByTagNameNS`的区别

首先，`getElementById`这个方法因为取的是`IDs`值，`IDs`值唯一，所以该方法返回的元素也是唯一的一个元素（如果没有找到则为`null`）。

然而，`getElementsByClassName`, `getElementssByName`, `getElementsByTagName`, `getElementsByTagNameNS`这四个方法的返回值都是一个可遍历的元素集合。

这些方法的名称提供了一些暗示：`getElement`暗示是单数的，`getElements`暗示是复数的。

同样，`querySelector`返回的是唯一的元素，`querySelectorAll`返回的也是可遍历的元素集合。

返回的元素集合为`NodeList`或`HTMLCollection`。

## 多一个`s`的区别

`getElementssByName`和`querySelectorAll`都会返回`NodeList`；其他`getElementsBy*`方法返回的都是`HTMLCollection`，这里注意，有一些浏览器版本中的实现略有差异。

所有的集合类型不会提供一些元素的属性、节点或相似的类型，这是当我们使用`style`、`docment.getElements...(...)`这些方法或属性时会报错的原因。话句话说，一个`NodeList`或`HTMLCollection`是没有`style`的，只有`Element`有`style`。

---

这些像数组的集合就是包含 0 个或更多个元素的`lists`，需要先遍历后再访问使用，和遍历数组一样，但他们和数组并不一样。

## 方法返回集合元素的使用

在现代浏览器中，可将这些可遍历对象转换为数组，然后就可以使用`forEach`或其他数组遍历方法遍历使用：

```javascript
Array.form(document.getElementsByClassName('myEle')).forEach((element) => (element.style.size = '100px'))
```

有一些老版本的浏览器不支持`Array.form`，或者其他的遍历方法，所以可以选择使用`Array.prototype.slice.call`，这样就可以遍历一个真正的数组：

```javascript
var elements = Array.prototype.slice.call(document.getElementsByClassName('myEle'))

for (var i = 0; i < elements.length; ++i) {
  elements[i].style.size = '100px'
}
```

当然也可以选择遍历`NodeList`或`HTMLCollection`本身，但是可能会有很多次的循环，他们的实现标准可以参考([MDN DOCS]([NodeList - Web APIs | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/API/NodeList#live_vs._static_nodelists)),[DOM spec]([DOM Standard (whatwg.org)](https://dom.spec.whatwg.org/#concept-collection-live)))，`NodeList`或`HTMLCollection`会在 DOM 发生改变时更新。MDN 文档一直在提醒如果某个方法返回动态集合或静态集合，并且在循环里需要插入或移除元素，就要确保不要意外跳过某些元素或者制造出无限循环。

举个栗子，`NodeList`提供了一些遍历方法例如`forEach`：

```javascript
document.querySelectorAll('.someElement').forEach((Element) => (element.style.size = '100px'))
```

简单的`for`循环也可以：

```javascript
var elements = document.getElementsByClassName('someEement')

for (var i = 0; i < elements.length; ++i) {
  elements[i].style.size = '100px'
}
```

另外，注意一下，`NodeList`中有`.childNodes`，`HTMLCollection`中有`.children`，这两个取值方法需要谨慎使用。

---

## jQuery 更简单

当然，一些类库比如`jQuery`可以让取 DOM 元素的代码更为简短，并且会创建一个抽象层覆盖“单个元素”和“集合元素”的问题。

```javascript
$('.someElement').css('size', '100px')
```

时不时的巩固下基础知识还有很有用的嘛~
