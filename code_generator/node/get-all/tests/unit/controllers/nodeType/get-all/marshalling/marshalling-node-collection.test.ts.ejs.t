---
to: tests/unit/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/get-all/marshalling-node-collection.test.ts
---
import {expect, test} from 'vitest'
import {Fake<%= h.changeCase.pascal(nodeType) %>} from "../../../../_toolbox/fixtures/nodes/Fake<%= h.changeCase.pascal(nodeType) %>"
import {marshalNodes} from "../../../../../src/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/marshalling/marshalNodes"

test("marshalling a collection of <%= h.changeCase.upper(nodeType) %> nodes", async () => {
    const fakeNode1 = Fake<%= h.changeCase.pascal(nodeType) %>.modelOutput()
    const fakeNode2 = Fake<%= h.changeCase.pascal(nodeType) %>.modelOutput()
    const fakeNode3 = Fake<%= h.changeCase.pascal(nodeType) %>.modelOutput()

    const nodes = [
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
