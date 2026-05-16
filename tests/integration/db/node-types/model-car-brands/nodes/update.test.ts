import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {FakeModelCarBrand} from "../../../../../_toolbox/fixtures/nodes/FakeModelCarBrand"
import {updateDbNode} from "../../../../../../src/db/nodes/updateDbNode"
import type {InputModelCarBrandCreate} from "../../../../../../src/db/node-types/model-car-brands/types/InputModelCarBrandCreate"
import type {ModelCarBrandNode} from "../../../../../../src/db/node-types/model-car-brands/types/ModelCarBrandNode"

describe('Updating MODEL CAR BRAND', () => {
    test('with valid data', async () => {
        const createdNode = await seedNode(DbNodeType.ModelCarBrand)
        const inputData = FakeModelCarBrand.dbInput()
        const updatedNode = await updateDbNode(DbNodeType.ModelCarBrand, createdNode.properties.id, inputData)

        expect(updatedNode.properties)
            .not.toEqual(expect.objectContaining(createdNode.properties))

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with the same data', async () => {
        const createdNode = await seedNode(DbNodeType.ModelCarBrand)
        const inputData = createdNode.properties as unknown as InputModelCarBrandCreate
        const updatedNode = await updateDbNode(DbNodeType.ModelCarBrand, createdNode.properties.id, inputData)

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
        const createdNode = await seedNode(DbNodeType.ModelCarBrand)
        const inputData = createdNode.properties as unknown as InputModelCarBrandCreate
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.name = null
        const updatedNode = await updateDbNode(DbNodeType.ModelCarBrand, createdNode.properties.id, inputData) as ModelCarBrandNode

        expect(updatedNode.properties.name)
            .toBeNull()
    })
})
