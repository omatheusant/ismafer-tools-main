import { FaEdit, FaUser } from "react-icons/fa";
import { Modal } from '../shared/Modal/Modal';
import LoadingDots from '../shared/Loading/LoadingDots';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Input from '../shared/Input/Input';

interface userInfoProps {
  name: string,
  username: string,
  role: string,
  atualUser: string
}

export const UpdateUser = ({ user }: any) => {
  const [userInfo, setUserInfo] = useState<userInfoProps>({
    name: user.name,
    username: user.username,
    role: user.role,
    atualUser: user.username
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    axios
      .post('/api/users/update', userInfo)
      .then(() => {
        toast.success("Usuário editado com sucesso!")
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        toast.error(error.message)
      })
  }

  const handleChange = (event: any) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
    console.log(event.target.value)
  }
  
  function getRandom() {
    return Math.floor(Math.random() * 100) + 1;
  }
  
  return (
    <Modal id={getRandom()} className="btn bg-[--bg-color] hover:bg-[--dark] border-none text-[#8884FF]" title={(<FaEdit size={20} />)}>
      <div className='alert text-[--light] border-none bg-[--dark] w-full flex flex-col justify-center items-center mt-8'>
        <FaUser
          className='font-light'
          size="45px" />
        <h1
          className='text-2xl '>
          {user.name}
        </h1>
        <form
          onSubmit={handleSubmit}
          className=' flex flex-col gap-3 '>
          <div className='flex flex-col'>
            <label htmlFor="name">Nome</label>
            <Input
              name='name'
              id='name'
              value={userInfo.name}
              onChange={handleChange}
              placeholder='Digite o nome...'
              type='text' />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="username">Usuário</label>
            <Input
              name='username'
              id='username'
              value={userInfo.username}
              onChange={handleChange}
              placeholder='Digite o username...'
              type='text' />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="password">Cargo</label>
            <Input
              name='role'
              id='role'
              value={userInfo.role}
              onChange={handleChange}
              placeholder='Digite o cargo...'
              type='text' />
          </div>
          <button
            disabled={loading}
            className='btn w-full border-none text-[--brand] hover:bg-[--bg-color] bg-[--dark] text-lg'>
            {loading ? (
              <LoadingDots color="gray" />
            ) : (
              <p>Editar Usuário</p>
            )}
          </button>
        </form>
      </div>
    </Modal>
  )
}