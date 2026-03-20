export const MagazineIssueSchema = {
    type: "object",
    properties: {
        type: {type: ["string"]},
        id: {type: ["integer"]},
        attributes: {
            type: "object",
            properties: {
                title: {type: ["string"]},
                consecutive_number: {type: ["number", "null"]},
                issue_number: {type: ["number", "null"]},
                issue_year: {type: ["number", "null"]},
                release_date: {type: ["string", "null"]},
                single_copy_price: {type: ["number", "null"]},
                single_copy_price_unit: {type: ["string", "null"]},
                pages: {type: ["number", "null"]},
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
    },
    required: [
        "type",
        "id",
        "attributes",
    ],
    additionalProperties: false,
}
