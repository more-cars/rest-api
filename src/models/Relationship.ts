import {getRelationshipById} from "../db/relationships/getRelationshipById"
import {RelNotFoundError} from "./types/RelNotFoundError"
import {NodeNotFoundError} from "./types/NodeNotFoundError"
import {Node} from "./Node"
import {Rel} from "./relationships/types/Rel"
import {mapDbRelationshipTypeToModelRelationshipType} from "./relationships/mapDbRelTypeToModelRelType"

export const Relationship = {
    async findById(id: number) {
        const dbRelationship = await getRelationshipById(id)

        if (!dbRelationship) {
            throw new RelNotFoundError('-', 0)
        }

        const destination = await Node.findById(dbRelationship.end_node_id)
        if (!destination) {
            throw new NodeNotFoundError(dbRelationship.end_node_id)
        }

        const origin = await Node.findById(dbRelationship.start_node_id)
        if (!origin) {
            throw new NodeNotFoundError(dbRelationship.start_node_id)
        }

        const rel: Rel = {
            id: dbRelationship.id || dbRelationship.relationship_id,
            type: mapDbRelationshipTypeToModelRelationshipType(dbRelationship.type),
            origin: origin,
            destination: destination,
            created_at: dbRelationship.created_at,
            updated_at: dbRelationship.updated_at,
        }

        return rel
    },
}
