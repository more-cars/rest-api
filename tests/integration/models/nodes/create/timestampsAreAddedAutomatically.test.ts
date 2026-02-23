import {expect, test} from 'vitest'
import moment from "moment"
import {Brand} from "../../../../../src/models/node-types/brands/Brand"
import {CarModel} from "../../../../../src/models/node-types/car-models/CarModel"
import {Image} from "../../../../../src/models/node-types/images/Image"
import {FakeNodeInput} from "../../../../_toolbox/fixtures/nodes/FakeNodeInput"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {InputBrandCreate} from "../../../../../src/db/node-types/brands/types/InputBrandCreate"
import type {InputCarModelCreate} from "../../../../../src/db/node-types/car-models/types/InputCarModelCreate"
import type {InputImageCreate} from "../../../../../src/db/node-types/images/types/InputImageCreate"

test('Timestamps are added when creating a node', async () => {
    const createdBrand = await Brand.create(FakeNodeInput(ControllerNodeType.Brand) as InputBrandCreate)
    expect(createdBrand.attributes)
        .toHaveProperty('created_at')
    expect(moment(createdBrand.attributes.created_at).isValid())
        .toEqual(true)
    expect(createdBrand.attributes)
        .toHaveProperty('updated_at')
    expect(moment(createdBrand.attributes.updated_at).isValid())
        .toEqual(true)

    const createdCarModel = await CarModel.create(FakeNodeInput(ControllerNodeType.CarModel) as InputCarModelCreate)
    expect(createdCarModel.attributes)
        .toHaveProperty('created_at')
    expect(moment(createdCarModel.attributes.created_at).isValid())
        .toEqual(true)
    expect(createdCarModel.attributes)
        .toHaveProperty('updated_at')
    expect(moment(createdCarModel.attributes.updated_at).isValid())
        .toEqual(true)

    const createdImage = await Image.create(FakeNodeInput(ControllerNodeType.Image) as InputImageCreate)
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
    const createdBrand = await Brand.create(FakeNodeInput(ControllerNodeType.Brand) as InputBrandCreate)
    expect(moment(createdBrand.attributes.created_at).isValid())
    expect(moment(createdBrand.attributes.updated_at).isValid())

    const createdCarModel = await CarModel.create(FakeNodeInput(ControllerNodeType.CarModel) as InputCarModelCreate)
    expect(moment(createdCarModel.attributes.created_at).isValid())
    expect(moment(createdCarModel.attributes.updated_at).isValid())

    const createdImage = await Image.create(FakeNodeInput(ControllerNodeType.Image) as InputImageCreate)
    expect(moment(createdImage.attributes.created_at).isValid())
    expect(moment(createdImage.attributes.updated_at).isValid())
})
