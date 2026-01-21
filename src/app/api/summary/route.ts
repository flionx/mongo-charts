import { OrderModel } from "@/entities/order/model";
import { connectMongodb } from "@/shared/lib/mongodb";

export async function GET() {
    await connectMongodb();
    
    const result = await OrderModel.aggregate([
        {
            $group: {
                _id: null,
                ordersCount: { $sum: 1 },
                revenue: {
                    $sum: { $multiply: ["$price", "$quantity"] }
                },
                avgOrder: {
                    $avg: { $multiply: ["$price", "$quantity"] }
                },
                cities: { $addToSet: "$city" }
            }
        },
        {
            $project: {
                _id: 0,
                ordersCount: 1,
                revenue: 1,
                avgOrder: { $round: ["$avgOrder", 2] },
                citiesCount: { $size: "$cities" }
            }
        }
    ]);

    const data = result[0];

    return Response.json(data);
}