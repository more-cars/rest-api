export const CarModelSchema = {
    type: "object",
    properties: {
        data: {
            type: "object",
            properties: {
                id: {type: ["integer"]},
                name: {type: ["string"]},
                built_from: {type: ["integer", "null"]},
                built_to: {type: ["integer", "null"]},
                generation: {type: ["integer", "null"]},
                internal_code: {type: ["string", "null"]},
                total_production: {type: ["integer", "null"]},
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
