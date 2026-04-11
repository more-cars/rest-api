import {expect, test} from 'vitest'
import {CarModel} from "../../../../../src/models/node-types/car-models/CarModel"
import {Brand} from "../../../../../src/models/node-types/brands/Brand"
import {FakeCarModel} from "../../../../_toolbox/fixtures/nodes/FakeCarModel"
import {FakeBrand} from "../../../../_toolbox/fixtures/nodes/FakeBrand"

test('Unknown properties are ignored', async () => {
    let createdNode

    // CAR MODEL
    const carModelData = Object.assign({}, FakeCarModel.dbInput, {
        "my_property": "NOT_ALLOWED_TO_ADD"
    })
    createdNode = await CarModel.create(carModelData)
    expect(createdNode.attributes)
        .not.toContain("my_property")

    // BRAND
    const brandData = Object.assign({}, FakeBrand.dbInput, {
        "my_property": "NOT_ALLOWED_TO_ADD"
    })
    createdNode = await Brand.create(brandData)
    expect(createdNode.attributes)
        .not.toContain("my_property")
})
