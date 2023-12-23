import Image from 'next/image';
import Link from 'next/link';
import { Form } from '@/components/Form/Form';

const SignIn = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-[--opaque]  shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-[--opaque] bg-[--bg-dark] px-4 py-6 pt-8 text-center sm:px-16">
          <Link href="/">
            <Image
              src="https://i.postimg.cc/CKTP2KMm/if-logo.jpg"
              priority
              alt="Logo"
              width={50}
              height={150}
              className='rounded-full h-auto w-auto'
            />
          </Link>
          <h3 className="text-xl font-semibold">Login</h3>
          <p className="text-sm text-gray-500">
            Use suas credenciais para fazer o login
          </p>
        </div>
        <Form />
      </div>
    </div>
  )
}

export default SignIn