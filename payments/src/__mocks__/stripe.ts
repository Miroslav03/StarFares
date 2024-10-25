export const stripe = {
    charges: {
        create: jest.fn().mockReturnValue({
            id: "some_stripe_id",
        }),
    },
};
