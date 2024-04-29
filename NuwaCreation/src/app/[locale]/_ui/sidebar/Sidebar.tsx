'use client'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Link, usePathname } from '@/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import NuwaDigitLifeIcon from '../icons/NuwaDigitLifeIcon';
import NuwaHomePageIcon from '../icons/NuwaHomePageIcon';
import NuwaWorldBookIcon from '../icons/NuwaWorldBookIcon';
import NuwaSettingsIcon from '../icons/NuwaSettingsIcon';
import SidebarItem from './SidebarItem';
import LangSwitcher from './LangSwitcher';
import { Avatar } from '@nextui-org/react';

const navigation = [
  { name: 'Navigation.home', href: '/', icon: NuwaHomePageIcon, current: false },
  { name: 'Navigation.character', href: '/charas', icon: NuwaDigitLifeIcon, current: false },
  { name: 'Navigation.worldbook', href: '/worldbook', icon: NuwaWorldBookIcon, current: false },
  // { name: 'Navigation.greetings', href: '/greetings', icon: DocumentPlusIcon, current: false },
  { name: 'Navigation.settings', href: '/settings', icon: NuwaSettingsIcon, current: false },
]
// const teams: any[] = [
// ]
const teams = [
  { id: 1, name: 'Header.nuwaLabs', href: 'https://www.nuwalabs.org', initial: 'L', current: false},
  { id: 2, name: 'Header.roleai', href: 'https://roleai.nuwalabs.org', initial: 'A', current: false},
  { id: 3, name: 'Header.BRC-1111', href: 'https://docs.nuwalabs.org', initial: 'B', current: false},
]

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar() {
    const t = useTranslations();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    navigation.forEach(item => {
      item.current = false;
      if (pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))) {
        item.current = true;
      }
    });
  
  return (
    <>
      <div className='z-50 fixed lg:block top-0 w-full'>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-white" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#2C2C2C]  pb-2 rounded-r-3xl">
                    <div className="flex flex-col justify-center h-16 shrink-0 items-start pl-16 pt-6">
                      <Image
                        width={96}
                        height={20}
                        src="/title-logo-white.png"
                        alt=""
                      />
                      <div className='text-neutral-600 text-xs'>Nuwa Digital Life Labs</div>
                    </div>
                    <nav className="grow flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <SidebarItem sidebarItem={item} />
                              </li>
                            ))}
                          </ul>
                        </li>
                        {teams.length > 0 && (
                          <li>
                          <ul role="list" className="space-y-1">
                            
                            {teams.length > 0 && (
                              <li>
                                <ul role="list" className="space-y-1">
                                  {teams.map((team) => (
                                    <li key={team.name}>
                                      <SidebarItem sidebarItem={team} />
                                    </li>
                                  ))}
                                </ul>
                              </li>
                            )}
                          </ul>
                        </li>
                        )}
                        
                      </ul>
                    </nav>
                    <div className='flex flex-row justify-center pb-6 w-full'>
                      <LangSwitcher />
                    </div>            
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#2C2C2C]  rounded-r-3xl">
            <div className="flex flex-col justify-center h-16 shrink-0 items-start pl-16 mt-4 mb-2">
              <Image
                width={96}
                height={20}
                src="/title-logo-white.png"
                alt=""
              />
              <div className='text-neutral-600 text-[10px]'>Nuwa Digital Life Labs</div>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <SidebarItem sidebarItem={item} />
                      </li>
                    ))}
                  </ul>
                </li>
                {/* {teams.length > 0 && (
                  <li>
                    <ul role="list" className="space-y-1">
                      {teams.map((team) => (
                        <li key={team.name}>
                          <SidebarItem sidebarItem={team} />
                        </li>
                      ))}
                    </ul>
                  </li>
                )} */}
                <li className="-mx-6 mt-auto">

                </li>
              </ul>
            </nav>
            <div className='flex flex-row justify-center pb-6 w-full'>
              <LangSwitcher />
            </div>       
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-2 shadow-sm sm:px-6 lg:hidden">
          <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6">Nuwa</div>

          <Link href="/me" className="w-10 h-10 bg-zinc-800 rounded-full mx-10">
            <Avatar />
          </Link>
          {/* <div className='mr-4'>
            <LangSwitcher />
          </div> */}
        </div>
      </div>
      <div className='h-20 lg:hidden'></div>
    </>
  )
}
