import { connect } from "@/dbConfig/dbconfig";
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()


export async function POST(request:NextRequest){

    //extract data from token
    const userId = await getDataFromToken(request)
    const user = await User.findOne({_id:userId}).select("-password")
    //check if there is no user
    return NextResponse.json({
        message:"User found",
        data:user,
    })
}