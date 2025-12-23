import * as fabric from "fabric";

export function createCanvas(el: HTMLCanvasElement, width: number, height: number) {
    return new fabric.Canvas(el, {
        width,
        height,
        backgroundColor: "#fdfbf8",
        preserveObjectStacking: true,
    });
}

export function addMidlines(canvas: fabric.Canvas) {
    const hLine = new fabric.Line([0, canvas.height / 2, canvas.width, canvas.height / 2], {
        stroke: "#e7e0d7",
        selectable: false,
        evented: false,
    });
    const vLine = new fabric.Line([canvas.width / 2, 0, canvas.width / 2, canvas.height], {
        stroke: "#e7e0d7",
        selectable: false,
        evented: false,
    });
    canvas.add(hLine, vLine);
}
