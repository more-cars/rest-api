import {expect, test} from 'vitest'
import {FakeNodeInput} from "../../../../_toolbox/fixtures/nodes/FakeNodeInput"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {InputBrandCreate} from "../../../../../src/db/nodes/brands/types/InputBrandCreate"
import type {InputCarModelCreate} from "../../../../../src/db/nodes/car-models/types/InputCarModelCreate"
import type {InputImageCreate} from "../../../../../src/db/nodes/images/types/InputImageCreate"
import {Brand} from "../../../../../src/models/node-types/brands/Brand"
import {CarModel} from "../../../../../src/models/node-types/car-models/CarModel"
import {Image} from "../../../../../src/models/node-types/images/Image"

test('Timestamps provided by the user are ignored', async () => {
    // BRAND
    const brandData = FakeNodeInput(ControllerNodeType.BRAND) as InputBrandCreate
    const createdBrand = await Brand.create(brandData)

    expect(createdBrand).toHaveProperty('created_at')
    expect(createdBrand).not.toHaveProperty('created_at', "blubb")
    expect(createdBrand).toHaveProperty('updated_at')
    expect(createdBrand).not.toHaveProperty('updated_at', "blobb")

    // CAR MODEL
    const carModelData = FakeNodeInput(ControllerNodeType.CAR_MODEL) as InputCarModelCreate
    const createdCarModel = await CarModel.create(carModelData)

    expect(createdCarModel).toHaveProperty('created_at')
    expect(createdCarModel).not.toHaveProperty('created_at', "blubb")
    expect(createdCarModel).toHaveProperty('updated_at')
    expect(createdCarModel).not.toHaveProperty('updated_at', "blobb")

    // IMAGE
    const imageData: InputImageCreate = FakeNodeInput(ControllerNodeType.IMAGE) as InputImageCreate
    const createdImage = await Image.create(imageData)

    expect(createdImage).toHaveProperty('created_at')
    expect(createdImage).not.toHaveProperty('created_at', "blubb")
    expect(createdImage).toHaveProperty('updated_at')
    expect(createdImage).not.toHaveProperty('updated_at', "blobb")
})
