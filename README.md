## 第一章


### React 入口Api
```jsx
import React from 'react';
import ReactDOM from 'react-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <App />
);
```
### 渐进式
+ 获取容器节点
+ 创建div文本节点，属性ID为app
+ 创建文本节点,文本节点内容为app
```js
const container = documnet.getElementById('root');
const elNode = document.crkeateElemnt('div');
elNode.id = 'app'
const textNode = document.createTextNode('')
textNode.nodeValue = 'app'
textNode.append(elNode)
container.append(elNode)
```

### 创建虚拟DOM树
+ props
+ type
+ children

```js
const el = {
  type: 'div',
  props: {
    id: 'app',
    children: [
      {
        type: 'TEXT_ELEMENT',
        props: {
          nodeValue: 'app',
          children: []
        }
      }
    ]
  },
}
```

#### 拆分一个textEl 

```js
const textEl = {
        type: 'TEXT_ELEMENT',
        props: {
          nodeValue: 'app',
          children: []
        }
}
const el = {
  type: 'div',
  props: {
    id: 'app',
    children: [
       textEl
    ]
  },
}

```

```js

```


## 第二章 JSX

#### 使用vite
```bash
yarn create vite 
Vanilla
JavsScript
cd viterunner
yarn 
yarn dev
```


## 第三章 任务调度
+ JS单线程，但数据量过大，会阻塞


### 解决渲染阻塞问题
+ 拆分任务
+ requestidlecallback
