import {createRelationship} from "../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../src/types/DbRelationship"
import assert from "assert"
import FakeBrand from "../../../fixtures/nodes/FakeBrand"
import FakeCarModel from "../../../fixtures/nodes/FakeCarModel"
import {createNode as createBrandNode} from "../../../../src/db/nodes/brands/createNode"
import {createNode as createCarModelNode} from "../../../../src/db/nodes/car-models/createNode"

test('ID is added when creating a relationship', async () => {
    const brand = await createBrandNode(FakeBrand)
    const carModel = await createCarModelNode(FakeCarModel)
    const relationship = await createRelationship(brand.id, carModel.id, DbRelationship.BrandHasCarModel)

    if (!relationship) {
        assert.fail('Relationship creation failed')
    }

    expect(relationship.relationship_id)
        .toBeGreaterThan(0)
    expect(relationship.relationship_id)
        .toBeLessThan(4294967296)
})
