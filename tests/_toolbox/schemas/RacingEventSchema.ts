export const RacingEventSchema = {
    type: "object",
    properties: {
        id: {type: "integer"},
        name: {
            type: [
                "string",
            ]
        },
        round: {
            type: [
                "number",
                "null",
            ]
        },
        date_from: {
            type: [
                "string",
                "null",
            ]
        },
        date_to: {
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
    additionalProperties: false,
}
