export const BrandHasCarModelSchema = {
    type: "object",
    properties: {
        brand_id: {type: "integer"},
        car_model_id: {type: "integer"},
        relationship_id: {type: "integer"},
        relationship_name: {type: "string"},
        created_at: {type: "string"},
        updated_at: {type: "string"},
    },
    required: [
        "brand_id",
        "car_model_id",
        "relationship_id",
        "relationship_name",
        "created_at",
        "updated_at",
    ],
    additionalProperties: false,
}
