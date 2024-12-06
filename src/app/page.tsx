"use client"

import { authenticate, simulateNewAccount } from "@/actions/auth.actions";
import Button from "@/components/button";
import Card from "@/components/card";
import Input from "@/components/input";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleLogin = async () => {
    setIsLoading(true)

    const authenticated = await authenticate({ username, password, rememberMe })
    if (!authenticated.success) {
      setIsLoading(false)
      toast.error(authenticated.message)
      return false;
    }



    toast.success("Authentication successful")

    setTimeout(() => setIsLoading(true), 1000)
  }

  const simulateAccount = async (e?: any) => {
    e && e.preventDefault();

    const done = await simulateNewAccount()
    console.log({ done })
    if (!done.success) { toast.error("Error occurred"); return null }

    toast.success("Complete");
    return null;
  }

  useEffect(() => {
    simulateAccount()
  }, [])

  return (
    <div className="h-screen w-screen flex flex-col justify-center">
      <div className="h-[80%] flex items-center justify-center">
        <Card>
          <div className="text-center font-bold text-2xl lg:text-4xl">
            <h3>Login</h3>
          </div>
          <div className="flex justify-end">
            <Button onclick={() => null} text="Register Now" classes="w-fit rounded-lg bg-none border-2 border-gray-800 px-6 py-1.5 text-sm font-medium" />
          </div>
          <div>
            <Input placeholder="Username" value={username} onchange={setUsername} type="text" />
            <Input placeholder="Password" value={password} onchange={setPassword} type="password" />
          </div>

          <div className="mt-2 flex items-center justify-between">
            <label htmlFor="rememberMe" className="flex items-center gap-x-3 text-md">
              <input type="checkbox" name="remmeberMe" id="rememberMe" />
              <span>
                Remember Me
              </span>
            </label>

            <Link href="#">
              Forgot Password?
            </Link>
          </div>

          <div className="w-full flex items-center justify-center mt-6">
            <Image src="assets/icons/biometric.svg" height={70} width={70} alt="Biometric" />
          </div>

        </Card>
      </div>
      <div className="mt-8">
        <Button isSubmit={true} text="Log in" onclick={handleLogin} isLoading={isLoading} />
      </div>

      {/* <div>
        <button className="p-3 bg-black text-white w-full text-centers mt-4" onClick={() => simulateAccount}>
          Simulate Account
        </button>
      </div> */}
    </div>
  );
}
