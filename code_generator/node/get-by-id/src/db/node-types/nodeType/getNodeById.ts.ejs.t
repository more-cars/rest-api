---
to: src/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/getNodeById.ts
---
import {fetchNodeById} from "../../nodes/fetchNodeById"
import {DbNodeType} from "../../types/DbNodeType"
import {<%= h.changeCase.pascal(nodeType) %>Node} from "./types/<%= h.changeCase.pascal(nodeType) %>Node"

export async function getNodeById(id: number) {
    const node = await fetchNodeById(id, DbNodeType.<%= h.changeCase.pascal(nodeType) %>)

    if (!node) {
        return false
    }

    return node as <%= h.changeCase.pascal(nodeType) %>Node
}
