"use client"

import type React from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import TextInput from "@repo/ui/textinput"
import { Button } from "@repo/ui/button"


export default function Signin() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSignin = async () => {
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        redirect: false,
        username,
        phone,
        password,
      })

      if (result?.error) {
        console.error("Login failed:", result.error)
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Error at HandleFunction", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
      <div className="flex w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden bg-white">
        
        <div className="hidden md:flex w-1/2 flex-col items-center justify-center bg-gray-900 text-white px-8 py-10">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">
              Welcome Back 👋
              <br />
              to Paylane
            </h1>
            <p className="text-lg text-gray-300 italic">Your trusted path to payments</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-gray-900">Sign in to your account</h2>
              <p className="text-sm text-gray-600">Enter your credentials to access your account</p>
            </div>

            <form onSubmit={handleSignin} className="space-y-4">
              <div className="space-y-2">
              
                <TextInput
                  label="Username"
                  placeHolder="Enter the username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <TextInput
                  label="Phone"
                  placeHolder="Enter your phone number"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <TextInput
                  type="password"
                  label="Password"
                  placeHolder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button className="w-full" onClick={handleSignin}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="text-center">
              {/* <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a href="/signup" className="font-medium text-gray-900 hover:underline">
                  Sign up
                </a>
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
