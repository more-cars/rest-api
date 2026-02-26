export const MagazineSchema = {
    type: "object",
    properties: {
        node_type: {type: "string"},
        properties: {
            type: "object",
            properties: {
                id: {type: ["integer"]},
                name: {type: ["string",]},
                founded: {type: ["number", "null",]},
                defunct: {type: ["number", "null",]},
                focus: {type: ["string", "null",]},
                publication_frequency: {type: ["string", "null",]},
                single_copy_price: {type: ["number", "null",]},
                single_copy_price_unit: {type: ["string", "null",]},
                publication_format: {type: ["string", "null",]},
                circulation: {type: ["number", "null",]},
                circulation_year: {type: ["number", "null",]},
                publisher: {type: ["string", "null",]},
                issn: {type: ["string", "null",]},
                created_at: {type: ["string"]},
                updated_at: {type: ["string"]},
            },
            required: [
                "id",
                "name",
                "created_at",
                "updated_at",
            ],
            additionalProperties: false,
        },
    },
    additionalProperties: false,
}
