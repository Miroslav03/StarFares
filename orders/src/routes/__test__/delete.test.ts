import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/Ticket";
import { Order } from "../../models/Order";
import { OrderStatus } from "@starfares/common";

it("Successfully cancels an order", async () => {
    const user = global.signup();

    const ticket = Ticket.build({
        title: "test",
        price: 20,
    });
    await ticket.save();

    const { body: order } = await request(app)
        .post(`/api/orders`)
        .set("Cookie", user)
        .send({ ticketId: ticket.id })
        .expect(201);

    await request(app)
        .delete(`/api/orders/${order.id}`)
        .set("Cookie", user)
        .expect(204);

    const updatedOrder = await Order.findById(order.id);
    expect(updatedOrder?.status).toEqual(OrderStatus.Cancelled);
});
