'use client'
import { Link, usePathname } from "@/navigation";
import { useTranslations } from 'next-intl';

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

const teams = [
  { id: 1, name: 'Header.nuwaLabs', href: 'https://www.nuwalabs.org'},
  { id: 2, name: 'Header.roleai', href: 'https://roleai.nuwalabs.org'},
  { id: 3, name: 'Header.BRC-1111', href: 'https://docs.nuwalabs.org'},
]

export default function Header({locale} : {locale: string}) {
  const t = useTranslations();
  const pathname = usePathname();
  return (
    <>
      <div className='flex flex-row justify-end items-center mt-9 mb-7'>
        <div className='flex flex-row text-base font-semibold text-[#7C7C7C]'>
        {teams.map((team) => (
          <Link
            key={team.id}
            target='_blank'
            href={team.href}
            className='ml-8'
          >
            {t(team.name)}
          </Link>
        ))}
        </div>
        <div className='flex flex-row text-black text-center mx-16'>
        <Link
            href={pathname}
            locale='en'
            className={classNames(
              locale === 'en'
                ? 'bg-black text-white'
                : 'border-[#C5C5C5] border-t border-b border-l border-solid',
              'cursor-pointer h-10 w-10 flex items-center justify-center rounded-l-xl'
            )}>
              EN
          </Link>
        <Link
            href={pathname}
            locale='zh-CN'
            className={classNames(
              locale === 'zh-CN'
                ? 'bg-black text-white'
                : 'border-[#C5C5C5] border-t border-b border-r border-solid',
              'cursor-pointer h-10 w-10 flex items-center justify-center rounded-r-xl'
            )}>
              CN
          </Link>
        </div>
      </div>
      <div className='flex flex-row justify-end'>
        <div className="w-9/12 h-px bg-gradient-to-r from-[#E2E2E2]/[.01] to-[#7C7C7C]/[.3] from-0% to-100%" />
      </div>
    </>
  )
}
