
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from "bcryptjs"

export async function POST(req:Request) {
    
    const {name,password,email}= await req.json()
const existingUser = await prisma.user.findUnique({
    where:{
        email
    }
})
if(existingUser){
    return NextResponse.json(
        { error: 'Email already exists' },
      { status: 400 }
    )
}
const hashedPassword = await bcrypt.hash(password,10)
const user = await prisma.user.create({
    data:{
        name,
        email,
        password:hashedPassword
    }
})
 return NextResponse.json(user)
}
