import * as fabric from "fabric"
export interface ICanvas {

}
export interface ICanvasContext {
    canvasEditor: fabric.Canvas | null;
    setCanvasEditor: (val: fabric.Canvas | null) => void;
}
