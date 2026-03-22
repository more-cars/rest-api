export const RaceTrackSchema = {
    type: "object",
    properties: {
        type: {type: ["string"]},
        id: {type: ["integer"]},
        attributes: {
            type: "object",
            properties: {
                name: {type: ["string"]},
                opened: {type: ["number", "null"]},
                closed: {type: ["number", "null"]},
                type: {type: ["string", "null"]},
                location: {type: ["string", "null"]},
                geo_position: {type: ["string", "null"]},
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
