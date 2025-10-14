export const BrandHasPrimeImageSchema = {
    type: "object",
    properties: {
        brand_id: {type: "integer"},
        image_id: {type: "integer"},
        relationship_id: {type: "integer"},
        relationship_name: {type: "string"},
        created_at: {type: "string"},
        updated_at: {type: "string"},
    },
    required: [
        "brand_id",
        "image_id",
        "relationship_id",
        "relationship_name",
        "created_at",
        "updated_at",
    ],
    additionalProperties: false,
}
