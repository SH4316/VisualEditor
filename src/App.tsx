import { useState } from 'react'
import './App.css'
import Canvas from './Canvas'
import { Shape } from './Shapes'

function App() {
  const [shapes, setShapes] = useState<Shape[]>(testShapes());

  return (
    <>
      <button onClick={() => {
        setShapes([
          {
            type: "rectangle",
            loc: {px: 0, py: 0},
            size: {width: 100, height: 100},
            border: {width: 5, color: "black"},
            color: ""
          },
        ])
      }}></button>
      <Canvas shapes={shapes}/>
    </>
  )
}

function testShapes(): Shape[] {
  return [
    {
      type: "rectangle",
      loc: {px: 0, py: 0},
      size: {width: 100, height: 100},
      border: null,
      color: "green"
    },
    {
      type: "rectangle",
      loc: {px: 120, py: 120},
      size: {width: 100, height: 100},
      border: {width: 2, color: "black"},
      color: "green"
    }
  ]
}

export default App
