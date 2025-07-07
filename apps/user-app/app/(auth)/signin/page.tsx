"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Signin() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")

  const handleSignin = async () => {
    try {
      const result = await signIn("credentials", {
        redirect: true,
        callbackUrl: "/dashboard",
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
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex w-full max-w-4xl rounded-2xl shadow-lg overflow-hidden bg-white">
        <div className="hidden md:flex w-1/2 flex-col items-center justify-center bg-neutral-900 text-white px-8 py-10">
          <h1 className="text-3xl font-bold text-center mb-4">
            Welcome Back 👋 <br /> to Paylane
          </h1>
          <p className="text-md text-gray-300 italic text-center">
            Your trusted path to payments
          </p>
        </div>
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Sign in to your account
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
            <input
              type="text"
              placeholder="Phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <button
            className="mt-6 w-full py-2 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md transition-colors"
            onClick={handleSignin}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  )
}
