"use client"

import { useRouter } from "next/navigation"

const LoginPage = () => {
  const router = useRouter()

  return (
    <div>
      <h1> LoginPage </h1>
      <button onClick={() => router.push("/")}> Back </button>
    </div>
  )
}

export default LoginPage