import {ImageBelongsToNodeResponse} from "../types/ImageBelongsToNodeResponse"
import {ImageBelongsToNodeRelationship} from "../../../models/images/types/ImageBelongsToNodeRelationship"
import {dasherize} from "inflection"

export function marshalBelongsToNodeRelationship(relationship: ImageBelongsToNodeRelationship) {
    return {
        image_id: relationship.image_id,
        partner_node_id: relationship.partner_node_id,
        relationship_id: relationship.relationship_id,
        relationship_name: dasherize(relationship.relationship_name.toLowerCase()),
        created_at: relationship.created_at,
        updated_at: relationship.updated_at,
    } as ImageBelongsToNodeResponse
}
