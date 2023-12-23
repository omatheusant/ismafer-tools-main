import { FaTrashAlt, FaUserTimes } from "react-icons/fa";
import { Modal } from '../shared/Modal/Modal';
import { LuAlertTriangle } from "react-icons/lu";
import { useState } from 'react';
import LoadingDots from '../shared/Loading/LoadingDots';
import axios from 'axios';
import toast from 'react-hot-toast';


export const DeleteUser = ({ user }: any) => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true)
    axios
      .post('/api/users/delete', user)
      .then(()=>{
        toast.success("Usuário removido com sucesso!")
      })
      .catch((error) => {
        setLoading(false)
        toast.error(error.message)
      })
  }

  return (
    <Modal
      id={user.name}
      className="btn bg-[--bg-color] hover:bg-[--dark] border-none text-[--alert]"
      title={(<FaTrashAlt size={20} />)}>
      <div className='alert text-[--light] border-none bg-[--dark] w-full flex flex-col justify-center items-center mt-8'>
        <FaUserTimes
          className='font-light'
          size="45px" />
        <h1
          className='text-2xl '>
          {user.name}{'/'}{user.username}{`(${user.role})`}
        </h1>
        <button
          disabled={loading}
          onClick={handleClick}
          className='btn w-full border-none text-[--alert] hover:bg-[--bg-color] bg-[--dark] text-lg'>
          {loading ? (
            <LoadingDots color="var(--alert)" />
          ) : (
            <p>Remover Usuário</p>
          )}
        </button>
        <span className='border-[0.2px] border-[--brand] flex items-center gap-2 text-[--brand] bg-yellow-600 p-1 rounded-sm bg-opacity-10'><LuAlertTriangle /> Essa é uma ação irreversível</span>
      </div>
    </Modal>
  )
}