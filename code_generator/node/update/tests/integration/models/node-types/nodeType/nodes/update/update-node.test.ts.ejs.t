---
to: tests/integration/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/update/update-node.test.ts
---
import {describe, expect, test} from 'vitest'
import {<%= h.changeCase.pascal(nodeType) %>} from "../../../../../../../src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"
import {Fake<%= h.changeCase.pascal(nodeType) %>} from "../../../../../../_toolbox/fixtures/nodes/Fake<%= h.changeCase.pascal(nodeType) %>"
import type {<%= h.changeCase.pascal(nodeType) %>Input} from "../../../../../../../src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Input"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Updating a <%= h.changeCase.upper(nodeType) %>', () => {
    test('Node does not exist', async () => {
        await expect(<%= h.changeCase.pascal(nodeType) %>.update(-42, Fake<%= h.changeCase.pascal(nodeType) %>.dbInput as <%= h.changeCase.pascal(nodeType) %>Input))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('Node exists', async () => {
        const createdNode = await seedNode(DbNodeType.<%= h.changeCase.pascal(nodeType) %>)
        const inputData = Fake<%= h.changeCase.pascal(nodeType) %>.dbInput()
        const updatedNode = await <%= h.changeCase.pascal(nodeType) %>.update(createdNode.properties.id, inputData as <%= h.changeCase.pascal(nodeType) %>Input)

        expect(updatedNode.attributes)
            .toEqual(expect.objectContaining(inputData))
    })

    test('Trying to override read-only properties', async () => {
        const createdNode = await seedNode(DbNodeType.<%= h.changeCase.pascal(nodeType) %>)
        const validData = Fake<%= h.changeCase.pascal(nodeType) %>.dbInput()
        const readOnlyData = {
            id: 9999,
            created_at: "NOT_ALLOWED_TO_OVERWRITE",
            updated_at: "NOT_ALLOWED_TO_OVERWRITE",
        }
        const inputData = Object.assign({}, validData, readOnlyData)

        const updatedNode = await <%= h.changeCase.pascal(nodeType) %>.update(createdNode.properties.id, inputData as <%= h.changeCase.pascal(nodeType) %>Input)

        expect(updatedNode.attributes)
            .not.toEqual(expect.objectContaining(readOnlyData))
    })
})
