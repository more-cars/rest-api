export const RelationshipSchema = {
    type: "object",
    properties: {
        id: {type: "integer"},
        type: {type: "string"},
        origin: {
            type: "object",
            properties: {
                id: {type: "integer"},
                created_at: {type: "string"},
                updated_at: {type: "string"},
            },
            required: [
                "id",
                "created_at",
                "updated_at",
            ],
        },
        destination: {
            type: "object",
            properties: {
                id: {type: "integer"},
                created_at: {type: "string"},
                updated_at: {type: "string"},
            },
            required: [
                "id",
                "created_at",
                "updated_at",
            ],
        },
        created_at: {type: "string"},
        updated_at: {type: "string"},
    },
    required: [
        "id",
        "type",
        "origin",
        "destination",
        "created_at",
        "updated_at",
    ],
    additionalProperties: false,
}
