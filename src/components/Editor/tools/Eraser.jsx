import { FaEraser } from 'react-icons/fa'
import { fabric } from 'fabric'
import { useEffect, useState } from 'react';

export const Eraser = ({ canvas }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(50);
  
  const handleClick = () => {
    setIsDrawing(!isDrawing);
    canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
    canvas.freeDrawingBrush.width = brushSize;
    canvas.isDrawingMode = !isDrawing 
  };
  
  return (
    <li className='text-[--light] text-[1vw]'>
      <div className='flex flex-col items-center cursor-pointer'>
        <button className='text-[2vw]' onClick={handleClick}>
          <FaEraser />
        </button>
        <span>Apagar</span>
        
      </div>
    </li>
  )
}