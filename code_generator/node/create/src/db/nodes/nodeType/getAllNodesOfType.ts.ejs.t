---
to: src/db/nodes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/getAllNodesOfType.ts
---
import type {<%= h.changeCase.pascal(nodeType) %>Node} from "./types/<%= h.changeCase.pascal(nodeType) %>Node"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeTo<%= h.changeCase.pascal(nodeType) %>Node} from "./mapDbNodeTo<%= h.changeCase.pascal(nodeType) %>Node"

export async function getAllNodesOfType(): Promise<Array<<%= h.changeCase.pascal(nodeType) %>Node>> {
    const nodes: Array<<%= h.changeCase.pascal(nodeType) %>Node> = []

    const dbNodes = await fetchNodesFromDb(NodeTypeLabel.<%= h.changeCase.pascal(nodeType) %>)
    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeTo<%= h.changeCase.pascal(nodeType) %>Node(dbNode))
    })

    return nodes
}
