import {getRelationshipById} from "../../db/relationships/getRelationshipById"
import {GenericRelation} from "./types/GenericRelation"
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
            id: dbRelationship.id || dbRelationship.relationship_id,
            type: dbRelationship.type || dbRelationship.relationship_name,
            origin: dbRelationship.start_node,
            destination: dbRelationship.end_node,
            created_at: dbRelationship.created_at,
            updated_at: dbRelationship.updated_at,
        } as GenericRelation
    }
}
