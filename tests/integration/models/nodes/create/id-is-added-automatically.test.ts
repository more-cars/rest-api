import {expect, test} from 'vitest'
import {Brand} from "../../../../../src/models/node-types/brands/Brand"
import {CarModel} from "../../../../../src/models/node-types/car-models/CarModel"
import {Image} from "../../../../../src/models/node-types/images/Image"
import {FakeBrand} from "../../../../_toolbox/fixtures/nodes/FakeBrand"
import {FakeCarModel} from "../../../../_toolbox/fixtures/nodes/FakeCarModel"
import {FakeImage} from "../../../../_toolbox/fixtures/nodes/FakeImage"

test('ID is added when creating a node', async () => {
    const createdBrand = await Brand.create(FakeBrand.dbInput)
    expect(createdBrand.attributes.id)
        .toBeGreaterThanOrEqual(12000000)
    expect(createdBrand.attributes.id)
        .toBeLessThanOrEqual(99999999)

    const createdCarModel = await CarModel.create(FakeCarModel.dbInput)
    expect(createdCarModel.attributes.id)
        .toBeGreaterThanOrEqual(12000000)
    expect(createdCarModel.attributes.id)
        .toBeLessThanOrEqual(99999999)

    const createdImage = await Image.create(FakeImage.dbInput)
    expect(createdImage.attributes.id)
        .toBeGreaterThanOrEqual(12000000)
    expect(createdImage.attributes.id)
        .toBeLessThanOrEqual(99999999)
})
