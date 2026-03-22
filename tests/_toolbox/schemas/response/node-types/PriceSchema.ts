export const PriceSchema = {
    type: "object",
    properties: {
        type: {type: ["string"]},
        id: {type: ["integer"]},
        attributes: {
            type: "object",
            properties: {
                price: {type: ["number"]},
                price_year: {type: ["number"]},
                currency_code: {type: ["string"]},
                country_code: {type: ["string"]},
                created_at: {type: ["string"]},
                updated_at: {type: ["string"]},
            },
            required: [
                "price",
                "price_year",
                "currency_code",
                "country_code",
                "created_at",
                "updated_at",
            ],
            additionalProperties: false,
        },
        links: {
            type: "object",
            properties: {
                self: {type: ["string"]},
            },
        },
    },
    required: [
        "type",
        "id",
        "attributes",
        "links",
    ],
    additionalProperties: false,
}
