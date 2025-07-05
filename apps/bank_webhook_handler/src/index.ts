import express,{type Request,type Response} from "express"
import morgan from "morgan";
import dotenv from "dotenv"
import { BankValidator } from "../../../packages/zod/dist";

dotenv.config();
const app = express();
const port = process.env.PORT || 3002;

app.use(morgan('dev'));
app.use(express.json());

app.post("/hdfc",async(req:any,res:any)=>{
    try {
        const parsed = BankValidator.safeParse(req.body);
        if(!parsed.success){
            return res.status(400).json({
                message:"Invalid inputs were provided",
                error: parsed.error.cause
            })
        }
        const userId = parsed.data.user_identifier;
        const {token,amount} = parsed.data;
        
    } catch (error) {
        console.error("Error at hdfc hook",error);
        res.status(500).json({
            message:"Internal Error occured"
        })
    }
})

app.listen(port,()=>{
    console.log(`Bank WebHook port running on ${port}`)
})