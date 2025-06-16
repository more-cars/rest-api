import FakeCarModel from "../../../../fixtures/nodes/FakeCarModel"
import FakeBrand from "../../../../fixtures/nodes/FakeBrand"
import FakeImage from "../../../../fixtures/nodes/FakeImage"
import {CarModel} from "../../../../../src/models/car-models/CarModel"
import {Brand} from "../../../../../src/models/brands/Brand"
import {Image} from "../../../../../src/models/images/Image"

test('Unknown properties are ignored', async () => {
    let createdNode

    // CAR MODEL
    const carModelData = Object.assign(FakeCarModel, {
        "my_property": "NOT_ALLOWED_TO_ADD"
    })
    createdNode = await CarModel.create(carModelData)
    expect(createdNode)
        .not.toContain("my_property")

    // BRAND
    const brandData = Object.assign(FakeBrand, {
        "my_property": "NOT_ALLOWED_TO_ADD"
    })
    createdNode = await Brand.create(brandData)
    expect(createdNode)
        .not.toContain("my_property")

    const imageData = Object.assign(FakeImage, {
        "my_property": "NOT_ALLOWED_TO_ADD"
    })
    createdNode = await Image.create(imageData)
    expect(createdNode)
        .not.toContain("my_property")
})
