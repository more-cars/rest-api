import {Neo4jNodeType} from "./Neo4jNodeType"
import {PropertySpecification} from "./PropertySpecification"

export type NodeSpecification = {
    label: Neo4jNodeType
    properties: PropertySpecification[],
}
