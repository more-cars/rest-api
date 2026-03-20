export const ModelCarSchema = {
    type: "object",
    properties: {
        type: {type: ["string"]},
        id: {type: ["integer"]},
        attributes: {
            type: "object",
            properties: {
                name: {type: ["string"]},
                product_code: {type: ["string", "null"]},
                release_year: {type: ["number", "null"]},
                scale: {type: ["string", "null"]},
                series: {type: ["string", "null"]},
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
