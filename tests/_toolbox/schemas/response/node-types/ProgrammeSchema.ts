export const ProgrammeSchema = {
    type: "object",
    properties: {
        type: {type: ["string"]},
        id: {type: ["integer"]},
        attributes: {
            type: "object",
            properties: {
                name: {type: ["string"]},
                aired_from_year: {type: ["number", "null"]},
                aired_until_year: {type: ["number", "null"]},
                channel: {type: ["string", "null"]},
                total_seasons: {type: ["number", "null"]},
                total_episodes: {type: ["number", "null"]},
                regular_episode_running_time: {type: ["string", "null"]},
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
