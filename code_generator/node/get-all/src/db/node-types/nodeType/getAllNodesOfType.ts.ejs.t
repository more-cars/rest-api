---
to: src/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/getAllNodesOfType.ts
---
import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {<%= h.changeCase.pascal(nodeType) %>Node} from "./types/<%= h.changeCase.pascal(nodeType) %>Node"
import {getDbQueryCollectionParams} from "../../nodes/getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../../nodes/fetchNodesFromDb"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeTo<%= h.changeCase.pascal(nodeType) %>Node} from "./mapDbNodeTo<%= h.changeCase.pascal(nodeType) %>Node"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<<%= h.changeCase.pascal(nodeType) %>Node[]> {
    const nodes: <%= h.changeCase.pascal(nodeType) %>Node[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(DbNodeType.<%= h.changeCase.pascal(nodeType) %>, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeTo<%= h.changeCase.pascal(nodeType) %>Node(dbNode))
    })

    return nodes
}
