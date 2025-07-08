"use server"

import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth";

type ProviderType = "HDFC" | "YesBank" | "AxisBank" | "ICIC" | "BOB" | "UPI";

export default async function CreateOnRampTransaction(provider:ProviderType,amount:number){
    const session = await getServerSession(authOptions);
    if(!session?.user || !session.user.id){
        return {
            message: "Unauthenticated request"
        }
    }
    const token = (Math.floor(Math.random()*1000)).toString();
    const response = await prisma.onRampTransaction.create({
        data:{
            userId:Number(session.user.id),
            token:token,
            provider:provider,
            amount:amount,
            startTime:new Date(),
            status:"Processing"
        }
    })
    return {
        message:"Done"
    }
}