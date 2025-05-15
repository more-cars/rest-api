import FakeBrand from "../../../../fixtures/nodes/FakeBrand"
import FakeCarModel from "../../../../fixtures/nodes/FakeCarModel"
import {Brand} from "../../../../../src/models/Brand"
import {CarModel} from "../../../../../src/models/CarModel"

describe('Create Node', () => {
    test('Timestamps are identical when creating a node', async () => {
        const createdBrand = await Brand.create(FakeBrand)
        expect(createdBrand.created_at)
            .toEqual(createdBrand.updated_at)

        const createdCarModel = await CarModel.create(FakeCarModel)
        expect(createdCarModel.created_at)
            .toEqual(createdCarModel.updated_at)
    })
})
