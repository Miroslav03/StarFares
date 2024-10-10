import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";

if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined!");
}

if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined!");
}

const start = async () => {
    await natsWrapper.connect("ticketing", "das", "http://nats-srv:4222");
    natsWrapper.client.on("close", () => {
        console.log("NATS connection closed!");
        process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());
    
    await mongoose
        .connect(process.env.MONGO_URI!)
        .then(() => {
            console.log("DB is connected!");
            app.listen(3000, () =>
                console.log(`Server is listening on port 3000`)
            );
        })
        .catch(() => console.log("Cannot connect DB!"));
};

start();
