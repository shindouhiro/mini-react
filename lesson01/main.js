const container = document.getElementById('root')
const elNode = document.createElement('div')
elNode.id = 'app'
const textNode = document.createTextNode('')
textNode.nodeValue = 'app'
elNode.append(textNode)
container.append(elNode)
