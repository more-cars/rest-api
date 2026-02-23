---
to: src/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/getNodeById.ts
---
import {<%= h.changeCase.pascal(nodeType) %>Node} from "./types/<%= h.changeCase.pascal(nodeType) %>Node"
import {fetchNodeById} from "../../nodes/fetchNodeById"

export async function getNodeById(id: number) {
    const node = await fetchNodeById(id)

    if (!node) {
        return false
    }

    return node as <%= h.changeCase.pascal(nodeType) %>Node
}
