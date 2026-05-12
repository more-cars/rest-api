---
to: src/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/convert<%= h.changeCase.pascal(nodeType) %>Neo4jNodeToDbNode.ts
---
import {Node} from "neo4j-driver"
import {<%= h.changeCase.pascal(nodeType) %>Node} from "./types/<%= h.changeCase.pascal(nodeType) %>Node"
import {DbNodeType} from "../../types/DbNodeType"
import {convertNeo4jPropertiesToDbProperties} from "../../nodes/convertNeo4jPropertiesToDbProperties"
import {NodeType} from "../../../specification/NodeType"

export function convert<%= h.changeCase.pascal(nodeType) %>Neo4jNodeToDbNode(neo4jNode: Node): <%= h.changeCase.pascal(nodeType) %>Node {
    return {
        node_type: DbNodeType.<%= h.changeCase.pascal(nodeType) %>,
        properties: convertNeo4jPropertiesToDbProperties(neo4jNode, NodeType.<%= h.changeCase.pascal(nodeType) %>)
    } as <%= h.changeCase.pascal(nodeType) %>Node
}
