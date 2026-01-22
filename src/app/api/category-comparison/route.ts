import { OrderModel } from "@/entities/order/model";
import { connectMongodb } from "@/shared/lib/mongodb";

export async function GET() {
  await connectMongodb();

  const data = await OrderModel.aggregate([
    {
      $group: {
        _id: "$category",
        ordersCount: { $sum: 1 },
        revenue: {
          $sum: { $multiply: ["$price", "$quantity"] }
        },
        avgOrder: {
          $avg: { $multiply: ["$price", "$quantity"] }
        }
      }
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        ordersCount: 1,
        revenue: 1,
        avgOrder: { $round: ["$avgOrder", 2] }
      }
    },
    { $sort: { revenue: -1 } }
  ]);

  return Response.json(data);
}
