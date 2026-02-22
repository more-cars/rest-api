export const LapTimeSchema = {
    type: "object",
    properties: {
        data: {
            type: "object",
            properties: {
                id: {type: ["integer"]},
                time: {type: ["string"]},
                driver_name: {type: ["string"]},
                date: {type: ["string", "null"]},
                created_at: {type: ["string"]},
                updated_at: {type: ["string"]},
            },
            required: [
                "id",
                "time",
                "driver_name",
                "created_at",
                "updated_at",
            ],
        },
    },
    additionalProperties: false,
}
