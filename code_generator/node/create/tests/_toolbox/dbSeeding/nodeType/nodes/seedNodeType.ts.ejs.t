---
to: tests/_toolbox/dbSeeding/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/seed<%= h.changeCase.pascal(nodeType) %>.ts
---
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {createDbNode} from "../../../../../src/db/nodes/createDbNode"
import {Fake<%= h.changeCase.pascal(nodeType) %>} from "../../../fixtures/nodes/Fake<%= h.changeCase.pascal(nodeType) %>"

export async function seed<%= h.changeCase.pascal(nodeType) %>(customFakeData: object = {}) {
    return createDbNode(DbNodeType.<%= h.changeCase.pascal(nodeType) %>, Object.assign({}, Fake<%= h.changeCase.pascal(nodeType) %>.dbInput(), customFakeData))
}
