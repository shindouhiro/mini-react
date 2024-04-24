import React from '../core/React.js'
function Counter({ num }) {
  return <div>{num}</div>
}


function App() {
  const handleClick = () => {
    console.log(123)
  }
  return (
    <div id="app">
      Hello, MiniReact <br />
      <button onClick={handleClick}>事件</button>
      <Counter num={10} />
      <Counter num={20} />
      <Counter num={30} />
    </div>
  )
}
export default App
