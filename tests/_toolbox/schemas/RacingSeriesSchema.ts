export const RacingSeriesSchema = {
    type: "object",
    properties: {
        id: {type: "integer"},
        name: {
            type: [
                "string",
            ]
        },
        short_name: {
            type: [
                "string",
                "null",
            ]
        },
        founded: {
            type: [
                "number",
                "null",
            ]
        },
        defunct: {
            type: [
                "number",
                "null",
            ]
        },
        organized_by: {
            type: [
                "string",
                "null",
            ]
        },
        vehicle_type: {
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
