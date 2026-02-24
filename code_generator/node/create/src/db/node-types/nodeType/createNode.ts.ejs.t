---
to: src/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/createNode.ts
---
import {Input<%= h.changeCase.pascal(nodeType) %>Create} from "./types/Input<%= h.changeCase.pascal(nodeType) %>Create"
import {<%= h.changeCase.pascal(nodeType) %>Node} from "./types/<%= h.changeCase.pascal(nodeType) %>Node"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convert<%= h.changeCase.pascal(nodeType) %>Neo4jNodeToDbNode} from "./convert<%= h.changeCase.pascal(nodeType) %>Neo4jNodeToDbNode"

export async function createNode(data: Input<%= h.changeCase.pascal(nodeType) %>Create): Promise<<%= h.changeCase.pascal(nodeType) %>Node> {
    const node = await createNeo4jNode(DbNodeType.<%= h.changeCase.pascal(nodeType) %>, data)

    return convert<%= h.changeCase.pascal(nodeType) %>Neo4jNodeToDbNode(node)
}
