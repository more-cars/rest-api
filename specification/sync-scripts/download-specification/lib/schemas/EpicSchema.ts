export const EpicSchema = {
    type: "object",
    properties: {
        id: {
            type: "string"
        },
        title: {
            type: "string"
        },
        data_structure: {
            type: ["object", "null"]
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
        "title",
        "data_structure",
        "updated_at",
        "created_at",
    ],
    additionalProperties: false,
}
