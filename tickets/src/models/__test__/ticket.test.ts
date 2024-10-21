import { Ticket } from "../Ticket";

it("Adds a concurrency controll", async () => {
    const ticket = Ticket.build({
        userId: "12453",
        title: "test",
        price: 20,
    });

    await ticket.save();

    const firstInstance = await Ticket.findById(ticket.id);
    const secondInstance = await Ticket.findById(ticket.id);

    firstInstance?.set({ title: "test1" });
    secondInstance?.set({ price: 14 });

    await firstInstance?.save();

    try {
        await secondInstance?.save();
    } catch (err) {
        return;
    }

    throw new Error("Should not reach this point");
});

it("Increments the version number on saves", async () => {
    const ticket = Ticket.build({
        userId: "12453",
        title: "test",
        price: 20,
    });

    await ticket.save();
    expect(ticket.version).toEqual(0);
    await ticket.save();
    expect(ticket.version).toEqual(1);
    await ticket.save();
    expect(ticket.version).toEqual(2);
    await ticket.save();
    expect(ticket.version).toEqual(3);
});
