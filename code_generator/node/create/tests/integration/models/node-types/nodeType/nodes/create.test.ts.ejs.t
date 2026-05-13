---
to: tests/integration/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/create.test.ts
---
import {expect, test} from 'vitest'
import {Fake<%= h.changeCase.pascal(nodeType) %>} from "../../../../../_toolbox/fixtures/nodes/Fake<%= h.changeCase.pascal(nodeType) %>"
import {<%= h.changeCase.pascal(nodeType) %>} from "../../../../../../src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"

test('Expecting node to be created when provided with valid data', async () => {
    const inputData = Fake<%= h.changeCase.pascal(nodeType) %>.dbInput()
    const createdNode = await <%= h.changeCase.pascal(nodeType) %>.create(inputData)

    expect(createdNode.attributes)
        .toEqual(expect.objectContaining(inputData))
})

test('Trying to override read-only properties', async () => {
    const validData = Fake<%= h.changeCase.pascal(nodeType) %>.dbInput()
    const readOnlyData = {
        id: 9999,
        created_at: "NOT_ALLOWED_TO_OVERWRITE",
        updated_at: "NOT_ALLOWED_TO_OVERWRITE",
    }
    const data = Object.assign(validData, readOnlyData)
    const createdNode = await <%= h.changeCase.pascal(nodeType) %>.create(data)

    expect(createdNode)
        .not.toEqual(expect.objectContaining(readOnlyData))
})
