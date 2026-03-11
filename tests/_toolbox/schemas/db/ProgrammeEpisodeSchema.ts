export const ProgrammeEpisodeSchema = {
    type: "object",
    properties: {
        node_type: {type: ["string"]},
        properties: {
            type: "object",
            properties: {
                id: {type: ["integer"]},
                title: {type: ["string"]},
                season_number: {type: ["number", "null"]},
                season_episode_number: {type: ["number", "null"]},
                original_air_date: {type: ["string", "null"]},
                duration: {type: ["string", "null"]},
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
