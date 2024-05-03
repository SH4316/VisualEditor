import { Location, Shape } from "../Shapes";
import "./ShapeList.css"
import React, { useEffect, useState } from "react";

export default function ShapeList({shapes, selected, setSelected}: {shapes: Shape[], selected: number, setSelected: React.Dispatch<React.SetStateAction<number>>}) {
    const [width, setWidth] = useState<number>(240);
    const [resizing, setResizing] = useState<boolean>(false);

    useEffect(() => {
        const canvas = document.getElementById("main-canvas");
        if (!canvas) {
            console.log("null")
            return;
        }
        
        canvas.style.marginLeft = `${width}`;
    }, [width]);


    return <>
        <aside className="wrapper" style={{width: width}}>
            <ul>
                {shapes && shapes.map((value, index, arr) => {
                    return <li className={index == selected ? "selected-item" : ""} id={`s${index}`} key={value.key} onClick={() => {setSelected(index)}}>
                        {value.name}
                    </li>
                })}
            </ul>
        </aside>
    </>
}