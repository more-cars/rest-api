import {NodeTypeLabel} from "../NodeTypeLabel"
import {PropertySpecification} from "./PropertySpecification"

export type NodeSpecification = {
    label: NodeTypeLabel
    properties: PropertySpecification[],
}
