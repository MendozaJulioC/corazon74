'use client'

import { signIn, signOut } from "next-auth/react"
import { useSession } from 'next-auth/react'
import { useState } from 'react';
import { useRouter} from 'next/navigation'

import Select from 'react-select'
import { Toast } from 'flowbite-react';
import { HiFire } from 'react-icons/hi';
  import TableMain from '../../components/TablaBarriosMain'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { info } from "autoprefixer";

export default function Register() {

    const router = useRouter();
    const { status } = useSession({ required: false });

    if (status === "loading") {
        return "Loading or not authenticated...";
    }
    if (status === "authenticated") {
        router.push("/listados");
    }



  return (
    <>
      <div className="flex  flex-1 flex-col justify-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-20 ">
          {/* <h2 className="mt-8 text-center text-5xl font-bold leading-9 tracking-tight text-green-900 ">
            Corazón
          </h2> */}
          <h2 className="mt-8 text-center text-5xl font-bold leading-9 tracking-tight text-green-900  flex justify-center alings-items-center">
            <img
              src="/catalina.jpg"
              alt="login google"
              width="200"
              height="200"
              className="  mb-4"
            />
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-7xl px-20">
          <TableMain/>
        </div>
      </div>
    </>
  );
}
