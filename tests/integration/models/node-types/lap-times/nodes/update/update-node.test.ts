import {describe, expect, test} from 'vitest'
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {FakeLapTime} from "../../../../../../_toolbox/fixtures/nodes/FakeLapTime"
import type {LapTimeInput} from "../../../../../../../src/models/node-types/lap-times/types/LapTimeInput"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Updating a LAP TIME', () => {
    test('Node does not exist', async () => {
        await expect(LapTime.update(-42, FakeLapTime.dbInput() as LapTimeInput))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('Node exists', async () => {
        const createdNode = await seedNode(DbNodeType.LapTime)
        const inputData = FakeLapTime.dbInput()
        const updatedNode = await LapTime.update(createdNode.properties.id, inputData as LapTimeInput)

        expect(updatedNode.attributes)
            .toEqual(expect.objectContaining(inputData))
    })

    test('Trying to override read-only properties', async () => {
        const createdNode = await seedNode(DbNodeType.LapTime)
        const validData = FakeLapTime.dbInput()
        const readOnlyData = {
            id: 9999,
            created_at: "NOT_ALLOWED_TO_OVERWRITE",
            updated_at: "NOT_ALLOWED_TO_OVERWRITE",
        }
        const inputData = Object.assign({}, validData, readOnlyData)

        const updatedNode = await LapTime.update(createdNode.properties.id, inputData as LapTimeInput)

        expect(updatedNode.attributes)
            .not.toEqual(expect.objectContaining(readOnlyData))
    })
})
