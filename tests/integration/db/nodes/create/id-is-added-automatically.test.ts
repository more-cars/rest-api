import {expect, test} from 'vitest'
import {createNode as createBrandNode} from "../../../../../src/db/node-types/brands/createNode"
import {createNode as createCarModelNode} from "../../../../../src/db/node-types/car-models/createNode"
import {createNode as createImageNode} from "../../../../../src/db/node-types/images/createNode"
import {getExhaustiveFakeInputDataForDbNode} from "../../../../_toolbox/fixtures/nodes/getExhaustiveFakeInputDataForDbNode"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {InputBrandCreate} from "../../../../../src/db/node-types/brands/types/InputBrandCreate"
import type {InputCarModelCreate} from "../../../../../src/db/node-types/car-models/types/InputCarModelCreate"
import FakeImageFull from "../../../../_toolbox/fixtures/nodes/FakeImageFull"

test('ID is added when creating a node', async () => {
    const createdBrand = await createBrandNode(getExhaustiveFakeInputDataForDbNode(ControllerNodeType.Brand) as InputBrandCreate)
    expect(createdBrand.properties.id)
        .toBeGreaterThanOrEqual(12000000)
    expect(createdBrand.properties.id)
        .toBeLessThanOrEqual(99999999)

    const createdCarModel = await createCarModelNode(getExhaustiveFakeInputDataForDbNode(ControllerNodeType.CarModel) as InputCarModelCreate)
    expect(createdCarModel.properties.id)
        .toBeGreaterThanOrEqual(12000000)
    expect(createdCarModel.properties.id)
        .toBeLessThanOrEqual(99999999)

    const createdImage = await createImageNode(FakeImageFull)
    expect(createdImage.properties.id)
        .toBeGreaterThanOrEqual(12000000)
    expect(createdImage.properties.id)
        .toBeLessThanOrEqual(99999999)
})
