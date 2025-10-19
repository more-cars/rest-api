export const RelationshipSchema = {
    type: "object",
    properties: {
        relationship_id: {type: "integer"},
        relationship_name: {type: "string"},
        relationship_partner: {
            type: "object",
            properties: {
                node_type: {type: "string"},
                data: {type: "object"},
            },
            required: [
                "node_type",
                "data",
            ],
        },
        created_at: {type: "string"},
        updated_at: {type: "string"},
    },
    required: [
        "relationship_id",
        "relationship_name",
        "relationship_partner",
        "created_at",
        "updated_at",
    ],
    additionalProperties: false,
}
