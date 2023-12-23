import { useState } from 'react';
import { MdOutlineTextFields } from 'react-icons/md';
import { fabric } from 'fabric'

export function AddText({ canvas }) {
  
 const [isAdding, setIsAdding] = useState(false);

 const handleClick = () => {
 setIsAdding(!isAdding);
 if (!isAdding) {
 const text = new fabric.Textbox('Lorem ipsum', {
  left: 100,
  top: 400,
  fill: 'black',
  fontSize: 50,
  width: 300,
  height: 200,
  fontFamily: 'Saira',
  cornerColor: 'rgba(255, 255, 255, 0.7)',
  cornerStrokeColor: 'rgb(0, 0, 0)',
  transparentCorners: false,
  cornerSize: 30,
  cornerStyle: 'circle',
  borderColor: 'rgb(43, 0, 78)'
 });
 canvas.add(text);
 }
 };

 return (
 <li className='text-[--light] text-[1vw]'>
 <div className='flex flex-col items-center cursor-pointer'>
 <button className='text-[2vw]' onClick={handleClick}>
 <MdOutlineTextFields />
 </button>
 <span>Texto</span>
 </div>
 </li>
 );
}