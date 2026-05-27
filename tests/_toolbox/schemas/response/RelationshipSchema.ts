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
            },
            required: [
                "type",
                "id",
                "attributes",
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
