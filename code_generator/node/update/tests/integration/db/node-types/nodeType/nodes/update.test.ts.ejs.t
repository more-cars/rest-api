---
to: tests/integration/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/update.test.ts
---
import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {Fake<%= h.changeCase.pascal(nodeType) %>} from "../../../../../_toolbox/fixtures/nodes/Fake<%= h.changeCase.pascal(nodeType) %>"
import {updateDbNode} from "../../../../../../src/db/nodes/updateDbNode"
import type {Input<%= h.changeCase.pascal(nodeType) %>Create} from "../../../../../../src/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/Input<%= h.changeCase.pascal(nodeType) %>Create"
import type {<%= h.changeCase.pascal(nodeType) %>Node} from "../../../../../../src/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node"

describe('Updating <%= h.changeCase.upper(nodeType) %>', () => {
    test('with valid data', async () => {
        const createdNode = await seedNode(DbNodeType.<%= h.changeCase.pascal(nodeType) %>)
        const inputData = Fake<%= h.changeCase.pascal(nodeType) %>.dbInput()
        const updatedNode = await updateDbNode(DbNodeType.<%= h.changeCase.pascal(nodeType) %>, createdNode.properties.id, inputData)

        expect(updatedNode.properties)
            .not.toEqual(expect.objectContaining(createdNode.properties))

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with the same data', async () => {
        const createdNode = await seedNode(DbNodeType.<%= h.changeCase.pascal(nodeType) %>)
        const inputData = createdNode.properties as unknown as Input<%= h.changeCase.pascal(nodeType) %>Create
        const updatedNode = await updateDbNode(DbNodeType.<%= h.changeCase.pascal(nodeType) %>, createdNode.properties.id, inputData)

        expect(updatedNode.properties)
            .not.toEqual(createdNode.properties.updated_at)

        createdNode.properties.updated_at = ''
        updatedNode.properties.updated_at = ''

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(createdNode.properties))

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('removing a field', async () => {
        const createdNode = await seedNode(DbNodeType.<%= h.changeCase.pascal(nodeType) %>)
        const inputData = createdNode.properties as unknown as Input<%= h.changeCase.pascal(nodeType) %>Create
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.name = null
        const updatedNode = await updateDbNode(DbNodeType.<%= h.changeCase.pascal(nodeType) %>, createdNode.properties.id, inputData) as <%= h.changeCase.pascal(nodeType) %>Node

        expect(updatedNode.properties.name)
            .toBeNull()
    })
})
