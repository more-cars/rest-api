import {expect, test} from 'vitest'
import {createNode as createBrandNode} from "../../../../../src/db/nodes/brands/createNode"
import {createNode as createCarModelNode} from "../../../../../src/db/nodes/car-models/createNode"
import {createNode as createImageNode} from "../../../../../src/db/nodes/images/createNode"
import FakeBrand from "../../../../_toolbox/fixtures/nodes/FakeBrand"
import FakeCarModel from "../../../../_toolbox/fixtures/nodes/FakeCarModel"
import FakeImageFull from "../../../../_toolbox/fixtures/nodes/FakeImageFull"

test('Timestamps are identical when creating a node', async () => {
    const createdBrand = await createBrandNode(FakeBrand)
    expect(createdBrand.created_at)
        .toEqual(createdBrand.updated_at)

    const createdCarModel = await createCarModelNode(FakeCarModel)
    expect(createdCarModel.created_at)
        .toEqual(createdCarModel.updated_at)

    const createdImage = await createImageNode(FakeImageFull)
    expect(createdImage.created_at)
        .toEqual(createdImage.updated_at)
})
