"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export default async function SentOffRamp() {
    try {
        const session = await getServerSession(authOptions)
        const userId = session?.user.id;
        const result = await prisma.offRampTransaction.findMany({
            where:{
                senderId:Number(userId),
            },
            include: { receiver: true }
        })
        return result 
    } catch (error) {
        console.error("Error At GetSession transactions",error)
    }
}