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
                },
                required: [
                    "key",
                    "summary",
                    "issuelinks",
                    "labels",
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
