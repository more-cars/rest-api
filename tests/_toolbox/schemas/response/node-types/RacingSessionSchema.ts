export const RacingSessionSchema = {
    type: "object",
    properties: {
        type: {type: ["string"]},
        id: {type: ["integer"]},
        attributes: {
            type: "object",
            properties: {
                name: {type: ["string"]},
                start_date: {type: ["string", "null"]},
                start_time: {type: ["string", "null"]},
                duration: {type: ["number", "null"]},
                duration_unit: {type: ["string", "null"]},
                distance: {type: ["number", "null"]},
                distance_unit: {type: ["string", "null"]},
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
