import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form"
import Link from "next/link";
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import toast, { Toaster } from "react-hot-toast";
import LoadingDots from "@/components/shared/Loading/LoadingDots";
import { FaEye, FaEyeSlash } from "react-icons/fa";


type FormInput = {
  username: string,
  password: string
}

export const Form = () => {

  const [loading, setLoading] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const router = useRouter();

  const { status } = useSession()

  if (status === "authenticated") router.push('/')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInput>()

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setLoading(true)
    const res = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false
    })
    console.log(res)
    if (res?.error) {
      setLoading(false)
      toast.error(res.error)
    };
    if (res?.ok) {
      router.reload()
    };
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
      <Toaster />
      <div>
        <label
          htmlFor="username"
          className="block text-xs text-[--dark] uppercase"
        >
          Usuário
        </label>
        <input
          id="username"
          type="username"
          placeholder="Digite seu usuário..."
          {...register("username", { required: true })}
          autoComplete="username"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div className='relative'>
        <label
          htmlFor="password"
          className="block text-xs text-[--dark] uppercase"
        >
          Senha
        </label>
        <input
          id="password"
          type={isPasswordShow ? 'text' : 'password' }
          placeholder="Digite sua senha..."
          {...register("password", { required: true })}
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
        <div className={`absolute right-2 bottom-[0.7rem] cursor-pointer`} onClick={()=>setIsPasswordShow(!isPasswordShow)}>
          <FaEye className={isPasswordShow ? 'visible' : 'invisible'}/>
          <FaEyeSlash className={isPasswordShow ? 'invisible absolute' : 'visible'}/>
        </div>
      </div>
      <button
        disabled={loading}
        className={`${loading
          ? "cursor-not-allowed border-gray-200 bg-gray-100"
          : "border-black bg-black text-white hover:bg-white hover:text-black"
          } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {loading ? (
          <LoadingDots color="#808080" />
        ) : (
          <p>Entrar</p>
        )}
      </button>
    </form>
  );
}