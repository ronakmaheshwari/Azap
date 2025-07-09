"use client"
import React from "react";
import { usePathname, useRouter } from "next/navigation";

export default function SidebarItem({href,title,icon}:{href:string,title:string,icon:React.ReactNode}){
    const router = useRouter()
    const pathname = usePathname()
    const selected = pathname === href

    return(
        <div className={`flex ${selected ? "text-[#6a51a6] bg-zinc-100" : "text-slate-500"} cursor-pointer rounded-md p-2 pl-8`} onClick={()=>{
            router.push(href)        
        }}>
            <div className="pr-2">
                {icon}
            </div>
            <div className={`font-bold ${selected ? "text-[#6a51a6]" : "text-slate-500"}`} >
                {title}
            </div>
        </div>
    )
}