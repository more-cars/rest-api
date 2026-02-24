import {expect, test} from 'vitest'
import {createNode as createBrandNode} from "../../../../../src/db/node-types/brands/createNode"
import {createNode as createCarModelNode} from "../../../../../src/db/node-types/car-models/createNode"
import {createNode as createImageNode} from "../../../../../src/db/node-types/images/createNode"
import {getExhaustiveFakeInputDataForDbNode} from "../../../../_toolbox/fixtures/nodes/getExhaustiveFakeInputDataForDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import type {InputBrandCreate} from "../../../../../src/db/node-types/brands/types/InputBrandCreate"
import type {InputCarModelCreate} from "../../../../../src/db/node-types/car-models/types/InputCarModelCreate"
import FakeImageFull from "../../../../_toolbox/fixtures/nodes/FakeImageFull"

test('Timestamps are added when creating a node', async () => {
    const createdBrand = await createBrandNode(getExhaustiveFakeInputDataForDbNode(DbNodeType.Brand) as InputBrandCreate)
    expect(createdBrand.properties)
        .toHaveProperty('created_at')
    expect(createdBrand.properties)
        .toHaveProperty('updated_at')

    const createdCarModel = await createCarModelNode(getExhaustiveFakeInputDataForDbNode(DbNodeType.CarModel) as InputCarModelCreate)
    expect(createdCarModel.properties)
        .toHaveProperty('created_at')
    expect(createdCarModel.properties)
        .toHaveProperty('updated_at')

    const createdImage = await createImageNode(FakeImageFull)
    expect(createdImage.properties)
        .toHaveProperty('created_at')
    expect(createdImage.properties)
        .toHaveProperty('updated_at')
})
