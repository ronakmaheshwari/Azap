"use client";

import { Button } from "@repo/ui/button";
import Center from "@repo/ui/center";
import MainCard from "@repo/ui/maincard";
import Select from "@repo/ui/select";
import TextInput from "@repo/ui/textinput";
import { useState } from "react";

export const Supported_Bank = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Yes Bank",
    redirectUrl: "https://www.yesbank.in/digital-banking",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
  {
    name: "ICIC Bank",
    redirectUrl: "https://infinity.icicibank.com/",
  },
];

export default function AddMoneyCard() {
  const [amount, setAmount] = useState<string>("");
  const [redirectUrl, setRedirectUrl] = useState(
    Supported_Bank[0]?.redirectUrl
  );

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
              setRedirectUrl(
                Supported_Bank.find((x) => x.name === value)?.redirectUrl || ""
              );
            }}
            options={Supported_Bank.map((x) => ({
              key: x.name,
              value: x.name,
            }))}
          />
        </div>

        <div className="flex justify-center pt-4">
          <Button
            onClick={() => {
              window.location.href = redirectUrl || "";
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </MainCard>
  );
}
