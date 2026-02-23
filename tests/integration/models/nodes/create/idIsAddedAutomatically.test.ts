import {expect, test} from 'vitest'
import {FakeNodeInput} from "../../../../_toolbox/fixtures/nodes/FakeNodeInput"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {InputBrandCreate} from "../../../../../src/db/node-types/brands/types/InputBrandCreate"
import type {InputCarModelCreate} from "../../../../../src/db/node-types/car-models/types/InputCarModelCreate"
import type {InputImageCreate} from "../../../../../src/db/node-types/images/types/InputImageCreate"
import {Brand} from "../../../../../src/models/node-types/brands/Brand"
import {CarModel} from "../../../../../src/models/node-types/car-models/CarModel"
import {Image} from "../../../../../src/models/node-types/images/Image"

test('ID is added when creating a node', async () => {
    const createdBrand = await Brand.create(FakeNodeInput(ControllerNodeType.Brand) as InputBrandCreate)
    expect(createdBrand.attributes.id)
        .toBeGreaterThanOrEqual(12000000)
    expect(createdBrand.attributes.id)
        .toBeLessThanOrEqual(99999999)

    const createdCarModel = await CarModel.create(FakeNodeInput(ControllerNodeType.CarModel) as InputCarModelCreate)
    expect(createdCarModel.attributes.id)
        .toBeGreaterThanOrEqual(12000000)
    expect(createdCarModel.attributes.id)
        .toBeLessThanOrEqual(99999999)

    const createdImage = await Image.create(FakeNodeInput(ControllerNodeType.Image) as InputImageCreate)
    expect(createdImage.attributes.id)
        .toBeGreaterThanOrEqual(12000000)
    expect(createdImage.attributes.id)
        .toBeLessThanOrEqual(99999999)
})
