export const SessionResultSchema = {
    type: "object",
    properties: {
        type: {type: ["string"]},
        id: {type: ["integer"]},
        attributes: {
            type: "object",
            properties: {
                position: {type: ["number"]},
                race_number: {type: ["string", "null"]},
                driver_name: {type: ["string"]},
                team_name: {type: ["string", "null"]},
                race_time: {type: ["string", "null"]},
                laps: {type: ["number", "null"]},
                status: {type: ["string", "null"]},
                points: {type: ["number", "null"]},
                created_at: {type: ["string"]},
                updated_at: {type: ["string"]},
            },
            required: [
                "position",
                "driver_name",
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
