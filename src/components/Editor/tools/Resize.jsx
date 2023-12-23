import { useState } from 'react';
import { GiResize } from 'react-icons/gi'

export const Resize = ({ setSize }) => {
  const [showModal, setShowModal] = useState(false);
  const [newSize, setNewSize] = useState({ width: 1700, height: 1200 });

  const handleClick = () => {
    setShowModal(!showModal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSize(newSize);
    setShowModal(false);
  };

  const handleChange = (e) => {
    setNewSize({ ...newSize, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setShowModal(false)
  }

  return (
    <li className='text-[--light] text-[1vw] '>
      <div className='flex flex-col items-center cursor-pointer relative ' >
        <button className='text-[2vw]' onClick={handleClick}>
          <GiResize />
        </button>
        <span onClick={handleClick} className='cursor-pointer'>Tamanho</span>
        {showModal && (
          <form className='ml-[23vw] absolute bg-[--bg-color] p-[2vw]' onSubmit={handleSubmit}>
            <div className='flex flex-col mb-4'>
              <label className='mb-2 uppercase font-bold text-[1.0vw] text-grey-darkest' htmlFor="width">Altura</label>
              <input className='border py-2 px-3 text-grey-darkest' type="number" name="width" value={newSize.width} onChange={handleChange} />
            </div>
            <div className='flex flex-col mb-4'>
              <label className='mb-2 uppercase font-bold text-[1.0vw] text-grey-darkest' htmlFor="height">Largura</label>
              <input className='border py-2 px-3 text-grey-darkest text-[1.2vw]' type="number" name="height" value={newSize.height} onChange={handleChange} />
            </div>
            <div className='flex justify-end'>
              <button type="submit" className='border py-2 px-3 text-grey-darkest'>Aplicar</button>
              <button onClick={handleCancel} className='border py-2 px-3 text-grey-darkest'>Cancel</button>
            </div>
          </form>

        )}
      </div>
    </li>
  );
};