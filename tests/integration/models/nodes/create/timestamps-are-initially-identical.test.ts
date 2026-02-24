import {expect, test} from 'vitest'
import {Brand} from "../../../../../src/models/node-types/brands/Brand"
import {CarModel} from "../../../../../src/models/node-types/car-models/CarModel"
import {Image} from "../../../../../src/models/node-types/images/Image"
import {getExhaustiveFakeInputDataForDbNode} from "../../../../_toolbox/fixtures/nodes/getExhaustiveFakeInputDataForDbNode"
import type {InputBrandCreate} from "../../../../../src/db/node-types/brands/types/InputBrandCreate"
import type {InputCarModelCreate} from "../../../../../src/db/node-types/car-models/types/InputCarModelCreate"
import type {InputImageCreate} from "../../../../../src/db/node-types/images/types/InputImageCreate"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

test('Timestamps are identical when creating a node', async () => {
    const createdBrand = await Brand.create(getExhaustiveFakeInputDataForDbNode(DbNodeType.Brand) as InputBrandCreate)
    expect(createdBrand.attributes.created_at)
        .toEqual(createdBrand.attributes.updated_at)

    const createdCarModel = await CarModel.create(getExhaustiveFakeInputDataForDbNode(DbNodeType.CarModel) as InputCarModelCreate)
    expect(createdCarModel.attributes.created_at)
        .toEqual(createdCarModel.attributes.updated_at)

    const createdImage = await Image.create(getExhaustiveFakeInputDataForDbNode(DbNodeType.Image) as InputImageCreate)
    expect(createdImage.attributes.created_at)
        .toEqual(createdImage.attributes.updated_at)
})
