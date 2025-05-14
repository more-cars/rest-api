import FakeBrand from "../../../../fixtures/nodes/FakeBrand"
import FakeCarModel from "../../../../fixtures/nodes/FakeCarModel"
import {createNode as createBrandNode} from "../../../../../src/db/brands/createNode"
import {createNode as createCarModelNode} from "../../../../../src/db/car-models/createNode"

describe('Create Node', () => {
    test('Timestamps are added when creating a node', async () => {
        const createdBrand = await createBrandNode(FakeBrand)
        expect(createdBrand)
            .toHaveProperty('created_at')
        expect(createdBrand)
            .toHaveProperty('updated_at')

        const createdCarModel = await createCarModelNode(FakeCarModel)
        expect(createdCarModel)
            .toHaveProperty('created_at')
        expect(createdCarModel)
            .toHaveProperty('updated_at')
    })
})
