import {describe, expect, test} from 'vitest'
import {ModelCarBrand} from "../../../../../../../src/models/node-types/model-car-brands/ModelCarBrand"
import {FakeModelCarBrand} from "../../../../../../_toolbox/fixtures/nodes/FakeModelCarBrand"
import type {ModelCarBrandInput} from "../../../../../../../src/models/node-types/model-car-brands/types/ModelCarBrandInput"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Updating a MODEL CAR BRAND', () => {
    test('Node does not exist', async () => {
        await expect(ModelCarBrand.update(-42, FakeModelCarBrand.dbInput() as ModelCarBrandInput))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('Node exists', async () => {
        const createdNode = await seedNode(DbNodeType.ModelCarBrand)
        const inputData = FakeModelCarBrand.dbInput()
        const updatedNode = await ModelCarBrand.update(createdNode.properties.id, inputData as ModelCarBrandInput)

        expect(updatedNode.attributes)
            .toEqual(expect.objectContaining(inputData))
    })

    test('Trying to override read-only properties', async () => {
        const createdNode = await seedNode(DbNodeType.ModelCarBrand)
        const validData = FakeModelCarBrand.dbInput()
        const readOnlyData = {
            id: 9999,
            created_at: "NOT_ALLOWED_TO_OVERWRITE",
            updated_at: "NOT_ALLOWED_TO_OVERWRITE",
        }
        const inputData = Object.assign({}, validData, readOnlyData)

        const updatedNode = await ModelCarBrand.update(createdNode.properties.id, inputData as ModelCarBrandInput)

        expect(updatedNode.attributes)
            .not.toEqual(expect.objectContaining(readOnlyData))
    })
})
