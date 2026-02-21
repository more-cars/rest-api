import {expect, test} from 'vitest'
import {FakeNodeInput} from "../../../../_toolbox/fixtures/nodes/FakeNodeInput"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {InputBrandCreate} from "../../../../../src/db/nodes/brands/types/InputBrandCreate"
import type {InputCarModelCreate} from "../../../../../src/db/nodes/car-models/types/InputCarModelCreate"
import {CarModel} from "../../../../../src/models/node-types/car-models/CarModel"
import {Brand} from "../../../../../src/models/node-types/brands/Brand"
import {Image} from "../../../../../src/models/node-types/images/Image"
import type {InputImageCreate} from "../../../../../src/db/nodes/images/types/InputImageCreate"

test('Unknown properties are ignored', async () => {
    let createdNode

    // CAR MODEL
    const carModelData = Object.assign({}, FakeNodeInput(ControllerNodeType.CarModel) as InputCarModelCreate, {
        "my_property": "NOT_ALLOWED_TO_ADD"
    })
    createdNode = await CarModel.create(carModelData)
    expect(createdNode.attributes)
        .not.toContain("my_property")

    // BRAND
    const brandData = Object.assign({}, FakeNodeInput(ControllerNodeType.Brand) as InputBrandCreate, {
        "my_property": "NOT_ALLOWED_TO_ADD"
    })
    createdNode = await Brand.create(brandData)
    expect(createdNode.attributes)
        .not.toContain("my_property")


    // IMAGE
    const imageData = Object.assign({}, FakeNodeInput(ControllerNodeType.Image) as InputImageCreate, {
        "my_property": "NOT_ALLOWED_TO_ADD"
    })
    createdNode = await Image.create(imageData)
    expect(createdNode.attributes)
        .not.toContain("my_property")
})
