'use client'

import { signIn, signOut } from "next-auth/react"
import { useSession } from 'next-auth/react'
import { useState } from 'react';
import { useRouter} from 'next/navigation'

import Select from 'react-select'
import { Toast } from 'flowbite-react';
import { HiFire } from 'react-icons/hi';

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { info } from "autoprefixer";

export default function Register() {
    const [cedula, setCedula] = useState(""); 
    const [nombre, setNombre] = useState(""); 
    const [puesto, setPuesto] = useState("");
    const [mesa, setMesa] = useState("")
    const [celular, setCelular]= useState("")

    const [message, setMessage]= useState([])
    const [showToast, setShowToast] = useState(false);
    const [active, setActive]= useState(true)



    let datoserror =[]
    const router = useRouter();
    const { status } = useSession({ required: false });

    if (status === "loading") {
        return "Loading or not authenticated...";
    }
    if (status === "authenticated") {
        router.push("/dashboard");
    }




  async function handleValidaCedula(e){ 
    e.preventDefault();

    const res =  await  fetch(`https://j4ch.kratiaanalitik.net/estado/arboletes/consulta/${e.target.value}`);  
    const user = await res.json()

console.log(user.data);
    
    if(user.data.length){
   
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: <strong>Alerta!!</strong>,
        html: `<i>Esta cédula ya se encuentra registrado!!</i><br/>  ${user.data[0].nombre} ` ,
        icon: 'info',
        iconColor: '#C70039',
        confirmButtonColor: '#4f709c',
        allowOutsideClick: false,
        footer: '<a href=""> Intentalo nuevamente </a>'
      }), setCedula(""), setActive(true)
    }
    if(!user.data.length){setActive(false)}
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     datoserror.splice(0,datoserror.length);

     if(!cedula){datoserror.push('Favor ingresar su número de  cédula'),setShowToast(true)}
     if(!nombre){datoserror.push('Favor ingresar el nombre del usuario'),setShowToast(true)}
     if(!puesto){datoserror.push('Favor ingresar el puesto del '), setShowToast(true)}
     if(!mesa){datoserror.push('Favor ingresar el numEero de la mesa'), setShowToast(true)}
     if(!celular){datoserror.push('Favor ingresar el numero de celular'), setShowToast(true)}

     setMessage(datoserror)
  
    if (datoserror.length == 0) {
      let setCredentials = {
        cedula: parseInt(cedula),
        nombre: nombre,
        puesto: puesto,
        mesa: mesa,
        celular: celular
      };
  
      const res = await fetch(`http://localhost:3001/estado/arboletes/registarnuevo`, { 
        method: "POST",
        body: JSON.stringify(setCredentials),
        headers: {
          'Content-Type':'application/json'
      }
      });
      const respuesta = await res.json();
      console.log(respuesta);
  
      if(respuesta.estado == 1){
        let timerInterval
        Swal.fire({
          title: 'VIOLETA Y CAMPESINA!',
          html: '<p>Espera mientras almacenamos el nuevo votante!!!</p>',
          icon: 'info',
          iconColor: '#610C9F',
          showConfirmButton: false,
          allowOutsideClick: false,   
          timer: 10000,
          timerProgressBar: true,
        }).then ((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            const MySwal = withReactContent(Swal)
            MySwal.fire({
              html: <p>Votante almacenado exitosamente!!!</p>,
              icon: 'success',
              iconColor: '#052e16',
              confirmButtonColor: '#005B41',
              confirmButtonText: 'Listo!!'
            }).then((result)=>{
              if (result.isConfirmed) {
                  setCedula("");
                  setCelular("");
                  setPuesto("");
                  setNombre("");
                  setMesa("");
                }
            })
          }
        })
      }else{
        const MySwal = withReactContent(Swal)
        MySwal.fire({
          html: <p> Votante no almacenado porfavor vallidar datos!!!</p>,
          icon: 'success',
          iconColor: '#610C9F',
          confirmButtonColor: '#C70039',
          confirmButtonText: 'Listo!!'
        })
      }
    }
  
    } catch (error) {
      console.error(" Error handleSubmit", error);
    }
  };

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

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-3xl px-20">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-12 gap-2  p-2 rounded-lg ">
              <div className="col-span-4 flex min-h-full flex-1 flex-col justify-center">
                <label
                  htmlFor="cedula"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cedula
                </label>
                <div className="mt-2">
                  <input
                    id="cedula"
                    name="cedula"
                    type="number"
                    autoComplete="cedula"
                    onChange={(e) => setCedula(e.target.value)}
                    onBlur={(e) => handleValidaCedula(e)}
                    value={cedula}
                    required
                    className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="col-span-8 flex min-h-full flex-1 flex-col justify-center">
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nombres
                </label>
                <div className="mt-2">
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    autoComplete="nombre"
                    onChange={(e) => setNombre(e.target.value)}
                    value={nombre}
                    required
                    className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="col-span-12 flex min-h-full flex-1 flex-col justify-center">
                <label
                  htmlFor="puesto"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Puesto de votación
                </label>
                <div className="mt-2">
                  <input
                    id="puesto"
                    name="puesto"
                    type="text"
                    autoComplete="puesto"
                    onChange={(e) => setPuesto(e.target.value)}
                    required
                    value={puesto}
                    className="block w-full p-2  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-12 flex min-h-full flex-1 flex-col justify-center">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mesa
                </label>
                <div className="mt-2">
                  <input
                    id="mesa"
                    name="mesa"
                    type="number"
                    min={1}
                    onChange={(e) => setMesa(e.target.value)}
                    required
                    value={mesa}
                    className="block w-full p-2  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-12 flex min-h-full flex-1 flex-col justify-center">
                <label
                  htmlFor="celular"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Celular
                </label>
                <div className="mt-2">
                  <input
                    id="celular"
                    name="celular"
                    type="number"
                    autoComplete="celular"
                    onChange={(e) => setCelular(e.target.value)}
                    value={celular}
                    required
                    className="block w-full p-2  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-start-4 col-span-6 flex min-h-full flex-1 flex-col justify-center mt-4">
                <button
                  type="submit"
                  disabled={active}
                  className="flex w-full justify-center rounded-md bg-green-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 font-mono hover:font-mono nabled:hover:border-gray-400 disabled:opacity-75"
                >
                  Registrar
                </button>
              </div>
            </div>
            {showToast ? (
              <div className="fixed top-20 right-5">
                {message.map((msg, index) => (
                  <>
                    <div>
                      <Toast>
                        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                          <HiFire className="h-5 w-5" />
                        </div>
                        <div className="pl-4 text-sm font-normal text-white">
                          <div key={index}>{msg}</div>
                        </div>

                        <Toast.Toggle onDismiss={() => setShowToast(false)} />
                        <div className="text-gray-800">
                          {setTimeout(() => {
                            setShowToast(false);
                          }, 5000)}
                        </div>
                      </Toast>
                    </div>
                    <br />
                  </>
                ))}
              </div>
            ) : null}

            <hr />
          </form>
        </div>
      </div>
    </>
  );
}
