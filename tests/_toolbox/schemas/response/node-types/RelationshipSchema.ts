export const RelationshipSchema = {
    type: "object",
    properties: {
        data: {
            type: "object",
            properties: {
                relationship_id: {type: "integer"},
                relationship_name: {type: "string"},
                start_node: {
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
                partner_node: {
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
                "start_node",
                "partner_node",
                "created_at",
                "updated_at",
            ],
            additionalProperties: false,
        },
    },
    required: [
        "data",
    ],
    additionalProperties: false,
}
