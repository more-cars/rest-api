export const CarModelBelongsToBrandSchema = {
    type: "object",
    properties: {
        car_model_id: {type: "integer"},
        brand_id: {type: "integer"},
        relationship_id: {type: "integer"},
        relationship_name: {type: "string"},
    },
    required: [
        "car_model_id",
        "brand_id",
        "relationship_id",
        "relationship_name",
    ],
    additionalProperties: false,
}
