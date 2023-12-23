import { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { MdFileDownload } from 'react-icons/md';
import Link from 'next/link';
import { IoChevronBackSharp } from 'react-icons/io5';

const ImageCutter = () => {
  const [inputImage, setInputImage] = useState(null);
  const [processedImages, setProcessedImages] = useState([]);
  const [originalImage, setOriginalImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('1200x1200');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setInputImage(file);
  };

  const resizeImage = (image, width, height) => {
  const canvas = document.createElement('canvas');
  let newWidth = width;
  let newHeight = height;

  const aspectRatio = image.width / image.height;
  const canvasAspectRatio = width / height;

  if (canvasAspectRatio > aspectRatio) {
    newWidth = height * aspectRatio;
  } else {
    newHeight = width / aspectRatio;
  }

  canvas.width = newWidth;
  canvas.height = newHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0, newWidth, newHeight);
  return canvas.toDataURL('image/jpeg', 1.0);
};

  const handleImageProcessing = () => {
    if (!inputImage) {
      alert('Por favor, selecione um arquivo de imagem.');
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const image = new Image();
      image.src = e.target.result;

      image.onload = function () {
        let canvasSize = { width: 1200, height: 1200 };

        if (selectedSize === '1700x1200') {
          canvasSize = { width: 1700, height: 1200 };
        }

        const resizedOriginal = resizeImage(image, canvasSize.width, canvasSize.height);
        setOriginalImage(resizedOriginal);

        const cortes = [
          { nome: 'Superior Esquerdo', x: 0, y: 0 },
          { nome: 'Superior Direito', x: canvasSize.width, y: 0 },
          { nome: 'Inferior Esquerdo', x: 0, y: canvasSize.height },
          { nome: 'Inferior Direito', x: canvasSize.width, y: canvasSize.height },
          { nome: 'Meio Superior', x: canvasSize.width / 2, y: 0 },
          { nome: 'Meio Inferior', x: canvasSize.width / 2, y: canvasSize.height },
          { nome: 'Esquerda Meio', x: 0, y: canvasSize.height / 2 },
          { nome: 'Direita Meio', x: canvasSize.width, y: canvasSize.height / 2 },
          { nome: 'Centro', x: canvasSize.width / 2, y: canvasSize.height / 2 },
          { nome: 'Canto Superior Esquerdo', x: 100, y: 100 },
        ];

        const processed = cortes.map((corte) => {
          const canvasCorte = document.createElement('canvas');
          canvasCorte.width = canvasSize.width;
          canvasCorte.height = canvasSize.height;
          const ctxCorte = canvasCorte.getContext('2d');
          ctxCorte.drawImage(
            image,
            -corte.x,
            -corte.y,
            canvasSize.width * 2,
            canvasSize.height * 2
          );

          return canvasCorte.toDataURL('image/jpeg', 1.0);

        });

        setProcessedImages(processed);
      };
    };

    reader.readAsDataURL(inputImage);
  };

  const handleDownloadImages = () => {
    const zip = new JSZip();
  
    const reader = new FileReader();
    reader.onload = function (e) {
      const image = new Image();
      image.src = e.target.result;
  
      image.onload = function () {
        const resizedOriginal = selectedSize === '1700x1200'
          ? resizeImage(image, 1700, 1200)
          : resizeImage(image, 1200, 1200);
  
        zip.file('imagem_original.jpeg', resizedOriginal.split(',')[1], { base64: true });
  
        processedImages.forEach((src, index) => {
          zip.file(`imagem_${index + 1}.jpeg`, src.split(',')[1], { base64: true });
        });
  
        zip.generateAsync({ type: 'blob' }).then(function (content) {
          saveAs(content, 'imagens_cortadas.zip');
        });
      };
    };
  
    reader.readAsDataURL(inputImage);
  };
  

  return (
    <div className="flex flex-col justify-center items-center max-w-xl mx-auto p-4">
      <div className="w-full flex justify-center mb-10">
        <img src={'https://i.postimg.cc/cJnKqhgV/logo-ismafer.jpg'} alt='logo' width={200} />
      </div>
      <h1 className="text-3xl font-bold text-[--brand] mb-7">Cortador de Imagens</h1>
      <input
        type="file"
        onChange={handleImageUpload}
        accept="image/*"
        className="rounded p-2 mb-4 bg-[--dark] text-[--light]"
      />
      <select
        className="select w-full max-w-xs bg-[--dark] text-[--light] font-bold text-base mb-4"
        value={selectedSize}
        onChange={(e) => setSelectedSize(e.target.value)}
      >
        <option value="1200x1200">1200x1200</option>
        <option value="1700x1200">1700x1200</option>
      </select>
      <button
        onClick={handleImageProcessing}
        className="btn bg-[--brand] text-[--bg-color]  hover:bg-orange-400"
      >
        Cortar Imagens
      </button>

      <div id="imagensCortadas" className="flex w-screen justify-center flex-wrap mt-4">
        {processedImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Imagem cortada ${index}`}
            className="m-2 border rounded"
            style={{ width: '300px', height: '300px' }}
          />
        ))}
        {originalImage && (
          <img
            src={originalImage}
            alt="Imagem original"
            className="m-2 border rounded"
            style={{ width: '300px', height: '300px' }}
          />
        )}
      </div>

      <button
        onClick={handleDownloadImages}
        className="btn bg-[--brand] hover:bg-orange-500 font-bold py-2 px-4 rounded mt-4 fixed bottom-10 right-10 text-[--dark]"
      >
        <MdFileDownload size='20px' />
      </button>
      <Link href={'/'} className='absolute left-5 top-5 text-[--brand] cursor-pointer'>
        <IoChevronBackSharp size='50px' />
      </Link>
    </div>
  );
};

export default ImageCutter;