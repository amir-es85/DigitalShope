import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { name, password, email } = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email already exists',
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/register:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create account',
      },
      { status: 500 }
    );
  }
}