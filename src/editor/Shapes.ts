export type Location ={
    px: number;
    py: number;
}
export type ShapeSize = {
    width: number;
    height: number;
}
export type Border = {
    width: number;
    color: string;
}
export interface Shape {
    type: string;
    name: string;
    key: number;
    loc: Location;
    size: ShapeSize;
    border: Border | null;
    color: string;
}
export interface Rectangle extends Shape{
    type: "rectangle";
}

let base = 0;
export function shapeKeyGenerator() {
    ++base;
    return base;
}

export function newRectangle(x: number, y: number, name: string): Rectangle {
    return {
        type: "rectangle",
        name: name,
        key: shapeKeyGenerator(),
        loc: {
            px: x - 50,
            py: y - 50
        },
        size: {
            width: 100,
            height: 100
        },
        border: {
            width: 1,
            color: "black"
        },
        color: "white"
    }
}