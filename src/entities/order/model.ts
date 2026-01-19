import mongoose, { Model, Schema } from "mongoose"

export interface Order {
    category: string,
    payment: string,
    price: number,
    quantity: number,
    city: string,
    createdAt: Date
}

const OrderSchema = new Schema<Order>({
    category: { type: String, required: true },
    payment: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    city: { type: String, required: true },
    createdAt: { type: Date, required: true },
})

export const OrderModel: Model<Order> = mongoose.models.Order || mongoose.model<Order>("Order", OrderSchema)