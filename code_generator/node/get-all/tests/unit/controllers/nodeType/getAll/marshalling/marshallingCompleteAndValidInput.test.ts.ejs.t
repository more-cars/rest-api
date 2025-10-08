---
to: tests/unit/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/getAll/marshallingCompleteAndValidInput.test.ts
---
import {expect, test} from 'vitest'
import type {<%= h.changeCase.pascal(nodeType) %>Node} from "../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node"
import Fake<%= h.changeCase.pascal(nodeType) %> from "../../../../_toolbox/fixtures/nodes/Fake<%= h.changeCase.pascal(nodeType) %>"
import {marshalNodeCollection} from "../../../../../src/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>a/marshalling/marshalNodeCollection"

test('marshalling a complete and valid request', async () => {
    const fakeNode1: <%= h.changeCase.pascal(nodeType) %>Node = Object.assign({}, Fake<%= h.changeCase.pascal(nodeType) %>, {id: 1, created_at: "dummy", updated_at: "dummy"})
    const fakeNode2: <%= h.changeCase.pascal(nodeType) %>Node = Object.assign({}, Fake<%= h.changeCase.pascal(nodeType) %>, {id: 2, created_at: "dummy", updated_at: "dummy"})
    const fakeNode3: <%= h.changeCase.pascal(nodeType) %>Node = Object.assign({}, Fake<%= h.changeCase.pascal(nodeType) %>, {id: 3, created_at: "dummy", updated_at: "dummy"})

    const nodes: Array<<%= h.changeCase.pascal(nodeType) %>Node> = [
        fakeNode1,
        fakeNode2,
        fakeNode3,
    ]

    const mappedNodes = marshalNodeCollection(nodes)

    expect(mappedNodes[0])
        .toEqual(fakeNode1)

    expect(mappedNodes[1])
        .toEqual(fakeNode2)

    expect(mappedNodes[2])
        .toEqual(fakeNode3)
})
