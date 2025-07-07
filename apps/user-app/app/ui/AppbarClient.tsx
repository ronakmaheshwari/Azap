"use client"

import { Appbar } from "@repo/ui/appbar"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function AppbarClient(){
    const session = useSession();
    const router = useRouter();
    return(
        <div>
            <Appbar 
                onSignin={signIn} 
                onSignout={async()=>{
                    await signOut()
                    router.push('/signin')
                }} 
                user={session.data?.user ? {name:session.data.user.name} : undefined}
            />
        </div>
    )
}