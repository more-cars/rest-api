import {expect, test} from 'vitest'
import {Brand} from "../../../../../src/models/node-types/brands/Brand"
import {CarModel} from "../../../../../src/models/node-types/car-models/CarModel"
import {Image} from "../../../../../src/models/node-types/images/Image"
import {FakeNodeInput} from "../../../../_toolbox/fixtures/nodes/FakeNodeInput"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {InputBrandCreate} from "../../../../../src/db/nodes/brands/types/InputBrandCreate"
import type {InputCarModelCreate} from "../../../../../src/db/nodes/car-models/types/InputCarModelCreate"
import type {InputImageCreate} from "../../../../../src/db/nodes/images/types/InputImageCreate"

test('Timestamps are identical when creating a node', async () => {
    const createdBrand = await Brand.create(FakeNodeInput(NodeTypeEnum.BRAND) as InputBrandCreate)
    expect(createdBrand.created_at)
        .toEqual(createdBrand.updated_at)

    const createdCarModel = await CarModel.create(FakeNodeInput(NodeTypeEnum.CAR_MODEL) as InputCarModelCreate)
    expect(createdCarModel.created_at)
        .toEqual(createdCarModel.updated_at)

    const createdImage = await Image.create(FakeNodeInput(NodeTypeEnum.IMAGE) as InputImageCreate)
    expect(createdImage.created_at)
        .toEqual(createdImage.updated_at)
})
