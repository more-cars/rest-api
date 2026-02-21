import type {RelType} from "./RelType"
import type {ModelNodeType} from "../../types/ModelNodeType"

export type RelComposition = [
    RelType, {
        startNodeType: ModelNodeType
        endNodeType: ModelNodeType
        isReverseRelationship: boolean
    }
]
