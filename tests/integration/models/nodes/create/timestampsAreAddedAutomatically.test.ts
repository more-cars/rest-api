import {expect, test} from 'vitest'
import {Brand} from "../../../../../src/models/brands/Brand"
import {CarModel} from "../../../../../src/models/car-models/CarModel"
import {Image} from "../../../../../src/models/images/Image"
import FakeBrand from "../../../../_toolbox/fixtures/nodes/FakeBrand"
import FakeCarModel from "../../../../_toolbox/fixtures/nodes/FakeCarModel"
import FakeImage from "../../../../_toolbox/fixtures/nodes/FakeImage"
import moment from "moment"

test('Timestamps are added when creating a node', async () => {
    const createdBrand = await Brand.create(FakeBrand)
    expect(createdBrand)
        .toHaveProperty('created_at')
    expect(moment(createdBrand.created_at).isValid())
        .toEqual(true)
    expect(createdBrand)
        .toHaveProperty('updated_at')
    expect(moment(createdBrand.updated_at).isValid())
        .toEqual(true)

    const createdCarModel = await CarModel.create(FakeCarModel)
    expect(createdCarModel)
        .toHaveProperty('created_at')
    expect(moment(createdCarModel.created_at).isValid())
        .toEqual(true)
    expect(createdCarModel)
        .toHaveProperty('updated_at')
    expect(moment(createdCarModel.updated_at).isValid())
        .toEqual(true)

    const createdImage = await Image.create(FakeImage)
    expect(createdImage)
        .toHaveProperty('created_at')
    expect(moment(createdImage.created_at).isValid())
        .toEqual(true)
    expect(createdImage)
        .toHaveProperty('updated_at')
    expect(moment(createdImage.updated_at).isValid())
        .toEqual(true)
})

test('Timestamps have valid dates', async () => {
    const createdBrand = await Brand.create(FakeBrand)
    expect(moment(createdBrand.created_at).isValid())
    expect(moment(createdBrand.updated_at).isValid())

    const createdCarModel = await CarModel.create(FakeCarModel)
    expect(moment(createdCarModel.created_at).isValid())
    expect(moment(createdCarModel.updated_at).isValid())

    const createdImage = await Image.create(FakeImage)
    expect(moment(createdImage.created_at).isValid())
    expect(moment(createdImage.updated_at).isValid())
})
