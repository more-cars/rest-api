import {createNode as createBrandNode} from "../../../../../src/db/nodes/brands/createNode"
import {createNode as createCarModelNode} from "../../../../../src/db/nodes/car-models/createNode"
import {createNode as createImageNode} from "../../../../../src/db/nodes/images/createNode"
import FakeBrand from "../../../../fixtures/nodes/FakeBrand"
import FakeCarModel from "../../../../fixtures/nodes/FakeCarModel"
import FakeImageFull from "../../../../fixtures/nodes/FakeImageFull"

test('ID is added when creating a node', async () => {
    const createdBrand = await createBrandNode(FakeBrand)
    expect(createdBrand.id)
        .toBeGreaterThanOrEqual(12000000)
    expect(createdBrand.id)
        .toBeLessThanOrEqual(99999999)

    const createdCarModel = await createCarModelNode(FakeCarModel)
    expect(createdCarModel.id)
        .toBeGreaterThanOrEqual(12000000)
    expect(createdCarModel.id)
        .toBeLessThanOrEqual(99999999)

    const createdImage = await createImageNode(FakeImageFull)
    expect(createdImage.id)
        .toBeGreaterThanOrEqual(12000000)
    expect(createdImage.id)
        .toBeLessThanOrEqual(99999999)
})
