import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '../../../../auth';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    const userid = session?.user?.id;
    if (userid) {
      const cartitem = await prisma.cart.findMany({
        where: { userid },
        include: { product: true },
      });
      return NextResponse.json(cartitem);
    }
    return NextResponse.json([]);
  } catch (error) {
    console.error('Error in GET /api/cart:', error);
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const userid = session?.user?.id;
    if (!userid) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }
    const { productid } = await req.json();
    if (!productid) {
      return NextResponse.json({ error: 'productid is required' }, { status: 400 });
    }
    const existingCartItem = await prisma.cart.findFirst({
      where: { productid, userid },
    });
    if (existingCartItem) {
      const updateCartitem = await prisma.cart.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + 1 },
      });
      return NextResponse.json(updateCartitem);
    }
    const newcartitem = await prisma.cart.create({
      data: {
        userid,
        productid,
        quantity: 1,
      },
    });
    return NextResponse.json(newcartitem);
  } catch (error) {
    console.error('Error in POST /api/cart:', error);
    return NextResponse.json({ error: 'Failed to add item to cart' }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest) {
  const session = await auth();
  const userid = session?.user?.id;
  if (!userid) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { productid } = await req.json();
  const ExistingCartIrem = await prisma.cart.findFirst({
    where: { productid, userid },
  });
  if (!ExistingCartIrem) {
    return NextResponse.json({ error: 'cart item dose not exist' }, { status: 400 });
  }

  if (ExistingCartIrem) {
    const deleteditem = await prisma.cart.delete({
      where: { id: ExistingCartIrem.id },
    });
    return NextResponse.json(deleteditem);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    const userid = session?.user?.id;

    if (!userid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { productid, action } = await req.json();

    if (!productid || !action) {
      return NextResponse.json({ error: 'productid and action are required' }, { status: 400 });
    }

    if (action !== 'increase' && action !== 'decrease') {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const cartItem = await prisma.cart.findFirst({
      where: {
        productid,
        userid,
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item does not exist' }, { status: 404 });
    }

    if (action === 'increase') {
      const updatedItem = await prisma.cart.update({
        where: {
          id: cartItem.id,
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });

      return NextResponse.json(updatedItem);
    }

    if (cartItem.quantity === 1) {
      return NextResponse.json({ error: 'Quantity cannot be less than 1' }, { status: 400 });
    }

    const updatedItem = await prisma.cart.update({
      where: {
        id: cartItem.id,
      },
      data: {
        quantity: {
          decrement: 1,
        },
      },
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('Error in PATCH /api/cart:', error);

    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 });
  }
}
