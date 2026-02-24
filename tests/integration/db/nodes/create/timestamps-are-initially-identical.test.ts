import {expect, test} from 'vitest'
import {createNode as createBrandNode} from "../../../../../src/db/node-types/brands/createNode"
import {createNode as createCarModelNode} from "../../../../../src/db/node-types/car-models/createNode"
import {createNode as createImageNode} from "../../../../../src/db/node-types/images/createNode"
import {getExhaustiveFakeInputDataForDbNode} from "../../../../_toolbox/fixtures/nodes/getExhaustiveFakeInputDataForDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import type {InputBrandCreate} from "../../../../../src/db/node-types/brands/types/InputBrandCreate"
import type {InputCarModelCreate} from "../../../../../src/db/node-types/car-models/types/InputCarModelCreate"
import type {InputImageCreate} from "../../../../../src/db/node-types/images/types/InputImageCreate"

test('Timestamps are identical when creating a node', async () => {
    const createdBrand = await createBrandNode(getExhaustiveFakeInputDataForDbNode(DbNodeType.Brand) as InputBrandCreate)
    expect(createdBrand.properties.created_at)
        .toEqual(createdBrand.properties.updated_at)

    const createdCarModel = await createCarModelNode(getExhaustiveFakeInputDataForDbNode(DbNodeType.CarModel) as InputCarModelCreate)
    expect(createdCarModel.properties.created_at)
        .toEqual(createdCarModel.properties.updated_at)

    const createdImage = await createImageNode(getExhaustiveFakeInputDataForDbNode(DbNodeType.Image) as InputImageCreate)
    expect(createdImage.properties.created_at)
        .toEqual(createdImage.properties.updated_at)
})
