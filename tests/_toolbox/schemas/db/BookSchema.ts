export const BookSchema = {
    type: "object",
    properties: {
        node_type: {type: ["string"]},
        properties: {
            type: "object",
            properties: {
                id: {type: ["integer"]},
                title: {type: ["string"]},
                author: {type: ["string", "null"]},
                publisher: {type: ["string", "null"]},
                year_of_publication: {type: ["number", "null"]},
                isbn: {type: ["string", "null"]},
                pages: {type: ["number", "null"]},
                language: {type: ["string", "null"]},
                created_at: {type: ["string"]},
                updated_at: {type: ["string"]},
            },
            required: [
                "id",
                "title",
                "created_at",
                "updated_at",
            ],
        },
    },
    additionalProperties: false,
}
