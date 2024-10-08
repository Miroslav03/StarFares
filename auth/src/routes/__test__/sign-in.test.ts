import request from "supertest";
import { app } from "../../app";

it("Fails when an email that does not exists is supplied", async () => {
    await request(app)
        .post("/api/users/signin")
        .send({ email: "test@gmail.com", password: "password" })
        .expect(400);
});

it("Fails when an incorrect password is supplied", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({ email: "test@gmail.com", password: "password" })
        .expect(201);

    await request(app)
        .post("/api/users/signin")
        .send({ email: "test@gmail.com", password: "123" })
        .expect(400);
});

it("Response with a cookie when given valid credentials", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({ email: "test@gmail.com", password: "password" })
        .expect(201);

    const response = await request(app)
        .post("/api/users/signin")
        .send({ email: "test@gmail.com", password: "password" })
        .expect(200);

    expect(response.get("Set-Cookie")).toBeDefined();
});
