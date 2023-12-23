import { IoIosAdd } from "react-icons/io";
import axios from 'axios'
import Input from '../shared/Input/Input';
import { IoExitOutline } from 'react-icons/io5';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import LoadingDots from '../shared/Loading/LoadingDots';

interface userInfoProps {
  name: string,
  username: string,
  password: string
  role: string
}

export const CreateUser = () => {
  const [userInfo, setUserInfo] = useState<userInfoProps>({
    name: '',
    username: '',
    password: '',
    role: ''
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    axios
      .post("/api/users/register", userInfo)
      .then(() => {
        toast.success("Conta criada com sucesso!")
        router.reload()
      })
      .catch((error) => {
        setLoading(false)
        toast.error(error.response.data.message)
      })

  }

  const handleChange = (event: any) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
    console.log(event.target.value)
  }



  return (
    <>
      <button
        className="btn bg-[--brand] text-[--dark] text-lg hover:text-[--dark] hover:bg-yellow-600"
        onClick={() => (document.getElementById('modaladmin') as HTMLDialogElement)!.showModal()}>
        Novo Usuário <IoIosAdd size={30} />
      </button >
      <Toaster />
      <dialog id="modaladmin" className="modal">
        <div className="modal-box w-6/12 max-w-5xl bg-[--bg-color]">
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-3 items-center'>
              <h3 className='text-xl text-center font-bold mb-5 text-[--brand]'>NOVO USUÁRIO</h3>
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
                <label htmlFor="password">Senha</label>
                <Input
                  name='password'
                  id='password'
                  value={userInfo.password}
                  onChange={handleChange}
                  placeholder='Digite o a senha...'
                  type='password' />
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
                className={`${loading
                  ? "cursor-not-allowed bg-yellow-400"
                  : "border-black bg-[--brand] text-[--dark] hover:bg-yellow-600"
                  } flex h-10 w-28 items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
              >
                {loading ? (
                  <LoadingDots color="#808080" />
                ) : (
                  <p>Criar Usuário</p>
                )}
              </button>
            </div>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="text-[--light] text-lg flex items-center gap-2">Cancelar <IoExitOutline /></button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}