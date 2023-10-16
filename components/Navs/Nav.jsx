'use client'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { signIn, signOut } from "next-auth/react"
import Link from 'next/link'
const navigation = [

  { name: 'Home', href: '/dashboard' },
  { name: 'Registrar Proyectos', href: '/proyectos/dashproyectos' },
  { name: 'Metas Proyectos', href: '/proyectos/dashproyectos/metasproyectos' },
  { name: 'Presupuesto por vigencia', href: '/proyectos/dashproyectos/presupuestoproyectos' }
]

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function Nav(props) {
  let imageavatar='';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login')
    },
   
  })
  if(!session?.user?.image){
    imageavatar = '/letrero.png'
  }else{  imageavatar = session.user.image }


  return (
    <div className="bg-white">
      <header className="  fixed top-0  inset-x-0  z-50">
        <nav
          className="flex   bg-white items-center fixed   inset-x-0 top-0 z-50 justify-between p-2 lg:px-6"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">DAP app</span>
              <img
                className="h-20 w-auto"
                src="https://cdnwordpresstest-f0ekdgevcngegudb.z01.azurefd.net/es/wp-content/themes/theme_alcaldia/logos/logo_footer.png"
                alt=""
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              // <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
              //   {item.name}
              // </a>

              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-90"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <div className=" flex items-center justify-between p-6 lg:px-20">
              <a className="text-sm font-bold leading-6 text-gray-900  mr-4">
                {session?.user?.name}
               
             
              </a>
              <img src=  {imageavatar} alt=""   width={60} height={60}  className='rounded-full shadow-lg'/>
            </div>
            <div className=" flex items-center justify-between p-6 lg:px-20">
              {session ? (
                <>
                  <button
                    className="flex w-full justify-center rounded-md bg-slate-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 font-mono hover:font-mono"
                    onClick={signOut}
                  >
                    Salir
                  </button>
                </>
              ) : (
                <a
                  href="/login"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Log in <span aria-hidden="true"></span>
                </a>
              )}
            </div>
          </div>
        </nav>
      </header>

      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-20 w-auto"
                src="https://cdnwordpresstest-f0ekdgevcngegudb.z01.azurefd.net/es/wp-content/themes/theme_alcaldia/logos/logo_footer.png"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-2">
                <a
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}