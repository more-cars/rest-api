---
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>.ts
---
import {Create<%= h.changeCase.pascal(nodeType) %>Input} from "./types/Create<%= h.changeCase.pascal(nodeType) %>Input"
import {<%= h.changeCase.pascal(nodeType) %>Node} from "./types/<%= h.changeCase.pascal(nodeType) %>Node"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/createNode"
import {convertOutputData} from "./create/convertOutputData"

export class <%= h.changeCase.pascal(nodeType) %> {
    static async create(data: Create<%= h.changeCase.pascal(nodeType) %>Input): Promise<<%= h.changeCase.pascal(nodeType) %>Node> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    }
}
