export const TestSchema = {
    type: "object",
    properties: {
        id: {
            type: "string"
        },
        parent_id: {
            type: "string"
        },
        title: {
            type: "string"
        },
        gherkin: {
            type: "string"
        },
        labels: {
            type: "array"
        },
        updated_at: {
            type: "string"
        },
        created_at: {
            type: "string"
        },
    },
    required: [
        "id",
        "parent_id",
        "title",
        "gherkin",
        "labels",
        "updated_at",
        "created_at",
    ],
    additionalProperties: false,
}
