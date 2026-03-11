export const MotorShowSchema = {
    type: "object",
    properties: {
        node_type: {type: ["string"]},
        properties: {
            type: "object",
            properties: {
                id: {type: ["integer"]},
                name: {type: ["string"]},
                date_from: {type: ["string", "null"]},
                date_until: {type: ["string", "null"]},
                location: {type: ["string", "null"]},
                target_audience: {type: ["string", "null"]},
                focus: {type: ["string", "null"]},
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
