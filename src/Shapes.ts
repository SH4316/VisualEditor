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
    loc: Location;
    size: ShapeSize;
    border: Border | null;
    color: string;
}
export interface Rectangle extends Shape{
    type: "rectangle";
}

