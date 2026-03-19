export const PriceSchema = {
    type: "object",
    properties: {
        node_type: {type: ["string"]},
        properties: {
            type: "object",
            properties: {
                id: {type: ["integer"]},
                price: {type: ["number"]},
                currency_code: {type: ["string"]},
                country_code: {type: ["string"]},
                created_at: {type: ["string"]},
                updated_at: {type: ["string"]},
            },
            required: [
                "id",
                "price",
                "currency_code",
                "country_code",
                "created_at",
                "updated_at",
            ],
        },
    },
    additionalProperties: false,
}
