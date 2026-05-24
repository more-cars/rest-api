export const BookSchema = {
    type: "object",
    properties: {
        type: {type: ["string"]},
        id: {type: ["integer"]},
        attributes: {
            type: "object",
            properties: {
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
                "title",
                "created_at",
                "updated_at",
            ],
            additionalProperties: false,
        },
        links: {
            type: "object",
            properties: {
                self: {type: ["string"]},
            },
        },
    },
    required: [
        "type",
        "id",
        "attributes",
        "links",
    ],
    additionalProperties: false,
}
