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
const elNode = document.createElemnt('div');
elNode.id = 'app'
const textNode = document.createTextNode('')
textNode.nodeValue = 'app'
textNode.append(elNode)
container.append(elNode)
```
