export const RacingSessionSchema = {
    type: "object",
    properties: {
        data: {
            type: "object",
            properties: {
                id: {type: ["integer"]},
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
                "id",
                "name",
                "created_at",
                "updated_at",
            ],
        },
    },
    additionalProperties: false,
}
