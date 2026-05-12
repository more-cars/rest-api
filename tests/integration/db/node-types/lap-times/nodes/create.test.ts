import {describe, expect, test} from 'vitest'
import {FakeLapTime} from "../../../../../_toolbox/fixtures/nodes/FakeLapTime"
import {createDbNode} from "../../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeLapTime.dbInput
        const createdNode = await createDbNode(DbNodeType.LapTime, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeLapTime.dbInputMinimal
        const createdNode = await createDbNode(DbNodeType.LapTime, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
