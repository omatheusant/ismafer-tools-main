import axios from 'axios';
import { fabric } from 'fabric'
import { FaCloudUploadAlt } from 'react-icons/fa';

export const AddImage = ({ canvas }) => {
  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.name.endsWith('.psd')) {
        console.log('PSD detected!')
        console.log(file)
        try {
          console.log('sending file to server...')
          const formData = new FormData();
          formData.append('psdFile', file);

          const response = await axios.post('http://localhost:3001/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log('PSD uploaded successfully:', response.data);
          const layers = await response.data.layers

          console.log('layers', layers)

          layers.map((layer) => {
            const id = layer.id
            const images = layer.imagesUrl.map((url) => {
              fabric.Image.fromURL(url, img => {
                img.set({
                  id: id,
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
                canvas.add(img);
                canvas.setActiveObject(img);
                canvas.renderAll();
                e.target.value = '';
              })
            })
          })

        } catch (error) {
          console.error('Error uploading PSD:', error);
        }
      } else {
        console.log('Non psd file detected!')
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