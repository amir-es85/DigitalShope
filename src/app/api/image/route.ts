
import { mkdir, writeFile } from "fs/promises";

import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { prisma } from './../../../lib/prisma';
import { revalidatePath } from "next/cache";

export async function POST(req:NextRequest) {
    const formdata =await req.formData()
    const file = formdata.get("file") as File
    const id = formdata.get("id") as string
    if(!id||!file){
        
        return NextResponse.json({
            error:"no"
        },{status:400})
    }else{
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const uploadeDir= path.join(process.cwd(),"/public/assets",id)
        await mkdir(uploadeDir,{recursive:true});
        const filePath=path.join(uploadeDir,file.name)
        await writeFile(filePath,buffer)
        const fileurl = `/assets/${id}/${file.name}`
       const updateproduct= await prisma.product.update({
            where:{id :id},
            data:{
                images:{
                    create:{image:fileurl}
                }
            },
            include:{images:true}
        })
return NextResponse.json({
    data:updateproduct,
    Message:"yes"
})
    }
}
export async function GET(req:NextRequest) {
    const {searchParams}= new URL(req.url)
    const productid = searchParams.get("productid")
    if(!productid){
        return NextResponse.json({
            error:"not"
        },{status:400})
    }else{
        const images = await prisma.image.findMany({
            where:{productid:productid}
        })
        revalidatePath(`/dashbord/products/${productid}`);
        return NextResponse.json(images)
    }
    
}
export async function DELETE(req:NextRequest) {
    const {searchParams}=new URL(req.url)
    const imageid=searchParams.get("imageid")
    if (!imageid)return NextResponse.json({
        error:"no image id"
    },{status:400})
    const image = await prisma.image.delete({
        where:{id:imageid}
    })
}