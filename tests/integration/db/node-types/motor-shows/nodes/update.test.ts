import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {FakeMotorShow} from "../../../../../_toolbox/fixtures/nodes/FakeMotorShow"
import {updateDbNode} from "../../../../../../src/db/nodes/updateDbNode"
import type {InputMotorShowCreate} from "../../../../../../src/db/node-types/motor-shows/types/InputMotorShowCreate"
import type {MotorShowNode} from "../../../../../../src/db/node-types/motor-shows/types/MotorShowNode"

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
        const inputData = createdNode.properties as unknown as InputMotorShowCreate
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
        const inputData = createdNode.properties as unknown as InputMotorShowCreate
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.name = null
        const updatedNode = await updateDbNode(DbNodeType.MotorShow, createdNode.properties.id, inputData) as MotorShowNode

        expect(updatedNode.properties.name)
            .toBeNull()
    })
})
