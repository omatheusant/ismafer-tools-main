import { fabric } from 'fabric'
import { FaCloudUploadAlt } from 'react-icons/fa';

export const AddImage = ({ canvas }) => {
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      fabric.Image.fromURL(URL.createObjectURL(file), img => {
        img.set({
          id: img.id + '_' + Date.now(),
          angle: 0,
          padding: 10,
          selectable: true,
          cornerColor: 'rgba(255, 255, 255, 0.7)',
          cornerStrokeColor: 'rgb(0, 0, 0)',
          transparentCorners: false,
          borderColor: 'rgb(43, 0, 78)',
          cornerStyle: 'circle',
          cornerSize: 40
        });
        canvas.centerObject(img);
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
        e.target.value = '';
      });
    }
   }


 return (
  <li className='text-[--light] text-[1vw]'>
  <div className='flex flex-col items-center cursor-pointer'>
    <label className='flex flex-col items-center cursor-pointer' htmlFor="file_input">
      <FaCloudUploadAlt className='text-[2vw]' />
      Uploads
    </label>
    <input className='hidden' id="file_input" type="file" onChange={handleImage} />
  </div>
</li>
 );
}