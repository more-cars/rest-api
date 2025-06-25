import {ImageBelongsToNodeResponse} from "./types/ImageBelongsToNodeResponse"
import {ImageBelongsToNodeRelationship} from "../../models/images/types/ImageBelongsToNodeRelationship"

export function marshalRelationship(relationship: ImageBelongsToNodeRelationship) {
    const marshalledData: ImageBelongsToNodeResponse = {
        image_id: relationship.image_id,
        partner_node_id: relationship.partner_node_id,
        relationship_id: relationship.relationship_id,
        relationship_name: relationship.relationship_name,
        created_at: relationship.created_at,
        updated_at: relationship.updated_at,
    }

    return marshalledData
}
