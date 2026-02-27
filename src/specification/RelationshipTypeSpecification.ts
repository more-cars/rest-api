import type {RelationshipType} from "./RelationshipType"
import type {NodeType} from "./NodeType"

export type RelationshipTypeSpecification = [
    RelationshipType, {
        startNodeType: NodeType
        endNodeType: NodeType
        isReverseRelationship: boolean
    }
]
