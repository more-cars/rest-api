export const RatingSchema = {
    type: "object",
    properties: {
        type: {type: ["string"]},
        id: {type: ["integer"]},
        attributes: {
            type: "object",
            properties: {
                rating_value: {type: ["number"]},
                scale_minimum: {type: ["number"]},
                scale_maximum: {type: ["number"]},
                scale_direction: {type: ["string"]},
                created_at: {type: ["string"]},
                updated_at: {type: ["string"]},
            },
            required: [
                "rating_value",
                "scale_minimum",
                "scale_maximum",
                "scale_direction",
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
