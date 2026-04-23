---
to: tests/_toolbox/dbSeeding/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/seed<%= h.changeCase.pascal(nodeType) %>.ts
---
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {createNeo4jNode} from "../../../../../src/db/nodes/createNeo4jNode"
import {Fake<%= h.changeCase.pascal(nodeType) %>} from "../../../fixtures/nodes/Fake<%= h.changeCase.pascal(nodeType) %>"

export async function seed<%= h.changeCase.pascal(nodeType) %>(customFakeData: object = {}) {
    return createNeo4jNode(DbNodeType.<%= h.changeCase.pascal(nodeType) %>, Object.assign({}, Fake<%= h.changeCase.pascal(nodeType) %>.dbInput, customFakeData))
}
