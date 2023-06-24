import * as React from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import firebase from '../../firebase';

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const auth = getAuth(firebase);

export const Navbar: React.FC<{section?: string}> = ({ section }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  React.useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user)
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false);
        }
      });
  }, [])

  const handleSignOut = () => {               
    signOut(auth).then(() => {
        router.push('/signin');
    }).catch((error) => {
      console.log(error);
    });
}

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  <a
                    href="/"
                    className={
                      clsx(
                        "inline-flex items-center border-b-2px-1 pt-1 text-sm font-medium",
                        {"border-indigo-500  text-gray-900": section == "calculator"},
                        {"border-transparent   text-gray-500 hover:border-gray-300 hover:text-gray-700": section != "calculator"}
                      )
                    }
                  >
                    Calculator
                  </a>
                  <a
                    href="/gallery"
                    className={
                      clsx(
                        "inline-flex items-center border-b-2px-1 pt-1 text-sm font-medium",
                        {"border-indigo-500  text-gray-900": section == "gallery"},
                        {"border-transparent   text-gray-500 hover:border-gray-300 hover:text-gray-700": section != "gallery"}
                      )
                    }
                  >
                    Gallery
                  </a>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div className="flex gap-2">
                    {isAuthenticated ? (
                       <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                       <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                         <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                           <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                         </svg>
                       </span>
                     </Menu.Button>
                    ) : (
                      <>
                        <a
                          href="/signin"
                          className="flex w-36 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Sign in
                        </a>
                        <a
                          href="/signup"
                          className="flex w-36 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Sign up
                        </a>
                      </>
                    )}
                  </div>
                  <Transition
                    as={React.Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/profile"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            onClick={handleSignOut}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-4 pt-2">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <Disclosure.Button
                as="a"
                href="/"
                className={
                  clsx(
                    "block border-l-4 py-2 pl-3 pr-4 text-base font-medium",
                    {"border-indigo-500 bg-indigo-50 text-gray-900": section == "calculator"},
                    {"border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700": section != "calculator"}
                  )
                }
              >
                 Calculator
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/gallery"
                className={
                  clsx(
                    "block border-l-4 py-2 pl-3 pr-4 text-base font-medium",
                    {"border-indigo-500 bg-indigo-50 text-gray-900": section == "gallery"},
                    {"border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700": section != "gallery"}
                  )
                }
              >
                Gallery
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
