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
