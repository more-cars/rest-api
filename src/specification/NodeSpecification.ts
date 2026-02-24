import type {NodeType} from "./NodeType"
import {PropertySpecification} from "./PropertySpecification"

export type NodeSpecification = {
    type: NodeType
    properties: PropertySpecification[]
}
