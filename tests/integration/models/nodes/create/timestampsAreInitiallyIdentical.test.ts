import {Brand} from "../../../../../src/models/brands/Brand"
import {CarModel} from "../../../../../src/models/car-models/CarModel"
import {Image} from "../../../../../src/models/images/Image"
import FakeBrand from "../../../../fixtures/nodes/FakeBrand"
import FakeCarModel from "../../../../fixtures/nodes/FakeCarModel"
import FakeImage from "../../../../fixtures/nodes/FakeImage"

test('Timestamps are identical when creating a node', async () => {
    const createdBrand = await Brand.create(FakeBrand)
    expect(createdBrand.created_at)
        .toEqual(createdBrand.updated_at)

    const createdCarModel = await CarModel.create(FakeCarModel)
    expect(createdCarModel.created_at)
        .toEqual(createdCarModel.updated_at)

    const createdImage = await Image.create(FakeImage)
    expect(createdImage.created_at)
        .toEqual(createdImage.updated_at)
})
