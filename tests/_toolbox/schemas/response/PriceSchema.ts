export const PriceSchema = {
    type: "object",
    properties: {
        type: {type: ["string"]},
        id: {type: ["integer"]},
        attributes: {
            type: "object",
            properties: {
                price: {type: ["number"]},
                currency_code: {type: ["string"]},
                country_code: {type: ["string"]},
                created_at: {type: ["string"]},
                updated_at: {type: ["string"]},
            },
            required: [
                "price",
                "currency_code",
                "country_code",
                "created_at",
                "updated_at",
            ],
            additionalProperties: false,
        },
    },
    required: [
        "type",
        "id",
        "attributes",
    ],
    additionalProperties: false,
}
