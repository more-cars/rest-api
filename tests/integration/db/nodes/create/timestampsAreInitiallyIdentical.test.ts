import FakeBrand from "../../../../fixtures/nodes/FakeBrand"
import FakeCarModel from "../../../../fixtures/nodes/FakeCarModel"
import {createNode as createBrandNode} from "../../../../../src/db/brands/createNode"
import {createNode as createCarModelNode} from "../../../../../src/db/car-models/createNode"

describe('Create Node', () => {
    test('Timestamps are identical when creating a node', async () => {
        const createdBrand = await createBrandNode(FakeBrand)
        expect(createdBrand.created_at)
            .toEqual(createdBrand.updated_at)

        const createdCarModel = await createCarModelNode(FakeCarModel)
        expect(createdCarModel.created_at)
            .toEqual(createdCarModel.updated_at)
    })
})
