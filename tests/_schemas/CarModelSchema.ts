export const CarModelSchema = {
    type: "object",
    properties: {
        id: {type: "integer"},
        name: {type: "string"},
        built_from: {type: ["integer", "null"]},
        built_to: {type: ["integer", "null"]},
        generation: {type: ["integer", "null"]},
        internal_code: {type: ["string", "null"]},
        total_production: {type: ["integer", "null"]},
    },
    required: [
        "id",
        "name",
    ],
    additionalProperties: false,
}
