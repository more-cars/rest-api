export const RelationshipEmptySchema = {
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
            type: "null",
        },
    },
    required: [
        "links",
        "data",
    ],
    additionalProperties: false,
}
