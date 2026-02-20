import {DbNodeType} from "./DbNodeType"
import {Neo4jNodeType} from "./Neo4jNodeType"
import {PropertySpecification} from "./PropertySpecification"

export type NodeSpecification = {
    type: DbNodeType
    label: Neo4jNodeType
    properties: PropertySpecification[]
}
