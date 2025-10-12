---
to: tests/unit/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/getAll/marshalling-node-collection.test.ts
---
import {expect, test} from 'vitest'
import type {<%= h.changeCase.pascal(nodeType) %>Node} from "../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node"
import Fake<%= h.changeCase.pascal(nodeType) %> from "../../../../_toolbox/fixtures/nodes/Fake<%= h.changeCase.pascal(nodeType) %>"
import {marshalNodeCollection} from "../../../../../src/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>a/marshalling/marshalNodeCollection"

test("marshalling a collection of <%= h.changeCase.upper(nodeType) %> nodes", async () => {
    const fakeNode1: <%= h.changeCase.pascal(nodeType) %>Node = Object.assign({}, Fake<%= h.changeCase.pascal(nodeType) %>, {id: 1, created_at: "dummy", updated_at: "dummy"})
    const fakeNode2: <%= h.changeCase.pascal(nodeType) %>Node = Object.assign({}, Fake<%= h.changeCase.pascal(nodeType) %>, {id: 2, created_at: "dummy", updated_at: "dummy"})
    const fakeNode3: <%= h.changeCase.pascal(nodeType) %>Node = Object.assign({}, Fake<%= h.changeCase.pascal(nodeType) %>, {id: 3, created_at: "dummy", updated_at: "dummy"})

    const nodes: Array<<%= h.changeCase.pascal(nodeType) %>Node> = [
        fakeNode1,
        fakeNode2,
        fakeNode3,
    ]

    const marshalledData = marshalNodes(nodes)

    expect(marshalledData.data[0])
        .toEqual({data: fakeNode1})

    expect(marshalledData.data[1])
        .toEqual({data: fakeNode2})

    expect(marshalledData.data[2])
        .toEqual({data: fakeNode3})
})
