import {expect, test} from 'vitest'
import assert from "assert"
import {createDbNode} from "../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeCarModel} from "../../../../_toolbox/fixtures/nodes/FakeCarModel"
import {FakeBrand} from "../../../../_toolbox/fixtures/nodes/FakeBrand"
import {RelationshipType} from "../../../../../src/db/types/RelationshipType"
import {createRelationship} from "../../../../../src/db/relationships/createRelationship"
import {getSpecificRelationship} from "../../../../../src/db/relationships/getSpecificRelationship"

test('ID is always contained in response', async () => {
    const carModel = await createDbNode(DbNodeType.CarModel, FakeCarModel.dbInput)
    const brand = await createDbNode(DbNodeType.Brand, FakeBrand.dbInput)
    const expectedRelationship = await createRelationship(brand.properties.id, carModel.properties.id, RelationshipType.BrandHasCarModel)

    if (!expectedRelationship) {
        assert.fail('Relationship creation failed')
    }

    const requestedRelationship = await getSpecificRelationship(brand.properties.id, carModel.properties.id, RelationshipType.BrandHasCarModel)

    if (!requestedRelationship) {
        assert.fail('Relationship retrieval failed')
    }

    expect(requestedRelationship.id)
        .toBe(expectedRelationship.id)
})
