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
      children
    }
  }
}



const container = document.getElementById('root')
const textEl = createTextNode("app")
const el = createElement("div", { id: 'app' }, textEl)
const elNode = document.createElement(el.type)
elNode.id = el.props.id
const textNode = document.createTextNode('')
textNode.nodeValue = textEl.props.nodeValue
elNode.append(textNode)
container.append(elNode)
