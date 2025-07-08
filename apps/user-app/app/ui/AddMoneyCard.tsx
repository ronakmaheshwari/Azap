"use client";

import { Button } from "@repo/ui/button";
import Center from "@repo/ui/center";
import MainCard from "@repo/ui/maincard";
import Select from "@repo/ui/select";
import TextInput from "@repo/ui/textinput";
import { useState } from "react";
import CreateOnRampTransaction from "../lib/action/createOnrampTransaction";

interface BankSchema {
  name:string,
  provider: ProviderType,
  redirectUrl:string
}

type ProviderType = "HDFC" | "YesBank" | "AxisBank" | "ICIC" | "BOB" | "UPI";

export const Supported_Bank: BankSchema[] = [
  {
    name: "HDFC Bank",
    provider: "HDFC",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Yes Bank",
    provider: "YesBank",
    redirectUrl: "https://www.yesbank.in/digital-banking",
  },
  {
    name: "Axis Bank",
    provider: "AxisBank",
    redirectUrl: "https://www.axisbank.com/",
  },
  {
    name: "ICIC Bank",
    provider: "ICIC",
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
            options={Supported_Bank.map((x,index) => ({
              // key: x.name,
              key:index,
              value: x.name,
            }))}
          />
        </div>

        <div className="flex justify-center pt-4">
          <Button
            onClick={async() => {
              if (provider) {
                await CreateOnRampTransaction(provider, (Number(amount)*100));
                window.location.href = redirectUrl || ""
                // window.open(redirectUrl);
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
