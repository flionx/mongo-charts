import dotenv from "dotenv";
dotenv.config();
import { OrderModel } from "../src/entities/order/model";
import { connectMongodb } from "../src/shared/lib/mongodb";
import { faker } from "@faker-js/faker"

const categories = ["Food", "Clothes", "Books", "Beauty"];
const payments = ["Cash", "Card"];

const generateData = async () => {
    await connectMongodb();

    const data = [];

    for (let i = 0; i < 2000; i++) {
        data.push({
            productId: faker.string.uuid(),
            category: faker.helpers.arrayElement(categories),
            payment: faker.helpers.arrayElement(payments),
            price: faker.number.int({ min: 5, max: 500}),
            quantity: faker.number.int({ min: 1, max: 20}),
            city: faker.location.city(),
            createdAt: faker.date.recent({ days: 30 })
        })
    }
    
    await OrderModel.insertMany(data);
    console.log(`Inserted ${data.length} orders`);
}

generateData();