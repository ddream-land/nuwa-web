'use client'
import { Link, Spacer } from '@nextui-org/react';



export default function Footer() {

  return (
    <div className='flex flex-row items-center justify-center text-[#B0B0B0] text-xs'>
      <div>©️Copyleft 2024 女娲实验室</div>
      <Spacer x={4} />
      <div>开源协议：AGPL V3</div>
      <Spacer x={4} />
      <Link
        target='_blank'
        href='https://github.com/NuwaLabs/nuwa-web'
        className='text-[#B0B0B0]'
      >开源地址：nuwa.github.com</Link>
    </div>
  )
}
