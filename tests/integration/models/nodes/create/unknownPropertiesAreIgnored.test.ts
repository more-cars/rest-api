import {expect, test} from 'vitest'
import {FakeNodeInput} from "../../../../_toolbox/fixtures/nodes/FakeNodeInput"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {InputBrandCreate} from "../../../../../src/db/nodes/brands/types/InputBrandCreate"
import type {InputCarModelCreate} from "../../../../../src/db/nodes/car-models/types/InputCarModelCreate"
import FakeImage from "../../../../_toolbox/fixtures/nodes/FakeImage"
import {CarModel} from "../../../../../src/models/car-models/CarModel"
import {Brand} from "../../../../../src/models/brands/Brand"
import {Image} from "../../../../../src/models/images/Image"

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
    const imageData = Object.assign(FakeImage, {
        "my_property": "NOT_ALLOWED_TO_ADD"
    })
    createdNode = await Image.create(imageData)
    expect(createdNode)
        .not.toContain("my_property")
})
