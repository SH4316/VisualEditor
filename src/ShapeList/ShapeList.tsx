import { Location, Shape } from "../Shapes";
import "./ShapeList.css"
import React, { useState } from "react";

let resizingPoint: Location = {px: 0, py: 0};

export default function ShapeList({shapes, selected, setSelected}: {shapes: Shape[], selected: number, setSelected: React.Dispatch<React.SetStateAction<number>>}) {
    const [width, setWidth] = useState<number>(240);
    const [resizing, setResizing] = useState<boolean>(false);

    return <>
        <aside className="wrapper" style={{width: width}}>
            <ul>
                {shapes && shapes.map((value, index, arr) => {
                    return <li className={index == selected ? "selected-item" : ""} id={`s${index}`} key={value.type + value.size.height + value.size.width + value.loc.px + value.loc.py + value.color + value.border?.color + value.border?.width}>
                        {value.name}
                    </li>
                })}
            </ul>
        </aside>
    </>
}