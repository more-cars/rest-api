---
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>.ts
---
import {Create<%= h.changeCase.pascal(nodeType) %>Input} from "./types/Create<%= h.changeCase.pascal(nodeType) %>Input"
import {<%= h.changeCase.pascal(nodeType) %>Node} from "./types/<%= h.changeCase.pascal(nodeType) %>Node"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"

export const <%= h.changeCase.pascal(nodeType) %> = {
    async create(data: Create<%= h.changeCase.pascal(nodeType) %>Input): Promise<<%= h.changeCase.pascal(nodeType) %>Node> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as <%= h.changeCase.pascal(nodeType) %>Node
    },
}
