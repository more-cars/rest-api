import {describe, expect, test} from 'vitest'
import {Magazine} from "../../../../../../../src/models/node-types/magazines/Magazine"
import {FakeMagazine} from "../../../../../../_toolbox/fixtures/nodes/FakeMagazine"
import type {MagazineInput} from "../../../../../../../src/models/node-types/magazines/types/MagazineInput"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Updating a MAGAZINE', () => {
    test('Node does not exist', async () => {
        await expect(Magazine.update(-42, FakeMagazine.dbInput() as MagazineInput))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('Node exists', async () => {
        const createdNode = await seedNode(DbNodeType.Magazine)
        const inputData = FakeMagazine.dbInput()
        const updatedNode = await Magazine.update(createdNode.properties.id, inputData as MagazineInput)

        expect(updatedNode.attributes)
            .toEqual(expect.objectContaining(inputData))
    })

    test('Trying to override read-only properties', async () => {
        const createdNode = await seedNode(DbNodeType.Magazine)
        const validData = FakeMagazine.dbInput()
        const readOnlyData = {
            id: 9999,
            created_at: "NOT_ALLOWED_TO_OVERWRITE",
            updated_at: "NOT_ALLOWED_TO_OVERWRITE",
        }
        const inputData = Object.assign({}, validData, readOnlyData)

        const updatedNode = await Magazine.update(createdNode.properties.id, inputData as MagazineInput)

        expect(updatedNode.attributes)
            .not.toEqual(expect.objectContaining(readOnlyData))
    })
})
