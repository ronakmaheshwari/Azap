"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export default async function P2PTransaction(to:string,amount:number) {
    try {
        const session = await getServerSession(authOptions);
        if(!session || !session.user.id){
            return{
                message: "Error while sending"
            }
        }
        const Fromuser = Number(session.user.id);
        const FindTouser = await prisma.user.findUnique({where:{number:to}})
        if(!FindTouser){
            return{
                message: "Cannot find User to send the money"
            }
        }
        await prisma.$transaction(async(t)=>{
            await t.$queryRaw`SELECT * FROM "Balance" where "userId"=${Fromuser} FOR UPDATE`;
            const FromBalance = await t.balance.findUnique({where:{id:Fromuser}});

            if(!FromBalance || FromBalance.amount < amount){
                throw new Error('Insufficient funds');
            }
            await t.balance.update({where:{userId:Fromuser},data:{amount:{decrement:amount}}});

            await t.balance.update({
                where: { userId: Number(FindTouser.id) },
                data: { amount: { increment: amount } }
            })

            await t.offRampTransaction.create({
                data:{
                    senderId:Fromuser,
                    receiverId:Number(FindTouser.id),
                    amount:amount,
                    status:"Success",
                    startTime:new Date(),
                    type:"Sent"
                }
            })
        })
    } catch (error) {
        console.error("Error at P2PTransaction",error);
    }
}