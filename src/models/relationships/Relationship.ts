import {getRelationshipById} from "../../db/relationships/getRelationshipById"
import type {GenericRelationship} from "./types/GenericRelationship"
import {RelationshipNotFoundError} from "../types/RelationshipNotFoundError"
import {NodeNotFoundError} from "../types/NodeNotFoundError"
import {getNodeById} from "../../db/nodes/getNodeById"

export class Relationship {
    static async findById(id: number) {
        const dbRelationship = await getRelationshipById(id)

        if (!dbRelationship) {
            throw new RelationshipNotFoundError('-', 0)
        }

        const endNode = await getNodeById(dbRelationship.end_node_id)

        if (!endNode) {
            throw new NodeNotFoundError(dbRelationship.end_node_id)
        }

        return {
            start_node_id: dbRelationship.start_node_id,
            end_node_id: dbRelationship.end_node_id,
            relationship_id: dbRelationship.relationship_id,
            relationship_name: dbRelationship.relationship_name,
            relationship_partner: endNode,
            created_at: dbRelationship.created_at,
            updated_at: dbRelationship.updated_at,
        } as GenericRelationship
    }
}
