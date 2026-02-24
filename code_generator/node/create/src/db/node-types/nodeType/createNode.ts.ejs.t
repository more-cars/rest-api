---
to: src/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/createNode.ts
---
import {Input<%= h.changeCase.pascal(nodeType) %>Create} from "./types/Input<%= h.changeCase.pascal(nodeType) %>Create"
import {<%= h.changeCase.pascal(nodeType) %>Node} from "./types/<%= h.changeCase.pascal(nodeType) %>Node"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeTo<%= h.changeCase.pascal(nodeType) %>Node} from "./mapDbNodeTo<%= h.changeCase.pascal(nodeType) %>Node"

export async function createNode(data: Input<%= h.changeCase.pascal(nodeType) %>Create): Promise<<%= h.changeCase.pascal(nodeType) %>Node> {
    const node = await createNeo4jNode(DbNodeType.<%= h.changeCase.pascal(nodeType) %>, data)

    return mapDbNodeTo<%= h.changeCase.pascal(nodeType) %>Node(node)
}
