import { createRef, useEffect, useRef, useState } from "react";
import { Shape, Location, Rectangle } from "./Shapes";

export default function Canvas({shapes}: {shapes: Shape[]}) {
    const canvasRef = createRef<HTMLCanvasElement>();
    const [location, setLocation] = useState<Location>({px: 0, py: 0});
    const [expansion, setExpansion] = useState<number>(1);

    const [selected, setSelected] = useState<number>(-1);

    useEffect(() => {
        setSelected(-1);
    }, [shapes]);

    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        ctx?.clearRect(0, 0, 400, 400);

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
    }, [canvasRef, location, shapes, selected, expansion]);

    const onClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const x = e.clientX - e.currentTarget.offsetLeft
        const y = e.clientY - e.currentTarget.offsetTop

        let find = false;
        for (let i = 0; i < shapes.length; i++) {
            const shape = shapes[i];
            if (((shape.loc.px - location.px)*expansion) < x && x < ((shape.loc.px - location.px + shape.size.width)*expansion) && ((shape.loc.py - location.py)*expansion) < y && y < ((shape.loc.py - location.py + shape.size.height)*expansion)) {
                setSelected(i);
                find = true;
                break;
            }
        }
        if (!find) {
            setSelected(-1);
        }
    };

    return <>
        <canvas ref={canvasRef} width={400} height={400} onClick={onClick}>
        </canvas>
        <button onClick={() => {
            setExpansion(expansion + 0.1);
        }}>+</button>
        <button onClick={() => {
            setExpansion(expansion - 0.1);
        }}>-</button>
        <button onClick={() => {
            setLocation({px: location.px + 10, py: location.py});
        }}>좌</button>
        <button onClick={() => {
            setLocation({px: location.px - 10, py: location.py});
        }}>우</button>
        <button onClick={() => {
            setLocation({px: location.px, py: location.py + 10});
        }}>상</button>
        <button onClick={() => {
            setLocation({px: location.px, py: location.py - 10});
        }}>하</button>
    </>
}

const Drawer: {[key: string]: (ctx: CanvasRenderingContext2D, shape: Shape, location: Location, expansion: number) => void} = {
    "selected" : (ctx: CanvasRenderingContext2D, shape: Shape, location: Location, expansion: number) => {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(shape.loc.px - location.px - 1, shape.loc.py - location.py - 1, shape.size.width + 2, shape.size.height + 2);
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