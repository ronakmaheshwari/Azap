import express,{type Request,type Response} from "express"
import morgan, { token } from "morgan";
import dotenv from "dotenv"
import { BankValidator } from "../../../packages/zod/dist";
import db from "@repo/db/client";
import cors from "cors"

dotenv.config();
const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
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
        const token = parsed.data.token
        // const userId = parsed.data.user_identifier
        // const amount = parsed.data.amount
        const tokenCheck = await db.onRampTransaction.findUnique({where:{token:token}});

        if(!tokenCheck){
            return res.status(400).json({
                message:"Invalid Token was provided"
            })
        }

        if (tokenCheck.status === "Success") {
            return res.status(400).json({ message: "Transaction already processed" });
        }
        
        const user = Number(tokenCheck.userId);
        const amt = Number(tokenCheck.amount);
        
        await db.$transaction([
            db.balance.update({
                where:{
                    userId:user
                },
                data:{
                    amount:{
                        increment:amt
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

        return res.status(200).json({
            message: "Transaction processed successfully"
        });

    } catch (error) {
        console.error("Error at HDFC-Bank hook",error);
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
        const token = parsed.data.token
        // const userId = parsed.data.user_identifier
        // const amount = parsed.data.amount
        const tokenCheck = await db.onRampTransaction.findUnique({where:{token:token}});

        if(!tokenCheck){
            return res.status(400).json({
                message:"Invalid Token was provided"
            })
        }

        if (tokenCheck.status === "Success") {
            return res.status(400).json({ message: "Transaction already processed" });
        }
        
        const user = Number(tokenCheck.userId);
        const amt = Number(tokenCheck.amount);
        
        await db.$transaction([
            db.balance.update({
                where:{
                    userId:user
                },
                data:{
                    amount:{
                        increment:amt
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

        return res.status(200).json({
            message: "Transaction processed successfully"
        });

    } catch (error) {
        console.error("Error at ICIC-Bank hook",error);
        res.status(411).json({
            message:"Error while processing webhook"
        })
    }
})

app.post('/yesbank',async(req:any,res:any)=>{
    try {
        const parsed = BankValidator.safeParse(req.body);
        if(!parsed.success){
            return res.status(400).json({
                message:"Invalid inputs were provided",
                error: parsed.error.flatten()
            })
        }
        const token = parsed.data.token
        // const userId = parsed.data.user_identifier
        // const amount = parsed.data.amount
        const tokenCheck = await db.onRampTransaction.findUnique({where:{token:token}});

        if(!tokenCheck){
            return res.status(400).json({
                message:"Invalid Token was provided"
            })
        }

        if (tokenCheck.status === "Success") {
            return res.status(400).json({ message: "Transaction already processed" });
        }
        
        const user = Number(tokenCheck.userId);
        const amt = Number(tokenCheck.amount);
        
        await db.$transaction([
            db.balance.update({
                where:{
                    userId:user
                },
                data:{
                    amount:{
                        increment:amt
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

        return res.status(200).json({
            message: "Transaction processed successfully"
        });

    } catch (error) {
        console.error("Error at Yes-Bank hook",error);
        res.status(411).json({
            message:"Error while processing webhook"
        })
    }
})

app.post('/axisbank',async(req:any,res:any)=>{
    try {
        const parsed = BankValidator.safeParse(req.body);
        if(!parsed.success){
            return res.status(400).json({
                message:"Invalid inputs were provided",
                error: parsed.error.flatten()
            })
        }
        const token = parsed.data.token
        // const userId = parsed.data.user_identifier
        // const amount = parsed.data.amount
        const tokenCheck = await db.onRampTransaction.findUnique({where:{token:token}});

        if(!tokenCheck){
            return res.status(400).json({
                message:"Invalid Token was provided"
            })
        }

        if (tokenCheck.status === "Success") {
            return res.status(400).json({ message: "Transaction already processed" });
        }
        
        const user = Number(tokenCheck.userId);
        const amt = Number(tokenCheck.amount);
        
        await db.$transaction([
            db.balance.update({
                where:{
                    userId:user
                },
                data:{
                    amount:{
                        increment:amt
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

        return res.status(200).json({
            message: "Transaction processed successfully"
        });

    } catch (error) {
        console.error("Error at Axis-Bank hook",error);
        res.status(411).json({
            message:"Error while processing webhook"
        })
    }
})

app.post('/bob',async(req:any,res:any)=>{
    try {
        const parsed = BankValidator.safeParse(req.body);
        if(!parsed.success){
            return res.status(400).json({
                message:"Invalid inputs were provided",
                error: parsed.error.flatten()
            })
        }
        const token = parsed.data.token
        // const userId = parsed.data.user_identifier
        // const amount = parsed.data.amount
        const tokenCheck = await db.onRampTransaction.findUnique({where:{token:token}});

        if(!tokenCheck){
            return res.status(400).json({
                message:"Invalid Token was provided"
            })
        }

        if (tokenCheck.status === "Success") {
            return res.status(400).json({ message: "Transaction already processed" });
        }
        
        const user = Number(tokenCheck.userId);
        const amt = Number(tokenCheck.amount);
        
        await db.$transaction([
            db.balance.update({
                where:{
                    userId:user
                },
                data:{
                    amount:{
                        increment:amt
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

        return res.status(200).json({
            message: "Transaction processed successfully"
        });

    } catch (error) {
        console.error("Error at Bank of Baroda hook",error);
        res.status(411).json({
            message:"Error while processing webhook"
        })
    }
})

app.listen(port,()=>{
    console.log(`Bank WebHook port running on http://localhost:${port}/`)
})