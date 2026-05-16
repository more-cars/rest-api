import {describe, expect, test} from 'vitest'
import {GamingPlatform} from "../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {FakeGamingPlatform} from "../../../../../../_toolbox/fixtures/nodes/FakeGamingPlatform"
import type {GamingPlatformInput} from "../../../../../../../src/models/node-types/gaming-platforms/types/GamingPlatformInput"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Updating a GAMING PLATFORM', () => {
    test('Node does not exist', async () => {
        await expect(GamingPlatform.update(-42, FakeGamingPlatform.dbInput() as GamingPlatformInput))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('Node exists', async () => {
        const createdNode = await seedNode(DbNodeType.GamingPlatform)
        const inputData = FakeGamingPlatform.dbInput()
        const updatedNode = await GamingPlatform.update(createdNode.properties.id, inputData as GamingPlatformInput)

        expect(updatedNode.attributes)
            .toEqual(expect.objectContaining(inputData))
    })

    test('Trying to override read-only properties', async () => {
        const createdNode = await seedNode(DbNodeType.GamingPlatform)
        const validData = FakeGamingPlatform.dbInput()
        const readOnlyData = {
            id: 9999,
            created_at: "NOT_ALLOWED_TO_OVERWRITE",
            updated_at: "NOT_ALLOWED_TO_OVERWRITE",
        }
        const inputData = Object.assign({}, validData, readOnlyData)

        const updatedNode = await GamingPlatform.update(createdNode.properties.id, inputData as GamingPlatformInput)

        expect(updatedNode.attributes)
            .not.toEqual(expect.objectContaining(readOnlyData))
    })
})
