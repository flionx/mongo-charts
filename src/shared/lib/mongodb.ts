import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL as string;

if (!MONGODB_URL) {
    throw Error("MONGODB_URL is not defined");
}

type MongooseCashe = {
    conn: typeof mongoose | null,
    promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: MongooseCashe | undefined;
}

let cached = global.mongoose ?? { conn: null, promise: null };

export async function connectMongodb() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URL, {
            bufferCommands: false
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
} 