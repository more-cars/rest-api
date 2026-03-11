export const ProgrammeEpisodeSchema = {
    type: "object",
    properties: {
        type: {type: ["string"]},
        id: {type: ["integer"]},
        attributes: {
            type: "object",
            properties: {
                title: {type: ["string"]},
                season_number: {type: ["number", "null"]},
                season_episode_number: {type: ["number", "null"]},
                original_air_date: {type: ["string", "null"]},
                duration: {type: ["string", "null"]},
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
