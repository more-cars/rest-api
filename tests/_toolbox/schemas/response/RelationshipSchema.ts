export const RelationshipSchema = {
    type: "object",
    properties: {
        links: {
            type: "object",
            properties: {
                self: {type: "string"},
                related: {type: "string"},
            },
            required: [
                "self",
                "related",
            ],
            additionalProperties: false,
        },
        data: {
            type: "object",
            properties: {
                type: {type: "string"},
                id: {type: "integer"},
                attributes: {type: "object"},
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
                "type",
                "id",
                "attributes",
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
        "links",
        "data",
    ],
    additionalProperties: false,
}
