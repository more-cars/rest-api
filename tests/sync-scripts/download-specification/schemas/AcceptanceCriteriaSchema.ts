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
        release_version: {
            type: ["string", "null"]
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
        "release_version",
        "updated_at",
        "created_at",
    ],
    additionalProperties: false,
}
