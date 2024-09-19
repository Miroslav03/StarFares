import mongoose from "mongoose";
import { app } from "./app";

if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined!");
}
mongoose
    .connect("mongodb://auth-mongo-srv:27017/auth")
    .then(() => {
        console.log("DB is connected!");
        app.listen(3000, () => console.log(`Server is listening on port 3000`));
    })
    .catch(() => console.log("Cannot connect DB!"));
