import {describe, expect, test} from 'vitest'
import {FakeMotorShow} from "../../../../../_toolbox/fixtures/nodes/FakeMotorShow"
import {createDbNode} from "../../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeMotorShow.dbInput
        const createdNode = await createDbNode(DbNodeType.MotorShow, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeMotorShow.dbInputMinimal
        const createdNode = await createDbNode(DbNodeType.MotorShow, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
