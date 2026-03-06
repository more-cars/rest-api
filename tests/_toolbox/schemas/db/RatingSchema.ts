export const RatingSchema = {
    type: "object",
    properties: {
        node_type: {type: ["string"]},
        properties: {
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
        },
    },
    additionalProperties: false,
}
