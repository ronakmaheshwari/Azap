"use client";

import { Button } from "@repo/ui/button";
import Center from "@repo/ui/center";
import MainCard from "@repo/ui/maincard";
import Select from "@repo/ui/select";
import TextInput from "@repo/ui/textinput";
import { useState } from "react";
import CreateOnRampTransaction from "../lib/action/createOnrampTransaction";

interface BankSchema {
  key:number,
  name:string,
  provider: ProviderType,
  redirectUrl:string
}

type ProviderType = "HDFC" | "YesBank" | "AxisBank" | "ICIC" | "BOB" | "UPI";

export const Supported_Bank: BankSchema[] = [
  {
    key:0,
    name: "HDFC Bank",
    provider: "HDFC",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    key:1,
    name: "Yes Bank",
    provider: "YesBank",
    redirectUrl: "https://www.yesbank.in/digital-banking",
  },
  {
    key:2,
    name: "Axis Bank",
    provider: "AxisBank",
    redirectUrl: "https://www.axisbank.com/",
  },
  {
    key:3,
    name: "ICIC Bank",
    provider: "ICIC",
    redirectUrl: "https://infinity.icicibank.com/",
  },
  {
    key:4,
    name: "Baroda Bank",
    provider: "BOB",
    redirectUrl: "https://infinity.icicibank.com/",
  },
];

export default function AddMoneyCard() {
  const [amount, setAmount] = useState<string>("");
  const [provider,setProvider] = useState(Supported_Bank[0]?.provider);
  const [redirectUrl, setRedirectUrl] = useState(Supported_Bank[0]?.redirectUrl);

  return (
    <MainCard title="Add Money">
      <div className="w-full space-y-4">
        <TextInput
          label="Amount"
          placeHolder="Amount"
          onChange={(e) => setAmount(e.target.value)}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bank
          </label>
          <Select
            onSelect={(value) => {
              const index = Number(value);
              const result = Supported_Bank[index]
              setRedirectUrl(result?.redirectUrl);
              setProvider(result?.provider);

              // setRedirectUrl(
              //   Supported_Bank.find((x) => x.name === value)?.redirectUrl || ""
              // );
            }}
            options={Supported_Bank.map((x) => ({
              // key: x.name,
              key:x.key,
              value: x.name,
            }))}
          />
        </div>

        <div className="flex justify-center pt-4">
          <Button
            onClick={async() => {
              if (provider) {
                const response = await CreateOnRampTransaction(provider,(Number(amount)*100));        //Actual Way to do it Real Bank API
                
                if (response.redirectUrl) {
                  const popup = window.open(response.redirectUrl,"_blank","width=800,height=600,left=500,top=200")
                  if (popup && !popup.closed) {
                    popup.focus();
                  } else {
                    alert("Please allow popups in your browser.");
                  }
                  
                //  window.location.href = response.redirectUrl;
                }
                
                // await CreateOnRampTransaction(provider, (Number(amount)*100));
                // window.location.href = redirectUrl || ""  // window.open(redirectUrl);
              } else {
                alert("Please select a valid bank provider.");
              }
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </MainCard>
  );
}
