export const RelationshipCollectionSchema = {
    type: "object",
    properties: {
        links: {
            type: "object",
            properties: {
                self: {type: "string"},
            },
            required: [
                "self",
            ],
            additionalProperties: false,
        },
        data: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    type: {type: "string"},
                    id: {type: "integer"},
                    attributes: {type: "object"},
                    data: {type: "object"},
                },
                required: [
                    "type",
                    "id",
                    "attributes",
                    "data",
                ],
                additionalProperties: false,
            }
        },
    },
    required: [
        "links",
        "data",
    ],
    additionalProperties: false,
}
