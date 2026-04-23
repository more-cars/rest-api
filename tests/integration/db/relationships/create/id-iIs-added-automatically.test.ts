import {expect, test} from 'vitest'
import assert from "assert"
import {createNeo4jNode} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeBrand} from "../../../../_toolbox/fixtures/nodes/FakeBrand"
import {FakeCarModel} from "../../../../_toolbox/fixtures/nodes/FakeCarModel"
import {createRelationship} from "../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../src/db/types/RelationshipType"

test('ID is added when creating a relationship', async () => {
    const brand = await createNeo4jNode(DbNodeType.Brand, FakeBrand.dbInput)
    const carModel = await createNeo4jNode(DbNodeType.CarModel, FakeCarModel.dbInput)
    const relationship = await createRelationship(brand.properties.id, carModel.properties.id, RelationshipType.BrandHasCarModel)

    if (!relationship) {
        assert.fail('Relationship creation failed')
    }

    expect(relationship.id)
        .toBeGreaterThanOrEqual(12000000)
    expect(relationship.id)
        .toBeLessThanOrEqual(99999999)
})
