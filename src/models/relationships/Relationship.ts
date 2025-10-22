import {getRelationshipById} from "../../db/relationships/getRelationshipById"
import {RelationshipNotFoundError} from "../types/RelationshipNotFoundError"
import {NodeNotFoundError} from "../types/NodeNotFoundError"
import {Node} from "../Node"
import {GenericRelation} from "./types/GenericRelation"

export class Relationship {
    static async findById(id: number) {
        const dbRelationship = await getRelationshipById(id)

        if (!dbRelationship) {
            throw new RelationshipNotFoundError('-', 0)
        }

        const destination = await Node.findById(dbRelationship.end_node_id)
        if (!destination) {
            throw new NodeNotFoundError(dbRelationship.end_node_id)
        }

        const origin = await Node.findById(dbRelationship.start_node_id)
        if (!origin) {
            throw new NodeNotFoundError(dbRelationship.start_node_id)
        }

        return {
            id: dbRelationship.id || dbRelationship.relationship_id,
            type: dbRelationship.type || dbRelationship.relationship_name, // TODO convert db relationship to model relationship (might also be an inverse relation)
            origin: origin,
            destination: destination,
            created_at: dbRelationship.created_at,
            updated_at: dbRelationship.updated_at,
        } as GenericRelation
    }
}
