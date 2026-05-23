import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { reservationId } = body;

    const reservation =
      await prisma.reservation.update({
        where: {
          id: reservationId,
        },
        data: {
          status: "CONFIRMED",
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