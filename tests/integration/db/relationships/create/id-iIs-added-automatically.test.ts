import {expect, test} from 'vitest'
import assert from "assert"
import {createNode as createBrandNode} from "../../../../../src/db/node-types/brands/createNode"
import {FakeBrand} from "../../../../_toolbox/fixtures/nodes/FakeBrand"
import {createNode as createCarModelNode} from "../../../../../src/db/node-types/car-models/createNode"
import {FakeCarModel} from "../../../../_toolbox/fixtures/nodes/FakeCarModel"
import {createRelationship} from "../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../src/db/types/RelationshipType"

test('ID is added when creating a relationship', async () => {
    const brand = await createBrandNode(FakeBrand.dbInput)
    const carModel = await createCarModelNode(FakeCarModel.dbInput)
    const relationship = await createRelationship(brand.properties.id, carModel.properties.id, RelationshipType.BrandHasCarModel)

    if (!relationship) {
        assert.fail('Relationship creation failed')
    }

    expect(relationship.id)
        .toBeGreaterThanOrEqual(12000000)
    expect(relationship.id)
        .toBeLessThanOrEqual(99999999)
})
