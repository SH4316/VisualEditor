import { useState } from 'react'
import { Shape, shapeKeyGenerator } from './Shapes'
import Canvas from './Canvas/Canvas'
import ShapeList from './ShapeList/ShapeList';
import Header from './Header/Header';

import './App.css'

function App() {
  const [shapes, setShapes] = useState<Shape[]>(testShapes());

  const [selected, setSelected] = useState<number>(-1);

  return (
    <>
      <Header shapes={shapes}/>
      <main>
        <ShapeList shapes={shapes} selected={selected} setSelected={setSelected}/>
        <Canvas shapes={shapes} selected={selected} setSelected={setSelected} height={600} width={600}/>
      </main>
    </>
  )
}

function testShapes(): Shape[] {
  return [
    {
      type: "rectangle",
      name: "a",
      key: shapeKeyGenerator(),
      loc: {px: 0, py: 0},
      size: {width: 100, height: 100},
      border: null,
      color: "green"
    },
    {
      type: "rectangle",
      name: "unnamed",
      key: shapeKeyGenerator(),
      loc: {px: 120, py: 120},
      size: {width: 100, height: 100},
      border: {width: 2, color: "black"},
      color: "green"
    }
  ]
}

export default App
