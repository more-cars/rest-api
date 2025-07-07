import FakeBrand from "../../../../fixtures/nodes/FakeBrand"
import FakeCarModel from "../../../../fixtures/nodes/FakeCarModel"
import FakeImage from "../../../../fixtures/nodes/FakeImage"
import {Brand} from "../../../../../src/models/brands/Brand"
import {CarModel} from "../../../../../src/models/car-models/CarModel"
import {Image} from "../../../../../src/models/images/Image"

test('ID is added when creating a node', async () => {
    const createdBrand = await Brand.create(FakeBrand)
    expect(createdBrand.id)
        .toBeGreaterThanOrEqual(12000000)
    expect(createdBrand.id)
        .toBeLessThanOrEqual(99999999)

    const createdCarModel = await CarModel.create(FakeCarModel)
    expect(createdCarModel.id)
        .toBeGreaterThanOrEqual(12000000)
    expect(createdCarModel.id)
        .toBeLessThanOrEqual(99999999)

    const createdImage = await Image.create(FakeImage)
    expect(createdImage.id)
        .toBeGreaterThanOrEqual(12000000)
    expect(createdImage.id)
        .toBeLessThanOrEqual(99999999)
})
