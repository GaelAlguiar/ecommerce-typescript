import prisma from "@/libs/prismadb";

export default async function getOrder() {
  try {
    const order = await prisma.order.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createDate: "desc",
      },
    });

    return order;
  } catch (error: any) {
    throw new Error(error);
  }
}
