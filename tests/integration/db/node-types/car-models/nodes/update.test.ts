import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {FakeCarModel} from "../../../../../_toolbox/fixtures/nodes/FakeCarModel"
import {updateDbNode} from "../../../../../../src/db/nodes/updateDbNode"
import type {InputCarModelCreate} from "../../../../../../src/db/node-types/car-models/types/InputCarModelCreate"
import type {CarModelNode} from "../../../../../../src/db/node-types/car-models/types/CarModelNode"

describe('Updating CAR MODEL', () => {
    test('with valid data', async () => {
        const createdNode = await seedNode(DbNodeType.CarModel)
        const inputData = FakeCarModel.dbInput()
        const updatedNode = await updateDbNode(DbNodeType.CarModel, createdNode.properties.id, inputData)

        expect(updatedNode.properties)
            .not.toEqual(expect.objectContaining(createdNode.properties))

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with the same data', async () => {
        const createdNode = await seedNode(DbNodeType.CarModel)
        const inputData = createdNode.properties as unknown as InputCarModelCreate
        const updatedNode = await updateDbNode(DbNodeType.CarModel, createdNode.properties.id, inputData)

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
        const createdNode = await seedNode(DbNodeType.CarModel)
        const inputData = createdNode.properties as unknown as InputCarModelCreate
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.name = null
        const updatedNode = await updateDbNode(DbNodeType.CarModel, createdNode.properties.id, inputData) as CarModelNode

        expect(updatedNode.properties.name)
            .toBeNull()
    })
})
