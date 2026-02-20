import {expect, test} from 'vitest'
import {createNode as createBrandNode} from "../../../../../src/db/nodes/brands/createNode"
import {createNode as createCarModelNode} from "../../../../../src/db/nodes/car-models/createNode"
import {createNode as createImageNode} from "../../../../../src/db/nodes/images/createNode"
import {FakeNodeInput} from "../../../../_toolbox/fixtures/nodes/FakeNodeInput"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {InputBrandCreate} from "../../../../../src/db/nodes/brands/types/InputBrandCreate"
import type {InputCarModelCreate} from "../../../../../src/db/nodes/car-models/types/InputCarModelCreate"
import FakeImageFull from "../../../../_toolbox/fixtures/nodes/FakeImageFull"

test('Timestamps are added when creating a node', async () => {
    const createdBrand = await createBrandNode(FakeNodeInput(ControllerNodeType.BRAND) as InputBrandCreate)
    expect(createdBrand.properties)
        .toHaveProperty('created_at')
    expect(createdBrand.properties)
        .toHaveProperty('updated_at')

    const createdCarModel = await createCarModelNode(FakeNodeInput(ControllerNodeType.CAR_MODEL) as InputCarModelCreate)
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
