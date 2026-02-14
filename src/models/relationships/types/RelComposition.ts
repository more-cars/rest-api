import {NodeType} from "../../types/NodeType"
import {RelationshipType} from "./RelationshipType"

export type RelComposition = [
    RelationshipType, {
        startNodeType: NodeType
        endNodeType: NodeType
        isReverseRelationship: boolean
    }
]