'use client'
import { usePathname, useRouter } from "@/navigation";
import { Tab, Tabs } from "@nextui-org/react";
import { useLocale, useTranslations } from 'next-intl';


export default function Header() {
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  return (
    <>
      <Tabs
        aria-label="Options"         
        selectedKey={locale}
        onSelectionChange={(key) => {
          router.replace(pathname, {locale: key as any});
        }}
        classNames={{
          base: "",
          tabList: "p-2 bg-black rounded-[14px] justify-center",
          
          tab:"w-12 h-6 bg-black rounded-[14px] group-data-[selected=true]:bg-white",
          tabContent: "text-zinc-800 text-white group-data-[selected=true]:text-black",
        }}
      >
          <Tab key={'en'} title="EN" />
          <Tab key={'zh-CN'} title="CN" />
      </Tabs>
    {/* <Link
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
      </Link> */}
    </>
  )
}
