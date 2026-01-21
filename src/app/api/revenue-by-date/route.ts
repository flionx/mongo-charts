import { OrderModel } from "@/entities/order/model";
import { connectMongodb } from "@/shared/lib/mongodb";

export async function GET() {
    await connectMongodb();

    const result = await OrderModel.aggregate([
        {
            $group: {
                _id: {
                    $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$createdAt"
                    }
                },
                revenue: {
                    $sum: { $multiply: ["$price", "$quantity"] }
                },
                ordersCount: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                date: "$_id",
                revenue: 1,
                ordersCount: 1
            }
        },
        {
            $sort: { date: 1 }
        }
    ]);

    return Response.json(result)
}