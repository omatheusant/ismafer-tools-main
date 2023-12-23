import { RxTransparencyGrid } from 'react-icons/rx';
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

export const Background = ({ canvas }) => {
 const [color, setColor] = useState('#fff');
 const [isOpen, setIsOpen] = useState(false);

 const handleChange = (color) => {
 setColor(color);
 canvas.setBackgroundColor(color, canvas.renderAll.bind(canvas));
 };

 const handleClick = () => {
 setIsOpen(!isOpen);
 };

 const customStyle = {
  width: '10vw',
  height: '10vw'
 }

 return (
 <li className='text-[--light] text-[1vw]'>
   <div className='flex flex-col items-center cursor-pointer'>
     <button className='text-[2vw]' onClick={handleClick}>
       <RxTransparencyGrid />
     </button>
     <span>Fundo</span>
     {isOpen && (
       <div className='absolute flex justify-center gap-[2vw] items-center rounded left-[8vw] bottom-[7vw] bg-[--bg-color] w-[15vw] h-[15vw p-[1vw]'>
         <HexColorPicker color={color} onChange={handleChange} style={customStyle}/>
       </div>
     )}
   </div>
 </li>
 );
};