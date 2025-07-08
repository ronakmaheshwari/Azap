"use client"

import { Button } from "@repo/ui/button";
import MainCard from "@repo/ui/maincard";
import TextInput from "@repo/ui/textinput";
import { useState } from "react";

export default function SendCard(){
    const [number,setNumber] = useState("");
    const [amount,setAmount] = useState("");
    const handleSubmission = async()=>{

    }
    return(
        <MainCard title="Send Money">
            <div className="w-80 h-full">
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