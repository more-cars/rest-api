export const RaceTrackSchema = {
    type: "object",
    properties: {
        node_type: {type: "string"},
        properties: {
            type: "object",
            properties: {
                id: {type: "integer"},
                name: {
                    type: [
                        "string",
                    ]
                },
                opened: {
                    type: [
                        "number",
                        "null",
                    ]
                },
                closed: {
                    type: [
                        "number",
                        "null",
                    ]
                },
                type: {
                    type: [
                        "string",
                        "null",
                    ]
                },
                location: {
                    type: [
                        "string",
                        "null",
                    ]
                },
                geo_position: {
                    type: [
                        "string",
                        "null",
                    ]
                },
                created_at: {type: "string"},
                updated_at: {type: "string"},
            },
            required: [
                "id",
                "name",
                "created_at",
                "updated_at",
            ],
        },
    },
    additionalProperties: false,
}
