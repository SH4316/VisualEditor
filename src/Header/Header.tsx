import React, { useState } from "react";
import { Shape } from "../Shapes";
import "./Header.css"

const menuList: {[key: string]: {func: (e: React.MouseEvent<HTMLElement>) => void}} = {
    "main-menu": {
        func: () => {}
    },
    "move": {
        func: () => {}
    },
    "frame": {
        func: () => {}
    },
    "shape": {
        func: () => {}
    },
    "pen": {
        func: () => {}
    },
    "text": {
        func: () => {}
    },
    "resource": {
        func: () => {}
    },
    "hand-tool": {
        func: () => {}
    },
    "add-comment": {
        func: () => {}
    }
}

export default function Header({shapes}: {shapes: Shape[]}) {
    const [selectedMenu, setSelectedMenu] = useState<number>(1);

    return <>
        <header>
            {Object.keys(menuList).map((value, index) => {
                return <div className={value + (selectedMenu == index ? " selected-menu" : "")} onClick={(e) => {
                    setSelectedMenu(index);
                    menuList[value].func(e);
                }}>
                    
                </div>
            })}
            {/* <div className={"main-menu" + (selectedMenu == 0 ? " selected-menu" : "")} onClick={menuClick}>

            </div> */}
        </header>
    </>
}
