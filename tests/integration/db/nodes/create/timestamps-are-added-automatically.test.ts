import {expect, test} from 'vitest'
import {createNode as createBrandNode} from "../../../../../src/db/node-types/brands/createNode"
import {createNode as createCarModelNode} from "../../../../../src/db/node-types/car-models/createNode"
import {createNode as createImageNode} from "../../../../../src/db/node-types/images/createNode"
import {FakeBrand} from "../../../../_toolbox/fixtures/nodes/FakeBrand"
import {FakeCarModel} from "../../../../_toolbox/fixtures/nodes/FakeCarModel"
import {FakeImage} from "../../../../_toolbox/fixtures/nodes/FakeImage"

test('Timestamps are added when creating a node', async () => {
    const createdBrand = await createBrandNode(FakeBrand.dbInput)
    expect(createdBrand.properties)
        .toHaveProperty('created_at')
    expect(createdBrand.properties)
        .toHaveProperty('updated_at')

    const createdCarModel = await createCarModelNode(FakeCarModel.dbInput)
    expect(createdCarModel.properties)
        .toHaveProperty('created_at')
    expect(createdCarModel.properties)
        .toHaveProperty('updated_at')

    const createdImage = await createImageNode(FakeImage.dbInput)
    expect(createdImage.properties)
        .toHaveProperty('created_at')
    expect(createdImage.properties)
        .toHaveProperty('updated_at')
})
