import assert from "assert"
import {createNode as createBrandNode} from "../../../../src/db/brands/createNode"
import {createNode as createCarModelNode} from "../../../../src/db/car-models/createNode"
import FakeBrand from "../../../fixtures/nodes/FakeBrand"
import FakeCarModel from "../../../fixtures/nodes/FakeCarModel"
import {DbRelationship} from "../../../../src/types/DbRelationship"
import {createRelationship} from "../../../../src/db/createRelationship"
import {getRelationship} from "../../../../src/db/getRelationship"

test('ID is always contained in response', async () => {
    const carModel = await createCarModelNode(FakeCarModel)
    const brand = await createBrandNode(FakeBrand)
    const expectedRelationship = await createRelationship(brand.id, carModel.id, DbRelationship.BrandHasCarModel)

    if (!expectedRelationship) {
        assert.fail('Relationship creation failed')
    }

    const requestedRelationship = await getRelationship(brand.id, carModel.id, DbRelationship.BrandHasCarModel)

    if (!requestedRelationship) {
        assert.fail('Relationship retrieval failed')
    }

    expect(requestedRelationship.relationship_id)
        .toBe(expectedRelationship.relationship_id)
})
