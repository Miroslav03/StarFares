import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { currentUser, errorHandler, NotFoundError } from "@starfares/common";

import { getAllOrdersRouter } from "./routes/get-all";
import { getOneOrdersRouter } from "./routes/get-one";
import { createOneOrdersRouter } from "./routes/new";
import { deleteOneOrdersRouter } from "./routes/delete";

const app = express();
app.use(json());
app.use(
    cookieSession({
        signed: false,
    })
);
app.use(currentUser);

app.use(getAllOrdersRouter);
app.use(getOneOrdersRouter);
app.use(createOneOrdersRouter);
app.use(deleteOneOrdersRouter);

app.all("*", async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
