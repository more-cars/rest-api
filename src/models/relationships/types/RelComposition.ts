import {NodeType} from "../../types/NodeType"
import {RelType} from "./RelType"

export type RelComposition = [
    RelType, {
        startNodeType: NodeType
        endNodeType: NodeType
        isReverseRelationship: boolean
    }
]