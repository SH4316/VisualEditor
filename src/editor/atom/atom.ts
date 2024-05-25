import { atom } from "recoil";
import { Shape, shapeKeyGenerator } from "../Shapes";

export const headerHeightValue = atom({
    key: 'headerHeight',
    default: 40,
    
})
export const headerSelectionState = atom({
    key: 'headerSelection',
    default: 1
})
export const shapesState = atom<Shape[]>({
    key: 'shapes',
    default: [
        {
          type: "rectangle",
          name: "a",
          key: shapeKeyGenerator(),
          loc: {px: 0, py: 0},
          size: {width: 100, height: 100},
          border: null,
          color: "green"
        },
        {
          type: "rectangle",
          name: "unnamed",
          key: shapeKeyGenerator(),
          loc: {px: 120, py: 120},
          size: {width: 100, height: 100},
          border: {width: 2, color: "black"},
          color: "green"
        }
      ]
})