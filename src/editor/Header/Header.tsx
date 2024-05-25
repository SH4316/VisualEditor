// import React, { useState } from "react";
// import { useRecoilState, useRecoilValue } from "recoil";
// import { headerSelectionState, shapesState } from "../atom/atom";

import { useRecoilState } from "recoil";
import { headerSelectionState, shapesState } from "../atom/atom";
import { useState } from "react";

import "./Header.css"

const menuList: {[key: string]: {elements: JSX.Element, func: (e: React.MouseEvent<HTMLElement>) => void}} = {
    "main-menu": {
        elements: <>아이콘</>,
        func: () => {}
    },
    "move": {
        elements: <>커서</>,
        func: () => {}
    },
    "frame": {
        elements: <>프레임</>,
        func: () => {}
    },
    "shape": {
        elements: <>도형</>,
        func: () => {}
    },
    "pen": {
        elements: <>펜</>,
        func: () => {}
    },
    "text": {
        elements: <>글</>,
        func: () => {}
    },
    "resource": {
        elements: <>리소스</>,
        func: () => {}
    },
    "hand-tool": {
        elements: <>손</>,
        func: () => {}
    },
    "add-comment": {
        elements: <>의견</>,
        func: () => {}
    }
}

export default function Header() {
    // const [shapes, setShapes] = useRecoilState(shapesState);
    // const [headerSelection, setHeaderSelection] = useState(1);
    const [selectedMenu, setSelectedMenu] = useRecoilState(headerSelectionState);
    // const headerHeight = useRecoilValueLoadable();

    return <>
        <header>
            {Object.keys(menuList).map((value, index) => {
                return <div className={value + (selectedMenu == index ? " selected-menu" : "")} key={value} onClick={(e) => {
                    setSelectedMenu(index);
                    menuList[value].func(e);
                }}>
                    {menuList[value].elements}
                </div>
            })}
            {/* <div className={"main-menu" + (selectedMenu == 0 ? " selected-menu" : "")} onClick={menuClick}>

            </div> */}
        </header>
    </>
}
