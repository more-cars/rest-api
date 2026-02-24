import {expect, test} from 'vitest'
import assert from "assert"
import {seedRelationship} from "../../../_toolbox/dbSeeding/seedRelationship"
import {DbNodeType} from "../../../../src/db/types/DbNodeType"
import {RelationshipType} from "../../../../src/db/types/RelationshipType"
import {CarModel} from "../../../../src/models/node-types/car-models/CarModel"

test('ID is always contained in response', async () => {
    const expectedRelationship = await seedRelationship(DbNodeType.CarModel, DbNodeType.Brand, RelationshipType.CarModelBelongsToBrand)

    if (!expectedRelationship) {
        assert.fail('Relationship creation failed')
    }

    const requestedRelationship = await CarModel.getBelongsToBrandRelationship(expectedRelationship.start_node.properties.id)

    if (!requestedRelationship) {
        assert.fail('Relationship retrieval failed')
    }

    expect(requestedRelationship.id)
        .toBe(expectedRelationship.id)
})
