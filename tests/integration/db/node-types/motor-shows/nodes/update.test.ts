import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {FakeMotorShow} from "../../../../../_toolbox/fixtures/nodes/FakeMotorShow"
import {updateDbNode} from "../../../../../../src/db/nodes/updateDbNode"
import type {MotorShowNode} from "../../../../../../src/db/node-types/motor-shows/types/MotorShowNode"
import type {DbInputData} from "../../../../../../src/db/types/DbInputData"

describe('Updating MOTOR SHOW', () => {
    test('with valid data', async () => {
        const createdNode = await seedNode(DbNodeType.MotorShow)
        const inputData = FakeMotorShow.dbInput()
        const updatedNode = await updateDbNode(DbNodeType.MotorShow, createdNode.properties.id, inputData)

        expect(updatedNode.properties)
            .not.toEqual(expect.objectContaining(createdNode.properties))

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with the same data', async () => {
        const createdNode = await seedNode(DbNodeType.MotorShow)
        const inputData = createdNode.properties as DbInputData
        const updatedNode = await updateDbNode(DbNodeType.MotorShow, createdNode.properties.id, inputData)

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
        const createdNode = await seedNode(DbNodeType.MotorShow)
        const inputData = createdNode.properties as DbInputData
        inputData.name = null

        const updatedNode = await updateDbNode(DbNodeType.MotorShow, createdNode.properties.id, inputData) as MotorShowNode

        expect(updatedNode.properties.name)
            .toBeNull()
    })
})
