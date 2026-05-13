import {describe, expect, test} from 'vitest'
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {FakeCarModel} from "../../../../../../_toolbox/fixtures/nodes/FakeCarModel"
import type {CarModelInput} from "../../../../../../../src/models/node-types/car-models/types/CarModelInput"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Updating a CAR MODEL', () => {
    test('Node does not exist', async () => {
        await expect(CarModel.update(-42, FakeCarModel.dbInput() as CarModelInput))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('Node exists', async () => {
        const createdNode = await seedNode(DbNodeType.CarModel)
        const inputData = FakeCarModel.dbInput()
        const updatedNode = await CarModel.update(createdNode.properties.id, inputData as CarModelInput)

        expect(updatedNode.attributes)
            .toEqual(expect.objectContaining(inputData))
    })

    test('Trying to override read-only properties', async () => {
        const createdNode = await seedNode(DbNodeType.CarModel)
        const validData = FakeCarModel.dbInput()
        const readOnlyData = {
            id: 9999,
            created_at: "NOT_ALLOWED_TO_OVERWRITE",
            updated_at: "NOT_ALLOWED_TO_OVERWRITE",
        }
        const inputData = Object.assign({}, validData, readOnlyData)

        const updatedNode = await CarModel.update(createdNode.properties.id, inputData as CarModelInput)

        expect(updatedNode.attributes)
            .not.toEqual(expect.objectContaining(readOnlyData))
    })
})
