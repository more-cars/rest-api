export const BrandSchema = {
    type: "object",
    properties: {
        node_type: {type: "string"},
        properties: {
            type: "object",
            properties: {
                id: {type: "integer"},
                name: {type: "string"},
                full_name: {type: ["string", "null"]},
                founded: {type: ["integer", "null"]},
                defunct: {type: ["integer", "null"]},
                wmi: {type: ["string", "null"]},
                hsn: {type: ["string", "null"]},
                created_at: {type: "string"},
                updated_at: {type: "string"},
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
