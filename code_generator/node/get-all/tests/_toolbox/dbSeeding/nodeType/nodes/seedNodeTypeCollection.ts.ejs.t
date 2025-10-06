---
to: tests/_toolbox/dbSeeding/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/seed<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>.ts
---
import {<%= h.changeCase.pascal(nodeType) %>Node} from "../../../../../src/db/nodes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node"
import {seed<%= h.changeCase.pascal(nodeType) %>} from "./seed<%= h.changeCase.pascal(nodeType) %>"

export async function seed<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>(amount: number) {
    const <%= h.changeCase.camel(h.inflection.pluralize(nodeType)) %>: Array<<%= h.changeCase.pascal(nodeType) %>Node> = []

    for (let i = 0; i < amount; i++) {
        <%= h.changeCase.camel(h.inflection.pluralize(nodeType)) %>.push(await seed<%= h.changeCase.pascal(nodeType) %>())
    }

    return <%= h.changeCase.camel(h.inflection.pluralize(nodeType)) %>
}
