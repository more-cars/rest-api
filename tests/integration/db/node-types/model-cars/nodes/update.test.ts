import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {FakeModelCar} from "../../../../../_toolbox/fixtures/nodes/FakeModelCar"
import {updateDbNode} from "../../../../../../src/db/nodes/updateDbNode"
import type {DbInputData} from "../../../../../../src/db/types/DbInputData"
import type {ModelCarNode} from "../../../../../../src/db/node-types/model-cars/types/ModelCarNode"

describe('Updating MODEL CAR', () => {
    test('with valid data', async () => {
        const createdNode = await seedNode(DbNodeType.ModelCar)
        const inputData = FakeModelCar.dbInput()
        const updatedNode = await updateDbNode(DbNodeType.ModelCar, createdNode.properties.id, inputData)

        expect(updatedNode.properties)
            .not.toEqual(expect.objectContaining(createdNode.properties))

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with the same data', async () => {
        const createdNode = await seedNode(DbNodeType.ModelCar)
        const inputData = createdNode.properties as DbInputData
        const updatedNode = await updateDbNode(DbNodeType.ModelCar, createdNode.properties.id, inputData)

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
        const createdNode = await seedNode(DbNodeType.ModelCar)
        const inputData = createdNode.properties as DbInputData
        inputData.name = null

        const updatedNode = await updateDbNode(DbNodeType.ModelCar, createdNode.properties.id, inputData) as ModelCarNode

        expect(updatedNode.properties.name)
            .toBeNull()
    })
})
