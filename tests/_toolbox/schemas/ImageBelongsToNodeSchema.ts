export const ImageBelongsToNodeSchema = {
    type: "object",
    properties: {
        image_id: {type: "integer"},
        partner_node_id: {type: "integer"},
        relationship_id: {type: "integer"},
        relationship_name: {type: "string"},
        created_at: {type: "string"},
        updated_at: {type: "string"},
    },
    required: [
        "image_id",
        "partner_node_id",
        "relationship_id",
        "relationship_name",
        "created_at",
        "updated_at",
    ],
    additionalProperties: false,
}
