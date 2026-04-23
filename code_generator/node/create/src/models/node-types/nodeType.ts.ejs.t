---
to: src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>.ts
---
import {Create<%= h.changeCase.pascal(nodeType) %>Input} from "./types/Create<%= h.changeCase.pascal(nodeType) %>Input"
import {<%= h.changeCase.pascal(nodeType) %>Node} from "./types/<%= h.changeCase.pascal(nodeType) %>Node"
import {convertInputData} from "./create/convertInputData"
import {createNeo4jNode} from "../../../db/nodes/createNeo4jNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"

export const <%= h.changeCase.pascal(nodeType) %> = {
    async create(data: Create<%= h.changeCase.pascal(nodeType) %>Input): Promise<<%= h.changeCase.pascal(nodeType) %>Node> {
        const input = convertInputData(data)
        const result = await createNeo4jNode(DbNodeType.<%= h.changeCase.pascal(nodeType) %>, input)

        return convertDbNodeToModelNode(result) as <%= h.changeCase.pascal(nodeType) %>Node
    },
}
