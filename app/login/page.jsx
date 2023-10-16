'use client'
import { signIn, signOut } from "next-auth/react"
import { useSession } from 'next-auth/react'
import { useState } from 'react';
import Router,{ useRouter} from 'next/navigation'
import { redirect } from 'next/navigation'


export default function Home() {


  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')
  const router = useRouter()

  const { status } = useSession({ required: false })



if (status === "loading") {
  return "Loading or not authenticated..."
}

if (status === "authenticated") {
  router.push("/dashboard");

}

  // const handleSubmit= async(e)=>{
  //   e.preventDefault();
  //   try {
  //     const data = await signIn("credentials", {
  //       redirect: false,
  //       email,
  //       password,
  //     });

  //     if (!data.error) {
  //       router.push("/dashboard");
  //     }
  //   } catch (error) {
  //     console.error(" Error handleSubmit", error);
  //   }
  // };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8b  ">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-sm  ">
        <h2 className="mt-10 text-center text-5xl font-bold leading-9 tracking-tight text-indigo-600 ">
        Violeta y Campesina
        </h2>
      
        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-red-600 ">
        Votos de corazón
        </h2>

        <h2 className="mt-8 text-center text-5xl font-bold leading-9 tracking-tight text-green-900  flex justify-center alings-items-center">
        
        <img src="/catalina.jpg" alt="login google"  width="200" height="200" className="  mb-4"/> 
      </h2>
      </div>


    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
    <form className="space-y-6" >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  disabled
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                {/* <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500b font-mono hover:font-serif">
                      Forgot password?
                    </a>
                  </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPass(e.target.value)}
                  
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 font-mono hover:font-mono"
              >
             Ingrese con sus credenciales
              </button>
            </div> */}
            <div>
              <button
               onClick={()=>signIn('google')}
                className="flex w-full justify-center rounded-md  bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 font-mono hover:font-mono"
              >
              <img src="/google.svg" alt="login google"  width="24" height="24" className="mr-2" /> 
              Ingrese con Google
              </button>
            </div>
            <hr />
          </form>
    </div>
  </div>
  );
}