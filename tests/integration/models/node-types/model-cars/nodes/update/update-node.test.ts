import {describe, expect, test} from 'vitest'
import {ModelCar} from "../../../../../../../src/models/node-types/model-cars/ModelCar"
import {FakeModelCar} from "../../../../../../_toolbox/fixtures/nodes/FakeModelCar"
import type {ModelCarInput} from "../../../../../../../src/models/node-types/model-cars/types/ModelCarInput"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Updating a MODEL CAR', () => {
    test('Node does not exist', async () => {
        await expect(ModelCar.update(-42, FakeModelCar.dbInput() as ModelCarInput))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('Node exists', async () => {
        const createdNode = await seedNode(DbNodeType.ModelCar)
        const inputData = FakeModelCar.dbInput()
        const updatedNode = await ModelCar.update(createdNode.properties.id, inputData as ModelCarInput)

        expect(updatedNode.attributes)
            .toEqual(expect.objectContaining(inputData))
    })

    test('Trying to override read-only properties', async () => {
        const createdNode = await seedNode(DbNodeType.ModelCar)
        const validData = FakeModelCar.dbInput()
        const readOnlyData = {
            id: 9999,
            created_at: "NOT_ALLOWED_TO_OVERWRITE",
            updated_at: "NOT_ALLOWED_TO_OVERWRITE",
        }
        const inputData = Object.assign({}, validData, readOnlyData)

        const updatedNode = await ModelCar.update(createdNode.properties.id, inputData as ModelCarInput)

        expect(updatedNode.attributes)
            .not.toEqual(expect.objectContaining(readOnlyData))
    })
})
