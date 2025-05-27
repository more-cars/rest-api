import FakeBrand from "../../../../fixtures/nodes/FakeBrand"
import FakeCarModel from "../../../../fixtures/nodes/FakeCarModel"
import FakeImage from "../../../../fixtures/nodes/FakeImage"
import {Brand} from "../../../../../src/models/Brand"
import {CarModel} from "../../../../../src/models/CarModel"
import {Image} from "../../../../../src/models/Image"

describe('Create Node', () => {
    test('ID is added when creating a node', async () => {
        const createdBrand = await Brand.create(FakeBrand)
        expect(createdBrand.id)
            .toBeGreaterThan(0)

        const createdCarModel = await CarModel.create(FakeCarModel)
        expect(createdCarModel.id)
            .toBeGreaterThan(0)

        const createdImage = await Image.create(FakeImage)
        expect(createdImage.id)
            .toBeGreaterThan(0)
    })
})
