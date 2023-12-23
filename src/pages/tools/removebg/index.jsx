import React, { useState } from 'react';
import { IoChevronBackSharp } from "react-icons/io5";
import { MdFileDownload } from "react-icons/md";
import Link from 'next/link';

const { removeBackground } = require('@imgly/background-removal')

const RemoveBg = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageData = e.target.result;
      setImageSrc(imageData);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveBackground = async () => {
    if (!imageSrc) {
      return;
    }

    setLoading(true);

    try {
      const blob = await removeBackground(imageSrc, {
        output: {quality: 1.0}
      });
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
    } catch (error) {
      console.error('Error removing background:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadImage = () => {
    if (!resultUrl) {
      return;
    }

    const link = document.createElement('a');
    link.href = resultUrl;
    link.download = 'image_without_background.png';
    link.click();
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-xl mx-auto p-4">
      <div className="w-full flex justify-center mb-10">
        <img src={'https://i.postimg.cc/cJnKqhgV/logo-ismafer.jpg'} alt='logo' width={200} />
      </div>
      <h1 className="text-3xl font-bold text-[--brand] mb-7">Remover Fundo</h1>
      <input
        type="file"
        onChange={handleImageUpload}
        accept="image/*"
        className="rounded p-2 mb-4 bg-[--dark] text-[--light]"
      />
      <button
        onClick={handleRemoveBackground}
        disabled={loading}
        className="btn bg-[--brand] text-[--bg-color]  hover:bg-orange-400"
      >
        Remover Fundo
      </button>
      {loading && <h2>Carregando...</h2>}
      {resultUrl && (
        <div>
          <img src={resultUrl} alt="Imagem sem fundo" />
          <button
            className="btn bg-[--brand] hover:bg-orange-500 font-bold py-2 px-4 rounded mt-4 fixed bottom-10 right-10 text-[--dark]"
            onClick={handleDownloadImage}>
            <MdFileDownload size='20px' />
          </button>
        </div>
      )}
      <Link href={'/'} className='absolute left-5 top-5 text-[--brand] cursor-pointer'>
        <IoChevronBackSharp size='50px' />
      </Link>
    </div>
  );
};

export default RemoveBg;