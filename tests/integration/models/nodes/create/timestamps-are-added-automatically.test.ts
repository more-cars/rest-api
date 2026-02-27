import {expect, test} from 'vitest'
import moment from "moment"
import {Brand} from "../../../../../src/models/node-types/brands/Brand"
import {CarModel} from "../../../../../src/models/node-types/car-models/CarModel"
import {Image} from "../../../../../src/models/node-types/images/Image"
import {FakeBrand} from "../../../../_toolbox/fixtures/nodes/FakeBrand"
import {FakeCarModel} from "../../../../_toolbox/fixtures/nodes/FakeCarModel"
import {FakeImage} from "../../../../_toolbox/fixtures/nodes/FakeImage"

test('Timestamps are added when creating a node', async () => {
    const createdBrand = await Brand.create(FakeBrand.dbInput)
    expect(createdBrand.attributes)
        .toHaveProperty('created_at')
    expect(moment(createdBrand.attributes.created_at).isValid())
        .toEqual(true)
    expect(createdBrand.attributes)
        .toHaveProperty('updated_at')
    expect(moment(createdBrand.attributes.updated_at).isValid())
        .toEqual(true)

    const createdCarModel = await CarModel.create(FakeCarModel.dbInput)
    expect(createdCarModel.attributes)
        .toHaveProperty('created_at')
    expect(moment(createdCarModel.attributes.created_at).isValid())
        .toEqual(true)
    expect(createdCarModel.attributes)
        .toHaveProperty('updated_at')
    expect(moment(createdCarModel.attributes.updated_at).isValid())
        .toEqual(true)

    const createdImage = await Image.create(FakeImage.dbInput)
    expect(createdImage.attributes)
        .toHaveProperty('created_at')
    expect(moment(createdImage.attributes.created_at).isValid())
        .toEqual(true)
    expect(createdImage.attributes)
        .toHaveProperty('updated_at')
    expect(moment(createdImage.attributes.updated_at).isValid())
        .toEqual(true)
})

test('Timestamps have valid dates', async () => {
    const createdBrand = await Brand.create(FakeBrand.dbInput)
    expect(moment(createdBrand.attributes.created_at).isValid())
    expect(moment(createdBrand.attributes.updated_at).isValid())

    const createdCarModel = await CarModel.create(FakeCarModel.dbInput)
    expect(moment(createdCarModel.attributes.created_at).isValid())
    expect(moment(createdCarModel.attributes.updated_at).isValid())

    const createdImage = await Image.create(FakeImage.dbInput)
    expect(moment(createdImage.attributes.created_at).isValid())
    expect(moment(createdImage.attributes.updated_at).isValid())
})
