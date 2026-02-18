import {expect, test} from 'vitest'
import {FakeNodeInput} from "../../../../_toolbox/fixtures/nodes/FakeNodeInput"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {InputBrandCreate} from "../../../../../src/db/nodes/brands/types/InputBrandCreate"
import type {InputCarModelCreate} from "../../../../../src/db/nodes/car-models/types/InputCarModelCreate"
import {CarModel} from "../../../../../src/models/node-types/car-models/CarModel"
import {Brand} from "../../../../../src/models/node-types/brands/Brand"
import {Image} from "../../../../../src/models/node-types/images/Image"
import type {InputImageCreate} from "../../../../../src/db/nodes/images/types/InputImageCreate"

test('Unknown properties are ignored', async () => {
    let createdNode

    // CAR MODEL
    const carModelData = Object.assign({}, FakeNodeInput(NodeTypeEnum.CAR_MODEL) as InputCarModelCreate, {
        "my_property": "NOT_ALLOWED_TO_ADD"
    })
    createdNode = await CarModel.create(carModelData)
    expect(createdNode)
        .not.toContain("my_property")

    // BRAND
    const brandData = Object.assign({}, FakeNodeInput(NodeTypeEnum.BRAND) as InputBrandCreate, {
        "my_property": "NOT_ALLOWED_TO_ADD"
    })
    createdNode = await Brand.create(brandData)
    expect(createdNode)
        .not.toContain("my_property")


    // IMAGE
    const imageData = Object.assign({}, FakeNodeInput(NodeTypeEnum.IMAGE) as InputImageCreate, {
        "my_property": "NOT_ALLOWED_TO_ADD"
    })
    createdNode = await Image.create(imageData)
    expect(createdNode)
        .not.toContain("my_property")
})
