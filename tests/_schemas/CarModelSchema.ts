export const CarModelSchema = {
    type: "object",
    properties: {
        id: {type: "integer"},
        name: {type: "string"},
        built_from: {type: "integer"},
        built_to: {type: "integer"},
        generation: {type: "integer"},
        internal_code: {type: "string"},
        total_production: {type: "integer"},
    },
    required: [
        "id",
        "name",
    ],
    additionalProperties: false,
}
