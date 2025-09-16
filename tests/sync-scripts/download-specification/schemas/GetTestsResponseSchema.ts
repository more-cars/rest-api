export const GetTestsResponseSchema = {
    type: "array",
    items: {
        type: "object",
        properties: {
            gherkin: {
                type: "string"
            },
            jira: {
                type: "object",
                properties: {
                    key: {
                        type: "string"
                    },
                    summary: {
                        type: "string"
                    },
                    issuelinks: {
                        type: "array"
                    },
                    labels: {
                        type: "array"
                    },
                    updated: {
                        type: "string"
                    },
                    created: {
                        type: "string"
                    },
                },
                required: [
                    "key",
                    "summary",
                    "issuelinks",
                    "labels",
                    "created",
                    "updated",
                ],
                additionalProperties: false,
            },
        },
        required: [
            "gherkin",
            "jira",
        ],
        additionalProperties: false,
    }
}
