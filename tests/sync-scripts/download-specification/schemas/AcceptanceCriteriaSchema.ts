export const AcceptanceCriteriaSchema = {
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
        description: {
            type: "string"
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
        "description",
        "updated_at",
        "created_at",
    ],
    additionalProperties: false,
}
