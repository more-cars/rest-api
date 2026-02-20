import {DbNodeType} from "./DbNodeType"
import {PropertySpecification} from "./PropertySpecification"

export type NodeSpecification = {
    type: DbNodeType
    properties: PropertySpecification[]
}
