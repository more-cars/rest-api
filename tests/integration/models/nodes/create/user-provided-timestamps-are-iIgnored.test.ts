import {expect, test} from 'vitest'
import {getExhaustiveFakeInputDataForDbNode} from "../../../../_toolbox/fixtures/nodes/getExhaustiveFakeInputDataForDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import type {InputBrandCreate} from "../../../../../src/db/node-types/brands/types/InputBrandCreate"
import type {InputCarModelCreate} from "../../../../../src/db/node-types/car-models/types/InputCarModelCreate"
import type {InputImageCreate} from "../../../../../src/db/node-types/images/types/InputImageCreate"
import {Brand} from "../../../../../src/models/node-types/brands/Brand"
import {CarModel} from "../../../../../src/models/node-types/car-models/CarModel"
import {Image} from "../../../../../src/models/node-types/images/Image"

test('Timestamps provided by the user are ignored', async () => {
    // BRAND
    const brandData = getExhaustiveFakeInputDataForDbNode(DbNodeType.Brand) as InputBrandCreate
    const createdBrand = await Brand.create(brandData)

    expect(createdBrand.attributes).toHaveProperty('created_at')
    expect(createdBrand.attributes).not.toHaveProperty('created_at', "blubb")
    expect(createdBrand.attributes).toHaveProperty('updated_at')
    expect(createdBrand.attributes).not.toHaveProperty('updated_at', "blobb")

    // CAR MODEL
    const carModelData = getExhaustiveFakeInputDataForDbNode(DbNodeType.CarModel) as InputCarModelCreate
    const createdCarModel = await CarModel.create(carModelData)

    expect(createdCarModel.attributes).toHaveProperty('created_at')
    expect(createdCarModel.attributes).not.toHaveProperty('created_at', "blubb")
    expect(createdCarModel.attributes).toHaveProperty('updated_at')
    expect(createdCarModel.attributes).not.toHaveProperty('updated_at', "blobb")

    // IMAGE
    const imageData: InputImageCreate = getExhaustiveFakeInputDataForDbNode(DbNodeType.Image) as InputImageCreate
    const createdImage = await Image.create(imageData)

    expect(createdImage.attributes).toHaveProperty('created_at')
    expect(createdImage.attributes).not.toHaveProperty('created_at', "blubb")
    expect(createdImage.attributes).toHaveProperty('updated_at')
    expect(createdImage.attributes).not.toHaveProperty('updated_at', "blobb")
})
