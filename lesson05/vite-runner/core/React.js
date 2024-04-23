
function createTextNode(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => typeof child === 'string' ? createTextNode(child) : child)
    }
  }
}

function render(el, container) {
  console.log(1)
  nextWrokOfUnit = {
    dom: container,
    props: {
      children: [el]
    }
  }
  // const { type, props, props: { children = [] } } = App
  // children.forEach(child => { 
  //   render(child, el)
  // })
  // container.append(el)
  root = nextWrokOfUnit
}
let root = null
let nextWrokOfUnit = null
function workLoop(deadline) {
  let shouldYield = false
  while (!shouldYield && nextWrokOfUnit) {
    nextWrokOfUnit = preformWorkUnit(nextWrokOfUnit)
    shouldYield = deadline.timeRemaining() < 1
    requestIdleCallback(workLoop)
  }
  //代表链表处理完成
  if (!nextWrokOfUnit && root) {
    commitRoot()
  }
}

function commitRoot() {
  commitWork(root.child)
  root = null
}

function commitWork(fiber) {
  if (!fiber) return
  fiber.parent.dom.append(fiber.dom)
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

function createDom(type) {
  return type !== 'TEXT_ELEMENT' ? document.createElement(type) : document.createTextNode("")
}

function updateProps(dom, props) {
  Object.keys(props).forEach(key => {
    if (key !== "children") {
      dom[key] = props[key]
    }
  })
}

function initChildren(work) {
  let preChild = null
  const children = work.props.children
  children.forEach((child, index) => {
    const newWork = {
      type: child.type,
      props: child.props,
      child: null,
      parent: work,
      sibling: null,
      dom: null
    }
    if (index === 0) {
      work.child = newWork
    } else {
      preChild.sibling = newWork
    }
    preChild = newWork
  })
}

function preformWorkUnit(work) {
  console.log(2)
  if (!work.dom) {
    // 1. 创建dom
    const dom = (work.dom = createDom(work.type))
    // work.parent.dom.append(dom)

    // 2. 处理props
    updateProps(dom, work.props)

  }
  // 3. 转换链表设值好指针
  initChildren(work)
  // 返回下一个要执行的任务
  if (work.child) {
    return work.child
  }
  if (work.sibling) {
    return work.sibling
  }
  return work.parent?.sibling
}

requestIdleCallback(workLoop)

const React = {
  createElement,
  render
}

export default React
