export const TrackLayoutSchema = {
    type: "object",
    properties: {
        type: {type: ["string"]},
        id: {type: ["integer"]},
        attributes: {
            type: "object",
            properties: {
                name: {type: ["string"]},
                year_from: {type: ["number", "null"]},
                year_to: {type: ["number", "null"]},
                length: {type: ["number", "null"]},
                length_unit: {type: ["string", "null"]},
                direction: {type: ["string", "null"]},
                elevation_change: {type: ["number", "null"]},
                elevation_change_unit: {type: ["string", "null"]},
                surface: {type: ["string", "null"]},
                created_at: {type: ["string"]},
                updated_at: {type: ["string"]},
            },
            required: [
                "name",
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
