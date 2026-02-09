---
to: src/db/nodes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/getAllNodesOfType.ts
---
import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {<%= h.changeCase.pascal(nodeType) %>Node} from "./types/<%= h.changeCase.pascal(nodeType) %>Node"
import {getDbQueryCollectionParams} from "../getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeTo<%= h.changeCase.pascal(nodeType) %>Node} from "./mapDbNodeTo<%= h.changeCase.pascal(nodeType) %>Node"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<<%= h.changeCase.pascal(nodeType) %>Node[]> {
    const nodes: <%= h.changeCase.pascal(nodeType) %>Node[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(NodeTypeLabel.<%= h.changeCase.pascal(nodeType) %>, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeTo<%= h.changeCase.pascal(nodeType) %>Node(dbNode))
    })

    return nodes
}
