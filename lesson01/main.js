/*
 * type
 * props
 * children
*/


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

function render(App, container) {
  const { type, props, props: { children } } = App
  const el = type !== 'TEXT_ELEMENT' ? document.createElement(type) : document.createTextNode("")
  Object.keys(props).forEach(key => {
    if (key !== "children") {
      el[key] = props[key]
    }
  })
  children.forEach(child => {
    render(child, el)
  })
  container.append(el)
}



const container = document.getElementById('root')
const textEl = createTextNode("app")
const App = createElement("div", { id: 'app' }, "hello, ", "mini React")
render(App, container)
