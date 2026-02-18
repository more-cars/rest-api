import {expect, test} from 'vitest'
import moment from "moment"
import {Brand} from "../../../../../src/models/node-types/brands/Brand"
import {CarModel} from "../../../../../src/models/node-types/car-models/CarModel"
import {Image} from "../../../../../src/models/node-types/images/Image"
import {FakeNodeInput} from "../../../../_toolbox/fixtures/nodes/FakeNodeInput"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {InputBrandCreate} from "../../../../../src/db/nodes/brands/types/InputBrandCreate"
import type {InputCarModelCreate} from "../../../../../src/db/nodes/car-models/types/InputCarModelCreate"
import type {InputImageCreate} from "../../../../../src/db/nodes/images/types/InputImageCreate"

test('Timestamps are added when creating a node', async () => {
    const createdBrand = await Brand.create(FakeNodeInput(NodeTypeEnum.BRAND) as InputBrandCreate)
    expect(createdBrand)
        .toHaveProperty('created_at')
    expect(moment(createdBrand.created_at).isValid())
        .toEqual(true)
    expect(createdBrand)
        .toHaveProperty('updated_at')
    expect(moment(createdBrand.updated_at).isValid())
        .toEqual(true)

    const createdCarModel = await CarModel.create(FakeNodeInput(NodeTypeEnum.CAR_MODEL) as InputCarModelCreate)
    expect(createdCarModel)
        .toHaveProperty('created_at')
    expect(moment(createdCarModel.created_at).isValid())
        .toEqual(true)
    expect(createdCarModel)
        .toHaveProperty('updated_at')
    expect(moment(createdCarModel.updated_at).isValid())
        .toEqual(true)

    const createdImage = await Image.create(FakeNodeInput(NodeTypeEnum.IMAGE) as InputImageCreate)
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
    const createdBrand = await Brand.create(FakeNodeInput(NodeTypeEnum.BRAND) as InputBrandCreate)
    expect(moment(createdBrand.created_at).isValid())
    expect(moment(createdBrand.updated_at).isValid())

    const createdCarModel = await CarModel.create(FakeNodeInput(NodeTypeEnum.CAR_MODEL) as InputCarModelCreate)
    expect(moment(createdCarModel.created_at).isValid())
    expect(moment(createdCarModel.updated_at).isValid())

    const createdImage = await Image.create(FakeNodeInput(NodeTypeEnum.IMAGE) as InputImageCreate)
    expect(moment(createdImage.created_at).isValid())
    expect(moment(createdImage.updated_at).isValid())
})
