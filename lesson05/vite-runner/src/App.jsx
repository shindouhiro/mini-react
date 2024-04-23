import React from '../core/React.js'
function Counter() {
  return <CounterContainer />
}

function CounterContainer() {
  return <div>Container</div>
}

function App() {
  return (
    <div id="app">
      Hello, MiniReact
      <Counter />
    </div>
  )
}
export default App
