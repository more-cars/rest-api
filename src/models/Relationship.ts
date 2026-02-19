import {getRelationshipById} from "../db/relationships/getRelationshipById"
import {RelNotFoundError} from "./types/RelNotFoundError"
import {NodeNotFoundError} from "./types/NodeNotFoundError"
import {Node} from "./Node"
import {Rel} from "./relationships/types/Rel"
import {mapDbRelationshipTypeToModelRelType} from "./relationships/mapDbRelationshipTypeToModelRelType"

export const Relationship = {
    async findById(id: number) {
        const dbRelationship = await getRelationshipById(id)

        if (!dbRelationship) {
            throw new RelNotFoundError('-', 0)
        }

        const destination = await Node.findById(dbRelationship.end_node.id)
        if (!destination) {
            throw new NodeNotFoundError(dbRelationship.end_node.id)
        }

        const origin = await Node.findById(dbRelationship.start_node.id)
        if (!origin) {
            throw new NodeNotFoundError(dbRelationship.start_node.id)
        }

        const rel: Rel = {
            id: dbRelationship.id,
            type: mapDbRelationshipTypeToModelRelType(dbRelationship.type),
            origin: origin,
            destination: destination,
            created_at: dbRelationship.created_at,
            updated_at: dbRelationship.updated_at,
        }

        return rel
    },
}
