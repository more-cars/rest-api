export const StorySchema = {
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
        user_story: {
            type: "string"
        },
        api_verb: {
            type: ["string", "null"],
        },
        api_path: {
            type: ["string", "null"],
        },
        response_options: {
            type: "array"
        },
        description: {
            type: "string"
        },
        release_versions: {
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
        "user_story",
        "api_verb",
        "api_path",
        "response_options",
        "description",
        "release_versions",
        "updated_at",
        "created_at",
    ],
    additionalProperties: false,
}
