import FakeBrand from "../../../../fixtures/nodes/FakeBrand"
import FakeCarModel from "../../../../fixtures/nodes/FakeCarModel"
import FakeImage from "../../../../fixtures/nodes/FakeImage"
import {Brand} from "../../../../../src/models/brands/Brand"
import {CarModel} from "../../../../../src/models/car-models/CarModel"
import {Image} from "../../../../../src/models/images/Image"

test('ID is added when creating a node', async () => {
    const createdBrand = await Brand.create(FakeBrand)
    expect(createdBrand.id)
        .toBeGreaterThan(0)
    expect(createdBrand.id)
        .toBeLessThan(4294967296)

    const createdCarModel = await CarModel.create(FakeCarModel)
    expect(createdCarModel.id)
        .toBeGreaterThan(0)
    expect(createdCarModel.id)
        .toBeLessThan(4294967296)

    const createdImage = await Image.create(FakeImage)
    expect(createdImage.id)
        .toBeGreaterThan(0)
    expect(createdImage.id)
        .toBeLessThan(4294967296)
})
