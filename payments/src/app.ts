import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { currentUser, errorHandler, NotFoundError } from "@starfares/common";
import { createChargeRouter } from "./routes/new";

const app = express();
app.use(json());
app.use(
    cookieSession({
        signed: false,
    })
);
app.use(currentUser);

app.use(createChargeRouter);

app.all("*", async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
