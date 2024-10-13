import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";
import jwt from "jsonwebtoken";
declare global {
    var signup: () => string[];
}

jest.mock("../nats-wrapper");

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = "key";
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
    jest.clearAllMocks();
    const collections = await mongoose.connection.db?.collections();

    for (let collection of collections!) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close();
});

global.signup = () => {
    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: "test@gmail.com",
    };

    const token = jwt.sign(payload, process.env.JWT_KEY!);
    const base64 = Buffer.from(JSON.stringify({ jwt: token })).toString(
        "base64"
    );

    return [`session=${base64}`];
};
