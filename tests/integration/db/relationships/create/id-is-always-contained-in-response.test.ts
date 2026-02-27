import {expect, test} from 'vitest'
import assert from "assert"
import {createNode as createBrandNode} from "../../../../../src/db/node-types/brands/createNode"
import {createNode as createCarModelNode} from "../../../../../src/db/node-types/car-models/createNode"
import {RelationshipType} from "../../../../../src/db/types/RelationshipType"
import {createRelationship} from "../../../../../src/db/relationships/createRelationship"
import {getSpecificRelationship} from "../../../../../src/db/relationships/getSpecificRelationship"
import {FakeCarModel} from "../../../../_toolbox/fixtures/nodes/FakeCarModel"
import {FakeBrand} from "../../../../_toolbox/fixtures/nodes/FakeBrand"

test('ID is always contained in response', async () => {
    const carModel = await createCarModelNode(FakeCarModel.dbInput)
    const brand = await createBrandNode(FakeBrand.dbInput)
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
