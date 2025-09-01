import { ICanvasContext } from "@/types/canvas";
import { createContext } from "react";
export const CanvasContext = createContext<ICanvasContext>({
    canvasEditor: null,
    setCanvasEditor: () => { }
})