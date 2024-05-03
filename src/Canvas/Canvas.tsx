import React, { WheelEventHandler, createRef, useEffect, useState } from "react";
import { Shape, Location, Rectangle } from "../Shapes";

const dragStartLoc: Location = {px: 0, py: 0}

export default function Canvas({shapes, selected, setSelected, height, width}: {shapes: Shape[], selected: number, setSelected: React.Dispatch<React.SetStateAction<number>>, height: number, width: number}) {
    const canvasRef = createRef<HTMLCanvasElement>();
    const [location, setLocation] = useState<Location>({px: 0, py: 0});
    const [expansion, setExpansion] = useState<number>(1);

    const [mouseDown, setMouseDown] = useState(false);
    // const [dragStartLoc, setDragStartLoc] = useState<Location>({px: 0, py: 0})

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
    }, [shapes]);

    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, height, width);

        shapes.forEach((value, index, arr) => {
            // if (value.type === "rectangle") {
            //     ctx.fillStyle = "green";
            //     ctx.fillRect(value.loc.px - location.px, value.loc.py - location.py, value.size.width, value.size.height);
            // }
            Drawer[value.type](ctx, value, location, expansion);
        })
        if (selected !== -1) {
            const shape = shapes[selected];
            Drawer["selected"](ctx, shape, location, expansion);
        }
    }, [canvasRef, location, shapes, selected, expansion, height, width]);

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
    const relocator: WheelEventHandler<HTMLCanvasElement> = (e: WheelEvent) => {
        setLocation({px: location.px + e.deltaX*1.3, py: location.py + e.deltaY*1.3});
    }
    const selector = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const x = e.clientX - e.currentTarget.offsetLeft;
        const y = e.clientY - e.currentTarget.offsetTop - 48;

        let find = false;
        for (let i = 0; i < shapes.length; i++) {
            const shape = shapes[i];
            if (((shape.loc.px - location.px) * expansion) < x && x < ((shape.loc.px - location.px + shape.size.width) * expansion) && ((shape.loc.py - location.py) * expansion) < y && y < ((shape.loc.py - location.py + shape.size.height) * expansion)) {
                setSelected(i);
                find = true;
                break;
            }
        }
        if (!find) {
            setSelected(-1);
        }
    };
    // const relocator3 = (x, y) => {
    //     // if (!mouseDown)
    //     //     return;
    //     // const x = e.clientX - e.currentTarget.offsetLeft;
    //     // const y = e.clientY - e.currentTarget.offsetTop;
    //     setLocation({px: location.px + (dragStartLoc.px - x) / expansion, py: location.py + (dragStartLoc.py - y) / expansion})
    //     // setSelected(-1);
    // }
    // const relocator2 = (e: HTMLCanvasElement) => {
    //     const x = e.offsetLeft
    //     const y = e.offsetTop
    //     setLocation({px: location.px + (dragStartLoc.px - x) / expansion, py: location.py + (dragStartLoc.py - y) / expansion})
    // }
    const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (mouseDown) return;
        setMouseDown(true);
        dragStartLoc.px = e.clientX - e.currentTarget.offsetLeft
        dragStartLoc.py = e.clientY - e.currentTarget.offsetTop

        // const x = e.clientX - e.currentTarget.offsetLeft;
        // const y = e.clientY - e.currentTarget.offsetTop;
        // canvasRef.current?.addEventListener('mousemove', () => {
        //     console.log("move");
        //     relocator(x, y);
        // })
    }
    const onMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!mouseDown) return;
        setMouseDown(false);

        const x = e.clientX - e.currentTarget.offsetLeft;
        const y = e.clientY - e.currentTarget.offsetTop;
        if (mouseDown) {
            if (dragStartLoc.px === x || dragStartLoc.py === y) {
                selector(e);
                return;
            }
        }

        // relocator(x, y);
        // canvasRef.current?.removeEventListener('mousemove', );
    }

    return <>
        <canvas id={"main-canvas"} ref={canvasRef} width={width} height={height} onMouseDown={onMouseDown} onMouseUp={onMouseUp} style={{width: width, height: height}} onWheel={relocator}>
        </canvas>
        <button onClick={() => {
            setExpansion(expansion + 0.1);
        }}>+</button>
        <button onClick={() => {
            setExpansion(expansion - 0.1);
        }}>-</button>
    </>
}

const Drawer: {[key: string]: (ctx: CanvasRenderingContext2D, shape: Shape, location: Location, expansion: number) => void} = {
    "selected" : (ctx: CanvasRenderingContext2D, shape: Shape, location: Location, expansion: number) => {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        // ctx.strokeRect(shape.loc.px - location.px - 1, shape.loc.py - location.py - 1, shape.size.width + 2, shape.size.height + 2);
        ctx.strokeRect((shape.loc.px - location.px - 1) * expansion, (shape.loc.py - location.py - 1) * expansion, (shape.size.width + 2) * expansion, (shape.size.height + 2) * expansion);

        ctx.lineWidth = 1;
        ctx.fillStyle = "white"
        ctx.fillRect((shape.loc.px - location.px - 3) * expansion, (shape.loc.py - location.py - 3) * expansion, 5, 5);
        ctx.fillRect((shape.loc.px - location.px + shape.size.width - 1) * expansion, (shape.loc.py - location.py - 3) * expansion, 5, 5);
        ctx.fillRect((shape.loc.px - location.px + shape.size.width - 1) * expansion, (shape.loc.py - location.py + shape.size.height - 1) * expansion, 5, 5);
        ctx.fillRect((shape.loc.px - location.px - 3) * expansion, (shape.loc.py - location.py + shape.size.height - 1) * expansion, 5, 5);
        ctx.fillStyle = "red"
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