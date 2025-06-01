export const ImageBelongsToNodeSchema = {
    type: "object",
    properties: {
        image_id: {type: "integer"},
        partner_node_id: {type: "integer"},
        relationship_id: {type: "integer"},
        relationship_name: {type: "string"},
    },
    required: [
        "image_id",
        "partner_node_id",
        "relationship_id",
        "relationship_name",
    ],
    additionalProperties: false,
}
