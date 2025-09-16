export const GetStoriesResponseSchema = {
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
                    customfield_10691: {
                        type: ["object", "null"],
                    },
                    customfield_10732: {
                        type: ["object", "null"],
                    },
                    customfield_10731: {
                        type: ["string", "null"],
                    },
                    customfield_10767: {
                        type: ["array", "null"],
                    },
                    fixVersions: {
                        type: ["array", "null"],
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
                    "customfield_10691",
                    "customfield_10732",
                    "customfield_10731",
                    "customfield_10767",
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
