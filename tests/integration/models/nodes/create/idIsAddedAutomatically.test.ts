import {expect, test} from 'vitest'
import {FakeNodeInput} from "../../../../_toolbox/fixtures/nodes/FakeNodeInput"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {InputBrandCreate} from "../../../../../src/db/nodes/brands/types/InputBrandCreate"
import type {InputCarModelCreate} from "../../../../../src/db/nodes/car-models/types/InputCarModelCreate"
import type {InputImageCreate} from "../../../../../src/db/nodes/images/types/InputImageCreate"
import {Brand} from "../../../../../src/models/brands/Brand"
import {CarModel} from "../../../../../src/models/car-models/CarModel"
import {Image} from "../../../../../src/models/images/Image"

test('ID is added when creating a node', async () => {
    const createdBrand = await Brand.create(FakeNodeInput(NodeTypeEnum.BRAND) as InputBrandCreate)
    expect(createdBrand.id)
        .toBeGreaterThanOrEqual(12000000)
    expect(createdBrand.id)
        .toBeLessThanOrEqual(99999999)

    const createdCarModel = await CarModel.create(FakeNodeInput(NodeTypeEnum.CAR_MODEL) as InputCarModelCreate)
    expect(createdCarModel.id)
        .toBeGreaterThanOrEqual(12000000)
    expect(createdCarModel.id)
        .toBeLessThanOrEqual(99999999)

    const createdImage = await Image.create(FakeNodeInput(NodeTypeEnum.IMAGE) as InputImageCreate)
    expect(createdImage.id)
        .toBeGreaterThanOrEqual(12000000)
    expect(createdImage.id)
        .toBeLessThanOrEqual(99999999)
})
