---
to: tests/integration/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/create.test.ts
---
import {describe, expect, test} from 'vitest'
import {Fake<%= h.changeCase.pascal(nodeType) %>} from "../../../../../_toolbox/fixtures/nodes/Fake<%= h.changeCase.pascal(nodeType) %>"
import {createNeo4jNode} from "../../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = Fake<%= h.changeCase.pascal(nodeType) %>.dbInput
        const createdNode = await createNeo4jNode(DbNodeType.<%= h.changeCase.pascal(nodeType) %>, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = Fake<%= h.changeCase.pascal(nodeType) %>.dbInputMinimal
        const createdNode = await createNeo4jNode(DbNodeType.<%= h.changeCase.pascal(nodeType) %>, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
