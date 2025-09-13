export const GetEpicsResponseSchema = {
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
                    summary: {
                        type: "string"
                    },
                    customfield_10764: {
                        type: ["object", "null"],
                    },
                    updated: {
                        type: "string"
                    },
                    created: {
                        type: "string"
                    },
                },
                required: [
                    "summary",
                    "customfield_10764",
                    "updated",
                    "created",
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
