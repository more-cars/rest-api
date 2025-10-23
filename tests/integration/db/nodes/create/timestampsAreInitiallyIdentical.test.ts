import {expect, test} from 'vitest'
import {createNode as createBrandNode} from "../../../../../src/db/nodes/brands/createNode"
import {createNode as createCarModelNode} from "../../../../../src/db/nodes/car-models/createNode"
import {createNode as createImageNode} from "../../../../../src/db/nodes/images/createNode"
import {FakeNodeInput} from "../../../../_toolbox/fixtures/nodes/FakeNodeInput"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {InputBrandCreate} from "../../../../../src/db/nodes/brands/types/InputBrandCreate"
import type {InputCarModelCreate} from "../../../../../src/db/nodes/car-models/types/InputCarModelCreate"
import FakeImageFull from "../../../../_toolbox/fixtures/nodes/FakeImageFull"

test('Timestamps are identical when creating a node', async () => {
    const createdBrand = await createBrandNode(FakeNodeInput(NodeTypeEnum.BRAND) as InputBrandCreate)
    expect(createdBrand.created_at)
        .toEqual(createdBrand.updated_at)

    const createdCarModel = await createCarModelNode(FakeNodeInput(NodeTypeEnum.CAR_MODEL) as InputCarModelCreate)
    expect(createdCarModel.created_at)
        .toEqual(createdCarModel.updated_at)

    const createdImage = await createImageNode(FakeImageFull)
    expect(createdImage.created_at)
        .toEqual(createdImage.updated_at)
})
