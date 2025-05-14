import {createNode as createBrandNode} from "../../../../../src/db/brands/createNode"
import {createNode as createCarModelNode} from "../../../../../src/db/car-models/createNode"
import FakeBrand from "../../../../fixtures/nodes/FakeBrand"
import FakeCarModel from "../../../../fixtures/nodes/FakeCarModel"

describe('Create Node', () => {
    test('ID is added when creating a node', async () => {
        const createdBrand = await createBrandNode(FakeBrand)
        expect(createdBrand.id)
            .toBeGreaterThan(0)

        const createdCarModel = await createCarModelNode(FakeCarModel)
        expect(createdCarModel.id)
            .toBeGreaterThan(0)
    })
})
