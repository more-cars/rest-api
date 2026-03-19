export const ModelCarSchema = {
    type: "object",
    properties: {
        node_type: {type: ["string"]},
        properties: {
            type: "object",
            properties: {
                id: {type: ["integer"]},
                name: {type: ["string"]},
                product_code: {type: ["string", "null"]},
                release_year: {type: ["number", "null"]},
                scale: {type: ["string", "null"]},
                series: {type: ["string", "null"]},
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
