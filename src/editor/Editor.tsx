import { useState } from "react";
import Canvas from "./Canvas/Canvas";
import Header from "./Header/Header";
import ShapeList from "./ShapeList/ShapeList";

export default function Editor() {
    const [selected, setSelected] = useState<number>(-1);

    return <>
        <Header />
        <main>
            <ShapeList selected={selected} setSelected={setSelected}/>
            <Canvas selected={selected} setSelected={setSelected} height={600} width={600}/>
        </main>
    </>
}