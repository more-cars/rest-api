import {createNode as createBrandNode} from "../../../../../src/db/nodes/brands/createNode"
import {createNode as createCarModelNode} from "../../../../../src/db/nodes/car-models/createNode"
import {createNode as createImageNode} from "../../../../../src/db/nodes/images/createNode"
import FakeBrand from "../../../../fixtures/nodes/FakeBrand"
import FakeCarModel from "../../../../fixtures/nodes/FakeCarModel"
import FakeImageFull from "../../../../fixtures/nodes/FakeImageFull"

test('Timestamps are added when creating a node', async () => {
    const createdBrand = await createBrandNode(FakeBrand)
    expect(createdBrand)
        .toHaveProperty('created_at')
    expect(createdBrand)
        .toHaveProperty('updated_at')

    const createdCarModel = await createCarModelNode(FakeCarModel)
    expect(createdCarModel)
        .toHaveProperty('created_at')
    expect(createdCarModel)
        .toHaveProperty('updated_at')

    const createdImage = await createImageNode(FakeImageFull)
    expect(createdImage)
        .toHaveProperty('created_at')
    expect(createdImage)
        .toHaveProperty('updated_at')
})
