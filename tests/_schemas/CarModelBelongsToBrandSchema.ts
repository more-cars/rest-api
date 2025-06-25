export const CarModelBelongsToBrandSchema = {
    type: "object",
    properties: {
        car_model_id: {type: "integer"},
        brand_id: {type: "integer"},
        relationship_id: {type: "integer"},
        relationship_name: {type: "string"},
        created_at: {type: "string"},
        updated_at: {type: "string"},
    },
    required: [
        "car_model_id",
        "brand_id",
        "relationship_id",
        "relationship_name",
        "created_at",
        "updated_at",
    ],
    additionalProperties: false,
}
