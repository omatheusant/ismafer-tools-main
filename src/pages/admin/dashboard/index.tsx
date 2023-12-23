import { CreateUser } from '@/components/Admin/CreateUser';
import { UsersTable } from '@/components/Admin/UsersTable';
import GetUsers from '@/services/getUsers';
import { useSession } from 'next-auth/react'
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { GoSearch } from "react-icons/go";
import { IoChevronBackSharp } from 'react-icons/io5';


type UsersList = {
  name: string,
  username: string,
  role: string
}[]



const AdminPage = () => {
  const { data: session } = useSession();
  const [searchValue, setSearchValue] = useState('');

  let users: UsersList = GetUsers()

  if (session?.user.role !== 'admin') {
    return (<>Acesso negado!</>)
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <section className='text-[--light]'>
      <header className="navbar bg-[--bg-color] shadow-md">
        <Link href={'/'} className='text-[--brand] cursor-pointer'>
          <IoChevronBackSharp size='50px' />
        </Link>
        <a className="btn btn-ghost text-xl">Dashboard</a>
      </header>
      <div className='min-w-full mt-10 flex justify-center'>
        <div className='w-[90vw] flex flex-col relative'>
          <h1 className='text-xl font-semibold '>Usuários</h1>
          <span className='text-gray-300'>Lista de todos usuários cadastrados</span>
          <span className='absolute top-[84px] left-3'><GoSearch /></span>
          <div className='flex justify-between items-center mt-4'>
            <input
              type="search"
              placeholder="Procurar por usuário..."
              className="input input-bordered w-full max-w-xl h-10 bg-[--dark] placeholder:text-[--light] pl-10 "
              value={searchValue}
              onChange={handleSearchChange}
            />
            <CreateUser />
          </div>
          <div className='w-full bg-[--bg-color] py-6 px-5 mt-10 rounded-sm border-[--dark] border shadow-md'>
            <UsersTable users={filteredUsers} />
          </div>
        </div>
      </div>
    </section>
  )

}

export default AdminPage