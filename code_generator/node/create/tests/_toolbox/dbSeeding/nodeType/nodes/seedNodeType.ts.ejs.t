---
to: tests/_toolbox/dbSeeding/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/seed<%= h.changeCase.pascal(nodeType) %>.ts
---
import {createNode} from "../../../../../src/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/createNode"
import {Fake<%= h.changeCase.pascal(nodeType) %>} from "../../../fixtures/nodes/Fake<%= h.changeCase.pascal(nodeType) %>"

export async function seed<%= h.changeCase.pascal(nodeType) %>(customFakeData: object = {}) {
    return createNode(Object.assign({}, Fake<%= h.changeCase.pascal(nodeType) %>.dbInput(), customFakeData))
}
