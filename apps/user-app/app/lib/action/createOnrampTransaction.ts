"use server"

import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth";
import { v4 as uuidv4 } from 'uuid';

type ProviderType = "HDFC" | "YesBank" | "AxisBank" | "ICIC" | "BOB" | "UPI";

function getBankRedirectUrl(provider: string): string {
  switch (provider) {
    case "HDFC":
      return "http://localhost:5173/bank/hdfc";
    case "YesBank":
      return "http://localhost:5173/bank/yesbank";
    case "AxisBank":
      return "http://localhost:5173/bank/axisbank";
    case "ICIC":
      return "http://localhost:5173/bank/icic";
    case "BOB":
      return "http://localhost:5173/bank/bob";
    default:
      return "/";
  }
}

export default async function CreateOnRampTransaction(provider:ProviderType,amount:number){
    const session = await getServerSession(authOptions);
    if(!session?.user || !session.user.id){
        return {
            message: "Unauthenticated request"
        }
    }

    const token = uuidv4();
    const redirectBase = getBankRedirectUrl(provider);     //Actual way to do it 
    const redirectUrl = `${redirectBase}?token=${token}&amount=${amount}`;
    
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

    return { token, redirectUrl };
    // return {
    //     message:"Done"
    // }
}