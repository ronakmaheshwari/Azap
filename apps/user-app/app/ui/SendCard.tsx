"use client"

import { Button } from "@repo/ui/button";
import MainCard from "@repo/ui/maincard";
import TextInput from "@repo/ui/textinput";
import { useState } from "react";
import P2PTransaction from "../lib/action/p2pTransfer";


export default function SendCard(){
    const [number,setNumber] = useState("");
    const [amount,setAmount] = useState("");
    const handleSubmission = async()=>{
        const response = await P2PTransaction(number,(Number(amount)*100));
    }
    return(
        <MainCard title="Send Money">
            <div className="w-full h-full">
                <div className="w-full space-y-4">
                    <TextInput label="Phone Number" placeHolder="Enter the number" onChange={(e)=>{setNumber(e.target.value)}} />
                    <TextInput label="Amount" placeHolder="Enter the amount" onChange={(e)=>{setAmount(e.target.value)}} />
                </div>
                <div className="flex justify-center pt-4">
                    <Button onClick={()=>{handleSubmission()}}>
                        Send
                    </Button>
                </div>
            </div>
        </MainCard>
    )
}