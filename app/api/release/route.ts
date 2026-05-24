export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { reservationId } = body;

    const reservation =
      await prisma.reservation.findUnique({
        where: {
          id: reservationId,
        },
      });

    if (!reservation) {
      return Response.json(
        {
          error: "Reservation not found",
        },
        {
          status: 404,
        }
      );
    }

    if (reservation.status === "RELEASED") {
      return Response.json({
        message: "Already released",
      });
    }

    await prisma.inventory.update({
      where: {
        id: reservation.inventoryId,
      },
      data: {
        reservedQuantity: {
          decrement: reservation.quantity,
        },
      },
    });

    const updated =
      await prisma.reservation.update({
        where: {
          id: reservationId,
        },
        data: {
          status: "RELEASED",
        },
      });

    return Response.json(updated);
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