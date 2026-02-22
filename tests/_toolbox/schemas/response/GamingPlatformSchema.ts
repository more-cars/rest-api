export const GamingPlatformSchema = {
    type: "object",
    properties: {
        data: {
            type: "object",
            properties: {
                id: {type: ["integer"]},
                name: {type: ["string"]},
                release_year: {type: ["number", "null"]},
                manufacturer: {type: ["string", "null"]},
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
