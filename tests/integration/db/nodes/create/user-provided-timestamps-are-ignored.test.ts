import {expect, test} from 'vitest'
import {getExhaustiveFakeInputDataForDbNode} from "../../../../_toolbox/fixtures/nodes/getExhaustiveFakeInputDataForDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import type {InputBrandCreate} from "../../../../../src/db/node-types/brands/types/InputBrandCreate"
import type {InputCarModelCreate} from "../../../../../src/db/node-types/car-models/types/InputCarModelCreate"
import type {InputImageCreate} from "../../../../../src/db/node-types/images/types/InputImageCreate"
import {createNode as createBrandNode} from "../../../../../src/db/node-types/brands/createNode"
import {createNode as createCarModelNode} from "../../../../../src/db/node-types/car-models/createNode"
import {createNode as createImageNode} from "../../../../../src/db/node-types/images/createNode"
import FakeImageFull from "../../../../_toolbox/fixtures/nodes/FakeImageFull"

test('Timestamps provided by the user are ignored', async () => {
    // BRAND
    const brandData = getExhaustiveFakeInputDataForDbNode(DbNodeType.Brand) as InputBrandCreate
    const createdBrand = await createBrandNode(brandData)

    expect(createdBrand.properties).toHaveProperty('created_at')
    expect(createdBrand.properties).not.toHaveProperty('created_at', "blubb")
    expect(createdBrand.properties).toHaveProperty('updated_at')
    expect(createdBrand.properties).not.toHaveProperty('updated_at', "blobb")

    // CAR MODEL
    const carModelData = getExhaustiveFakeInputDataForDbNode(DbNodeType.CarModel) as InputCarModelCreate
    const createdCarModel = await createCarModelNode(carModelData)

    expect(createdCarModel.properties).toHaveProperty('created_at')
    expect(createdCarModel.properties).not.toHaveProperty('created_at', "blubb")
    expect(createdCarModel.properties).toHaveProperty('updated_at')
    expect(createdCarModel.properties).not.toHaveProperty('updated_at', "blobb")

    // IMAGE
    const imageData: InputImageCreate = FakeImageFull
    const createdImage = await createImageNode(imageData)

    expect(createdImage.properties).toHaveProperty('created_at')
    expect(createdImage.properties).not.toHaveProperty('created_at', "blubb")
    expect(createdImage.properties).toHaveProperty('updated_at')
    expect(createdImage.properties).not.toHaveProperty('updated_at', "blobb")
})
