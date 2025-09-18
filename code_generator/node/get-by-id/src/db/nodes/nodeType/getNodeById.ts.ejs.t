---
to: src/db/nodes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/getNodeById.ts
---
import {<%= h.changeCase.pascal(nodeType) %>Node} from "./types/<%= h.changeCase.pascal(nodeType) %>Node"
import {fetchNodeFromDb} from "../fetchNodeFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeTo<%= h.changeCase.pascal(nodeType) %>Node} from "./mapDbNodeTo<%= h.changeCase.pascal(nodeType) %>Node"

export async function getNodeById(id: number): Promise<false | <%= h.changeCase.pascal(nodeType) %>Node> {
    const node = await fetchNodeFromDb(id, NodeTypeLabel.<%= h.changeCase.pascal(nodeType) %>)

    if (!node) {
        return false
    }

    return mapDbNodeTo<%= h.changeCase.pascal(nodeType) %>Node(node)
}
