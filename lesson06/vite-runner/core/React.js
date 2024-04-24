
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
      children: children.map(child => {
        const isTextNode = typeof child === 'string' || typeof child === 'number'
        return isTextNode ? createTextNode(child) : child
      })
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
  let fiberParent = fiber.parent
  while (!fiberParent.dom) {
    fiberParent = fiberParent.parent
  }
  if (fiber.dom) {
    fiberParent.dom.append(fiber.dom)
  }
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

function createDom(type) {
  console.log({ type })
  return type !== 'TEXT_ELEMENT' ? document.createElement(type) : document.createTextNode("")
}

function updateProps(dom, props) {
  Object.keys(props).forEach(key => {
    if (key !== "children") {
      if (key.startsWith("on")) {
        const eventType = key.slice(2).toLowerCase()
        console.log({ eventType })
        dom.addEventListener(eventType, props[key])
      } else {
        dom[key] = props[key]
      }
    }
  })
}

function initChildren(fiber, children) {
  console.log(fiber)
  let preChild = null
  // const children = work.props.children
  children.forEach((child, index) => {
    const newWork = {
      type: child.type,
      props: child.props,
      child: null,
      parent: fiber,
      sibling: null,
      dom: null
    }
    if (index === 0) {
      fiber.child = newWork
    } else {
      preChild.sibling = newWork
    }
    preChild = newWork
  })
}

function updateFunctionComponent(fiber) {
  const children = [fiber.type(fiber.props)]
  initChildren(fiber, children)
}

function updateHostComponent(fiber) {
  if (!fiber.dom) {
    // 1. 创建dom
    const dom = (fiber.dom = createDom(fiber.type))
    // work.parent.dom.append(dom)

    // 2. 处理props
    updateProps(dom, fiber.props)

  }
  const children = fiber.props.children
  initChildren(fiber, children)
}

function preformWorkUnit(fiber) {
  console.log(2)
  const isFunctionComponent = typeof fiber.type === 'function'
  if (isFunctionComponent) {
    updateFunctionComponent(fiber)
  } else {
    updateHostComponent(fiber)
  }
  // 返回下一个要执行的任务
  if (fiber.child) {
    return fiber.child
  }

  //while
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) return nextFiber.sibling
    nextFiber = nextFiber.parent
  }
  // return fiber.parent?.sibling
}

requestIdleCallback(workLoop)

const React = {
  createElement,
  render
}

export default React
