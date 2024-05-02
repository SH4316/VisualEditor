import { useState } from 'react'
import './App.css'
import Canvas from './Canvas/Canvas'
import { Shape } from './Shapes'
import ShapeList from './ShapeList/ShapeList';
import Header from './Header/Header';

function App() {
  const [shapes, setShapes] = useState<Shape[]>(testShapes());
  const [selected, setSelected] = useState<number>(-1);

  return (
    <>
      <Header shapes={shapes}/>
      <ShapeList shapes={shapes} selected={selected} setSelected={setSelected}/>
      <Canvas shapes={shapes} selected={selected} setSelected={setSelected} height={600} width={600}/>
    </>
  )
}

function testShapes(): Shape[] {
  return [
    {
      type: "rectangle",
      name: "a",
      loc: {px: 0, py: 0},
      size: {width: 100, height: 100},
      border: null,
      color: "green"
    },
    {
      type: "rectangle",
      name: "unnamed",
      loc: {px: 120, py: 120},
      size: {width: 100, height: 100},
      border: {width: 2, color: "black"},
      color: "green"
    }
  ]
}

export default App
