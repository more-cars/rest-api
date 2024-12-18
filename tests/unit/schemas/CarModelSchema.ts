export const CarModelSchema = {
    type: "object",
    properties: {
        id: {type: "integer"},
        name: {type: "string"},
    },
    required: [
        "id",
        "name",
    ],
    additionalProperties: false,
}
