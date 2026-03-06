export const RatingSchema = {
    type: "object",
    properties: {
        type: {type: ["string"]},
        id: {type: ["integer"]},
        attributes: {
            type: "object",
            properties: {
                id: {type: ["integer"]},
                rating_value: {type: ["number"]},
                scale_minimum: {type: ["number"]},
                scale_maximum: {type: ["number"]},
                scale_direction: {type: ["string"]},
                created_at: {type: ["string"]},
                updated_at: {type: ["string"]},
            },
            required: [
                "id",
                "rating_value",
                "scale_minimum",
                "scale_maximum",
                "scale_direction",
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
