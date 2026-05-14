import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {FakeLapTime} from "../../../../../_toolbox/fixtures/nodes/FakeLapTime"
import {updateDbNode} from "../../../../../../src/db/nodes/updateDbNode"
import type {InputLapTimeCreate} from "../../../../../../src/db/node-types/lap-times/types/InputLapTimeCreate"
import type {LapTimeNode} from "../../../../../../src/db/node-types/lap-times/types/LapTimeNode"

describe('Updating LAP TIME', () => {
    test('with valid data', async () => {
        const createdNode = await seedNode(DbNodeType.LapTime)
        const inputData = FakeLapTime.dbInput()
        const updatedNode = await updateDbNode(DbNodeType.LapTime, createdNode.properties.id, inputData)

        expect(updatedNode.properties)
            .not.toEqual(expect.objectContaining(createdNode.properties))

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with the same data', async () => {
        const createdNode = await seedNode(DbNodeType.LapTime)
        const inputData = createdNode.properties as unknown as InputLapTimeCreate
        const updatedNode = await updateDbNode(DbNodeType.LapTime, createdNode.properties.id, inputData)

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
        const createdNode = await seedNode(DbNodeType.LapTime)
        const inputData = createdNode.properties as unknown as InputLapTimeCreate
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.driver_name = null
        const updatedNode = await updateDbNode(DbNodeType.LapTime, createdNode.properties.id, inputData) as LapTimeNode

        expect(updatedNode.properties.driver_name)
            .toBeNull()
    })
})
