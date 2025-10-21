export const TrackLayoutSchema = {
    type: "object",
    properties: {
        id: {type: "integer"},
        name: {
            type: [
                "string",
            ]
        },
        year_from: {
            type: [
                "number",
                "null",
            ]
        },
        year_to: {
            type: [
                "number",
                "null",
            ]
        },
        length: {
            type: [
                "number",
                "null",
            ]
        },
        length_unit: {
            type: [
                "string",
                "null",
            ]
        },
        direction: {
            type: [
                "string",
                "null",
            ]
        },
        elevation_change: {
            type: [
                "number",
                "null",
            ]
        },
        elevation_change_unit: {
            type: [
                "string",
                "null",
            ]
        },
        surface: {
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
