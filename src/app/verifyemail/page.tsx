'use client'

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"


function VerifyEmailPage() {
    // const router = useRouter()

    const [token, setToken]= useState("")
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async ()=>{
        try {
            await axios.post("api/users/verifyemail", {token})
            setVerified(true)
            setError(false)
        } catch (error:any) {
            setError(true)
            console.log(error.response.data)
        }
    }

    useEffect(()=>{
        setError(false)
    const urlToken =  window.location.search.split("=")[1]
    setToken(urlToken || "")

    // const {query} = router
    // const urlTokentwo = query.token
    
    },[])

    useEffect(()=>{
        setError(false)
        if(token.length>0){
            verifyUserEmail()
        }
    }, [token])
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen py-2 ">
        <h1 className="text-4xl">VErify Email</h1>
        <h2 className=" p-2 bg-orange-500 text-black ">
            {token ? `${token}`: "no token"}
        </h2>
        {verified  && (
            <div>
                <h2>Verified</h2>
                <Link href='/login'>Login</Link>
            </div>
        )}
        {error  && (
            <div>
                <h2>Erorr</h2>
            </div>
        )}
      
    </div>
  )
}

export default VerifyEmailPage
