'use client'
import { Link } from "@/navigation";
import { useTranslations } from 'next-intl';
import LangSwitcher from "./sidebar/LangSwitcher";
import { Avatar } from "@nextui-org/react";

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

const teams = [
  { id: 1, name: 'Header.nuwaLabs', href: 'https://www.nuwalabs.org'},
  { id: 2, name: 'Header.roleai', href: 'https://roleai.nuwalabs.org'},
  { id: 3, name: 'Header.BRC-1111', href: 'https://docs.nuwalabs.org'},
]

export default function Header() {
  const t = useTranslations();
  return (
    <div className="lg:block hidden w-full">
      <div className="fixed top-0 left-0 z-40 bg-white w-full">
        <div className='flex flex-row justify-end items-center h-16'>
          <div className='flex-row text-base text-[#7C7C7C] hidden lg:flex'>
          {teams.map((team) => (
            <Link
              key={team.id}
              target='_blank'
              href={team.href}
              className='ml-8 hover:text-neutral-950 hover:font-semibold'
            >
              {t(team.name)}
            </Link>
          ))}
          </div>
          {/* <div className='flex flex-row text-black text-center mx-16'>
            <LangSwitcher />
          </div> */}
          <Link href="/me" className="w-10 h-10 bg-zinc-800 rounded-full mx-10">
            <Avatar />
          </Link>
        </div>
        <div className='flex flex-row justify-end'>
          <div className="w-9/12 h-px bg-gradient-to-r from-[#E2E2E2]/[.01] to-[#7C7C7C]/[.3] from-0% to-100%" />
        </div>
      </div>
      <div className="h-16">

      </div>
    </div>
  )
}
