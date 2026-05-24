export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { inventoryId, quantity } = body;

    if (!inventoryId || !quantity) {
      return Response.json(
        {
          error: "inventoryId and quantity required",
        },
        {
          status: 400,
        }
      );
    }

    const inventory =
      await prisma.inventory.findUnique({
        where: {
          id: inventoryId,
        },
      });

    if (!inventory) {
      return Response.json(
        {
          error: "Inventory not found",
        },
        {
          status: 404,
        }
      );
    }

    const available =
      inventory.totalQuantity -
      inventory.reservedQuantity;

    if (available < quantity) {
      return Response.json(
        {
          error: "Not enough inventory",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.inventory.update({
      where: {
        id: inventoryId,
      },
      data: {
        reservedQuantity: {
          increment: quantity,
        },
      },
    });

    const reservation =
      await prisma.reservation.create({
        data: {
          inventoryId,
          quantity,
          status: "PENDING",
          expiresAt: new Date(
            Date.now() + 15 * 60 * 1000
          ),
        },
      });

    return Response.json(reservation);
  } catch (error: any) {
    return Response.json(
      {
        error: error.message,
      },
      {
        status: 400,
      }
    );
  }
}