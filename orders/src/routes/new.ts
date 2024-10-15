import express, { Request, Response } from "express";

const router = express.Router();

router.post("/api/orders", async (req: Request, res: Response) => {
    /* const orders = await Ticket.find({}); */

    /* res.send(orders); */
});

export { router as createOneOrdersRouter };
