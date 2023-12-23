import { signOut, useSession } from 'next-auth/react';
import { FaSignOutAlt } from "react-icons/fa"

import Link from 'next/link';
import { AdminMenu } from '@/components/Admin/AdminMenu';

export default function Home() {
  const {data: session} = useSession()
  console.log(session?.user)
  if (session?.user) {
    return (
      <main className="hero min-h-screen font-medium">
        {session.user.role === "admin" && (
          <div className='absolute left-2 top-2'>
            <AdminMenu/>
          </div>
        )}
        <div className="hero-content text-center">
          <div className="max-w-md flex flex-col justify-center">
            <img src={'https://i.postimg.cc/d12jqFhK/logo-ismafer-rem.png'} alt='logo' width={300} className="self-center" />
            <p className="py-6 font-light text-[--light]">Ferramentas de uso rápido para criação de anúncios da Ismafer.</p>
            <div className="flex flex-col gap-4">
              <Link href={'/tools/cutter'}>
                <button className="btn bg-[--brand]  hover:bg-orange-500 text-[--dark] text-xl w-full">Cortador de imagens</button>
              </Link>
              <Link href={'/tools/removebg'}>
                <button className="btn bg-[--brand]  hover:bg-orange-500 text-[--dark] text-xl w-full">Remover fundo</button>
              </Link>
              <Link href={'/tools/editor'}>
                <button className="btn bg-[--brand]  hover:bg-orange-500 text-[--dark] text-xl w-full">Criação de KIT</button>
              </Link>
            </div>
            <button className='absolute right-5 top-5 flex gap-2 items-center' onClick={() => signOut()}>Desconectar<FaSignOutAlt/></button>
          </div>
        </div>
      </main>
    )
  }
}
