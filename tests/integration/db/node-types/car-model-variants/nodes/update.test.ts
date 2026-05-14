import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {FakeCarModelVariant} from "../../../../../_toolbox/fixtures/nodes/FakeCarModelVariant"
import {updateDbNode} from "../../../../../../src/db/nodes/updateDbNode"
import type {InputCarModelVariantCreate} from "../../../../../../src/db/node-types/car-model-variants/types/InputCarModelVariantCreate"
import type {CarModelVariantNode} from "../../../../../../src/db/node-types/car-model-variants/types/CarModelVariantNode"

describe('Updating CAR MODEL VARIANT', () => {
    test('with valid data', async () => {
        const createdNode = await seedNode(DbNodeType.CarModelVariant)
        const inputData = FakeCarModelVariant.dbInput()
        const updatedNode = await updateDbNode(DbNodeType.CarModelVariant, createdNode.properties.id, inputData)

        expect(updatedNode.properties)
            .not.toEqual(expect.objectContaining(createdNode.properties))

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with the same data', async () => {
        const createdNode = await seedNode(DbNodeType.CarModelVariant)
        const inputData = createdNode.properties as unknown as InputCarModelVariantCreate
        const updatedNode = await updateDbNode(DbNodeType.CarModelVariant, createdNode.properties.id, inputData)

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
        const createdNode = await seedNode(DbNodeType.CarModelVariant)
        const inputData = createdNode.properties as unknown as InputCarModelVariantCreate
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.name = null
        const updatedNode = await updateDbNode(DbNodeType.CarModelVariant, createdNode.properties.id, inputData) as CarModelVariantNode

        expect(updatedNode.properties.name)
            .toBeNull()
    })
})
