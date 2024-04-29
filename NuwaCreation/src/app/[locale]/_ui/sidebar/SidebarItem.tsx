'use client'
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export default function SidebarItem({sidebarItem}: {sidebarItem: any}) {
    const t = useTranslations();
  
  return (
      <div className='group/item'>
        <Link
          href={sidebarItem.href}
          className="flex flex-row h-14"
        >
          <div
            className={classNames(
              sidebarItem.current
                ? 'bg-white'
                : 'group-hover/item:bg-white',
              'w-1 h-full mr-8 rounded-r-lg'
            )}
          />
          <div      
            className={classNames(
              sidebarItem.current
                ? 'bg-white text-stone-900'
                : 'text-white hover:text-stone-900 hover:bg-white',
              'group h-full flex items-center gap-x-3 rounded-md text-sm leading-6 font-normal w-60 mr-6 pl-6'
            )}
          >
            {sidebarItem.icon ? (
              <sidebarItem.icon
                className={classNames(
                  sidebarItem.current 
                    ? ' fill-stone-900'
                    : ' fill-white group-hover:fill-stone-900',
                  'h-6 w-6 shrink-0'
                )}
                aria-hidden="true"
              />
            ) : (
              <span
                className={classNames(
                  sidebarItem.name.current
                    ? 'text-white border-indigo-600'
                    : 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 ',
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                )}
              >
                {sidebarItem.initial}
              </span>
            )}
            {t(sidebarItem.name)}
          </div>
        </Link>
      </div>
  )
}
