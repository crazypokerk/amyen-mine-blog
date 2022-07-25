<a name="h3I9j"></a>
# 什么是CSS grid？
CSS grid可以和flex布局相互搭配，相得益彰。flex布局主要用于一维布局，CSS grid主要用于二维布局。<br />![5-5-1.png](https://cdn.nlark.com/yuque/0/2022/png/25431352/1651746557112-3e8387c5-5b58-49b9-a25f-7d0a77aad894.png#clientId=ud2af0289-742d-4&crop=0&crop=0&crop=1&crop=1&from=ui&id=u9a5c1294&margin=%5Bobject%20Object%5D&name=5-5-1.png&originHeight=738&originWidth=1288&originalType=binary&ratio=1&rotation=0&showTitle=false&size=197269&status=done&style=none&taskId=u35d7c763-a450-47d9-9df8-e52b54e2d9b&title=)

使用CSS grid布局需要给**容器（Grid container**）配置：
```css
.container{
  display: grid;
  /* 行row数 */
  grid-template-row: 
  /* grid-template-rows: 1fr 1fr 2fr 2fr; */
  grid-template-rows: repeat(2, 1fr);
  /* 列row数 */
  /* grid-template-columns: 100px 100px 200px 100px; */
  /* grid-template-columns: 1fr 1fr 2fr 1fr; */
  grid-template-columns: repeat(4, 1fr);
  /* 格子之间的行列距离 */
  row-gap: 15px;
  column-gap: 25px;
  /* align-content 和 justify-content的简写 */
  place-content: ;
}
```

行列会分割为多个**格子（Grid items）**：
```css
.items{
  grad-row: ;
  grad-column: ;
  grad-area: ;
  /* 水平对其 */
  justify-self: ;
  /* 垂直对其 */
  align-self: ;
}
```

![5-5-2.png](https://cdn.nlark.com/yuque/0/2022/png/25431352/1651746688251-a45f8310-b214-4801-8aa1-0aa4c0aea7bf.png#clientId=ud2af0289-742d-4&crop=0&crop=0&crop=1&crop=1&from=ui&id=u57c65902&margin=%5Bobject%20Object%5D&name=5-5-2.png&originHeight=724&originWidth=1359&originalType=binary&ratio=1&rotation=0&showTitle=false&size=134688&status=done&style=none&taskId=u6e043deb-7815-4788-b7a9-4ed5cdc7d6e&title=)<br />更多的CSS gird术语：

- Grid lines：栅格线
- Grid track/column：栅格列
- Grid track/row：栅格行
- Gutters(gaps)：栅格间隙
- Grid cell：栅格

![5-5-3.png](https://cdn.nlark.com/yuque/0/2022/png/25431352/1651746911614-8448e997-7979-4a3b-b93d-6c784aa29eb5.png#clientId=ud2af0289-742d-4&crop=0&crop=0&crop=1&crop=1&from=ui&id=u79cd7c62&margin=%5Bobject%20Object%5D&name=5-5-3.png&originHeight=763&originWidth=1379&originalType=binary&ratio=1&rotation=0&showTitle=false&size=291225&status=done&style=none&taskId=u133da3aa-8f25-4e5e-86ed-b5ab5d45140&title=)<br />**cheat sheet：**<br />![5-5-4.png](https://cdn.nlark.com/yuque/0/2022/png/25431352/1651747215744-d4bc5a28-09c4-4b61-a61c-ac9e23f0f850.png#clientId=ud2af0289-742d-4&crop=0&crop=0&crop=1&crop=1&from=ui&id=uacff6196&margin=%5Bobject%20Object%5D&name=5-5-4.png&originHeight=769&originWidth=1373&originalType=binary&ratio=1&rotation=0&showTitle=false&size=484765&status=done&style=none&taskId=u90b7fc8d-8b1e-4e8f-a6b5-3b03361b093&title=)
