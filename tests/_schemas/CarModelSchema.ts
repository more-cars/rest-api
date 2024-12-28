export const CarModelSchema = {
    type: "object",
    properties: {
        mc_id: {type: "integer"},
        name: {type: "string"},
    },
    required: [
        "mc_id",
        "name",
    ],
    additionalProperties: false,
}
