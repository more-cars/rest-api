export const SessionResultSchema = {
    type: "object",
    properties: {
        id: {type: "integer"},
        position: {
            type: [
                "number",
            ]
        },
        race_number: {
            type: [
                "string",
                "null",
            ]
        },
        driver_name: {
            type: [
                "string",
            ]
        },
        team_name: {
            type: [
                "string",
                "null",
            ]
        },
        race_time: {
            type: [
                "string",
                "null",
            ]
        },
        laps: {
            type: [
                "number",
                "null",
            ]
        },
        status: {
            type: [
                "string",
                "null",
            ]
        },
        points: {
            type: [
                "number",
                "null",
            ]
        },
        created_at: {type: "string"},
        updated_at: {type: "string"},
    },
    required: [
        "id",
        "position",
        "driver_name",
        "created_at",
        "updated_at",
    ],
    additionalProperties: false,
}
