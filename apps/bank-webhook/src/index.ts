import express,{type Request,type Response} from "express"
import morgan, { token } from "morgan";
import dotenv from "dotenv"
import { BankValidator } from "../../../packages/zod/dist";
import db from "@repo/db/client";

dotenv.config();
const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());
app.use(morgan('dev'));

app.post("/hdfc",async(req:any,res:any)=>{
    try {
        const parsed = BankValidator.safeParse(req.body);

        if(!parsed.success){
            return res.status(400).json({
                message:"Invalid inputs were provided",
                error: parsed.error.flatten()
            })
        }

        const userId = Number(parsed.data.user_identifier);
        const amount = Number(parsed.data.amount);
        const token = parsed.data.token;

        await db.$transaction([
                db.balance.update({
                    where:{
                        userId
                    },
                    data:{
                        amount:{
                            increment:amount
                        }
                    }
                }),
                db.onRampTransaction.update({
                    where:{
                        token:token
                    },
                    data:{
                        status:"Success"
                    }
                })
        ])

        res.status(200).json({
            message:"Captured"
        })
    } catch (error) {
        console.error("Error at hdfc hook",error);
        res.status(411).json({
            message:"Error while processing webhook"
        })
    }
})

app.post("/icic",async(req:any,res:any)=>{
    try {
        const parsed = BankValidator.safeParse(req.body);
        if(!parsed.success){
            return res.status(400).json({
                message:"Invalid inputs were provided",
                error: parsed.error.flatten()
            })
        }
        const userId = parsed.data.user_identifier
        const amount = parsed.data.amount
        const token = parsed.data.token
        
        await db.$transaction([
            db.balance.update({
                where:{
                    userId
                },
                data:{
                    amount:{
                        increment:amount
                    }
                }
            }),
            db.onRampTransaction.update({
                where:{
                    token
                },
                data:{
                    status:"Success"
                }
            })
        ])
        res.status(200).json({
            message:"Captured"
        })
    } catch (error) {
        console.error("Error at hdfc hook",error);
        res.status(411).json({
            message:"Error while processing webhook"
        })
    }
})

app.listen(port,()=>{
    console.log(`Bank WebHook port running on http://localhost:${port}/`)
})