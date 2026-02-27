import {expect, test} from 'vitest'
import {createNode as createBrandNode} from "../../../../../src/db/node-types/brands/createNode"
import {createNode as createCarModelNode} from "../../../../../src/db/node-types/car-models/createNode"
import {createNode as createImageNode} from "../../../../../src/db/node-types/images/createNode"
import {FakeBrand} from "../../../../_toolbox/fixtures/nodes/FakeBrand"
import {FakeCarModel} from "../../../../_toolbox/fixtures/nodes/FakeCarModel"
import {FakeImage} from "../../../../_toolbox/fixtures/nodes/FakeImage"

test('ID is added when creating a node', async () => {
    const createdBrand = await createBrandNode(FakeBrand.dbInput)
    expect(createdBrand.properties.id)
        .toBeGreaterThanOrEqual(12000000)
    expect(createdBrand.properties.id)
        .toBeLessThanOrEqual(99999999)

    const createdCarModel = await createCarModelNode(FakeCarModel.dbInput)
    expect(createdCarModel.properties.id)
        .toBeGreaterThanOrEqual(12000000)
    expect(createdCarModel.properties.id)
        .toBeLessThanOrEqual(99999999)

    const createdImage = await createImageNode(FakeImage.dbInput)
    expect(createdImage.properties.id)
        .toBeGreaterThanOrEqual(12000000)
    expect(createdImage.properties.id)
        .toBeLessThanOrEqual(99999999)
})
