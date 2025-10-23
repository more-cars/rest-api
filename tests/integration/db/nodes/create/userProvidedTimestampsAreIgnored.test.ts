import {expect, test} from 'vitest'
import {FakeNodeInput} from "../../../../_toolbox/fixtures/nodes/FakeNodeInput"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {InputBrandCreate} from "../../../../../src/db/nodes/brands/types/InputBrandCreate"
import {createNode as createBrandNode} from "../../../../../src/db/nodes/brands/createNode"
import FakeCarModel from "../../../../_toolbox/fixtures/nodes/FakeCarModel"
import {InputCarModelCreate} from "../../../../../src/db/nodes/car-models/types/InputCarModelCreate"
import {createNode as createCarModelNode} from "../../../../../src/db/nodes/car-models/createNode"
import FakeImageFull from "../../../../_toolbox/fixtures/nodes/FakeImageFull"
import {InputImageCreate} from "../../../../../src/db/nodes/images/types/InputImageCreate"
import {createNode as createImageNode} from "../../../../../src/db/nodes/images/createNode"

test('Timestamps provided by the user are ignored', async () => {
    // BRAND
    const brandData = FakeNodeInput(NodeTypeEnum.BRAND) as InputBrandCreate
    const createdBrand = await createBrandNode(brandData)

    expect(createdBrand).toHaveProperty('created_at')
    expect(createdBrand).not.toHaveProperty('created_at', "blubb")
    expect(createdBrand).toHaveProperty('updated_at')
    expect(createdBrand).not.toHaveProperty('updated_at', "blobb")

    // CAR MODEL
    const carModelData: InputCarModelCreate = FakeCarModel
    // @ts-expect-error property "created_at" is officially not allowed
    carModelData['created_at'] = "blubb"
    // @ts-expect-error property "updated_at" is officially not allowed
    carModelData['updated_at'] = "blobb"
    const createdCarModel = await createCarModelNode(carModelData)

    expect(createdCarModel).toHaveProperty('created_at')
    expect(createdCarModel).not.toHaveProperty('created_at', "blubb")
    expect(createdCarModel).toHaveProperty('updated_at')
    expect(createdCarModel).not.toHaveProperty('updated_at', "blobb")

    // IMAGE
    const imageData: InputImageCreate = FakeImageFull
    // @ts-expect-error property "created_at" is officially not allowed
    imageData['created_at'] = "blubb"
    // @ts-expect-error property "updated_at" is officially not allowed
    imageData['updated_at'] = "blobb"
    const createdImage = await createImageNode(imageData)

    expect(createdImage).toHaveProperty('created_at')
    expect(createdImage).not.toHaveProperty('created_at', "blubb")
    expect(createdImage).toHaveProperty('updated_at')
    expect(createdImage).not.toHaveProperty('updated_at', "blobb")
})
