import FakeBrand from "../../../../fixtures/nodes/FakeBrand"
import FakeCarModel from "../../../../fixtures/nodes/FakeCarModel"
import {Brand} from "../../../../../src/models/Brand"
import {CarModel} from "../../../../../src/models/CarModel"

describe('Create Node', () => {
    test('ID is added when creating a node', async () => {
        const createdBrand = await Brand.create(FakeBrand)
        expect(createdBrand.id)
            .toBeGreaterThan(0)

        const createdCarModel = await CarModel.create(FakeCarModel)
        expect(createdCarModel.id)
            .toBeGreaterThan(0)
    })
})
