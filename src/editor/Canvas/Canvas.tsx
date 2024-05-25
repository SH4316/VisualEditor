import React, { WheelEvent, WheelEventHandler, createRef, useEffect, useState } from "react";
import { Shape, Location, Rectangle, newRectangle } from "../Shapes";
import { useRecoilState } from "recoil";
import { headerSelectionState, shapesState } from "../atom/atom";
import Cookies from "js-cookie";

const dragStartLoc: Location = {px: 0, py: 0}

export default function Canvas({selected, setSelected, height, width}: {selected: number, setSelected: React.Dispatch<React.SetStateAction<number>>, height: number, width: number}) {
    const [shapes, setShapes] = useRecoilState(shapesState);
    const [headerSelection, setHeaderSelection] = useRecoilState(headerSelectionState);

    const canvasRef = createRef<HTMLCanvasElement>();
    const [location, setLocation] = useState<Location>({px: 0, py: 0});
    const [expansion, setExpansion] = useState<number>(1);
    const [mouseDown, setMouseDown] = useState(false);
    // const [dragStartLoc, setDragStartLoc] = useState<Location>({px: 0, py: 0})

    useEffect(() => {
        const shapeCooke = Cookies.get("shapes");
        if (shapeCooke) {
            setShapes(JSON.parse(shapeCooke));
        }
    }, []);

    useEffect(() => {
        window.addEventListener("gesturestart", function (e) {
            console.log("gesture start");
            e.preventDefault();
        });
        window.addEventListener("gesturechange", function (e) {
            console.log("gesture change");
            e.preventDefault();
        });
    }, []);

    useEffect(() => {
        setSelected(-1);

        Cookies.set("shapes", JSON.stringify(shapes));
    }, [shapes]);

    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;
        
        console.log(".")

        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, height, width);

        // shapes.forEach((value, index, arr) => {
        //     // if (value.type === "rectangle") {
        //     //     ctx.fillStyle = "green";
        //     //     ctx.fillRect(value.loc.px - location.px, value.loc.py - location.py, value.size.width, value.size.height);
        //     // }
        //     Drawer[value.type](ctx, value, location, expansion);
        // })
        for (let i = 0; i < shapes.length; i++) {
            Drawer[shapes[shapes.length - i - 1].type](ctx, shapes[shapes.length - i - 1], location, expansion);
        }
        if (selected !== -1) {
            const shape = shapes[selected];
            Drawer["selected"](ctx, shape, location, expansion);
        }
    }, [canvasRef, location, shapes, selected, expansion, height, width]);

    const ClickData: {[key: number]: () => {[key: string]: any}}= {
        1: () => {
            return {
                //shapes, expansion, location, setSelected
                shapes: shapes,
                expansion: expansion,
                location: location,
                setSelected: setSelected
            }
        }, 
        3: () => {
            return {
                shapes: shapes,
                setShapes: setShapes,
                location: location,
                expansion: expansion,
                setHeaderSelection: setHeaderSelection
            }
        }
    }

    const expandStart = () => {

    }
    const expander = () => {
        // const ex = (expansion + (e.deltaY * 0.01)) / expansion;
        // if (!e.currentTarget) {
        //     return;
        // }
        // const x = e.clientX - canvasRef.current?.offsetLeft;
        // const y = e.clientY - canvasRef.current?.offsetTop - 48;

        // setExpansion(expansion + (e.deltaY * 0.01));
        // setLocation({px: location.px - (x * ex), py: location.py});
    }
    const relocator: WheelEventHandler<HTMLCanvasElement> = (e: WheelEvent<HTMLCanvasElement>) => {
        setLocation({px: location.px + e.deltaX*1.3, py: location.py + e.deltaY*1.3});
    }

    return <>
        <canvas id={"main-canvas"} ref={canvasRef} width={width} height={height} 
            onMouseDown={(e) => {
                const func = ClickDownEvent[headerSelection]
                const dataFunc = ClickData[headerSelection]
                let data = {};
                if (dataFunc) {
                    data = dataFunc();
                }
                if (!func) return;
                func(e, mouseDown, setMouseDown, data)}
            } 
            onMouseUp={(e) => {
                const func = ClickUpEvent[headerSelection]
                const dataFunc = ClickData[headerSelection]
                let data = {};
                if (dataFunc) {
                    data = dataFunc();
                }
                if (!func) return;
                func(e, mouseDown, setMouseDown, data)}
            } 
            style={{width: width, height: height, cursor: cursor[headerSelection]}} 
            onWheel={relocator}>
        </canvas>
        <button onClick={() => {
            setExpansion(expansion + 0.1);
        }}>+</button>
        <button onClick={() => {
            setExpansion(expansion - 0.1);
        }}>-</button>
    </>
}

const ClickDownEvent: {[key: number]: (e: React.MouseEvent<HTMLCanvasElement>, mouseDown: boolean, setMouseDown: React.Dispatch<React.SetStateAction<boolean>>, data: {[key: string]: any}) => void} = {
    1: (e, mouseDown, setMouseDown, data) => {
        if (mouseDown) return;
        setMouseDown(true);
        dragStartLoc.px = e.clientX - e.currentTarget.offsetLeft
        dragStartLoc.py = e.clientY - e.currentTarget.offsetTop
    },
    3: (e, mouseDown, setMouseDown, data) => {
        if (mouseDown) return;
        setMouseDown(true);
    }
}

const ClickUpEvent: {[key: number]: (e: React.MouseEvent<HTMLCanvasElement>, mouseDown: boolean, setMouseDown: React.Dispatch<React.SetStateAction<boolean>>, data: {[key: string]: any}) => void} = {
    1: (e, mouseDown, setMouseDown, data) => {
        if (!mouseDown) return;
        setMouseDown(false);

        const x = e.clientX - e.currentTarget.offsetLeft;
        const y = e.clientY - e.currentTarget.offsetTop - 48;
        if (mouseDown) {
            if (dragStartLoc.px === x || dragStartLoc.py === y) {
                // selector(e);
                //shapes, expansion, location, setSelected

                let find = false;
                for (let i = 0; i < data.shapes.length; i++) {
                    const shape = data.shapes[i];
                    if (((shape.loc.px - data.location.px) * data.expansion) < x && x < ((shape.loc.px - data.location.px + shape.size.width) * data.expansion) && ((shape.loc.py - data.location.py) * data.expansion) < y && y < ((shape.loc.py - data.location.py + shape.size.height) * data.expansion)) {
                        data.setSelected(i);
                        find = true;
                        break;
                    }
                }
                if (!find) {
                    data.setSelected(-1);
                }
                return;
            }
        }
    }, 
    3: (e, mouseDown, setMouseDown, data) => {
        if (!mouseDown) return;
        setMouseDown(false);

        const x = data.location.px + (e.clientX - e.currentTarget.offsetLeft) / data.expansion;
        const y = data.location.py + (e.clientY - e.currentTarget.offsetTop - 48) / data.expansion;

        data.setShapes([newRectangle(x, y, "unnamed"), ...(data.shapes)]);
        data.setHeaderSelection(1);
    }
}

const cursor: {[key: number]: string} = {
    1: "default",
    3: "crosshair"
}

const Drawer: {[key: string]: (ctx: CanvasRenderingContext2D, shape: Shape, location: Location, expansion: number) => void} = {
    "selected" : (ctx: CanvasRenderingContext2D, shape: Shape, location: Location, expansion: number) => {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        // ctx.strokeRect(shape.loc.px - location.px - 1, shape.loc.py - location.py - 1, shape.size.width + 2, shape.size.height + 2);
        ctx.strokeRect((shape.loc.px - location.px - 1) * expansion, (shape.loc.py - location.py - 1) * expansion, (shape.size.width + 2) * expansion, (shape.size.height + 2) * expansion);

        ctx.lineWidth = 1;
        ctx.fillStyle = "white";
        ctx.fillRect((shape.loc.px - location.px - 3) * expansion, (shape.loc.py - location.py - 3) * expansion, 5, 5);
        ctx.fillRect((shape.loc.px - location.px + shape.size.width - 1) * expansion, (shape.loc.py - location.py - 3) * expansion, 5, 5);
        ctx.fillRect((shape.loc.px - location.px + shape.size.width - 1) * expansion, (shape.loc.py - location.py + shape.size.height - 1) * expansion, 5, 5);
        ctx.fillRect((shape.loc.px - location.px - 3) * expansion, (shape.loc.py - location.py + shape.size.height - 1) * expansion, 5, 5);
        ctx.fillStyle = "red";
        ctx.strokeRect((shape.loc.px - location.px - 3) * expansion, (shape.loc.py - location.py - 3) * expansion, 5, 5);
        ctx.strokeRect((shape.loc.px - location.px + shape.size.width - 1) * expansion, (shape.loc.py - location.py - 3) * expansion, 5, 5);
        ctx.strokeRect((shape.loc.px - location.px + shape.size.width - 1) * expansion, (shape.loc.py - location.py + shape.size.height - 1) * expansion, 5, 5);
        ctx.strokeRect((shape.loc.px - location.px - 3) * expansion, (shape.loc.py - location.py + shape.size.height - 1) * expansion, 5, 5);
    },
    "rectangle": (ctx: CanvasRenderingContext2D, shape: Shape, location: Location, expansion: number) => {
        if (shape.color) {
            ctx.fillStyle = shape.color;
            ctx.fillRect((shape.loc.px - location.px) * expansion, (shape.loc.py - location.py) * expansion, shape.size.width * expansion, shape.size.height * expansion);
        }
        if (shape.border) {
            ctx.strokeStyle = shape.border.color;
            ctx.lineWidth = shape.border.width * expansion;
            ctx.strokeRect((shape.loc.px - location.px + shape.border.width/2) * expansion, (shape.loc.py - location.py + shape.border.width/2) * expansion, (shape.size.width - shape.border.width) * expansion, (shape.size.height - shape.border.width) * expansion)
        }
    }
}
