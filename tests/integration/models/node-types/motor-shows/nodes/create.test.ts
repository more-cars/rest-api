import {expect, test} from 'vitest'
import {FakeMotorShow} from "../../../../../_toolbox/fixtures/nodes/FakeMotorShow"
import {MotorShow} from "../../../../../../src/models/node-types/motor-shows/MotorShow"

test('Expecting node to be created when provided with valid data', async () => {
    const inputData = FakeMotorShow.dbInput
    const createdNode = await MotorShow.create(inputData)

    expect(createdNode.attributes)
        .toEqual(expect.objectContaining(inputData))
})

test('Trying to override read-only properties', async () => {
    const validData = FakeMotorShow.dbInput
    const readOnlyData = {
        id: 9999,
        created_at: "NOT_ALLOWED_TO_OVERWRITE",
        updated_at: "NOT_ALLOWED_TO_OVERWRITE",
    }
    const data = Object.assign(validData, readOnlyData)
    const createdNode = await MotorShow.create(data)

    expect(createdNode)
        .not.toEqual(expect.objectContaining(readOnlyData))
})
