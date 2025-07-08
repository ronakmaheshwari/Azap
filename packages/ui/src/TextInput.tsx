"use client"
import React, { ChangeEvent } from "react";

export default function TextInput({onChange,placeHolder,label,type}:{onChange:React.ChangeEventHandler<HTMLInputElement>,placeHolder:string,label:string,type?:string}){
    return(
        <div className="pt-2">
            <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <input onChange={onChange} placeholder={placeHolder} type={type ?? "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
        </div>
    )
}