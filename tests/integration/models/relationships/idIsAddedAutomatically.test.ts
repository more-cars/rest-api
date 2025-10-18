import {expect, test} from 'vitest'
import {createNode as createBrandNode} from "../../../../src/db/nodes/brands/createNode"
import {createNode as createCarModelNode} from "../../../../src/db/nodes/car-models/createNode"
import assert from "assert"
import FakeBrand from "../../../_toolbox/fixtures/nodes/FakeBrand"
import FakeCarModel from "../../../_toolbox/fixtures/nodes/FakeCarModel"
import {Brand} from "../../../../src/models/brands/Brand"

test('ID is added when creating a relationship', async () => {
    const brand = await createBrandNode(FakeBrand)
    const carModel = await createCarModelNode(FakeCarModel)
    const relationship = await Brand.createHasCarModelRelationship(brand.id, carModel.id)

    if (!relationship) {
        assert.fail('Relationship creation failed')
    }

    expect(relationship.id)
        .toBeGreaterThanOrEqual(12000000)
    expect(relationship.id)
        .toBeLessThanOrEqual(99999999)
})
