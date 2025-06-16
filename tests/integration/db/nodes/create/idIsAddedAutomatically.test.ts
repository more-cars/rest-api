import {createNode as createBrandNode} from "../../../../../src/db/brands/createNode"
import {createNode as createCarModelNode} from "../../../../../src/db/car-models/createNode"
import {createNode as createImageNode} from "../../../../../src/db/images/createNode"
import FakeBrand from "../../../../fixtures/nodes/FakeBrand"
import FakeCarModel from "../../../../fixtures/nodes/FakeCarModel"
import FakeImageFull from "../../../../fixtures/nodes/FakeImageFull"

test('ID is added when creating a node', async () => {
    const createdBrand = await createBrandNode(FakeBrand)
    expect(createdBrand.id)
        .toBeGreaterThan(0)
    expect(createdBrand.id)
        .toBeLessThan(4294967296)

    const createdCarModel = await createCarModelNode(FakeCarModel)
    expect(createdCarModel.id)
        .toBeGreaterThan(0)
    expect(createdCarModel.id)
        .toBeLessThan(4294967296)

    const createdImage = await createImageNode(FakeImageFull)
    expect(createdImage.id)
        .toBeGreaterThan(0)
    expect(createdImage.id)
        .toBeLessThan(4294967296)
})
