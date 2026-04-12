export const ProgrammeSchema = {
    type: "object",
    properties: {
        node_type: {type: ["string"]},
        properties: {
            type: "object",
            properties: {
                id: {type: ["integer"]},
                name: {type: ["string"]},
                aired_from_year: {type: ["number", "null"]},
                aired_until_year: {type: ["number", "null"]},
                channel: {type: ["string", "null"]},
                total_seasons: {type: ["number", "null"]},
                total_episodes: {type: ["number", "null"]},
                regular_episode_running_time: {type: ["string", "null"]},
                country_code: {type: ["string", "null"]},
                created_at: {type: ["string"]},
                updated_at: {type: ["string"]},
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
