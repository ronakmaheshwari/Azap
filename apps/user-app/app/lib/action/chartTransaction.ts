"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export default async function ChartBalance(){
    try {
        const session = await getServerSession(authOptions);

        if(!session?.user || !session.user.id){
            return {
                message: "Unauthenticated request"
            }
        }
        const result = await prisma.onRampTransaction.groupBy({
            by:['provider'],
            where:{
                status:"Success",
                userId:Number(session.user.id)
            },
            _count:{
                provider:true
            }
        })
        return result;
    } catch (error) {
        return { message: "Failed to fetch chart data" };
    }
}