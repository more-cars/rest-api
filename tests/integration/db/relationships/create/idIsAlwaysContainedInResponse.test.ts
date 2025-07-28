import {expect, test} from 'vitest'
import assert from "assert"
import {createNode as createBrandNode} from "../../../../../src/db/nodes/brands/createNode"
import {createNode as createCarModelNode} from "../../../../../src/db/nodes/car-models/createNode"
import FakeBrand from "../../../../_toolbox/fixtures/nodes/FakeBrand"
import FakeCarModel from "../../../../_toolbox/fixtures/nodes/FakeCarModel"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"
import {createRelationship} from "../../../../../src/db/relationships/createRelationship"
import {getSpecificRelationship} from "../../../../../src/db/relationships/getSpecificRelationship"

test('ID is always contained in response', async () => {
    const carModel = await createCarModelNode(FakeCarModel)
    const brand = await createBrandNode(FakeBrand)
    const expectedRelationship = await createRelationship(brand.id, carModel.id, DbRelationship.BrandHasCarModel)

    if (!expectedRelationship) {
        assert.fail('Relationship creation failed')
    }

    const requestedRelationship = await getSpecificRelationship(brand.id, carModel.id, DbRelationship.BrandHasCarModel)

    if (!requestedRelationship) {
        assert.fail('Relationship retrieval failed')
    }

    expect(requestedRelationship.relationship_id)
        .toBe(expectedRelationship.relationship_id)
})
