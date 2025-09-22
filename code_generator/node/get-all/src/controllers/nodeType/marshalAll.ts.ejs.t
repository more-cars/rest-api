---
to: src/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/marshalAll.ts
---
import {<%= h.changeCase.pascal(nodeType) %>Node} from "../../models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node"
import {marshal} from "./marshal"
import {<%= h.changeCase.pascal(nodeType) %>Response} from "./types/<%= h.changeCase.pascal(nodeType) %>Response"

export function marshalAll(<%= h.changeCase.camel(h.inflection.pluralize(nodeType)) %>: Array<<%= h.changeCase.pascal(nodeType) %>Node>): Array<<%= h.changeCase.pascal(nodeType) %>Response> {
    const responseObjects: Array<<%= h.changeCase.pascal(nodeType) %>Response> = []

    <%= h.changeCase.camel(h.inflection.pluralize(nodeType)) %>.forEach((<%= h.changeCase.camel(nodeType) %>: <%= h.changeCase.pascal(nodeType) %>Node) => {
        responseObjects.push(marshal(<%= h.changeCase.camel(nodeType) %>))
    })

    return responseObjects
}
