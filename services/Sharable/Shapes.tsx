import React from 'react'
import * as fabric from 'fabric'
import Image from 'next/image'
import { ShapeList } from '../Options';

interface ShapesProps {
    canvasEditor: fabric.Canvas;
    onShapeAdd?: (shape: { name: string; icon: string }) => void;
}

const Shapes: React.FC<ShapesProps> = ({ canvasEditor, onShapeAdd }) => {
    const onShapeSelect = (shape: { name: string; icon: string }) => {
        const properties = {
            left: 100,
            top: 100,
            fill: '#000000',
            stroke: '#000000',
            strokeWidth: 0,
        }

        let fabricObject: fabric.Object;

        switch (shape.name) {
            case 'Circle':
                fabricObject = new fabric.Circle({
                    ...properties,
                    radius: 50,
                });
                break;

            case 'Square':
                fabricObject = new fabric.Rect({
                    ...properties,
                    width: 100,
                    height: 100,
                });
                break;

            case 'Rectangle':
                fabricObject = new fabric.Rect({
                    ...properties,
                    width: 150,
                    height: 100,
                });
                break;

            case 'Triangle':
                fabricObject = new fabric.Triangle({
                    ...properties,
                    width: 100,
                    height: 100,
                });
                break;

            case 'Line':
                fabricObject = new fabric.Line([50, 100, 150, 100], {
                    ...properties,
                    stroke: '#000000',
                    strokeWidth: 2,
                });
                break;

            case 'Ellipse':
                fabricObject = new fabric.Ellipse({
                    ...properties,
                    rx: 75,
                    ry: 50,
                });
                break;

            case 'Polygon':
                fabricObject = new fabric.Polygon([
                    { x: 0, y: 0 },
                    { x: 50, y: 50 },
                    { x: 0, y: 100 },
                    { x: -50, y: 50 },
                ], {
                    ...properties,
                });
                break;

            case 'Star':
                fabricObject = new fabric.Polygon([
                    { x: 0, y: -50 },
                    { x: 15, y: -15 },
                    { x: 50, y: -15 },
                    { x: 25, y: 15 },
                    { x: 40, y: 50 },
                    { x: 0, y: 30 },
                    { x: -40, y: 50 },
                    { x: -25, y: 15 },
                    { x: -50, y: -15 },
                    { x: -15, y: -15 },
                ], {
                    ...properties,
                });
                break;

            case 'Heart':
                const heartPath = 'M 0,0 C 0,-30 -30,-50 -50,-30 C -70,-10 -40,20 0,50 C 40,20 70,-10 50,-30 C 30,-50 0,-30 0,0';
                fabricObject = new fabric.Path(heartPath, {
                    ...properties,
                    scaleX: 0.8,
                    scaleY: 0.8,
                });
                break;

            case 'Arrow':
                fabricObject = new fabric.Polygon([
                    { x: -50, y: -10 },
                    { x: 0, y: -10 },
                    { x: 0, y: -30 },
                    { x: 50, y: 0 },
                    { x: 0, y: 30 },
                    { x: 0, y: 10 },
                    { x: -50, y: 10 },
                ], {
                    ...properties,
                });
                break;

            default:
                console.warn('Unknown shape:', shape.name);
                return;
        }

        canvasEditor.add(fabricObject);
        canvasEditor.setActiveObject(fabricObject);
        canvasEditor.renderAll();

        if (onShapeAdd) {
            onShapeAdd(shape);
        }
    }

    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Shapes</h3>
            <div className='grid grid-cols-3 gap-3'>
                {ShapeList.map((item, i) => (
                    <div
                        key={i}
                        className='p-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors flex flex-col items-center'
                        onClick={() => onShapeSelect(item)}
                        title={item.name}
                    >
                        <Image
                            src={item.icon}
                            alt={item.name}
                            width={40}
                            height={40}
                            className="mb-2"
                        />
                        <span className="text-xs text-center text-gray-600">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Shapes