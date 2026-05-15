import {describe, expect, test} from 'vitest'
import {MotorShow} from "../../../../../../../src/models/node-types/motor-shows/MotorShow"
import {FakeMotorShow} from "../../../../../../_toolbox/fixtures/nodes/FakeMotorShow"
import type {MotorShowInput} from "../../../../../../../src/models/node-types/motor-shows/types/MotorShowInput"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Updating a MOTOR SHOW', () => {
    test('Node does not exist', async () => {
        await expect(MotorShow.update(-42, FakeMotorShow.dbInput() as MotorShowInput))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('Node exists', async () => {
        const createdNode = await seedNode(DbNodeType.MotorShow)
        const inputData = FakeMotorShow.dbInput()
        const updatedNode = await MotorShow.update(createdNode.properties.id, inputData as MotorShowInput)

        expect(updatedNode.attributes)
            .toEqual(expect.objectContaining(inputData))
    })

    test('Trying to override read-only properties', async () => {
        const createdNode = await seedNode(DbNodeType.MotorShow)
        const validData = FakeMotorShow.dbInput()
        const readOnlyData = {
            id: 9999,
            created_at: "NOT_ALLOWED_TO_OVERWRITE",
            updated_at: "NOT_ALLOWED_TO_OVERWRITE",
        }
        const inputData = Object.assign({}, validData, readOnlyData)

        const updatedNode = await MotorShow.update(createdNode.properties.id, inputData as MotorShowInput)

        expect(updatedNode.attributes)
            .not.toEqual(expect.objectContaining(readOnlyData))
    })
})
