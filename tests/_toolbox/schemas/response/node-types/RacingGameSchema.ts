export const RacingGameSchema = {
    type: "object",
    properties: {
        type: {type: ["string"]},
        id: {type: ["integer"]},
        attributes: {
            type: "object",
            properties: {
                name: {type: ["string"]},
                release_year: {type: ["number", "null"]},
                developer: {type: ["string", "null"]},
                publisher: {type: ["string", "null"]},
                created_at: {type: ["string"]},
                updated_at: {type: ["string"]},
            },
            required: [
                "name",
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
