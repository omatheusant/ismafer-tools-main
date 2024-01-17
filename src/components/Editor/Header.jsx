import Link from 'next/link';
import { CiSaveDown2 } from "react-icons/ci";
import { IoChevronBackSharp } from 'react-icons/io5';

export const Header = ({ canvas }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = 'kit.png';
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  };

  return (
    <div className='bg-[--bg-color] h-[15vh]  shadow-md shadow-black w-screen flex items-center z-20  justify-between top-0 fixed px-[2vw]'>
      <Link href={'/'}>
        <IoChevronBackSharp size='5vw' color="#FFC100" />
      </Link>
      <button className='bg-[--brand] font-bold text-[2vw] gap-[1vw] flex items-center bg-center py-[1vh] px-[1vw] justify-center text-[--dark] rounded' onClick={handleDownload}> Salvar <CiSaveDown2 size='3vw' /> </button>
    </div>
  );
}

