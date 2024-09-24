import request from "supertest";
import { app } from "../../app";

it("makes a request successfuly without giving 404", async () => {
    const response = await request(app).post("/api/tickets").send({});

    expect(response.status).not.toEqual(404);
});

it("returns a 401 if the user not signed in", async () => {
    await request(app).post("/api/tickets").send({}).expect(401);
});

it("returns a status other than 401 if the user is signed in", async () => {
    const response = await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signup())
        .send({});

    expect(response.status).not.toEqual(401);
});

it("returns an error if invalid title is provided", async () => {
    await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signup())
        .send({
            title: "",
            price: 10,
        })
        .expect(400);

    await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signup())
        .send({
            price: 10,
        })
        .expect(400);
});

it("returns an error if invalid price is provided", async () => {
    await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signup())
        .send({
            title: "title",
            price: -1,
        })
        .expect(400);

    await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signup())
        .send({
            title: "title",
            price: 0,
        })
        .expect(400);
});

it("creates a ticket with valid inputs", async () => {
    //add in a check to make sure a ticket was saved

    await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signup())
        .send({
            title: "title",
            price: 2.5,
        })
        .expect(201);
});
