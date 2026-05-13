import {describe, expect, test} from 'vitest'
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {FakeCarModelVariant} from "../../../../../../_toolbox/fixtures/nodes/FakeCarModelVariant"
import type {CarModelVariantInput} from "../../../../../../../src/models/node-types/car-model-variants/types/CarModelVariantInput"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Updating a CAR MODEL VARIANT', () => {
    test('Node does not exist', async () => {
        await expect(CarModelVariant.update(-42, FakeCarModelVariant.dbInput() as CarModelVariantInput))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('Node exists', async () => {
        const createdNode = await seedNode(DbNodeType.CarModelVariant)
        const inputData = FakeCarModelVariant.dbInput()
        const updatedNode = await CarModelVariant.update(createdNode.properties.id, inputData as CarModelVariantInput)

        expect(updatedNode.attributes)
            .toEqual(expect.objectContaining(inputData))
    })

    test('Trying to override read-only properties', async () => {
        const createdNode = await seedNode(DbNodeType.CarModelVariant)
        const validData = FakeCarModelVariant.dbInput()
        const readOnlyData = {
            id: 9999,
            created_at: "NOT_ALLOWED_TO_OVERWRITE",
            updated_at: "NOT_ALLOWED_TO_OVERWRITE",
        }
        const inputData = Object.assign({}, validData, readOnlyData)

        const updatedNode = await CarModelVariant.update(createdNode.properties.id, inputData as CarModelVariantInput)

        expect(updatedNode.attributes)
            .not.toEqual(expect.objectContaining(readOnlyData))
    })
})
