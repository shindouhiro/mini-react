/*
 * type
 * props
 * children
*/
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
    id: '#app',
    children: [textEl]
  }
}



const container = document.getElementById('root')
const elNode = document.createElement(el.type)
elNode.id = el.props.id
const textNode = document.createTextNode('')
textNode.nodeValue = textEl.props.nodeValue
elNode.append(textNode)
container.append(elNode)
