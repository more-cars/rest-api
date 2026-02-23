import {expect, test} from 'vitest'
import {Brand} from "../../../../../src/models/node-types/brands/Brand"
import {CarModel} from "../../../../../src/models/node-types/car-models/CarModel"
import {Image} from "../../../../../src/models/node-types/images/Image"
import {FakeNodeInput} from "../../../../_toolbox/fixtures/nodes/FakeNodeInput"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {InputBrandCreate} from "../../../../../src/db/node-types/brands/types/InputBrandCreate"
import type {InputCarModelCreate} from "../../../../../src/db/node-types/car-models/types/InputCarModelCreate"
import type {InputImageCreate} from "../../../../../src/db/node-types/images/types/InputImageCreate"

test('Timestamps are identical when creating a node', async () => {
    const createdBrand = await Brand.create(FakeNodeInput(ControllerNodeType.Brand) as InputBrandCreate)
    expect(createdBrand.attributes.created_at)
        .toEqual(createdBrand.attributes.updated_at)

    const createdCarModel = await CarModel.create(FakeNodeInput(ControllerNodeType.CarModel) as InputCarModelCreate)
    expect(createdCarModel.attributes.created_at)
        .toEqual(createdCarModel.attributes.updated_at)

    const createdImage = await Image.create(FakeNodeInput(ControllerNodeType.Image) as InputImageCreate)
    expect(createdImage.attributes.created_at)
        .toEqual(createdImage.attributes.updated_at)
})
