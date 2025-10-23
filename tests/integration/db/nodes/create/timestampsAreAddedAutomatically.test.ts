import {expect, test} from 'vitest'
import {createNode as createBrandNode} from "../../../../../src/db/nodes/brands/createNode"
import {createNode as createCarModelNode} from "../../../../../src/db/nodes/car-models/createNode"
import {createNode as createImageNode} from "../../../../../src/db/nodes/images/createNode"
import {FakeNodeInput} from "../../../../_toolbox/fixtures/nodes/FakeNodeInput"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {InputBrandCreate} from "../../../../../src/db/nodes/brands/types/InputBrandCreate"
import FakeCarModel from "../../../../_toolbox/fixtures/nodes/FakeCarModel"
import FakeImageFull from "../../../../_toolbox/fixtures/nodes/FakeImageFull"

test('Timestamps are added when creating a node', async () => {
    const createdBrand = await createBrandNode(FakeNodeInput(NodeTypeEnum.BRAND) as InputBrandCreate)
    expect(createdBrand)
        .toHaveProperty('created_at')
    expect(createdBrand)
        .toHaveProperty('updated_at')

    const createdCarModel = await createCarModelNode(FakeCarModel)
    expect(createdCarModel)
        .toHaveProperty('created_at')
    expect(createdCarModel)
        .toHaveProperty('updated_at')

    const createdImage = await createImageNode(FakeImageFull)
    expect(createdImage)
        .toHaveProperty('created_at')
    expect(createdImage)
        .toHaveProperty('updated_at')
})
