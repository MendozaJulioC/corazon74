"use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { signIn, signOut } from "next-auth/react";
import { Avatar, Dropdown } from "flowbite-react";
import Link from "next/link";




export default function Nav(props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white">
      <header className="  fixed  inset-x-0 top-0 z-50">
        <nav
          className="flex bg-violet-100 items-center fixed top-0  inset-x-0  z-50 justify-between  lg:px-6"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Dapp</span>
              <img className="h-10 w-auto" src="/letrero.png" alt="" />
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
       
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <div className=" flex items-center justify-between p-6 lg:px-20">
              <Dropdown
                className=" lg:px-10 md:justify-end shadow-lg shadow-emerald-400/50 mr-4"
                inline
                label={
                  <Avatar
                    alt="User settings"
                    img={props.avatar}
                    rounded
                    color="success"
                    size="md"
                    bordered
                  >
                    <div className="space-y-1 mr-4 font-medium dark:text-gray-900 ml-4">
                      <div>
                        {" "}
                        <strong> {props.usuario} </strong>{" "}
                      </div>
                    </div>
                  </Avatar>
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm text-gray-900"> {props.usuario}</span>
                  <span className="block truncate text-sm font-medium text-gray-800">
                    {props.email}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item>
                 <Link className="text-gray-500" href="/dashboard">Home </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                 <Link className="text-gray-500" href="/register">Registrar Usuarios</Link>
                </Dropdown.Item>
                <Dropdown.Item className="text-gray-500">
                    <Link className="text-gray-500" href="/register"> Actualizar Password </Link>      
                  </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  className=" font-bold text-red-900"
                  onClick={signOut}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#C70039"
                    className="bi bi-box-arrow-left mr-3"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                    />
                  </svg>
                  <span className="text-red-800/80">Sign out </span> 
                </Dropdown.Item>
              </Dropdown>
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