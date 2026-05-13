---
to: tests/integration/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/update/create-revision-on-update.test.ts
---
import {expect, test} from "vitest"
import {<%= h.changeCase.pascal(nodeType) %>} from "../../../../../../../src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"
import {Fake<%= h.changeCase.pascal(nodeType) %>} from "../../../../../../_toolbox/fixtures/nodes/Fake<%= h.changeCase.pascal(nodeType) %>"
import type {<%= h.changeCase.pascal(nodeType) %>Input} from "../../../../../../../src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Input"
import {Revision} from "../../../../../../../src/models/node-types/revisions/Revision"

test('Expecting REVISION to be created when updating a node', async () => {
    const node = await <%= h.changeCase.pascal(nodeType) %>.create(Fake<%= h.changeCase.pascal(nodeType) %>.dbInput())
    await <%= h.changeCase.pascal(nodeType) %>.update(node.attributes.id, {} as <%= h.changeCase.pascal(nodeType) %>Input)

    const revisionNodes = await Revision.findAll({
        filterByProperty: 'node_updated_at',
        filterValue: node.attributes.updated_at,
    })

    expect(revisionNodes.length)
        .toEqual(1)
})
