export const GetAcceptanceCriteriaResponseSchema = {
    type: "array",
    items: {
        type: "object",
        properties: {
            key: {
                type: "string"
            },
            fields: {
                type: "object",
                properties: {
                    parent: {
                        type: "object",
                    },
                    summary: {
                        type: "string",
                    },
                    description: {
                        type: ["object", "null"],
                    },
                    fixVersions: {
                        type: ["array"],
                    },
                    updated: {
                        type: "string"
                    },
                    created: {
                        type: "string"
                    },
                },
                required: [
                    "parent",
                    "summary",
                    "description",
                    "fixVersions",
                    "created",
                    "updated",
                ],
                additionalProperties: false,
            },
        },
        required: [
            "key",
            "fields",
        ],
        additionalProperties: true,
    },
}
