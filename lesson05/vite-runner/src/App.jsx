import React from '../core/React.js'
function Counter({ num }) {
  return <div>{num}</div>
}


function App() {
  return (
    <div id="app">
      Hello, MiniReact
      <Counter num={10} />
      <Counter num={20} />
      <Counter num={30} />
    </div>
  )
}
export default App
